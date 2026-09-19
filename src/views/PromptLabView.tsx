import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Sliders,
  Terminal,
  Copy,
  Check,
  Zap,
  CheckCircle2,
  Lightbulb,
  Cpu,
  Brain,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface PromptPattern {
  id: string;
  name: { ar: string; en: string };
  category: string;
  purpose: { ar: string; en: string };
  baseTemplate: string;
  recommendedBudget: number;
  bestFor: string[];
  whyItWorks: { ar: string; en: string };
}

const PROMPT_PATTERNS: PromptPattern[] = [
  {
    id: 'arch-audit',
    name: {
      ar: 'التدقيق المعماري ورصد انحراف الكود (System Drift)',
      en: 'Architectural Audit & System Drift Detection',
    },
    category: 'Architecture',
    purpose: {
      ar: 'مراجعة التغييرات الأخيرة ومطابقتها مع دستور CLAUDE.md لمنع الانحراف التقني.',
      en: 'Review git changes against CLAUDE.md to eliminate architectural drift.',
    },
    baseTemplate: `Inspect recent git changes against the architectural constraints in CLAUDE.md.
Identify:
1. Any violations of component boundaries or layering.
2. Unnecessary dependencies or bloated patterns introduced.
3. Untyped variables or loose TypeScript assertions.
Provide a concise prioritized list of corrections before proceeding.`,
    recommendedBudget: 8000,
    bestFor: ['Pre-PR Reviews', 'Code Quality Gateways', 'Architecture Governance'],
    whyItWorks: {
      ar: 'يربط التعليمات مباشرة بملف الدستور ويجبر الموديل على استخراج نقاط الضعف قبل لمس أي ملف كود.',
      en: 'Enforces CLAUDE.md grounding and obligates the model to plan audit steps prior to any edits.',
    },
  },
  {
    id: 'zero-regression-refactor',
    name: {
      ar: 'إعادة الهيكلة المحمية بدون ارتدادات (Zero-Regression Refactor)',
      en: 'Zero-Regression Constrained Refactoring',
    },
    category: 'Refactoring',
    purpose: {
      ar: 'تعديل وتحديث وظيفة معينة مع حظر المساس بالواجهات الخارجية أو التسبب بكسر التوافق.',
      en: 'Refactor complex internal logic while keeping public API surfaces immutable.',
    },
    baseTemplate: `Refactor the implementation of [TARGET_FUNCTION_OR_MODULE] to improve performance and readability.
Strict Constraints:
- Public signatures and exported interfaces MUST remain 100% backward compatible.
- Do not modify files outside of [TARGET_PATH].
- Verify that all existing unit tests pass without modifications.`,
    recommendedBudget: 4000,
    bestFor: ['Legacy Code Modernization', 'Performance Optimization', 'Clean Code Iterations'],
    whyItWorks: {
      ar: 'يحدد سقفاً واضحاً للنطاق (Scope Ceiling) ويمنع Claude من تغيير توقيعات الدوال أو العبث بالملفات المجاورة.',
      en: 'Sets hard scope boundaries, preventing speculative changes to surrounding packages.',
    },
  },
  {
    id: 'tdd-cycle',
    name: {
      ar: 'دورة التطوير المبني على الاختبار (TDD Orchestration)',
      en: 'Test-Driven Development (TDD) Loop',
    },
    category: 'Testing',
    purpose: {
      ar: 'كتابة حالات الاختبار الفاشلة أولاً ثم كتابة أقل قدر من الكود اللازم لاجتيازها بنجاح.',
      en: 'Author failing test suites first, then produce minimal implementation code.',
    },
    baseTemplate: `Execute a strict TDD cycle for [FEATURE_DESCRIPTION]:
Step 1: Create unit tests in [TEST_PATH] covering happy path and edge cases. Run tests to verify they fail.
Step 2: Implement the minimal code in [SOURCE_PATH] required to pass all tests.
Step 3: Run the test suite and output test execution results.`,
    recommendedBudget: 6000,
    bestFor: ['New Feature Engineering', 'Bug Reproduction', 'Complex Algorithms'],
    whyItWorks: {
      ar: 'يقسم المهمة إلى مراحل تحقق مستقلة، مما يقلل من احتمالية كتابة كود غير مختبر.',
      en: 'Enforces mechanical verification steps before and after code generation.',
    },
  },
  {
    id: 'context-economic-plan',
    name: {
      ar: 'التخطيط الاقتصادي للسياق (Token-Preserving Multi-File Plan)',
      en: 'Context-Economic Multi-File Planning',
    },
    category: 'Context',
    purpose: {
      ar: 'إنجاز مهام تمتد عبر عدة ملفات مع الحفاظ على مساحة نافذة الـ 200k توكن نظيفة.',
      en: 'Perform cross-cutting repository updates without exhausting the 200k context window.',
    },
    baseTemplate: `We need to update [SYSTEM_MODULE] across multiple files.
To conserve context:
1. Do not print full file dumps in responses.
2. Formulate a 3-step action plan identifying exactly which files need surgical modification.
3. Stop and request confirmation before applying the edits sequentially.`,
    recommendedBudget: 2000,
    bestFor: ['Large Repositories', 'Monorepos', 'Multi-file Renaming'],
    whyItWorks: {
      ar: 'يمنع هدر الـ tokens في طباعة نصوص الملفات الكبيرة في الطرفية، ويحافظ على تركيز التفكير.',
      en: 'Inhibits terminal verbosity, retaining precious context space for reasoning.',
    },
  },
];

export const PromptLabView: React.FC = () => {
  const { language, showToast } = useApp();
  const [selectedPatternId, setSelectedPatternId] = useState(PROMPT_PATTERNS[0].id);
  const [thinkingBudget, setThinkingBudget] = useState(8000);
  const [contextMode, setContextMode] = useState<'focused' | 'git-diff' | 'full'>('focused');
  const [copied, setCopied] = useState(false);

  const isArabic = language === 'ar';

  const pattern = useMemo(
    () => PROMPT_PATTERNS.find((p) => p.id === selectedPatternId) || PROMPT_PATTERNS[0],
    [selectedPatternId]
  );

  const fullPrompt = useMemo(() => {
    let prefix = '';
    if (thinkingBudget > 0) {
      prefix += `[Extended Thinking: Budget ~ ${thinkingBudget} tokens]\n`;
    }
    if (contextMode === 'focused') {
      prefix += `[Context Scope: Read ONLY specified targets]\n\n`;
    } else if (contextMode === 'git-diff') {
      prefix += `[Context Scope: Inspect \`git diff HEAD~1\`]\n\n`;
    } else {
      prefix += `[Context Scope: Full Repository Structure]\n\n`;
    }

    return prefix + pattern.baseTemplate;
  }, [thinkingBudget, contextMode, pattern]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    showToast(isArabic ? 'تم نسخ الموجه بالكامل' : 'Prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <Breadcrumbs
        items={[
          { label: isArabic ? 'مختبر الموجهات (Prompt Lab)' : 'Prompt Engineering Lab', active: true },
        ]}
      />

      {/* Header */}
      <div className="my-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2">
          {isArabic ? 'هندسة الموجهات لمنظومة Claude Code' : 'CLI Prompt Engineering Studio'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          {isArabic ? 'مختبر الموجهات المتقدمة (Prompt Lab)' : 'Advanced Prompt Lab'}
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          {isArabic
            ? 'صيغ موجهات معمارية مختبرة لسطر الأوامر، مصممة لاستغلال ميزة التفكير الممتد (Extended Thinking) والحد من استهلاك السياق.'
            : 'Production-tested prompt architectures engineered for deterministic CLI execution and context efficiency.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pattern List Column */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            {isArabic ? 'الأنماط المعمارية الجاهزة' : 'Architecture Patterns'}
          </div>

          {PROMPT_PATTERNS.map((p) => {
            const isSelected = p.id === selectedPatternId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPatternId(p.id);
                  setThinkingBudget(p.recommendedBudget);
                }}
                className={`w-full p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg'
                    : 'bg-[#0D1424] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    {p.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {p.recommendedBudget} tokens
                  </span>
                </div>
                <div className="text-sm font-bold font-heading mb-1">
                  {isArabic ? p.name.ar : p.name.en}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  {isArabic ? p.purpose.ar : p.purpose.en}
                </div>
              </button>
            );
          })}
        </div>

        {/* Lab Tuning & Code Output Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Parameter Tuning Bar */}
          <div className="bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold font-heading text-sm">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>{isArabic ? 'معايير التحكم بالتنفيذ' : 'Execution Parameters'}</span>
              </div>
              <span className="text-xs font-mono text-purple-400">
                CLAUDE_EXTENDED_THINKING
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Thinking Budget Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isArabic ? 'ميزانية التفكير الممتد' : 'Thinking Budget'}</span>
                  </span>
                  <span className="font-mono text-purple-300 font-bold">
                    {thinkingBudget === 0 ? 'Off (Direct)' : `${thinkingBudget} tokens`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16000"
                  step="2000"
                  value={thinkingBudget}
                  onChange={(e) => setThinkingBudget(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0 (Fast)</span>
                  <span>4k (Balance)</span>
                  <span>16k (Deep Math)</span>
                </div>
              </div>

              {/* Context Scope */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-medium block flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isArabic ? 'نطاق السياق المحدد' : 'Context Scope'}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'focused', label: isArabic ? 'محدد' : 'Focused' },
                    { id: 'git-diff', label: 'Git Diff' },
                    { id: 'full', label: isArabic ? 'المشروع' : 'Full Repo' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setContextMode(mode.id as any)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-medium cursor-pointer transition-colors border ${
                        contextMode === mode.id
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Prompt Code Stage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>{isArabic ? 'الموجه النهائي لسطر الأوامر' : 'CLI Prompt Payload'}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'نسخ الموجه' : 'Copy Prompt'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B16] border border-slate-800 font-mono text-xs text-purple-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                {fullPrompt}
              </div>
            </div>

            {/* Why It Works Breakdown */}
            <div className="rounded-2xl bg-[#121B2F] border border-slate-800 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>{isArabic ? 'تشريح الموجه: لماذا يحقق هذا النمط أفضل النتائج؟' : 'Why this prompt pattern succeeds:'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isArabic ? pattern.whyItWorks.ar : pattern.whyItWorks.en}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {pattern.bestFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
