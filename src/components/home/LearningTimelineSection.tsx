import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LEARNING_PATHS } from '../../data/learningPaths';

export const LearningTimelineSection: React.FC = () => {
  const {
    navigateTo,
    language,
    completedUnitIds,
    toggleCompleteUnit,
  } = useApp();

  const [expandedLevel, setExpandedLevel] = useState<number>(1);
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Calculate overall stats
  const totalUnits = LEARNING_PATHS.reduce((acc, p) => acc + p.units.length, 0);
  const completedCount = completedUnitIds.length;
  const overallProgress = Math.round((completedCount / totalUnits) * 100);

  return (
    <section className="py-16 border-b border-slate-800/60 bg-[#070B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Overall Progress */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" dir={isArabic ? 'rtl' : 'ltr'}>
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-2">
              {isArabic ? 'منهجية التعلم المتدرجة' : 'Step-by-Step Curriculum'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {isArabic ? 'مسارات التعلم من الصفر حتى الاحتراف' : 'Architectural Learning Roadmap'}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              {isArabic
                ? 'خطة تدريبية عملية مقسمة إلى 5 مستويات لنقل مهاراتك من التجربة العشوائية إلى بناء منظومة عمل مؤسسية.'
                : 'A structured 5-tier roadmap taking your engineering team from basic prompts to enterprise governance.'}
            </p>
          </div>

          {/* Progress overview pill */}
          <div className="bg-[#0D1424] border border-slate-800 p-4 rounded-2xl flex items-center gap-4 min-w-[240px]">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.15)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  strokeDashoffset={94.2 - (94.2 * overallProgress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-xs font-bold text-white font-mono">
                {overallProgress}%
              </span>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400">
                {isArabic ? 'إنجاز المنهج الكلي' : 'Overall Progress'}
              </div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">
                {completedCount} / {totalUnits} {isArabic ? 'وحدة مكتملة' : 'units'}
              </div>
            </div>
          </div>
        </div>

        {/* 5 Levels Visual Timeline */}
        <div className="space-y-4" dir={isArabic ? 'rtl' : 'ltr'}>
          {LEARNING_PATHS.map((path) => {
            const isExpanded = expandedLevel === path.level;
            const completedInLevel = path.units.filter((u) => completedUnitIds.includes(u.id)).length;
            const levelPercentage = Math.round((completedInLevel / path.units.length) * 100);

            return (
              <div
                key={path.id}
                className="rounded-2xl bg-[#0D1424] border border-slate-800/80 overflow-hidden transition-all duration-300"
              >
                {/* Level Summary Header Bar */}
                <div
                  onClick={() => setExpandedLevel(isExpanded ? 0 : path.level)}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Level Number Node */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-sm text-white flex-shrink-0 shadow-md"
                      style={{ backgroundColor: path.color }}
                    >
                      L{path.level}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white font-heading">
                          {isArabic ? path.title.ar : path.title.en}
                        </h3>
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${path.color}20`,
                            color: path.color,
                          }}
                        >
                          {isArabic ? path.badge.ar : path.badge.en}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {isArabic ? path.subtitle.ar : path.subtitle.en}
                      </p>
                    </div>
                  </div>

                  {/* Right side stats */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end text-xs text-slate-400 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {path.duration}
                    </span>
                    <span className="font-mono bg-slate-900 px-2 py-1 rounded text-slate-300">
                      {completedInLevel}/{path.units.length} {isArabic ? 'وحدات' : 'units'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Level Units Accordion Content */}
                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-800/80 bg-[#090E1A]/40 space-y-3">
                    <p className="text-xs text-slate-300 py-2 border-b border-slate-800/60 leading-relaxed">
                      {isArabic ? path.description.ar : path.description.en}
                    </p>

                    <div className="space-y-2">
                      {path.units.map((unit) => {
                        const isDone = completedUnitIds.includes(unit.id);
                        return (
                          <div
                            key={unit.id}
                            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                              isDone
                                ? 'bg-emerald-950/10 border-emerald-500/20 text-slate-300'
                                : 'bg-[#0D1424] border-slate-800/80 hover:border-purple-500/40'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                type="button"
                                onClick={() => toggleCompleteUnit(unit.id)}
                                className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer flex-shrink-0"
                                title={isArabic ? 'تغيير حالة الإنجاز' : 'Toggle complete'}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/10" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-600" />
                                )}
                              </button>

                              <div>
                                <h4 className={`text-sm font-semibold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                                  {isArabic ? unit.title.ar : unit.title.en}
                                </h4>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {isArabic ? unit.description.ar : unit.description.en}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="text-[11px] text-slate-500 hidden sm:inline">
                                {unit.durationMinutes} {isArabic ? 'دقيقة' : 'mins'}
                              </span>
                              {unit.capabilityId && (
                                <button
                                  type="button"
                                  onClick={() => navigateTo('capabilities', unit.capabilityId)}
                                  className="flex items-center gap-1 text-xs font-medium text-purple-400 hover:text-purple-300 px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors cursor-pointer"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>{isArabic ? 'عرض الدرس' : 'Lesson'}</span>
                                </button>
                              )}
                            </div>
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

        {/* Link to Full Curriculum Page */}
        <div className="mt-8 text-center" dir={isArabic ? 'rtl' : 'ltr'}>
          <button
            type="button"
            onClick={() => navigateTo('learning-paths')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-purple-950/40"
          >
            <span>{isArabic ? 'استعراض المسارات التعليمية كاملة مع الشهادة' : 'Explore Full Learning Curriculums & Certificates'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
