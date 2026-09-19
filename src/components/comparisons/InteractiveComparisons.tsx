import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, SplitSquareVertical, Sparkles } from 'lucide-react';
import { COMPARISON_TOPICS, ComparisonTopic } from '../../data/comparisons';
import { useApp } from '../../context/AppContext';

interface InteractiveComparisonsProps {
  initialTopicId?: string;
  onSelectCapability?: (id: string) => void;
}

export const InteractiveComparisons: React.FC<InteractiveComparisonsProps> = ({
  initialTopicId = 'memory-vs-claude-md',
  onSelectCapability,
}) => {
  const { language, navigateTo } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [activeTopicId, setActiveTopicId] = useState<string>(initialTopicId);

  const activeTopic: ComparisonTopic =
    COMPARISON_TOPICS.find((t) => t.id === activeTopicId) || COMPARISON_TOPICS[0];

  const handleOpenCapability = (capId: string) => {
    if (onSelectCapability) {
      onSelectCapability(capId);
    } else {
      navigateTo('capabilities', capId);
    }
  };

  return (
    <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <SplitSquareVertical className="w-4 h-4" />
            <span>{isArabic ? 'المقارنات المعمارية المحورية' : 'Architectural Comparisons'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            {isArabic ? activeTopic.title.ar : activeTopic.title.en}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isArabic ? activeTopic.subtitle.ar : activeTopic.subtitle.en}
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {COMPARISON_TOPICS.map((topic) => {
            const isSelected = topic.id === activeTopicId;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopicId(topic.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {isArabic ? topic.title.ar.split(' مقابل ')[0] : topic.title.en.split(' vs. ')[0]}
                <span className="opacity-60 text-[10px] mx-1 font-mono">VS</span>
                {isArabic ? topic.title.ar.split(' مقابل ')[1] : topic.title.en.split(' vs. ')[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Banner */}
      <div className="my-6 p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
          {isArabic ? activeTopic.summary.ar : activeTopic.summary.en}
        </p>
      </div>

      {/* Desktop View: Accessible RTL Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-right border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800">
              <th className="py-3.5 px-4 text-slate-400 font-mono text-xs w-1/4">
                {isArabic ? 'وجه المقارنة' : 'Aspect'}
              </th>
              <th className="py-3.5 px-4 text-purple-300 font-heading font-bold w-[37.5%]">
                <div className="flex items-center justify-between">
                  <span>{isArabic ? activeTopic.itemAName.ar : activeTopic.itemAName.en}</span>
                  <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
                    {isArabic ? activeTopic.itemATag.ar : activeTopic.itemATag.en}
                  </span>
                </div>
              </th>
              <th className="py-3.5 px-4 text-cyan-300 font-heading font-bold w-[37.5%]">
                <div className="flex items-center justify-between">
                  <span>{isArabic ? activeTopic.itemBName.ar : activeTopic.itemBName.en}</span>
                  <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                    {isArabic ? activeTopic.itemBTag.ar : activeTopic.itemBTag.en}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-[#0C1220]">
            {activeTopic.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-medium text-slate-300 bg-slate-900/30 border-l border-slate-800/60">
                  {isArabic ? row.aspect.ar : row.aspect.en}
                </td>
                <td className="py-3.5 px-4 text-slate-200 leading-relaxed">
                  {isArabic ? row.itemA.ar : row.itemA.en}
                </td>
                <td className="py-3.5 px-4 text-slate-200 leading-relaxed bg-cyan-950/5">
                  {isArabic ? row.itemB.ar : row.itemB.en}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Stacked Comparison Cards */}
      <div className="block md:hidden space-y-4">
        {activeTopic.rows.map((row, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-400 font-mono pb-2 border-b border-slate-800">
              {isArabic ? row.aspect.ar : row.aspect.en}
            </div>
            {/* Item A */}
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20">
              <div className="text-[11px] font-bold text-purple-300 mb-1">
                {isArabic ? activeTopic.itemAName.ar : activeTopic.itemAName.en}
              </div>
              <div className="text-xs text-slate-200 leading-relaxed">
                {isArabic ? row.itemA.ar : row.itemA.en}
              </div>
            </div>
            {/* Item B */}
            <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
              <div className="text-[11px] font-bold text-cyan-300 mb-1">
                {isArabic ? activeTopic.itemBName.ar : activeTopic.itemBName.en}
              </div>
              <div className="text-xs text-slate-200 leading-relaxed">
                {isArabic ? row.itemB.ar : row.itemB.en}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation and Quick Actions */}
      <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-emerald-400 font-bold ml-1">{isArabic ? 'خلاصة القرار:' : 'Rule:'}</strong>
            {isArabic ? activeTopic.recommendation.ar : activeTopic.recommendation.en}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          {activeTopic.relatedCapabilities.slice(0, 2).map((capId) => (
            <button
              key={capId}
              type="button"
              onClick={() => handleOpenCapability(capId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-purple-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isArabic ? `درس ${capId}` : `Study ${capId}`}</span>
              <ArrowIcon className="w-3 h-3 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
