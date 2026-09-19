import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Crosshair,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Filter,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  PlusCircle,
  CheckCircle2,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Cpu,
  Database,
  FileCode2,
  Boxes,
  Bot,
  ShieldCheck,
  Workflow,
  Wand2,
  ScrollText,
  Sparkle,
  Terminal,
  FolderTree,
  GitPullRequest,
  FolderGit2,
  ListOrdered,
  FileText,
  BookMarked,
  Sliders,
  CheckSquare,
  Maximize2,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CapabilityCategory, CapabilityNode, DifficultyLevel, ContentStatus } from '../../types';
import { CAPABILITIES } from '../../data/capabilities';
import { CATEGORIES } from '../../data/categories';
import { DetailDrawer } from './DetailDrawer';
import { Badge } from '../common/Badge';

// Map icon lookup
const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Database,
  FileCode2,
  Boxes,
  Bot,
  ShieldCheck,
  Workflow,
  Wand2,
  ScrollText,
  Sparkle,
  Terminal,
  FolderTree,
  GitPullRequest,
  Layers,
  FolderGit2,
  ListOrdered,
  FileText,
  BookMarked,
  Sliders,
  CheckSquare,
  Maximize2,
  Sparkles,
};

// 22 Node exact coordinates on a 1200 x 960 virtual canvas (Center at 600, 480)
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  // 1. Core (inner radial zone, ~150-180px from center)
  models: { x: 600, y: 320 },
  context: { x: 745, y: 405 },
  prompt_engineering: { x: 455, y: 405 },

  // 2. Memory & Project Context (upper region, y ~ 100 - 220)
  memory: { x: 600, y: 110 },
  auto_memory: { x: 600, y: 215 },
  claude_md: { x: 465, y: 170 },
  project_rules: { x: 735, y: 170 },

  // 3. Automation (right region, x ~ 900 - 1060)
  slash_commands: { x: 920, y: 260 },
  skills: { x: 1060, y: 370 },
  subagents: { x: 1060, y: 520 },
  hooks: { x: 910, y: 580 },

  // 4. Tools & Integrations (lower-right region, x ~ 760 - 1000, y ~ 700 - 850)
  files_folders: { x: 820, y: 710 },
  mcp: { x: 1000, y: 700 },
  integrations: { x: 760, y: 845 },
  github: { x: 950, y: 845 },

  // 5. Workflows (lower-left region, x ~ 200 - 440, y ~ 700 - 850)
  reports: { x: 380, y: 710 },
  playbooks: { x: 200, y: 700 },
  projects: { x: 440, y: 845 },
  tasks: { x: 250, y: 845 },

  // 6. Governance & Safety (left region, x ~ 140 - 290)
  permissions: { x: 290, y: 260 },
  security: { x: 140, y: 370 },
  audit_review: { x: 140, y: 520 },
};

// 6 Core capability IDs for the bottom highlight cards
const FEATURED_SIX_IDS = [
  'memory',
  'claude_md',
  'slash_commands',
  'skills',
  'subagents',
  'hooks',
];

interface CapabilityMapProps {
  fullPageView?: boolean;
}

export const CapabilityMap: React.FC<CapabilityMapProps> = ({ fullPageView = false }) => {
  const {
    language,
    navigateTo,
    selectedCapabilityId,
    setSelectedCapabilityId,
    learningPathCapabilityIds,
    toggleLearningPath,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    setIsLearningPathModalOpen,
  } = useApp();

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CapabilityCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ContentStatus | 'all'>('all');

  // Interaction states
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeSelectedNode, setActiveSelectedNode] = useState<CapabilityNode | null>(null);
  const [showRelationships, setShowRelationships] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Mobile expanded category state
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>('core');

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter capabilities
  const filteredCapabilities = useMemo(() => {
    return CAPABILITIES.filter((cap) => {
      const matchesSearch =
        !searchQuery.trim() ||
        cap.name.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.tagline.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || cap.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'all' || cap.difficulty === selectedDifficulty;
      const matchesStat = selectedStatus === 'all' || cap.status === selectedStatus;

      return matchesSearch && matchesCat && matchesDiff && matchesStat;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus]);

  const visibleIds = useMemo(() => {
    return new Set(filteredCapabilities.map((c) => c.id));
  }, [filteredCapabilities]);

  // Determine active node for highlighting and relationship focus
  const activeFocusId = hoveredNodeId || activeSelectedNode?.id || selectedCapabilityId;

  const connectedIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const node = CAPABILITIES.find((c) => c.id === activeFocusId);
    if (!node) return new Set<string>();
    const set = new Set<string>([activeFocusId, ...node.relatedNodeIds]);
    // Also add any node that connects back to this node
    CAPABILITIES.forEach((c) => {
      if (c.relatedNodeIds.includes(activeFocusId)) {
        set.add(c.id);
      }
    });
    return set;
  }, [activeFocusId]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedStatus !== 'all';

  // Zoom and Pan controls
  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.8, +(z + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.6, +(z - 0.15).toFixed(2)));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Node click handler
  const handleNodeClick = (node: CapabilityNode) => {
    setActiveSelectedNode(node);
    setSelectedCapabilityId(node.id);
    setIsDetailDrawerOpen(true);
  };

  // Canvas background click (deselects unless dragging)
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'svg') {
      setActiveSelectedNode(null);
    }
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation across nodes
  const handleKeyDownOnNode = (e: React.KeyboardEvent, node: CapabilityNode) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNodeClick(node);
    }
  };

  // Featured 6 capabilities for bottom section
  const featuredSixCapabilities = useMemo(() => {
    return FEATURED_SIX_IDS.map((id) => CAPABILITIES.find((c) => c.id === id)).filter(
      Boolean
    ) as CapabilityNode[];
  }, []);

  const selectedNodeForDrawer = activeSelectedNode || (selectedCapabilityId ? CAPABILITIES.find(c => c.id === selectedCapabilityId) : null) || null;

  return (
    <div className="w-full space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Detail Drawer (Managed centrally) */}
      <DetailDrawer
        node={selectedNodeForDrawer}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onSelectNode={(id) => {
          const nextNode = CAPABILITIES.find((c) => c.id === id);
          if (nextNode) {
            setActiveSelectedNode(nextNode);
            setSelectedCapabilityId(nextNode.id);
          }
        }}
      />

      {/* ========================================================= */}
      {/* 1. MAP HEADER & FILTER TOOLBAR                            */}
      {/* ========================================================= */}
      <div className="rounded-2xl bg-[#0B1020] border border-slate-800/90 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute top-0 end-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isArabic ? 'الخريطة المعمارية الحية' : 'Living System Map'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              {isArabic ? 'خريطة Claude Code' : 'Claude Code Capability Map'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {isArabic
                ? 'استكشف كيف تترابط النماذج والذاكرة والتعليمات والوكلاء والأتمتة داخل منظومة عمل واحدة.'
                : 'Explore how models, memory, instructions, subagents, and tools interlock within a single unified developer workflow.'}
            </p>
          </div>

          {/* User's Path Quick Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              id="open-mypath-top-btn"
              onClick={() => setIsLearningPathModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/50 text-purple-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>{isArabic ? 'مساري التعليمي' : 'My Learning Path'}</span>
              <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                {learningPathCapabilityIds.length}
              </span>
            </button>
          </div>
        </div>

        {/* Search, Filters, and Visible Counter */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="capability-map-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isArabic ? 'ابحث عن قدرة أو مفهوم...' : 'Search capability or concept...'}
                className="w-full bg-[#080D1A] border border-slate-800 hover:border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl ps-10 pe-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <select
                id="difficulty-filter-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="bg-[#080D1A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:border-purple-500 cursor-pointer"
                aria-label={isArabic ? 'تصفية حسب المستوى' : 'Filter by difficulty'}
              >
                <option value="all">{isArabic ? 'كل المستويات' : 'All Levels'}</option>
                <option value="beginner">{isArabic ? 'مبتدئ (Beginner)' : 'Beginner'}</option>
                <option value="intermediate">{isArabic ? 'متوسط (Intermediate)' : 'Intermediate'}</option>
                <option value="advanced">{isArabic ? 'متقدم (Advanced)' : 'Advanced'}</option>
                <option value="expert">{isArabic ? 'خبير (Expert)' : 'Expert'}</option>
              </select>

              {/* Status Filter (Official / Educational / Template) */}
              <select
                id="status-filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="bg-[#080D1A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:border-purple-500 cursor-pointer"
                aria-label={isArabic ? 'تصفية حسب المصداقية' : 'Filter by status'}
              >
                <option value="all">{isArabic ? 'كل الحالات' : 'All Statuses'}</option>
                <option value="official">{isArabic ? 'مفهوم رسمي فقط' : 'Official Core'}</option>
                <option value="educational">{isArabic ? 'دليل تعليمي' : 'Educational Guide'}</option>
                <option value="template">{isArabic ? 'قالب مقترح' : 'Template'}</option>
              </select>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  type="button"
                  id="reset-filters-btn"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'إعادة ضبط' : 'Reset'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips & Visible Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedCategory === 'all'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isArabic ? 'كافة المجموعات' : 'All Categories'}
              </button>

              {(['core', 'memory_context', 'automation', 'tools_integrations', 'workflows', 'governance_safety'] as CapabilityCategory[]).map(
                (catKey) => {
                  const cat = CATEGORIES[catKey];
                  const isSelected = selectedCategory === catKey;
                  return (
                    <button
                      key={catKey}
                      type="button"
                      onClick={() => setSelectedCategory(isSelected ? 'all' : catKey)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                        isSelected
                          ? 'text-white shadow-sm'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${cat.color}25` : undefined,
                        borderColor: isSelected ? cat.color : undefined,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span>{isArabic ? cat.name.ar : cat.name.en}</span>
                    </button>
                  );
                }
              )}
            </div>

            {/* Visible Capabilities Counter */}
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {isArabic
                  ? `عرض ${filteredCapabilities.length} من أصل ${CAPABILITIES.length} قدرة`
                  : `Showing ${filteredCapabilities.length} of ${CAPABILITIES.length} nodes`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CATEGORY LEGEND BAR                                     */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1 text-xs">
        <span className="text-slate-400 font-mono font-semibold shrink-0">
          {isArabic ? 'دليل الألوان:' : 'Legend:'}
        </span>
        {[
          { key: 'core', labelAr: 'Core (النواة)', labelEn: 'Core', color: '#3B82F6' },
          { key: 'memory_context', labelAr: 'Memory (الذاكرة)', labelEn: 'Memory', color: '#F59E0B' },
          { key: 'automation', labelAr: 'Automation (الأتمتة)', labelEn: 'Automation', color: '#A855F7' },
          { key: 'tools_integrations', labelAr: 'Tools (الأدوات)', labelEn: 'Tools', color: '#06B6D4' },
          { key: 'workflows', labelAr: 'Workflows (التشغيل)', labelEn: 'Workflows', color: '#10B981' },
          { key: 'governance_safety', labelAr: 'Security (الأمان)', labelEn: 'Security', color: '#EF4444' },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() =>
              setSelectedCategory(selectedCategory === item.key ? 'all' : (item.key as any))
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium shrink-0 transition-colors cursor-pointer ${
              selectedCategory === item.key
                ? 'bg-slate-800 text-white'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{isArabic ? item.labelAr : item.labelEn}</span>
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 3. DESKTOP INTERACTIVE RADIAL MAP (Hidden on small mobile) */}
      {/* ========================================================= */}
      <div className="hidden md:block relative rounded-2xl bg-[#060A14] border border-slate-800/90 overflow-hidden shadow-2xl">
        {/* Map Interactive Canvas Toolbar */}
        <div className="absolute top-4 start-4 z-20 flex items-center gap-2 bg-[#0B1020]/90 backdrop-blur-md border border-slate-800 rounded-xl p-1.5 shadow-lg">
          <button
            type="button"
            id="map-zoom-in-btn"
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isArabic ? 'تكبير (+)' : 'Zoom In'}
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            id="map-zoom-out-btn"
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isArabic ? 'تصغير (-)' : 'Zoom Out'}
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            id="map-reset-zoom-btn"
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer font-mono text-[11px]"
            title={isArabic ? 'إعادة التوسيط (100%)' : 'Reset Canvas'}
            aria-label="Reset Zoom"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-slate-800 mx-1" />

          {/* Show relationships toggle */}
          <button
            type="button"
            id="toggle-relationships-btn"
            onClick={() => setShowRelationships((r) => !r)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              showRelationships
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title={isArabic ? 'تبديل إظهار الروابط البينية' : 'Toggle Cross-links'}
          >
            {showRelationships ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{isArabic ? 'الروابط' : 'Links'}</span>
          </button>

          {/* Focus mode toggle */}
          <button
            type="button"
            id="toggle-focus-mode-btn"
            onClick={() => setFocusMode((f) => !f)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              focusMode
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title={isArabic ? 'وضع التركيز (يعزل العقدة المحددة)' : 'Focus Mode'}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{isArabic ? 'وضع التركيز' : 'Focus Mode'}</span>
          </button>
        </div>

        {/* Hover/Selection Status Bar on bottom-start */}
        <div className="absolute bottom-4 start-4 z-20 pointer-events-none">
          {activeFocusId ? (
            (() => {
              const focusedNode = CAPABILITIES.find((c) => c.id === activeFocusId);
              if (!focusedNode) return null;
              const cat = CATEGORIES[focusedNode.category] || CATEGORIES.core;
              return (
                <div className="bg-[#0B1020]/95 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-xl max-w-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-xs font-bold text-white">
                      {isArabic ? focusedNode.name.ar : focusedNode.name.en}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {focusedNode.name.en}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1">
                    {isArabic ? focusedNode.tagline.ar : focusedNode.tagline.en}
                  </p>
                  <p className="text-[10px] text-purple-400 mt-1 flex items-center gap-1">
                    <span>{isArabic ? 'انقر لفتح الدرج المعماري الكامل' : 'Click to inspect node details'}</span>
                  </p>
                </div>
              );
            })()
          ) : (
            <div className="bg-[#0B1020]/80 backdrop-blur-md border border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-400">
              {isArabic
                ? 'مرر على أي قدرة لإظهار علاقاتها، أو انقر لفتح تفاصيلها'
                : 'Hover to trace dependencies, click to open details'}
            </div>
          )}
        </div>

        {/* SVG Graphic Canvas */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleBackgroundClick}
          className={`w-full overflow-hidden select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ height: fullPageView ? '820px' : '720px' }}
        >
          <svg
            viewBox="0 0 1200 960"
            className="w-full h-full"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: '50% 50%',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            <defs>
              {/* Radial Gradients for Central Node */}
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0B1020" stopOpacity="0" />
              </radialGradient>

              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Animated dash pattern for active links */}
              <pattern
                id="gridPattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.04)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="1200" height="960" fill="url(#gridPattern)" />

            {/* Concentric Orbital Boundary Rings */}
            <circle
              cx="600"
              cy="480"
              r="175"
              fill="none"
              stroke="rgba(59, 130, 246, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle
              cx="600"
              cy="480"
              r="310"
              fill="none"
              stroke="rgba(168, 85, 247, 0.1)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
            <circle
              cx="600"
              cy="480"
              r="430"
              fill="none"
              stroke="rgba(148, 163, 184, 0.06)"
              strokeWidth="1"
              strokeDasharray="8 10"
            />

            {/* Central Glow Field */}
            <circle cx="600" cy="480" r="190" fill="url(#centerGlow)" pointerEvents="none" />

            {/* ========================================================= */}
            {/* CONNECTION LINES (FROM CENTER & INTER-NODE RELATIONSHIPS) */}
            {/* ========================================================= */}
            <g className="connections-layer">
              {CAPABILITIES.map((node) => {
                const nodeCoord = NODE_COORDINATES[node.id];
                if (!nodeCoord) return null;

                const isNodeVisible = visibleIds.has(node.id);
                const isNodeConnected = connectedIds.has(node.id);
                const isCenterConnected = activeFocusId ? connectedIds.has(node.id) : true;

                // Center link
                const centerColor = CATEGORIES[node.category]?.color || '#A855F7';
                const opacity = !isNodeVisible
                  ? 0.08
                  : focusMode
                  ? isNodeConnected
                    ? 0.8
                    : 0.05
                  : activeFocusId
                  ? isNodeConnected
                    ? 0.75
                    : 0.15
                  : 0.35;

                return (
                  <g key={`center-link-${node.id}`}>
                    {/* Line from Central Claude Code to Node */}
                    <path
                      d={`M 600 480 Q ${(600 + nodeCoord.x) / 2} ${(480 + nodeCoord.y) / 2} ${nodeCoord.x} ${nodeCoord.y}`}
                      fill="none"
                      stroke={centerColor}
                      strokeWidth={isNodeConnected && activeFocusId ? 2.5 : 1.2}
                      strokeOpacity={opacity}
                      strokeDasharray={isNodeConnected && activeFocusId ? '4 4' : 'none'}
                      className={isNodeConnected && activeFocusId ? 'animate-pulse' : ''}
                    />

                    {/* Inter-node relationships (if showRelationships is enabled) */}
                    {showRelationships &&
                      node.relatedNodeIds.map((relId) => {
                        const targetCoord = NODE_COORDINATES[relId];
                        if (!targetCoord) return null;

                        // Only draw once (avoid duplicate lines)
                        if (node.id > relId) return null;

                        const isRelConnected =
                          activeFocusId &&
                          (activeFocusId === node.id || activeFocusId === relId);

                        const relOpacity = !isNodeVisible || !visibleIds.has(relId)
                          ? 0.04
                          : focusMode
                          ? isRelConnected
                            ? 0.9
                            : 0.02
                          : activeFocusId
                          ? isRelConnected
                            ? 0.85
                            : 0.1
                          : 0.25;

                        return (
                          <path
                            key={`rel-${node.id}-${relId}`}
                            d={`M ${nodeCoord.x} ${nodeCoord.y} Q ${(nodeCoord.x + targetCoord.x) / 2} ${(nodeCoord.y + targetCoord.y) / 2} ${targetCoord.x} ${targetCoord.y}`}
                            fill="none"
                            stroke={isRelConnected ? '#C084FC' : 'rgba(148, 163, 184, 0.4)'}
                            strokeWidth={isRelConnected ? 2 : 1}
                            strokeOpacity={relOpacity}
                            strokeDasharray="3 3"
                          />
                        );
                      })}
                  </g>
                );
              })}
            </g>

            {/* ========================================================= */}
            {/* CENTRAL NODE: CLAUDE CODE (منظومة العمل الذكي)           */}
            {/* ========================================================= */}
            <g
              id="central-claude-node"
              transform="translate(600, 480)"
              className="cursor-pointer transition-transform duration-300"
              onClick={() => setActiveSelectedNode(null)}
            >
              {/* Animated Outer Pulse Ring */}
              <circle
                r="64"
                fill="none"
                stroke="#A855F7"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                strokeDasharray="5 5"
                className="animate-spin"
                style={{ animationDuration: '30s' }}
              />

              {/* Outer boundary circle */}
              <circle
                r="56"
                fill="#0D1428"
                stroke="url(#centerGlow)"
                strokeWidth="2"
                filter="url(#glowFilter)"
              />
              <circle
                r="52"
                fill="#0B0F1D"
                stroke="#A855F7"
                strokeWidth="2"
                strokeOpacity="0.8"
              />

              {/* Core Icon */}
              <g transform="translate(-16, -34)">
                <Cpu className="w-8 h-8 text-purple-400" />
              </g>

              {/* Central Arabic Label */}
              <text
                y="0"
                textAnchor="middle"
                className="font-heading font-extrabold fill-white text-[15px] tracking-wide"
              >
                Claude Code
              </text>

              {/* Central Tagline */}
              <text
                y="18"
                textAnchor="middle"
                className="fill-purple-300/90 text-[11px] font-medium"
              >
                {isArabic ? 'منظومة العمل الذكي' : 'AI Operating Core'}
              </text>

              {/* Technical Indicator */}
              <text
                y="33"
                textAnchor="middle"
                className="fill-slate-500 font-mono text-[9px]"
              >
                v1.0 • 22 NODES
              </text>
            </g>

            {/* ========================================================= */}
            {/* 22 CAPABILITY NODES                                       */}
            {/* ========================================================= */}
            {CAPABILITIES.map((node) => {
              const coord = NODE_COORDINATES[node.id];
              if (!coord) return null;

              const isVisible = visibleIds.has(node.id);
              const isSelected = selectedCapabilityId === node.id || activeSelectedNode?.id === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isDirectlyConnected = connectedIds.has(node.id);

              // Dimming calculation for focus mode & active states
              const nodeOpacity = !isVisible
                ? 0.15
                : focusMode
                ? isDirectlyConnected
                  ? 1
                  : 0.08
                : activeFocusId
                ? isDirectlyConnected
                  ? 1
                  : 0.28
                : 1;

              const categoryInfo = CATEGORIES[node.category] || CATEGORIES.core;
              const NodeIcon = ICON_MAP[node.iconName] || Cpu;

              return (
                <g
                  key={node.id}
                  id={`map-node-${node.id}`}
                  transform={`translate(${coord.x}, ${coord.y})`}
                  opacity={nodeOpacity}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node);
                  }}
                  onKeyDown={(e) => handleKeyDownOnNode(e, node)}
                  tabIndex={isVisible ? 0 : -1}
                  role="button"
                  aria-label={`${node.name.ar} - ${node.name.en}`}
                  className="cursor-pointer group transition-all duration-200 outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {/* Outer Selection Highlight Glow Ring */}
                  {(isSelected || isHovered) && (
                    <circle
                      r="40"
                      fill="none"
                      stroke={categoryInfo.color}
                      strokeWidth="2"
                      strokeOpacity="0.6"
                      strokeDasharray="4 4"
                      className="animate-spin"
                      style={{ animationDuration: '15s' }}
                    />
                  )}

                  {/* Node Base Circle */}
                  <circle
                    r="32"
                    fill={isSelected ? '#141D35' : '#0B1020'}
                    stroke={categoryInfo.color}
                    strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                    strokeOpacity={isSelected ? 1 : 0.75}
                    filter={isSelected || isHovered ? 'url(#glowFilter)' : undefined}
                    className="transition-all duration-200"
                  />

                  {/* Node Icon Background */}
                  <circle
                    r="20"
                    fill={`${categoryInfo.color}15`}
                  />

                  {/* Node Lucide Icon */}
                  <g transform="translate(-10, -10)" style={{ color: categoryInfo.color }}>
                    <NodeIcon className="w-5 h-5 pointer-events-none" />
                  </g>

                  {/* Node Arabic Label (Below Node) */}
                  <g transform="translate(0, 46)">
                    {/* Background Pill for High Legibility */}
                    <rect
                      x="-65"
                      y="-11"
                      width="130"
                      height="20"
                      rx="6"
                      fill="#070B16"
                      fillOpacity="0.88"
                      stroke={isSelected ? categoryInfo.color : 'rgba(51, 65, 85, 0.7)'}
                      strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      y="3"
                      className={`text-[11px] font-bold pointer-events-none ${
                        isSelected ? 'fill-white' : 'fill-slate-200 group-hover:fill-white'
                      }`}
                    >
                      {isArabic ? node.name.ar : node.name.en}
                    </text>
                  </g>

                  {/* Node English Sub-label */}
                  <text
                    y="67"
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-slate-400 pointer-events-none"
                  >
                    {node.name.en}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MOBILE / VERTICAL ACCORDION CONNECTED SYSTEM VIEW       */}
      {/* ========================================================= */}
      <div className="md:hidden space-y-4">
        {/* Mobile Central Node Pinned Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0B1020] to-blue-950/40 border border-purple-500/30 p-4 text-center shadow-lg">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white font-heading">
            Claude Code
          </h2>
          <p className="text-xs text-purple-300 mt-0.5">
            {isArabic ? 'منظومة العمل الذكي (22 قدرة متصلة)' : 'Autonomous Operating Core'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {isArabic
              ? 'انقر على أي قسم بالأسفل لاستعراض القدرات وفتح تفاصيل المعمارية'
              : 'Tap any section below to inspect nodes'}
          </p>
        </div>

        {/* Categories as Expandable Accordions on Mobile */}
        {(['core', 'memory_context', 'automation', 'tools_integrations', 'workflows', 'governance_safety'] as CapabilityCategory[]).map(
          (catKey) => {
            const cat = CATEGORIES[catKey];
            const catNodes = filteredCapabilities.filter((c) => c.category === catKey);
            const isExpanded = mobileExpandedCat === catKey;

            if (catNodes.length === 0 && searchQuery.trim() !== '') return null;

            return (
              <div
                key={catKey}
                className="rounded-xl bg-[#0B1020] border border-slate-800 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setMobileExpandedCat(isExpanded ? null : catKey)}
                  className="w-full p-3.5 flex items-center justify-between text-start cursor-pointer hover:bg-slate-900/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {isArabic ? cat.name.ar : cat.name.en}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {catNodes.length} {isArabic ? 'قدرات' : 'capabilities'}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-800/60">
                    {catNodes.map((node) => {
                      const NodeIcon = ICON_MAP[node.iconName] || Cpu;
                      const isInPath = learningPathCapabilityIds.includes(node.id);

                      return (
                        <div
                          key={node.id}
                          className="p-3 rounded-xl bg-[#070B16] border border-slate-800 flex items-center justify-between gap-3 active:scale-[0.99] transition-transform"
                        >
                          <div
                            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                            onClick={() => handleNodeClick(node)}
                          >
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                              style={{
                                backgroundColor: `${cat.color}15`,
                                borderColor: `${cat.color}30`,
                                color: cat.color,
                              }}
                            >
                              <NodeIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-white truncate">
                                {isArabic ? node.name.ar : node.name.en}
                              </h4>
                              <p className="text-[11px] text-slate-400 truncate">
                                {node.name.en}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Add to Path Toggle */}
                            <button
                              type="button"
                              onClick={() => toggleLearningPath(node.id)}
                              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                                isInPath
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                              title={isArabic ? 'إضافة إلى مساري' : 'Add to My Path'}
                            >
                              {isInPath ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <PlusCircle className="w-4 h-4" />
                              )}
                            </button>

                            {/* Open Details */}
                            <button
                              type="button"
                              onClick={() => handleNodeClick(node)}
                              className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
                            >
                              {isArabic ? 'تفاصيل' : 'Details'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>

      {/* ========================================================= */}
      {/* 5. EMPTY STATE WHEN NO RESULTS FOUND                       */}
      {/* ========================================================= */}
      {filteredCapabilities.length === 0 && (
        <div className="py-16 px-4 text-center rounded-2xl bg-[#0B1020] border border-slate-800">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            {isArabic ? 'لا توجد قدرات تطابق معايير البحث' : 'No capabilities match your criteria'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            {isArabic
              ? 'جرّب تعديل عبارة البحث أو إزالة المرشحات لاستعراض كامل قدرات منظومة Claude Code.'
              : 'Try clearing your search query or adjusting your filters to see the full capability map.'}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isArabic ? 'إعادة ضبط كافة الفلاتر' : 'Reset All Filters'}</span>
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. "EXPLORE CORE CAPABILITIES" - 6 FEATURED CARDS         */}
      {/* ========================================================= */}
      <div className="pt-6 border-t border-slate-800/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              {isArabic ? 'استكشف القدرات الأساسية' : 'Explore Core Capabilities'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {isArabic
                ? 'الركائز الست الأكثر أهمية وتأثيراً في بناء سير العمل الاحترافي مع Claude Code'
                : 'The six most essential architectural pillars of Claude Code workflows'}
            </p>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSixCapabilities.map((cap) => {
            const cat = CATEGORIES[cap.category] || CATEGORIES.core;
            const NodeIcon = ICON_MAP[cap.iconName] || Cpu;
            const isInPath = learningPathCapabilityIds.includes(cap.id);

            return (
              <div
                key={cap.id}
                id={`featured-card-${cap.id}`}
                className="rounded-2xl bg-[#0B1020] border border-slate-800/90 hover:border-slate-700 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-black/40 group relative overflow-hidden"
              >
                {/* Top color indicator bar */}
                <div
                  className="absolute top-0 inset-x-0 h-1"
                  style={{ backgroundColor: cat.color }}
                />

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        borderColor: `${cat.color}35`,
                        color: cat.color,
                      }}
                    >
                      <NodeIcon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Badge type="difficulty" value={cap.difficulty} size="sm" />
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {cap.estimatedMinutes}m
                      </span>
                    </div>
                  </div>

                  {/* Title & English Name */}
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {isArabic ? cap.name.ar : cap.name.en}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5 mb-2.5">
                    {cap.name.en}
                  </p>

                  {/* One-sentence explanation */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {isArabic ? cap.tagline.ar : cap.tagline.en}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleNodeClick(cap)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-500 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'فتح التفاصيل' : 'Open Details'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleLearningPath(cap.id)}
                    className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer shrink-0 ${
                      isInPath
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={
                      isInPath
                        ? isArabic
                          ? 'مضاف إلى مساري'
                          : 'In My Path'
                        : isArabic
                        ? 'أضف إلى مساري'
                        : 'Add to My Path'
                    }
                  >
                    {isInPath ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <PlusCircle className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
