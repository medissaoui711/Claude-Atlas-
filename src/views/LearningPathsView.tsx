import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEARNING_PATHS } from '../data/learningPaths';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const LearningPathsView: React.FC = () => {
  const {
    language,
    navigateTo,
    completedUnitIds,
    toggleCompleteUnit,
    setSelectedCapabilityId,
  } = useApp();

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [activeLevel, setActiveLevel] = useState<number>(1);

  const activePath = useMemo(() => {
    return LEARNING_PATHS.find((p) => p.level === activeLevel) || LEARNING_PATHS[0];
  }, [activeLevel]);

  // Overall metrics
  const totalUnits = useMemo(() => {
    return LEARNING_PATHS.reduce((acc, p) => acc + p.units.length, 0);
  }, []);

  const totalCompleted = useMemo(() => {
    return completedUnitIds.length;
  }, [completedUnitIds]);

  const overallProgress = Math.min(100, Math.round((totalCompleted / (totalUnits || 1)) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <Breadcrumbs
        items={[
          { label: isArabic ? 'مسارات التعلم التفاعلية' : 'Learning Curriculums', active: true },
        ]}
      />

      {/* Header */}
      <div className="my-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>{isArabic ? 'المسار التعليمي المتدرج' : 'Structured Learning Curriculums'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {isArabic ? 'مسار احتراف منظومة Claude Code' : 'Claude Code Mastery Curriculum'}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {isArabic
              ? '4 مستويات متسلسلة تأخذك من المبادئ الأولية إلى بناء وكلاء فرعيين مستقلين وتكامل بروتوكول MCP في كبرى المشاريع.'
              : '4 progressive levels taking you from foundational terminal CLI mechanics to autonomous multi-subagent orchestration.'}
          </p>
        </div>

        {/* Global Progress Widget */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4 min-w-[260px] shadow-xl">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-purple-500 transition-all duration-500"
                strokeDasharray={`${overallProgress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-white">
              {overallProgress}%
            </span>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium">
              {isArabic ? 'إجمالي إنجاز المسارات' : 'Overall Completion'}
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {totalCompleted} / {totalUnits} {isArabic ? 'وحدة منجزة' : 'units'}
            </div>
          </div>
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {LEARNING_PATHS.map((path) => {
          const isSelected = path.level === activeLevel;
          const completedInPath = path.units.filter((u) => completedUnitIds.includes(u.id)).length;
          const pathPct = Math.round((completedInPath / path.units.length) * 100);

          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setActiveLevel(path.level)}
              className={`p-5 rounded-2xl border text-right transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-purple-950/40 border-purple-500 text-white shadow-xl shadow-purple-950/40'
                  : 'bg-[#0D1424] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                  style={{
                    backgroundColor: `${path.color}20`,
                    color: path.color,
                    border: `1px solid ${path.color}40`,
                  }}
                >
                  {isArabic ? `مستوى ${path.level}` : `Level ${path.level}`}
                </span>

                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {path.duration}
                </span>
              </div>

              <h3 className="text-sm font-bold font-heading mb-1 text-white">
                {isArabic ? path.badge.ar : path.badge.en}
              </h3>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {completedInPath}/{path.units.length} {isArabic ? 'مكتمل' : 'done'}
                </span>
                <span className="font-mono text-xs">{pathPct}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pathPct}%`,
                    backgroundColor: path.color,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Level Detailed Curriculum Container */}
      <div className="bg-[#0D1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Level Header Banner */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activePath.color }}
              />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                {isArabic ? `المستوى ${activePath.level}: المنهج الدراسي الكامل` : `Level ${activePath.level}: Complete Syllabus`}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              {isArabic ? activePath.title.ar : activePath.title.en}
            </h2>
            <p className="text-sm text-purple-300/90 mt-1 font-medium">
              {isArabic ? activePath.subtitle.ar : activePath.subtitle.en}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {isArabic ? activePath.description.ar : activePath.description.en}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">{isArabic ? 'الوقت الإجمالي' : 'Total Duration'}</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">{activePath.duration}</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">{isArabic ? 'عدد الوحدات' : 'Units'}</div>
              <div className="text-sm font-bold text-purple-400 font-mono mt-0.5">{activePath.units.length}</div>
            </div>
          </div>
        </div>

        {/* Units List */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>{isArabic ? 'الوحدات الدراسية التفاعلية' : 'Interactive Syllabus Units'}</span>
          </h3>

          <div className="space-y-3">
            {activePath.units.map((unit, index) => {
              const isCompleted = completedUnitIds.includes(unit.id);
              return (
                <div
                  key={unit.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isCompleted
                      ? 'bg-emerald-950/15 border-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Completion Checkbox Button */}
                    <button
                      type="button"
                      onClick={() => toggleCompleteUnit(unit.id)}
                      className={`mt-0.5 p-1 rounded-lg transition-colors cursor-pointer ${
                        isCompleted ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isCompleted ? (isArabic ? 'إلغاء الإكمال' : 'Mark incomplete') : (isArabic ? 'تعليم كمكتمل' : 'Mark completed')}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono text-purple-400 font-semibold">
                          #{index + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                          {isArabic ? unit.title.ar : unit.title.en}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {unit.durationMinutes}m
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        {isArabic ? unit.description.ar : unit.description.en}
                      </p>
                    </div>
                  </div>

                  {/* Jump to Capability action */}
                  {unit.capabilityId && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCapabilityId(unit.capabilityId || null);
                        navigateTo('capabilities', unit.capabilityId);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer self-end sm:self-center"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'دراسة القدرة' : 'Open Lesson'}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Level Summary Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>
              {isArabic
                ? 'إكمال هذا المستوى يمنحك شارة المعمارية المعتمدة في لوحة المتابعة الخاصة بك.'
                : 'Completing all units in this tier unlocks your verified mastery credential in your dashboard.'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>{isArabic ? 'عرض لوحة المتابعة الشخصية' : 'View personal dashboard'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
