import React, { useEffect } from 'react';
import {
  X,
  BookOpen,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Share2,
  Clock,
  Sparkles,
  Copy,
  Check,
  PlusCircle,
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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CapabilityNode } from '../../types';
import { Badge } from '../common/Badge';
import { CodeBlock } from '../common/CodeBlock';
import { CAPABILITIES } from '../../data/capabilities';
import { CATEGORIES } from '../../data/categories';

interface DetailDrawerProps {
  node: CapabilityNode | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectNode?: (id: string) => void;
}

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

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  node,
  isOpen,
  onClose,
  onSelectNode,
}) => {
  const {
    navigateTo,
    language,
    bookmarkedCapabilityIds,
    toggleBookmark,
    learningPathCapabilityIds,
    toggleLearningPath,
    showToast,
  } = useApp();

  const [hasCopiedExample, setHasCopiedExample] = React.useState(false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !node) return null;

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;
  const isBookmarked = bookmarkedCapabilityIds.includes(node.id);
  const isInPath = learningPathCapabilityIds.includes(node.id);
  const categoryInfo = CATEGORIES[node.category] || CATEGORIES.core;

  const NodeIcon = ICON_MAP[node.iconName] || Cpu;

  // Find related nodes
  const relatedNodes = CAPABILITIES.filter((c) => node.relatedNodeIds.includes(c.id));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(isArabic ? 'تم نسخ رابط هذه القدرة' : 'Capability link copied');
    }
  };

  const handleCopyExample = () => {
    if (node.codeExample && navigator.clipboard) {
      navigator.clipboard.writeText(node.codeExample.code);
      setHasCopiedExample(true);
      showToast(isArabic ? 'تم نسخ المثال البرمجي' : 'Example code copied');
      setTimeout(() => setHasCopiedExample(false), 2000);
    }
  };

  const getStatusLabel = () => {
    if (node.status === 'official') {
      return isArabic ? 'مفهوم رسمي' : 'Official Core';
    }
    if (node.status === 'template') {
      return isArabic ? 'قالب مقترح' : 'Suggested Template';
    }
    return isArabic ? 'مثال تعليمي' : 'Educational Guide';
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className="fixed inset-y-0 end-0 max-w-full flex w-full sm:w-auto"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div
          className="w-full sm:w-[560px] md:w-[620px] bg-[#0A0F1D] border-s border-slate-800 shadow-2xl shadow-black/80 flex flex-col h-full overflow-hidden transition-transform duration-300 animate-in slide-in-from-right"
          style={{
            borderInlineStartColor: `${categoryInfo.color}40`,
          }}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800/90 bg-[#070B16]/90 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 mb-4">
              {/* Status & Category Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold border flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${categoryInfo.color}15`,
                    borderColor: `${categoryInfo.color}40`,
                    color: categoryInfo.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: categoryInfo.color }}
                  />
                  {isArabic ? categoryInfo.name.ar : categoryInfo.name.en}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                    node.status === 'official'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : node.status === 'template'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  }`}
                >
                  {getStatusLabel()}
                </span>

                <Badge type="difficulty" value={node.difficulty} size="sm" />
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id="drawer-bookmark-btn"
                  onClick={() => toggleBookmark(node.id)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={isArabic ? 'حفظ في المفضلة' : 'Save bookmark'}
                  aria-label={isArabic ? 'حفظ في المفضلة' : 'Save bookmark'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  id="drawer-share-btn"
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={isArabic ? 'مشاركة الرابط' : 'Share link'}
                  aria-label={isArabic ? 'مشاركة الرابط' : 'Share link'}
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="drawer-close-btn"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                  aria-label={isArabic ? 'إغلاق الدرج' : 'Close drawer'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title & Icon Header */}
            <div className="flex items-start gap-3.5">
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-lg"
                style={{
                  backgroundColor: `${categoryInfo.color}15`,
                  borderColor: `${categoryInfo.color}35`,
                  color: categoryInfo.color,
                }}
              >
                <NodeIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  id="drawer-title"
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug"
                >
                  {isArabic ? node.name.ar : node.name.en}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                    {node.name.en}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {node.estimatedMinutes} {isArabic ? 'دقيقة' : 'mins'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="p-5 sm:p-6 space-y-6 flex-1 overflow-y-auto text-slate-300 text-sm leading-relaxed custom-scrollbar">
            {/* Short Tagline */}
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
              {isArabic ? node.tagline.ar : node.tagline.en}
            </p>

            {/* Definition / Summary */}
            <div className="rounded-xl bg-[#0F172A]/70 border border-slate-800 p-4">
              <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{isArabic ? 'التعريف والهدف المعماري' : 'Architectural Definition'}</span>
              </h3>
              <p className="text-slate-200 leading-relaxed">
                {isArabic ? node.summary.ar : node.summary.en}
              </p>
            </div>

            {/* Why it matters */}
            <div>
              <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{isArabic ? 'لماذا تهم في منظومة العمل؟' : 'Why it matters'}</span>
              </h3>
              <p className="text-slate-300 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                {isArabic ? node.whyItMatters.ar : node.whyItMatters.en}
              </p>
            </div>

            {/* When to use vs when not to use */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{isArabic ? 'متى تستخدمها؟' : 'When to use'}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {node.whenToUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{isArabic ? 'متى لا تستخدمها؟' : 'When not to use'}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {node.whenNotToUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code example & Copy button */}
            {node.codeExample && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider font-mono flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isArabic ? 'مثال عملي أو قالب تشغيل' : 'Practical Example'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleCopyExample}
                    className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    {hasCopiedExample ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isArabic ? 'تم النسخ' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isArabic ? 'نسخ المثال' : 'Copy Example'}</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  {node.codeExample.description}
                </p>
                <CodeBlock
                  code={node.codeExample.code}
                  language={node.codeExample.language}
                  filename={node.codeExample.filename}
                  id={`drawer-code-${node.id}`}
                />
              </div>
            )}

            {/* Related nodes */}
            {relatedNodes.length > 0 && (
              <div>
                <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2.5 font-mono">
                  {isArabic ? 'القدرات والمفاهيم المرتبطة' : 'Related Capabilities'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {relatedNodes.map((rel) => {
                    const RelIcon = ICON_MAP[rel.iconName] || Cpu;
                    const relCategory = CATEGORIES[rel.category] || CATEGORIES.core;
                    return (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => {
                          if (onSelectNode) {
                            onSelectNode(rel.id);
                          } else {
                            navigateTo('capabilities', rel.id);
                            onClose();
                          }
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-colors text-right cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${relCategory.color}15`,
                              color: relCategory.color,
                            }}
                          >
                            <RelIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                            {isArabic ? rel.name.ar : rel.name.en}
                          </span>
                        </div>
                        <ArrowIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#070B16] sticky bottom-0 z-20 flex flex-col sm:flex-row items-center gap-3">
            {/* Add to Learning Path button */}
            <button
              type="button"
              id="drawer-add-to-path-btn"
              onClick={() => toggleLearningPath(node.id)}
              className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                isInPath
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              {isInPath ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isArabic ? 'مضاف إلى مساري' : 'Added to My Path'}</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-purple-400" />
                  <span>{isArabic ? 'أضف إلى مساري' : 'Add to My Path'}</span>
                </>
              )}
            </button>

            {/* Open Full Lesson button */}
            <button
              type="button"
              id="drawer-open-full-lesson-btn"
              onClick={() => {
                navigateTo('capabilities', node.id);
                onClose();
              }}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-950/40 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isArabic ? 'افتح الدرس الكامل' : 'Open Full Lesson'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
