import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Search,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Filter,
  Layers,
  RotateCcw,
  Bot,
  Anchor,
  SplitSquareVertical,
  Award,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAPABILITIES } from '../data/capabilities';
import { LEARNING_PATHS } from '../data/learningPaths';
import { CATEGORY_LIST } from '../data/categories';
import { CapabilityNode, DifficultyLevel, ContentStatus } from '../types';
import { Badge } from '../components/common/Badge';
import { InteractiveComparisons } from '../components/comparisons/InteractiveComparisons';
import { SubagentSimulation } from '../components/simulations/SubagentSimulation';
import { HooksTimeline } from '../components/simulations/HooksTimeline';

export const LearnView: React.FC = () => {
  const {
    language,
    navigateTo,
    completedUnitIds,
    learningPathCapabilityIds,
    toggleLearningPath,
    toggleCompleteUnit,
    selectedCapabilityId,
  } = useApp();

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Search & Multi-Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'paths' | 'catalog' | 'comparisons' | 'simulations'>('paths');
  const [expandedPathId, setExpandedPathId] = useState<string | null>('path-core-foundations');

  // Stats calculation
  const totalCapabilitiesCount = CAPABILITIES.length;
  const completedLessonsCount = CAPABILITIES.filter((c) =>
    completedUnitIds.includes(c.id)
  ).length;
  const overallProgressPercentage = Math.round(
    (completedLessonsCount / totalCapabilitiesCount) * 100
  );

  // Filter logic for capabilities catalog
  const filteredCapabilities = useMemo(() => {
    return CAPABILITIES.filter((cap) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cap.name.ar.toLowerCase().includes(q) ||
        cap.name.en.toLowerCase().includes(q) ||
        cap.summary.ar.toLowerCase().includes(q) ||
        cap.summary.en.toLowerCase().includes(q) ||
        cap.id.toLowerCase().includes(q);

      // Category
      const matchesCategory =
        selectedCategory === 'all' || cap.category === selectedCategory;

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === 'all' || cap.difficulty === selectedDifficulty;

      // Time Range
      let matchesTime = true;
      if (selectedTimeRange === 'short') {
        matchesTime = cap.estimatedMinutes < 15;
      } else if (selectedTimeRange === 'medium') {
        matchesTime = cap.estimatedMinutes >= 15 && cap.estimatedMinutes <= 25;
      } else if (selectedTimeRange === 'long') {
        matchesTime = cap.estimatedMinutes > 25;
      }

      // Status
      const matchesStatus =
        selectedStatus === 'all' || cap.status === selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesTime &&
        matchesStatus
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedTimeRange,
    selectedStatus,
  ]);

  // Recommended next lesson calculation:
  // First uncompleted capability from user's path, or first overall uncompleted capability
  const recommendedNextCapability = useMemo(() => {
    const uncompletedInPath = CAPABILITIES.find(
      (c) =>
        learningPathCapabilityIds.includes(c.id) &&
        !completedUnitIds.includes(c.id)
    );
    if (uncompletedInPath) return uncompletedInPath;

    const uncompletedOverall = CAPABILITIES.find(
      (c) => !completedUnitIds.includes(c.id)
    );
    return uncompletedOverall || CAPABILITIES[0];
  }, [completedUnitIds, learningPathCapabilityIds]);

  // Currently active or last visited capability
  const lastActiveCapability = useMemo(() => {
    return (
      CAPABILITIES.find((c) => c.id === selectedCapabilityId) ||
      CAPABILITIES[0]
    );
  }, [selectedCapabilityId]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedTimeRange('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedTimeRange !== 'all' ||
    selectedStatus !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-b from-[#10172B] to-[#0A0F1E] border border-slate-800 p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>{isArabic ? 'مركز التعلم التفاعلي' : 'Interactive Learning Center'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              {isArabic ? 'مركز التعلّم المعماري' : 'Claude Code Architecture Learning'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {isArabic
                ? 'افهم منظومة Claude Code من الداخل، خطوة بخطوة. دروس معيارية قائمة على 14 نقطة معرفية، مقارنات معمارية تفاعلية، ومحاكاة دقيقة لآليات الوكلاء والخطافات.'
                : 'Master Claude Code from within: 14-point capability lessons, architectural comparisons, and lifecycle simulations.'}
            </p>
          </div>

          {/* User Progress Stats Card */}
          <div className="bg-[#0D1424]/90 border border-slate-700/80 rounded-2xl p-5 w-full md:w-80 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">{isArabic ? 'نسبة التقدم العامة' : 'Overall Progress'}</span>
              <span className="text-purple-400 font-bold text-sm">{overallProgressPercentage}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-center">
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-base font-bold text-emerald-400">{completedLessonsCount}</div>
                <div className="text-[10px] text-slate-400 font-mono">{isArabic ? 'دروس مكتملة' : 'Completed'}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-base font-bold text-cyan-400">{totalCapabilitiesCount}</div>
                <div className="text-[10px] text-slate-400 font-mono">{isArabic ? 'إجمالي القدرات' : 'Total Nodes'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "مواصلة التعلم" (Continue Learning) & Recommended Next Lesson */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommended Next Lesson Card */}
        <div className="rounded-2xl bg-gradient-to-br from-purple-950/20 via-[#0C1222] to-slate-900 border border-purple-500/30 p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isArabic ? 'الدرس المقترح التالي لك' : 'Recommended Next Lesson'}</span>
              </span>
              <Badge variant="outline" className="text-[10px] text-purple-300 border-purple-500/40">
                {recommendedNextCapability.difficulty}
              </Badge>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
              {isArabic ? recommendedNextCapability.name.ar : recommendedNextCapability.name.en}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {isArabic ? recommendedNextCapability.summary.ar : recommendedNextCapability.summary.en}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{recommendedNextCapability.estimatedMinutes} {isArabic ? 'دقيقة' : 'min'}</span>
            </span>

            <button
              type="button"
              onClick={() => navigateTo('capabilities', recommendedNextCapability.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'ابدأ الدرس الآن' : 'Start Lesson'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Continue Learning / Last Visited Card */}
        <div className="rounded-2xl bg-[#0C1222] border border-slate-800 p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isArabic ? 'مواصلة التعلم' : 'Continue Learning'}</span>
              </span>
              <span className="text-xs font-mono text-slate-500" dir="ltr">
                ID: {lastActiveCapability.id}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
              {isArabic ? lastActiveCapability.name.ar : lastActiveCapability.name.en}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {isArabic ? lastActiveCapability.tagline.ar : lastActiveCapability.tagline.en}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleCompleteUnit(lastActiveCapability.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                  completedUnitIds.includes(lastActiveCapability.id)
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>{completedUnitIds.includes(lastActiveCapability.id) ? (isArabic ? 'مكتمل' : 'Done') : (isArabic ? 'إتمام' : 'Mark Done')}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('capabilities', lastActiveCapability.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'متابعة الدرس' : 'Resume Lesson'}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('paths')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'paths'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>{isArabic ? 'المسارات التعليمية الخمسة' : '5 Structured Paths'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'catalog'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isArabic ? `فهرس الدروس والقدرات (${CAPABILITIES.length})` : `Lessons Index (${CAPABILITIES.length})`}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('comparisons')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'comparisons'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <SplitSquareVertical className="w-4 h-4" />
          <span>{isArabic ? 'المقارنات المعمارية المحورية' : 'Architectural Comparisons'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('simulations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'simulations'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>{isArabic ? 'المحاكاة التعليمية (وكلاء وخطافات)' : 'Interactive Simulations'}</span>
        </button>
      </div>

      {/* TAB 1: Structured Learning Paths */}
      {activeTab === 'paths' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
              {isArabic ? 'المسارات التخصصية الموجهة' : 'Specialized Learning Paths'}
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {isArabic ? 'مرتبة من الأساسيات إلى الأنظمة المتقدمة' : 'Foundations to Advanced Systems'}
            </span>
          </div>

          <div className="space-y-4">
            {LEARNING_PATHS.map((path) => {
              const isExpanded = expandedPathId === path.id;
              const pathCapIds = path.units.map((u) => u.capabilityId);
              const pathCompletedUnits = path.units.filter((u) =>
                completedUnitIds.includes(u.id) || completedUnitIds.includes(u.capabilityId)
              ).length;
              const pathProgress = Math.round((pathCompletedUnits / path.units.length) * 100);

              return (
                <div
                  key={path.id}
                  className="rounded-2xl bg-[#090E1B] border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
                >
                  {/* Path Card Header */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: path.color }}
                          />
                          <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                            {isArabic ? path.title.ar : path.title.en}
                          </h3>
                          <span className="text-xs font-mono text-purple-400" dir="ltr">
                            [{path.title.en}]
                          </span>
                          <Badge variant="outline" className="text-[10px]">
                            {path.difficulty}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
                          {isArabic ? path.description.ar : path.description.en}
                        </p>
                      </div>

                      {/* Path Metrics and Controls */}
                      <div className="flex items-center gap-4 self-end lg:self-auto flex-shrink-0">
                        <div className="text-right text-xs">
                          <div className="text-slate-400 font-mono">
                            {pathCompletedUnits} / {path.units.length} {isArabic ? 'وحدات' : 'units'}
                          </div>
                          <div className="text-xs font-bold text-purple-400">{pathProgress}%</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setExpandedPathId(isExpanded ? null : path.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? (isArabic ? 'طي الوحدات' : 'Collapse') : (isArabic ? 'عرض الوحدات' : 'View Units')}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const firstUnit = path.units[0];
                            navigateTo('capabilities', firstUnit.capabilityId);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md shadow-purple-600/30"
                        >
                          <span>{isArabic ? 'بدء المسار' : 'Start Path'}</span>
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${pathProgress}%`,
                          backgroundColor: path.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Expandable Units Section */}
                  {isExpanded && (
                    <div className="bg-[#0C1222] border-t border-slate-800/90 p-4 sm:p-6 space-y-2">
                      <div className="text-xs font-mono text-slate-400 font-semibold mb-3">
                        {isArabic ? 'الوحدات التعليمية في هذا المسار:' : 'Curriculum Units:'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {path.units.map((unit, idx) => {
                          const unitCompleted =
                            completedUnitIds.includes(unit.id) ||
                            completedUnitIds.includes(unit.capabilityId);
                          return (
                            <div
                              key={unit.id}
                              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/30 transition-all flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => toggleCompleteUnit(unit.capabilityId)}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors cursor-pointer ${
                                    unitCompleted
                                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                                  }`}
                                  title={isArabic ? 'تعليم كمكتمل' : 'Toggle Completed'}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </button>
                                <div>
                                  <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300">
                                    {isArabic ? unit.title.ar : unit.title.en}
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-mono" dir="ltr">
                                    {unit.capabilityId} • {unit.durationMinutes}m
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => navigateTo('capabilities', unit.capabilityId)}
                                className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 rounded bg-purple-950/40 border border-purple-500/20 transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>{isArabic ? 'دراسة' : 'Study'}</span>
                                <ArrowIcon className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Full Capabilities Catalog with Deep Filters */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Search & Filter Controls Card */}
          <div className="rounded-2xl bg-[#090E1B] border border-slate-800 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={isArabic ? 'ابحث في الدروس، المفاهيم، والكلمات الدلالية...' : 'Search lessons, concepts, and keywords...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 cursor-pointer self-end sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
                </button>
              )}
            </div>

            {/* Filter Pills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
              {/* Category */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">{isArabic ? 'التصنيف المعماري:' : 'Category:'}</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">{isArabic ? 'كافة التصنيفات' : 'All Categories'}</option>
                  {CATEGORY_LIST.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {isArabic ? cat.name.ar : cat.name.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">{isArabic ? 'مستوى الصعوبة:' : 'Difficulty:'}</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">{isArabic ? 'كافة المستويات' : 'All Levels'}</option>
                  <option value="beginner">{isArabic ? 'مبتدئ (Beginner)' : 'Beginner'}</option>
                  <option value="intermediate">{isArabic ? 'متوسط (Intermediate)' : 'Intermediate'}</option>
                  <option value="advanced">{isArabic ? 'متقدم (Advanced)' : 'Advanced'}</option>
                  <option value="expert">{isArabic ? 'خبير (Expert)' : 'Expert'}</option>
                </select>
              </div>

              {/* Estimated Time */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">{isArabic ? 'الوقت التقديري:' : 'Study Time:'}</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">{isArabic ? 'أي وقت' : 'Any Duration'}</option>
                  <option value="short">{isArabic ? 'أقل من 15 دقيقة' : '< 15 mins'}</option>
                  <option value="medium">{isArabic ? 'من 15 إلى 25 دقيقة' : '15 - 25 mins'}</option>
                  <option value="long">{isArabic ? 'أكثر من 25 دقيقة' : '> 25 mins'}</option>
                </select>
              </div>

              {/* Content Status */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">{isArabic ? 'نوع المحتوى:' : 'Content Status:'}</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">{isArabic ? 'كافة الأنواع' : 'All Types'}</option>
                  <option value="official">{isArabic ? 'توثيق رسمي (Official)' : 'Official'}</option>
                  <option value="educational">{isArabic ? 'شرح تعليمي (Educational)' : 'Educational'}</option>
                  <option value="template">{isArabic ? 'قوالب تشغيل (Template)' : 'Template'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              {isArabic
                ? `عرض ${filteredCapabilities.length} من أصل ${CAPABILITIES.length} درس`
                : `Showing ${filteredCapabilities.length} of ${CAPABILITIES.length} lessons`}
            </span>
          </div>

          {/* Capability Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCapabilities.map((cap) => {
              const isCompleted = completedUnitIds.includes(cap.id);
              return (
                <div
                  key={cap.id}
                  className="rounded-2xl bg-[#090E1B] border border-slate-800 hover:border-purple-500/40 p-5 transition-all flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-purple-950/20 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-[10px] text-purple-300 border-purple-500/40">
                        {cap.category}
                      </Badge>
                      <Badge
                        variant={
                          cap.difficulty === 'beginner'
                            ? 'success'
                            : cap.difficulty === 'intermediate'
                            ? 'info'
                            : cap.difficulty === 'advanced'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {cap.difficulty}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors font-heading">
                      {isArabic ? cap.name.ar : cap.name.en}
                    </h3>
                    <div className="text-[10px] font-mono text-purple-400/90" dir="ltr">
                      {cap.name.en}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {isArabic ? cap.summary.ar : cap.summary.en}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cap.estimatedMinutes}m</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => navigateTo('capabilities', cap.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <span>{isArabic ? 'فتح الدرس' : 'Study'}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Interactive Comparisons */}
      {activeTab === 'comparisons' && (
        <div className="space-y-6">
          <InteractiveComparisons onSelectCapability={(id) => navigateTo('capabilities', id)} />
        </div>
      )}

      {/* TAB 4: Educational Simulations */}
      {activeTab === 'simulations' && (
        <div className="space-y-8">
          <SubagentSimulation />
          <HooksTimeline />
        </div>
      )}
    </div>
  );
};
