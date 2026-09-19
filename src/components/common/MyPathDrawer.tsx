import React from 'react';
import {
  X,
  GraduationCap,
  Trash2,
  BookOpen,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAPABILITIES } from '../../data/capabilities';
import { CATEGORIES } from '../../data/categories';

export const MyPathDrawer: React.FC = () => {
  const {
    isLearningPathModalOpen,
    setIsLearningPathModalOpen,
    learningPathCapabilityIds,
    removeFromLearningPath,
    completedUnitIds,
    toggleCompleteUnit,
    navigateTo,
    selectAndOpenCapability,
    language,
  } = useApp();

  if (!isLearningPathModalOpen) return null;

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const pathCapabilities = CAPABILITIES.filter((c) =>
    learningPathCapabilityIds.includes(c.id)
  );

  // Calculate completed count based on completed units or marked completed
  const completedCount = pathCapabilities.filter((c) =>
    completedUnitIds.includes(c.id)
  ).length;

  const totalCount = pathCapabilities.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Next capability to learn
  const nextCapability = pathCapabilities.find(
    (c) => !completedUnitIds.includes(c.id)
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mypath-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsLearningPathModalOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 end-0 max-w-full flex w-full sm:w-auto"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="w-full sm:w-[480px] bg-[#0B1020] border-s border-purple-500/30 shadow-2xl flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-slate-800/80 bg-[#070B16] sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="mypath-title"
                  className="text-base sm:text-lg font-bold text-white font-heading"
                >
                  {isArabic ? 'مساري التعليمي المخصص' : 'My Learning Path'}
                </h2>
                <p className="text-xs text-slate-400">
                  {totalCount}{' '}
                  {isArabic ? 'قدرات ومفاهيم محددة' : 'selected capabilities'}
                </p>
              </div>
            </div>

            <button
              type="button"
              id="close-mypath-drawer-btn"
              onClick={() => setIsLearningPathModalOpen(false)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
              aria-label={isArabic ? 'إغلاق' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Overview Card */}
          <div className="p-5 bg-purple-950/20 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{isArabic ? 'نسبة الإنجاز في مسارك' : 'Path Completion'}</span>
              </span>
              <span className="font-mono font-bold text-purple-300">
                {progressPercent}% ({completedCount}/{totalCount})
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Quick Action: Continue Learning */}
            {nextCapability && (
              <button
                type="button"
                id="continue-learning-btn"
                onClick={() => {
                  navigateTo('capabilities', nextCapability.id);
                  setIsLearningPathModalOpen(false);
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {isArabic
                    ? `واصل التعلم: ${nextCapability.name.ar}`
                    : `Continue: ${nextCapability.name.en}`}
                </span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Items List / Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
            {totalCount === 0 ? (
              <div className="py-12 px-4 text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {isArabic ? 'مسارك فارغ حالياً' : 'Your path is empty'}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  {isArabic
                    ? 'لم تقم بإضافة أي قدرة إلى مسارك بعد. استكشف خريطة القدرات واضغط على "أضف إلى مساري" لتخصيص خطتك.'
                    : 'You haven’t added any capabilities yet. Explore the map and click "Add to My Path" on any node.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigateTo('map');
                    setIsLearningPathModalOpen(false);
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer border border-slate-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>{isArabic ? 'استكشف الخريطة الآن' : 'Explore Capability Map'}</span>
                </button>
              </div>
            ) : (
              pathCapabilities.map((cap) => {
                const isCompleted = completedUnitIds.includes(cap.id);
                const category = CATEGORIES[cap.category] || CATEGORIES.core;

                return (
                  <div
                    key={cap.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isCompleted
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-85'
                        : 'bg-[#0E1528] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Toggle completed button */}
                    <button
                      type="button"
                      onClick={() => toggleCompleteUnit(cap.id)}
                      className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                      title={
                        isCompleted
                          ? isArabic
                            ? 'إلغاء التحديد'
                            : 'Mark incomplete'
                          : isArabic
                          ? 'تحديد كمكتمل'
                          : 'Mark complete'
                      }
                      aria-label="Toggle completed"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    {/* Info */}
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => {
                        selectAndOpenCapability(cap.id);
                        setIsLearningPathModalOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold truncate ${
                            isCompleted ? 'line-through text-slate-400' : 'text-white'
                          }`}
                        >
                          {isArabic ? cap.name.ar : cap.name.en}
                        </span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded border"
                          style={{
                            backgroundColor: `${category.color}15`,
                            borderColor: `${category.color}35`,
                            color: category.color,
                          }}
                        >
                          {isArabic ? category.name.ar : category.name.en}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {cap.estimatedMinutes} {isArabic ? 'دقيقة' : 'mins'}
                        </span>
                        <span>•</span>
                        <span className="truncate">{cap.name.en}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          navigateTo('capabilities', cap.id);
                          setIsLearningPathModalOpen(false);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-600 hover:text-white text-slate-400 transition-colors cursor-pointer"
                        title={isArabic ? 'عرض الدرس' : 'View lesson'}
                        aria-label="View lesson"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromLearningPath(cap.id)}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-red-500/20 hover:text-red-400 text-slate-500 transition-colors cursor-pointer"
                        title={isArabic ? 'إزالة من المسار' : 'Remove from path'}
                        aria-label="Remove from path"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800/90 bg-[#070B16] text-xs text-slate-400 flex items-center justify-between">
            <span>{isArabic ? 'يتم حفظ مسارك محلياً في متصفحك' : 'Saved locally in your browser'}</span>
            <button
              type="button"
              onClick={() => {
                navigateTo('learning-paths');
                setIsLearningPathModalOpen(false);
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
            >
              {isArabic ? 'استعراض المسارات المعتمدة' : 'Browse Standard Paths'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
