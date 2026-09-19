import React, { useState } from 'react';
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  FileCode2,
  Clock,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HookScenario {
  id: string;
  name: { ar: string; en: string };
  hookType: 'post-tool' | 'pre-tool';
  triggerEvent: { ar: string; en: string };
  hookAction: { ar: string; en: string };
  scriptExecuted: string;
  expectedOutcome: { ar: string; en: string };
  safetyFallback: { ar: string; en: string };
  whyFastAndDeterministic: { ar: string; en: string };
}

export const HooksTimeline: React.FC = () => {
  const { language } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const scenarios: HookScenario[] = [
    {
      id: 'format-after-edit',
      name: {
        ar: 'تنسيق الملف تلقائياً بعد كل تعديل (Prettier Post-Edit)',
        en: 'Auto-format after file edit (Post-tool)',
      },
      hookType: 'post-tool',
      triggerEvent: {
        ar: 'حدث انتهاء أداة تحرير الملف (Post-Tool: edit_file مكتملة)',
        en: 'File edit completes successfully (Post-tool trigger)',
      },
      hookAction: {
        ar: 'استدعاء خطاف Post-Edit لتنسيق الملف المعدل فوراً',
        en: 'Invoke Post-Edit hook to format modified file',
      },
      scriptExecuted: 'npx prettier --write "src/components/Navbar.tsx"',
      expectedOutcome: {
        ar: 'تنسيق الملف المعني فوراً دون إضاعة توكنات النموذج في ضبط المسافات الفارغة.',
        en: 'Instant code formatting without wasting LLM tokens on indentation.',
      },
      safetyFallback: {
        ar: 'إذا فشل Prettier (خطأ صياغة)، يسجل الخطاف تحذيراً ولا يوقف جلسة العمل (Fail-Safe).',
        en: 'If Prettier fails, log warning and let session continue safely without crashing.',
      },
      whyFastAndDeterministic: {
        ar: 'يعمل في 150ms ولا يتصل بالإنترنت؛ سريع وحتمي ومقتصر على الملف المعدل فقط.',
        en: 'Executes in 150ms locally; no network dependency, deterministic output.',
      },
    },
    {
      id: 'block-forbidden-commands',
      name: {
        ar: 'اعتراض الأوامر الصدفية الخطرة (Pre-Tool Bash Guard)',
        en: 'Intercept dangerous bash commands (Pre-tool)',
      },
      hookType: 'pre-tool',
      triggerEvent: {
        ar: 'طلب تنفيذ أمر bash محتمل الخطورة (Pre-Tool: run_command قبل التشغيل)',
        en: 'Incoming shell command intercepted before execution (Pre-tool)',
      },
      hookAction: {
        ar: 'فحص نص الأمر ضد قائمة الأنماط المحظورة (Blacklist / Regex Guard)',
        en: 'Pattern matching command against forbidden operations blacklist',
      },
      scriptExecuted: 'if [[ "$CMD" =~ rm.*-rf.*|chmod.*777 ]]; then exit 1; fi',
      expectedOutcome: {
        ar: 'اعتراض فوري للأمر الخطر قبل أن يصل لنظام التشغيل وحماية بيانات المطور.',
        en: 'Immediate interception preventing catastrophic file deletion or permission leaks.',
      },
      safetyFallback: {
        ar: 'فشل حتمي فوري بكود خروج (Exit 1) مع رسالة خطأ واضحة تمنع تنفيذ الأمر.',
        en: 'Hard exit code 1 blocking tool launch with explicit remediation message.',
      },
      whyFastAndDeterministic: {
        ar: 'مطابقة Regex بسيطة في الذاكرة تستغرق أقل من 5ms لمنع أي تأخير في الاستجابة.',
        en: 'In-memory regex lookup takes <5ms; zero noticeable lag for the developer.',
      },
    },
    {
      id: 'lint-after-creation',
      name: {
        ar: 'الفحص المصدري الفوري بعد إنشاء ملف (ESLint Post-Create)',
        en: 'Instant lint validation after file creation',
      },
      hookType: 'post-tool',
      triggerEvent: {
        ar: 'تم إنشاء ملف جديد بنجاح (Post-Tool: create_file)',
        en: 'New file successfully written to disk',
      },
      hookAction: {
        ar: 'تشغيل فحص ESLint على الملف الجديد فقط للتأكد من خلوه من الأخطاء القاتلة',
        en: 'Run ESLint on newly created file exclusively',
      },
      scriptExecuted: 'npx eslint --max-warnings 0 "$TARGET_FILE"',
      expectedOutcome: {
        ar: 'اكتشاف أي استيرادات ناقصة أو متغيرات غير معرفة فور كتابة الملف.',
        en: 'Immediate detection of syntax errors or missing imports.',
      },
      safetyFallback: {
        ar: 'إذا ظهرت تحذيرات غير قاتلة، يعود الخطاف بتنبيه ويوجه المساعد لتصحيحها.',
        en: 'If lint fails, returns structural error to orchestrator for auto-healing.',
      },
      whyFastAndDeterministic: {
        ar: 'يفحص ملفاً واحداً محدداً بدلاً من فحص المستودع كاملاً لتفادي الانتظار الطويل.',
        en: 'Targets single modified file instead of whole repo to avoid latency.',
      },
    },
    {
      id: 'trigger-tests-on-logic',
      name: {
        ar: 'تشغيل اختبارات الوحدة عند تعديل منطق العمل (Test-on-Save)',
        en: 'Targeted unit test on logic file change',
      },
      hookType: 'post-tool',
      triggerEvent: {
        ar: 'تعديل ملف يقع داخل مجلد المنطق `src/services/` (Post-Tool)',
        en: 'File modified inside core business logic directory',
      },
      hookAction: {
        ar: 'استهداف وتشغيل ملف الاختبار المقابل له مباشرة فقط',
        en: 'Execute only the associated spec file',
      },
      scriptExecuted: 'npx vitest run "src/services/auth.test.ts"',
      expectedOutcome: {
        ar: 'تأكيد سلامة المنطق وتفادي كسر الميزات القائمة دون إبطاء دورة التطوير.',
        en: 'Guarantees core logic invariants without slowing developer feedback loop.',
      },
      safetyFallback: {
        ar: 'إذا فشل الاختبار، يتلقى المساعد سجل الفشل مباشرة ليعالجه في خطوته التالية.',
        en: 'Test failure feeds stack trace directly to assistant for targeted fixing.',
      },
      whyFastAndDeterministic: {
        ar: 'تشغيل اختبارات الوحدة المحلية الخفيفة (<1s) وليس اختبارات التكامل البطيئة.',
        en: 'Executes fast local unit tests (<1s), never slow end-to-end browser suites.',
      },
    },
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0].id);
  const [activeStage, setActiveStage] = useState<number>(0);

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const stages = [
    {
      step: 1,
      title: { ar: 'الحدث (Event Trigger)', en: 'Event Trigger' },
      detail: currentScenario.triggerEvent,
      icon: Clock,
      color: '#3B82F6',
    },
    {
      step: 2,
      title: {
        ar: currentScenario.hookType === 'pre-tool' ? 'اعتراض Hook (Pre-Tool)' : 'إطلاق Hook (Post-Tool)',
        en: currentScenario.hookType === 'pre-tool' ? 'Pre-Tool Interception' : 'Post-Tool Hook',
      },
      detail: currentScenario.hookAction,
      icon: Anchor,
      color: '#A855F7',
    },
    {
      step: 3,
      title: { ar: 'الإجراء الآلي (Automated Action)', en: 'Script Action' },
      detail: {
        ar: `تنفيذ الأمر الحتمي: \`${currentScenario.scriptExecuted}\``,
        en: `Executing deterministic script: \`${currentScenario.scriptExecuted}\``,
      },
      icon: Terminal,
      color: '#EC4899',
    },
    {
      step: 4,
      title: { ar: 'النتيجة (Outcome)', en: 'Outcome' },
      detail: currentScenario.expectedOutcome,
      icon: CheckCircle2,
      color: '#22C55E',
    },
    {
      step: 5,
      title: { ar: 'الفشل الآمن (Safety & Resilience)', en: 'Safety Check' },
      detail: currentScenario.safetyFallback,
      icon: ShieldAlert,
      color: '#F59E0B',
    },
  ];

  const handleNextStage = () => {
    if (activeStage < stages.length - 1) {
      setActiveStage((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (activeStage > 0) {
      setActiveStage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-[#090E1A] border border-slate-800 rounded-3xl p-5 sm:p-7 lg:p-8 space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Anchor className="w-4 h-4" />
            <span>{isArabic ? 'المخطط الزمني للخطافات Hooks' : 'Hooks Event Timeline'}</span>
            <span className="bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
              {isArabic ? 'أتمتة حدثية - محاكاة فقط' : 'Event-Driven Simulation'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            {isArabic ? 'كيف تعمل الخطافات (Hooks) في دورة الحياة؟' : 'How Lifecycle Hooks Execute'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isArabic
              ? 'تتبع تدفق: حدث ← Hook ← إجراء آلي ← نتيجة ← مراجعة أو فشل آمن.'
              : 'Trace event flow: Trigger → Hook → Script Action → Result → Safety Check.'}
          </p>
        </div>

        {/* Scenario Switcher Dropdown / Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-md">
          {scenarios.map((sc) => {
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setActiveScenarioId(sc.id);
                  setActiveStage(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {isArabic ? sc.name.ar.split(' (')[0] : sc.name.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Timeline Stepper */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>{isArabic ? 'المراحل الخمس لدورة حياة الـ Hook' : '5 Lifecycle Stages'}</span>
          <span className="text-cyan-400 font-bold">
            {isArabic ? `المرحلة ${activeStage + 1} من ${stages.length}` : `Stage ${activeStage + 1} of ${stages.length}`}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {stages.map((stg, idx) => {
            const isCurrent = idx === activeStage;
            const isPassed = idx < activeStage;
            const StageIcon = stg.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col gap-1.5 ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : isPassed
                    ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                    : 'bg-slate-900/30 border-slate-800/60 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono opacity-70">#{stg.step}</span>
                  <StageIcon className="w-3.5 h-3.5" style={{ color: isCurrent ? '#06B6D4' : isPassed ? '#94A3B8' : '#475569' }} />
                </div>
                <div className="text-[11px] font-bold truncate">
                  {isArabic ? stg.title.ar.split(' (')[0] : stg.title.en}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      {(() => {
        const activeItem = stages[activeStage];
        const ActiveIcon = activeItem.icon;
        return (
          <div className="bg-[#0C1220] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${activeItem.color}20`, color: activeItem.color, border: `1px solid ${activeItem.color}40` }}
                >
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold">
                    {isArabic ? `المرحلة رقم ${activeItem.step}` : `Lifecycle Stage #${activeItem.step}`}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                    {isArabic ? activeItem.title.ar : activeItem.title.en}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${
                  currentScenario.hookType === 'pre-tool'
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                    : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300'
                }`}>
                  {currentScenario.hookType.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Main Stage Explanation */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isArabic ? activeItem.detail.ar : activeItem.detail.en}
            </div>

            {/* Script Execution Terminal View */}
            <div className="p-3.5 bg-[#080D18] rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1.5 border-b border-slate-800/80">
                <span className="flex items-center gap-1 text-slate-400">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>.claude/hooks/lifecycle.sh</span>
                </span>
                <span className="text-slate-500 font-mono">deterministic &lt; 200ms</span>
              </div>
              <div className="text-cyan-300 py-1 font-mono text-xs">
                $ {currentScenario.scriptExecuted}
              </div>
            </div>

            {/* Technical Requirement Box */}
            <div className="p-3.5 rounded-xl bg-purple-950/15 border border-purple-500/25 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-purple-200 leading-relaxed">
                <strong className="text-purple-300 ml-1">
                  {isArabic ? 'لماذا يجب أن يكون سريعاً وحتمياً؟' : 'Why Fast & Deterministic?'}
                </strong>
                {isArabic ? currentScenario.whyFastAndDeterministic.ar : currentScenario.whyFastAndDeterministic.en}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Stepper Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => setActiveStage(0)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isArabic ? 'البداية' : 'Start'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={activeStage === 0}
            onClick={handlePrevStage}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeStage === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            {isArabic ? 'المرحلة السابقة' : 'Previous'}
          </button>

          {activeStage < stages.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStage}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'المرحلة التالية' : 'Next Stage'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveStage(0)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isArabic ? 'اكتمل المخطط الزمني' : 'Timeline Completed'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Architectural Guidance Box (When to use & When NOT to use) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/25 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isArabic ? 'متى تستخدم Hooks؟' : 'When to use Hooks?'}</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
            <li>{isArabic ? 'تنسيق الملفات تلقائياً (Format on Save)' : 'Format files automatically on save'}</li>
            <li>{isArabic ? 'اعتراض الأوامر التدميرية قبل تشغيلها في الطرفية' : 'Block destructive CLI commands before execution'}</li>
            <li>{isArabic ? 'فحص ESLint أو Typescript السريع للملفات المعدلة' : 'Targeted linting on modified files'}</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/15 border border-rose-500/25 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>{isArabic ? 'متى لا تستخدم Hooks أبداً؟' : 'When NOT to use Hooks?'}</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
            <li>{isArabic ? 'لا تشغل مهام طويلة أو شبكية تستغرق ثوانٍ' : 'Never run slow network tasks taking seconds'}</li>
            <li>{isArabic ? 'لا تستخدمها لتوليد نصوص ذكاء اصطناعي تفاعلية' : 'Do not generate AI text inside deterministic hooks'}</li>
            <li>{isArabic ? 'لا تستخدمها للمهام التي تحتاج قراراً بشرياً (استخدم Commands)' : 'Do not use for intentional human choices (use commands)'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
