import React from 'react';
import {
  LayoutDashboard,
  Bookmark,
  CheckCircle2,
  BookOpen,
  FileCode2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAPABILITIES } from '../data/capabilities';
import { TEMPLATES } from '../data/templates';
import { LEARNING_PATHS } from '../data/learningPaths';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';

export const DashboardView: React.FC = () => {
  const {
    language,
    navigateTo,
    bookmarkedCapabilityIds,
    toggleBookmark,
    savedTemplateIds,
    toggleSaveTemplate,
    completedUnitIds,
    showToast,
  } = useApp();

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Bookmarked capabilities
  const bookmarkedCaps = CAPABILITIES.filter((c) =>
    bookmarkedCapabilityIds.includes(c.id)
  );

  // Saved templates
  const savedTemplates = TEMPLATES.filter((t) =>
    savedTemplateIds.includes(t.id)
  );

  // Curriculum progress
  const totalUnits = LEARNING_PATHS.reduce((acc, p) => acc + p.units.length, 0);
  const completedCount = completedUnitIds.length;
  const progressPercent = Math.round((completedCount / totalUnits) * 100);

  // Next recommended capability
  const nextRecommendedCap = CAPABILITIES.find(
    (c) => !completedUnitIds.includes(c.id)
  ) || CAPABILITIES[0];

  const handleClearProgress = () => {
    if (window.confirm(isArabic ? 'هل أنت متأكد من رغبتك بإعادة ضبط تقدمك؟' : 'Reset progress?')) {
      localStorage.removeItem('cfw_completed_units');
      localStorage.removeItem('cfw_bookmarks');
      localStorage.removeItem('cfw_saved_templates');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <Breadcrumbs
        items={[
          { label: isArabic ? 'لوحة المتابعة الشخصية' : 'Personal Dashboard', active: true },
        ]}
      />

      {/* Page Header */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2">
            {isArabic ? 'متابعة التعلم والمفضلة' : 'Learning Portfolio'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {isArabic ? 'لوحة الإنجاز والمعرفة الشخصية' : 'Knowledge Dashboard'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {isArabic
              ? 'تتبع تقدمك في المنهج المعماري لمنظومة Claude Code واحتفظ بدروسك وقوالبك المفضلة.'
              : 'Track your architectural progress and access your saved recipes.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearProgress}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-red-500/30 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isArabic ? 'إعادة ضبط التقدم' : 'Reset Progress'}</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Progress Card */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">
              {isArabic ? 'المنهج المعماري المكتمل' : 'Curriculum Completed'}
            </div>
            <div className="text-3xl font-extrabold text-white font-heading">
              {progressPercent}%
            </div>
            <div className="text-xs text-purple-400 font-mono mt-1">
              {completedCount} / {totalUnits} {isArabic ? 'وحدات معتمدة' : 'units'}
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>

        {/* Bookmarks Card */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">
              {isArabic ? 'القدرات المحفوظة' : 'Bookmarked Nodes'}
            </div>
            <div className="text-3xl font-extrabold text-white font-heading">
              {bookmarkedCaps.length}
            </div>
            <div className="text-xs text-amber-400 font-mono mt-1">
              {isArabic ? 'جاهزة للمراجعة' : 'Ready for review'}
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Bookmark className="w-8 h-8 fill-current" />
          </div>
        </div>

        {/* Saved Templates Card */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">
              {isArabic ? 'القوالب المحفوظة' : 'Saved Templates'}
            </div>
            <div className="text-3xl font-extrabold text-white font-heading">
              {savedTemplates.length}
            </div>
            <div className="text-xs text-emerald-400 font-mono mt-1">
              {isArabic ? 'جاهزة للمشاريع' : 'Ready for production'}
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileCode2 className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Recommended Next Step Box */}
      <div className="bg-gradient-to-r from-purple-950/30 to-blue-950/20 border border-purple-500/30 rounded-3xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الخطوة التالية الموصى بها' : 'Next Recommended Step'}</span>
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            {isArabic ? nextRecommendedCap.name.ar : nextRecommendedCap.name.en}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isArabic ? nextRecommendedCap.tagline.ar : nextRecommendedCap.tagline.en}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('capabilities', nextRecommendedCap.id)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors cursor-pointer flex-shrink-0"
        >
          <span>{isArabic ? 'متابعة الدرس الآن' : 'Continue Lesson'}</span>
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Bookmarked Nodes & Saved Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookmarked Nodes */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400 fill-current" />
              <span>{isArabic ? 'القدرات المحفوظة بالمفضلة' : 'Bookmarked Capabilities'}</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {bookmarkedCaps.length}
            </span>
          </div>

          {bookmarkedCaps.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              {isArabic
                ? 'لم تقم بحفظ أي قدرة في المفضلة بعد. يمكنك الضغط على أيقونة الإشارة المرجعية داخل أي درس لحفظه هنا.'
                : 'No bookmarked nodes yet. Click the bookmark icon in any capability lesson.'}
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedCaps.map((cap) => (
                <div
                  key={cap.id}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-purple-500/40 transition-colors"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {isArabic ? cap.name.ar : cap.name.en}
                    </h3>
                    <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {isArabic ? cap.tagline.ar : cap.tagline.en}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => navigateTo('capabilities', cap.id)}
                      className="p-2 rounded-lg bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 text-xs transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(cap.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Templates */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              <span>{isArabic ? 'القوالب المحفوظة' : 'Saved Templates'}</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {savedTemplates.length}
            </span>
          </div>

          {savedTemplates.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              {isArabic
                ? 'لم تحفظ أي قوالب بعد. استعرض قسم القوالب العملية واحفظ الملفات التي تناسب مشاريعك.'
                : 'No saved templates yet. Browse templates and save your favorites.'}
            </div>
          ) : (
            <div className="space-y-3">
              {savedTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {isArabic ? tpl.title.ar : tpl.title.en}
                    </h3>
                    <div className="text-xs font-mono text-purple-400 truncate mt-0.5" dir="ltr">
                      {tpl.filename}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(tpl.content);
                        showToast(isArabic ? 'تم نسخ القالب' : 'Template copied');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {isArabic ? 'نسخ' : 'Copy'}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSaveTemplate(tpl.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 text-xs transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
