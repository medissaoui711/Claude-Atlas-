import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  Share2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronLeft,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  Code2,
  ShieldAlert,
  Bot,
  Anchor,
  SplitSquareVertical,
  Award,
} from 'lucide-react';
import { CapabilityNode } from '../../types';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { Badge } from '../common/Badge';
import { CodeBlock } from '../common/CodeBlock';
import { SubagentSimulation } from '../simulations/SubagentSimulation';
import { HooksTimeline } from '../simulations/HooksTimeline';
import { InteractiveComparisons } from '../comparisons/InteractiveComparisons';

interface CapabilityLessonExperienceProps {
  capability: CapabilityNode;
  onSelectCapability?: (id: string) => void;
  allCapabilities: CapabilityNode[];
}

export const CapabilityLessonExperience: React.FC<CapabilityLessonExperienceProps> = ({
  capability,
  onSelectCapability,
  allCapabilities,
}) => {
  const {
    language,
    bookmarkedCapabilityIds,
    toggleBookmark,
    learningPathCapabilityIds,
    toggleLearningPath,
    completedUnitIds,
    toggleCompleteUnit,
    setSelectedCapabilityId,
    showToast,
  } = useApp();

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Interactive state for exercise and quiz
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Reset quiz/hint state when capability changes
  React.useEffect(() => {
    setShowHint(false);
    setShowSolution(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  }, [capability.id]);

  const isBookmarked = bookmarkedCapabilityIds.includes(capability.id);
  const isInMyPath = learningPathCapabilityIds.includes(capability.id);
  const isCompleted = completedUnitIds.includes(capability.id);

  const catInfo = CATEGORIES[capability.category];
  const relatedNodes = allCapabilities.filter((c) =>
    capability.relatedNodeIds.includes(c.id)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast(isArabic ? 'تم نسخ رابط الدرس' : 'Lesson link copied to clipboard');
  };

  const handleSelectCap = (id: string) => {
    if (onSelectCapability) {
      onSelectCapability(id);
    } else {
      setSelectedCapabilityId(id);
    }
  };

  const currentIndex = allCapabilities.findIndex((c) => c.id === capability.id);
  const prevCap = currentIndex > 0 ? allCapabilities[currentIndex - 1] : null;
  const nextCap = currentIndex < allCapabilities.length - 1 ? allCapabilities[currentIndex + 1] : null;

  return (
    <div className="space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* 1 & 2: Header with English Technical Name & Category Meta */}
      <div className="rounded-3xl bg-[#0B101D] border border-slate-800/90 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge variant="outline" className="border-purple-500/40 text-purple-300 bg-purple-950/30">
              {isArabic ? catInfo.name.ar : catInfo.name.en}
            </Badge>
            <Badge
              variant={
                capability.difficulty === 'beginner'
                  ? 'success'
                  : capability.difficulty === 'intermediate'
                  ? 'info'
                  : capability.difficulty === 'advanced'
                  ? 'warning'
                  : 'danger'
              }
            >
              {capability.difficulty}
            </Badge>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
              {capability.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleCompleteUnit(capability.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isCompleted
                  ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? (isArabic ? 'تمت دراسته' : 'Completed') : (isArabic ? 'تعليم كمكتمل' : 'Mark Complete')}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleLearningPath(capability.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isInMyPath
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 hover:bg-purple-600/30'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white'
              }`}
              title={isInMyPath ? (isArabic ? 'في مسار تعلمي' : 'In My Path') : (isArabic ? 'إضافة لمساري' : 'Add to My Path')}
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => toggleBookmark(capability.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-600/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white'
              }`}
              title={isBookmarked ? (isArabic ? 'محفوظ' : 'Bookmarked') : (isArabic ? 'حفظ' : 'Bookmark')}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isArabic ? 'مشاركة الدرس' : 'Share Lesson'}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title + English Technical Name */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
            {isArabic ? capability.name.ar : capability.name.en}
          </h1>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-mono text-purple-400 font-semibold" dir="ltr">
              [Technical: {capability.name.en}]
            </span>
            <span className="text-xs font-mono text-slate-500" dir="ltr">
              Node ID: {capability.id}
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium leading-relaxed">
            {isArabic ? capability.tagline.ar : capability.tagline.en}
          </p>
        </div>

        <div className="flex items-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800/60">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{capability.estimatedMinutes} {isArabic ? 'دقيقة للدراسة والتطبيق' : 'minutes study'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>{isArabic ? 'درس معتمد في المنظومة' : 'Verified Knowledge Unit'}</span>
          </span>
        </div>
      </div>

      {/* 1. تعريف مبسط (Simplified Definition) */}
      <div className="rounded-2xl bg-[#10172A] border border-slate-800 p-5 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
          <BookOpen className="w-4 h-4" />
          <span>{isArabic ? '1. التعريف الجوهري المبسط' : '1. Simplified Definition'}</span>
        </div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
          {isArabic ? capability.summary.ar : capability.summary.en}
        </p>
      </div>

      {/* 3. لماذا يهم؟ (Why It Matters) */}
      <div className="rounded-2xl bg-[#0D1424] border border-slate-800 p-5 sm:p-6 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-4 h-4" />
          <span>{isArabic ? '3. لماذا يهم في الإنتاج البرمجي؟' : '3. Why It Matters In Production'}</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
          {isArabic ? capability.whyItMatters.ar : capability.whyItMatters.en}
        </p>
      </div>

      {/* 4. كيف يعمل ضمن المنظومة؟ (How It Works in the System) */}
      {capability.howItWorksInSystem && (
        <div className="rounded-2xl bg-[#0C1220] border border-purple-500/20 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>{isArabic ? '4. كيف يعمل ضمن المنظومة؟ (Architecture Mechanism)' : '4. How It Works In The System'}</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {isArabic ? capability.howItWorksInSystem.ar : capability.howItWorksInSystem.en}
          </p>

          {/* Architecture Process Steps if available */}
          {capability.architectureDiagram && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-purple-400 font-bold">{isArabic ? 'المدخلات (Inputs)' : 'Inputs'}</div>
                <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                  {capability.architectureDiagram.inputs.map((inp, i) => (
                    <li key={i} className="truncate">{inp}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">{isArabic ? 'المعالجة (Process)' : 'Processing'}</div>
                <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                  {capability.architectureDiagram.process.map((prc, i) => (
                    <li key={i} className="truncate">{prc}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-emerald-400 font-bold">{isArabic ? 'المخرجات (Outputs)' : 'Outputs'}</div>
                <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                  {capability.architectureDiagram.outputs.map((out, i) => (
                    <li key={i} className="truncate">{out}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5 & 6: متى يستخدم ومتى لا يستخدم؟ (When to Use vs. When NOT to Use) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* When to use */}
        <div className="bg-emerald-950/15 border border-emerald-500/25 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isArabic ? '5. متى يستخدم؟ (When to use)' : '5. When to use'}</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {capability.whenToUse.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When NOT to use */}
        <div className="bg-rose-950/15 border border-rose-500/25 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>{isArabic ? '6. متى لا يستخدم؟ (When NOT to use)' : '6. When NOT to use'}</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {capability.whenNotToUse.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 7. علاقته بالمكونات الأخرى (Relationship with other components) */}
      <div className="rounded-2xl bg-[#090E1A] border border-slate-800 p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
          <Layers className="w-4 h-4" />
          <span>{isArabic ? '7. علاقته بالمكونات والقدرات الأخرى' : '7. Ecosystem Relationships'}</span>
        </div>
        {capability.ecosystemRelation && (
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
            {isArabic ? capability.ecosystemRelation.ar : capability.ecosystemRelation.en}
          </p>
        )}

        {/* Related Nodes Grid */}
        {relatedNodes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {relatedNodes.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => handleSelectCap(rel.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-purple-950/30 border border-slate-800 hover:border-purple-500/40 transition-all text-right cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300">
                    {isArabic ? rel.name.ar : rel.name.en}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono" dir="ltr">
                    {rel.id}
                  </div>
                </div>
                <ArrowIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Simulation Injection for Subagents or Hooks */}
      {capability.id === 'subagents' && (
        <div className="pt-2">
          <SubagentSimulation />
        </div>
      )}
      {capability.id === 'hooks' && (
        <div className="pt-2">
          <HooksTimeline />
        </div>
      )}

      {/* 8. مثال تعليمي (Educational Example) */}
      {capability.codeExample && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Code2 className="w-4 h-4" />
              <span>{isArabic ? '8. مثال تعليمي تطبيقي' : '8. Educational Example'}</span>
            </div>
            <span className="text-xs text-slate-400">
              {capability.codeExample.description}
            </span>
          </div>
          <CodeBlock
            code={capability.codeExample.code}
            language={capability.codeExample.language}
            filename={capability.codeExample.filename}
            id={`lesson-code-${capability.id}`}
            showLineNumbers
          />
        </div>
      )}

      {/* 9. مثال مضاد أو استخدام غير مناسب (Anti-pattern Example) */}
      {capability.antiPatternExample && (
        <div className="rounded-2xl bg-rose-950/15 border border-rose-500/25 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>{isArabic ? '9. مثال مضاد أو استخدام غير مناسب (Anti-Pattern)' : '9. Anti-Pattern Example'}</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-heading">
              {capability.antiPatternExample.title}
            </h4>
            <p className="text-xs text-rose-200/90 mt-1 leading-relaxed">
              {capability.antiPatternExample.description}
            </p>
          </div>
          <CodeBlock
            code={capability.antiPatternExample.code}
            language={capability.antiPatternExample.language || 'text'}
            filename={isArabic ? 'استخدام-خاطئ-تجنبه.txt' : 'anti-pattern-to-avoid.txt'}
            id={`lesson-anti-${capability.id}`}
          />
        </div>
      )}

      {/* 10 & 11: الأخطاء الشائعة وأفضل الممارسات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Common Pitfalls */}
        {capability.commonPitfalls && capability.commonPitfalls.length > 0 && (
          <div className="rounded-2xl bg-amber-950/15 border border-amber-500/25 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>{isArabic ? '10. أخطاء شائعة احذر منها' : '10. Common Pitfalls'}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {capability.commonPitfalls.map((cp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span className="leading-relaxed">{cp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Best Practices */}
        {capability.bestPractices && capability.bestPractices.length > 0 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{isArabic ? '11. أفضل الممارسات المعتمدة' : '11. Best Practices'}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {capability.bestPractices.map((bp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span className="leading-relaxed">{bp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 12. تمرين قصير (Short Exercise) */}
      {capability.exercise && (
        <div className="rounded-2xl bg-[#0E1528] border border-cyan-500/25 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              <HelpCircle className="w-4 h-4" />
              <span>{isArabic ? '12. تمرين عملي قصير' : '12. Practical Exercise'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              >
                {showHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showHint ? (isArabic ? 'إخفاء التلميح' : 'Hide Hint') : (isArabic ? 'إظهار التلميح' : 'Show Hint')}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
              >
                <span>{showSolution ? (isArabic ? 'إخفاء الحل' : 'Hide Solution') : (isArabic ? 'عرض الحل' : 'Show Solution')}</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            {capability.exercise.prompt}
          </p>

          {showHint && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-400 ml-1">{isArabic ? 'تلميح:' : 'Hint:'}</strong>
              {capability.exercise.hint}
            </div>
          )}

          {showSolution && (
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/25 text-xs font-mono space-y-1">
              <div className="text-emerald-400 font-bold">{isArabic ? 'الحل المقترح:' : 'Recommended Solution:'}</div>
              <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed">{capability.exercise.solution}</pre>
            </div>
          )}
        </div>
      )}

      {/* 13. سؤال تحقق (Verification Quiz) */}
      {capability.quiz && (
        <div className="rounded-2xl bg-[#0A1020] border border-purple-500/25 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isArabic ? '13. سؤال تحقق واستيعاب' : '13. Verification Quiz'}</span>
            </div>
            {quizSubmitted && (
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                selectedQuizOption === capability.quiz.correctIndex
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-950 text-rose-300 border border-rose-500/30'
              }`}>
                {selectedQuizOption === capability.quiz.correctIndex
                  ? (isArabic ? 'إجابة صحيحة! ✓' : 'Correct! ✓')
                  : (isArabic ? 'إجابة غير دقيقة' : 'Incorrect')}
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
            {capability.quiz.question}
          </h4>

          <div className="space-y-2">
            {capability.quiz.options.map((opt, idx) => {
              const isSelected = selectedQuizOption === idx;
              const isCorrect = idx === capability.quiz!.correctIndex;
              let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700';

              if (quizSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-purple-950/60 border-purple-500 text-purple-200 font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedQuizOption(idx);
                    setQuizSubmitted(true);
                  }}
                  className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>
                  {quizSubmitted && isCorrect && (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 leading-relaxed">
              <strong className="text-purple-300 ml-1">{isArabic ? 'شرح الإجابة:' : 'Explanation:'}</strong>
              {capability.quiz.explanation}
            </div>
          )}
        </div>
      )}

      {/* 14. الدرس التالي والتنقل (Next Lesson & Navigation) */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
          {isArabic ? '14. خطوتك التالية في المسار' : '14. Next Step in Learning Path'}
        </div>

        {capability.nextStep && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 to-blue-950/20 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-mono mb-1">{isArabic ? 'الدرس المقترح التالي:' : 'Recommended Next Lesson:'}</div>
              <div className="text-base font-bold text-white font-heading">{capability.nextStep.title}</div>
            </div>
            {capability.nextStep.targetCapabilityId && (
              <button
                type="button"
                onClick={() => handleSelectCap(capability.nextStep!.targetCapabilityId!)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer self-start sm:self-auto"
              >
                <span>{capability.nextStep.actionLabel}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Previous / Next Capability Controls */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {prevCap ? (
            <button
              type="button"
              onClick={() => handleSelectCap(prevCap.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              {isArabic ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              <div className="text-right">
                <div className="text-[10px] text-slate-500">{isArabic ? 'الدرس السابق' : 'Previous'}</div>
                <div className="font-semibold">{isArabic ? prevCap.name.ar : prevCap.name.en}</div>
              </div>
            </button>
          ) : <div />}

          {nextCap && (
            <button
              type="button"
              onClick={() => handleSelectCap(nextCap.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <div className="text-left">
                <div className="text-[10px] text-slate-500">{isArabic ? 'الدرس اللاحق' : 'Next'}</div>
                <div className="font-semibold">{isArabic ? nextCap.name.ar : nextCap.name.en}</div>
              </div>
              {isArabic ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
