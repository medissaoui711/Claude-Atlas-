import React, { useState } from 'react';
import {
  Bot,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  FileSearch,
  Send,
  UserCheck,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SimulationStep {
  stepNumber: number;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  icon: React.FC<{ className?: string }>;
  color: string;
  badge: { ar: string; en: string };
  description: { ar: string; en: string };
  orchestratorView: {
    status: { ar: string; en: string };
    contextTokens: string;
    action: { ar: string; en: string };
  };
  subagentView: {
    state: { ar: string; en: string };
    isolatedTokens: string;
    activity: { ar: string; en: string };
  };
  keyInsight: { ar: string; en: string };
  codeSnippet?: {
    filename: string;
    content: string;
  };
}

export const SubagentSimulation: React.FC = () => {
  const { language } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const steps: SimulationStep[] = [
    {
      stepNumber: 1,
      title: {
        ar: '1. المهمة الرئيسية (Main Task)',
        en: '1. Main Task',
      },
      subtitle: {
        ar: 'الطلب الأساسي من المطور في المحادثة الرئيسية',
        en: 'Primary task submitted by the developer',
      },
      icon: Layers,
      color: '#3B82F6',
      badge: { ar: 'المحادثة الأم', en: 'Parent Orchestrator' },
      description: {
        ar: 'طلب المطور: "قم بإجراء تدقيق أمني شامل لكافة نماذج الإدخال في التطبيق (Forms) واكتشف أي ثغرات XSS، ثم جهز تقريراً موجزاً للدمج".',
        en: 'Developer submits: "Perform full security audit across all form inputs for XSS, then prepare an executive summary for PR merge."',
      },
      orchestratorView: {
        status: { ar: 'نشط - يستقبل الطلب ويحلل النطاق', en: 'Active - Parsing scope' },
        contextTokens: '18,400 / 200,000 توكن',
        action: { ar: 'رصد وجود 45 ملف استمارة مختلفة في المشروع', en: 'Detected 45 form files across src/components/' },
      },
      subagentView: {
        state: { ar: 'غير نشط (لم يتم إنشاؤه بعد)', en: 'Inactive (Not spawned yet)' },
        isolatedTokens: '0 توكن',
        activity: { ar: 'في انتظار قرار التفويض من المنسق الرئيسي', en: 'Awaiting delegation decision' },
      },
      keyInsight: {
        ar: 'قراءة 45 ملفاً بالكامل ستستهلك أكثر من 60,000 توكن إضافية وتملأ سياق المحادثة بسجلات طويلة تقلل من تركيز النموذج.',
        en: 'Reading 45 files raw would inject 60,000+ tokens, diluting the parent conversation.',
      },
    },
    {
      stepNumber: 2,
      title: {
        ar: '2. مهمة فرعية متخصصة (Specialized Subtask)',
        en: '2. Specialized Subtask',
      },
      subtitle: {
        ar: 'تفكيك الهدف الكبير إلى مهمة محددة المعالم ومغلقة النطاق',
        en: 'Decomposing large goal into bounded subproblem',
      },
      icon: FileSearch,
      color: '#A855F7',
      badge: { ar: 'تفكيك المهام', en: 'Task Decomposition' },
      description: {
        ar: 'يقوم المنسق الرئيسي بصياغة تفويض دقيق: "افحص مجلد `src/components/forms/` فقط، ابحث عن استخدام `dangerouslySetInnerHTML` أو إدخالات غير مفحوصة عبر Zod، وأعد قائمة بالملفات المصابة فقط".',
        en: 'Orchestrator scopes delegate task: "Scan src/components/forms/ for unescaped HTML or missing Zod schemas. Return only afflicted files."',
      },
      orchestratorView: {
        status: { ar: 'صياغة عقد التفويض ومواصفة المخرجات', en: 'Authoring delegation contract' },
        contextTokens: '19,200 / 200,000 توكن',
        action: { ar: 'تحديد حدود المهمة ومنع التعديل على الملفات', en: 'Freezing scope to read-only inspection' },
      },
      subagentView: {
        state: { ar: 'تهيئة مساحة العمل المعزولة', en: 'Sandbox initializing' },
        isolatedTokens: '0 توكن',
        activity: { ar: 'استقبال عقد المهمة وقواعد الفحص الصارمة', en: 'Ingesting task schema and inspection rules' },
      },
      keyInsight: {
        ar: 'الوكيل الفرعي لا يحتاج كل تاريخ المحادثة السابقة؛ يحتاج فقط إلى الهدف الدقيق وقواعد الفحص المحددة.',
        en: 'Subagent needs zero conversational history; only the laser-focused task prompt and invariants.',
      },
    },
    {
      stepNumber: 3,
      title: {
        ar: '3. قرار التفويض (Decision to Delegate)',
        en: '3. Decision to Delegate',
      },
      subtitle: {
        ar: 'إطلاق الوكيل الفرعي بسياق معزول وحماية المحادثة الأم',
        en: 'Spawning child worker with isolated context window',
      },
      icon: Cpu,
      color: '#EC4899',
      badge: { ar: 'عزل السياق', en: 'Context Isolation' },
      description: {
        ar: 'يقوم Claude Code بإنشاء عملية فرعية (Subagent Instance) بذاكرة منفصلة تماماً تبدأ من الصفر (Clean Context)، مما يحفظ المحادثة الرئيسية نظيفة تماماً.',
        en: 'Claude Code spawns an independent child process with its own empty scratchpad, preventing parent context bloat.',
      },
      orchestratorView: {
        status: { ar: 'في وضع الانتظار (Suspended / Waiting for Worker)', en: 'Suspended - Awaiting child delegate' },
        contextTokens: '19,200 توكن (ثابت دون استهلاك إضافي)',
        action: { ar: 'مراقبة حالة الوكيل وسقف المهلة الزمنية', en: 'Monitoring worker status and timeout limit' },
      },
      subagentView: {
        state: { ar: 'يعمل (Running Isolated Subagent)', en: 'Running Isolated Subagent' },
        isolatedTokens: '1,500 توكن (مبدئية في نافذته الخاصة)',
        activity: { ar: 'بدء قراءة ملفات النماذج وفحص شفرات المصدر', en: 'Reading form component source trees' },
      },
      keyInsight: {
        ar: 'عزل السياق (Context Isolation) هو الركيزة الهندسية الأكثر أهمية: ما يدور داخل الوكيل الفرعي يظل في مساحته الخاصة.',
        en: 'Context isolation guarantees token efficiency: intermediate heavy reads remain inside the sandbox.',
      },
    },
    {
      stepNumber: 4,
      title: {
        ar: '4. السياق المرسل للوكيل (Context Sent to Subagent)',
        en: '4. Context Sent to Subagent',
      },
      subtitle: {
        ar: 'ما يتسلمه الوكيل بدقة وما يتم استبعاده عمداً',
        en: 'Precise payload injected vs. intentionally excluded data',
      },
      icon: Send,
      color: '#14B8A6',
      badge: { ar: 'حمولة السياق', en: 'Context Payload' },
      description: {
        ar: 'يتسلم الوكيل: 1) نص المهمة الأمنية، 2) مسار المجلد المستهدف، 3) قائمة بأنماط الثغرات المطلوبة. ويُستبعد: تاريخ الشات بالكامل، ملفات الذاكرة غير المعنية، وباقي مجلدات المشروع.',
        en: 'Injected: Task prompt, target paths, vulnerability patterns. Excluded: Chat history, irrelevant memory notes, unneeded modules.',
      },
      orchestratorView: {
        status: { ar: 'محمي - لم يستقبل سوى إشعار الانطلاق', en: 'Protected - Minimal handshake' },
        contextTokens: '19,200 توكن',
        action: { ar: 'عدم استقبال تدفق الملفات الـ 45', en: 'Preventing 45-file raw streaming' },
      },
      subagentView: {
        state: { ar: 'يقرأ ويحلل الملفات بالتتابع', en: 'Iterating and analyzing target files' },
        isolatedTokens: '34,800 توكن (مستهلكة فقط في نافذة الوكيل المعزولة)',
        activity: { ar: 'تم فحص 38 من أصل 45 ملف استمارة حتى الآن', en: 'Audited 38 of 45 form files so far' },
      },
      keyInsight: {
        ar: 'لاحظ: استهلك الوكيل 34,800 توكن، لكن المحادثة الرئيسية لم تخسر توكناً واحداً!',
        en: 'Notice: Worker consumed 34,800 tokens, yet main conversation burned 0 tokens!',
      },
    },
    {
      stepNumber: 5,
      title: {
        ar: '5. الصلاحية والمسؤولية الممنوحة (Allowed Responsibility)',
        en: '5. Allowed Responsibility',
      },
      subtitle: {
        ar: 'حدود الأمان الصارمة: قراءة فقط، بدون تعديل أو أوامر خطرة',
        en: 'Strict safety sandbox: read-only, no bash mutations',
      },
      icon: ShieldCheck,
      color: '#F59E0B',
      badge: { ar: 'بوابة الأمان', en: 'Safety Sandbox' },
      description: {
        ar: 'تم تقييد الوكيل بصلاحيات "قراءة وفحص" (Read-Only)؛ لا يمكنه تعديل الملفات مباشرة، ولا يمكنه تشغيل أوامر شبكة أو تعديل قاعدة البيانات دون إذن صريح.',
        en: 'Worker is constrained to Read-Only file inspection; prevented from mutating repo files or network access.',
      },
      orchestratorView: {
        status: { ar: 'يتحكم بحارس الصلاحيات (Permission Gate)', en: 'Governing permission boundaries' },
        contextTokens: '19,200 توكن',
        action: { ar: 'ضمان التزام الوكيل الفرعي بسياسته الأمنية', en: 'Enforcing execution invariants' },
      },
      subagentView: {
        state: { ar: 'أكمل الفحص بنجاح داخل النطاق المصرح', en: 'Completed inspection within sandbox' },
        isolatedTokens: '42,100 توكن (في نافذته الخاصة)',
        activity: { ar: 'تجميع النتائج في ملخص نهائي منظم', en: 'Synthesizing findings into markdown checklist' },
      },
      keyInsight: {
        ar: 'مبدأ الصلاحيات الأقل (Least Privilege): امنح الوكيل الفرعي فقط الأدوات الضرورية لأداء المهمة ولا تمنحه صلاحية التعديل المطلق.',
        en: 'Least privilege: Grant workers only read tools necessary to audit, not blanket mutation powers.',
      },
    },
    {
      stepNumber: 6,
      title: {
        ar: '6. النتيجة المرجعة (Result Returned)',
        en: '6. Result Returned',
      },
      subtitle: {
        ar: 'إعادة ملخص موجز وعالي القيمة وإغلاق نافذة الوكيل',
        en: 'Returning concise executive report and terminating worker',
      },
      icon: CheckCircle2,
      color: '#22C55E',
      badge: { ar: 'تقرير النتائج', en: 'Synthesis Report' },
      description: {
        ar: 'يغلق الوكيل الفرعي نافذته ويتم التخلص من الـ 42,000 توكن، ويعود إلى المنسق الرئيسي بتقرير من 300 توكن فقط يحتوي الخلاصة الدقيقة للثغرات المكتشفة.',
        en: 'Subagent terminates, discarding 42k tokens. It returns a 300-token executive digest highlighting discovered issues.',
      },
      orchestratorView: {
        status: { ar: 'استئناف المحادثة واستلام التقرير النهائي', en: 'Resumed - Ingesting concise briefing' },
        contextTokens: '19,850 / 200,000 توكن (زيادة طفيفة جداً!)',
        action: { ar: 'عرض تقرير التدقيق المنظم على المطور للمراجعة', en: 'Presenting formatted audit table to developer' },
      },
      subagentView: {
        state: { ar: 'تم إنهاء العملية وتفريغ الذاكرة المؤقتة (Terminated)', en: 'Terminated - Memory released' },
        isolatedTokens: '0 توكن نشطة',
        activity: { ar: 'اكتملت المهمة بنجاح وسلمت نتائجها للمنسق', en: 'Task succeeded and handoff complete' },
      },
      keyInsight: {
        ar: 'تم فحص 45 ملفاً بكفاءة تامة وتوفير أكثر من 95% من سياق المحادثة الرئيسي!',
        en: '45 files comprehensively checked, saving 95%+ parent context capacity!',
      },
      codeSnippet: {
        filename: 'reports/security-subagent-summary.md',
        content: `✓ تم فحص 45 مكون استمارة.
• 43 مكوناً يطبق التحقق الآمن عبر Zod.
⚠ رُصد نموذج واحد غير آمن:
  - الملف: src/components/forms/BioInput.tsx:24
  - الثغرة: تمرير نص غير معقم إلى dangerouslySetInnerHTML.
التوصية: استخدام DOMPurify أو استبدال العنصر بنص نقي (Text Node).`,
      },
    },
    {
      stepNumber: 7,
      title: {
        ar: '7. المراجعة البشرية (Human Review Gate)',
        en: '7. Human Review Gate',
      },
      subtitle: {
        ar: 'القرار النهائي في يد المطور قبل تطبيق أي تصحيح',
        en: 'Developer holds ultimate approval before code patch',
      },
      icon: UserCheck,
      color: '#8B5CF6',
      badge: { ar: 'الموافقة البشرية', en: 'Human In The Loop' },
      description: {
        ar: 'يقرأ المطور البشري تقرير الوكيل ويفحص السطر المشار إليه، ثم يقرر بنفسه: "نعم، اعتمد التصحيح واستبدل dangerouslySetInnerHTML". لا يتم لمس الكود إلا بموافقة صريحة.',
        en: 'Developer reviews the targeted finding and approves the precise patch. No code mutated without human confirmation.',
      },
      orchestratorView: {
        status: { ar: 'في انتظار تأكيد المطور البشري', en: 'Awaiting human confirmation' },
        contextTokens: '20,100 توكن',
        action: { ar: 'الاستعداد لتطبيق التعديل المصرح به بدقة', en: 'Ready to apply targeted patch once authorized' },
      },
      subagentView: {
        state: { ar: 'مغلق ومكتمل', en: 'Closed' },
        isolatedTokens: '0 توكن',
        activity: { ar: 'انتهت مهمة الوكيل ولا توجد عمليات معلقة', en: 'No pending background processes' },
      },
      keyInsight: {
        ar: 'الوكلاء الفرعيون مستشارون ومحللون أذكياء، لكن السيادة البرمجية والقرار المعماري يظل دائماً للمطور البشري.',
        en: 'Subagents advise and analyze; final architectural authority remains strictly with the human engineer.',
      },
    },
  ];

  const currentStep = steps[currentStepIndex];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div className="bg-[#090E1A] border border-slate-800 rounded-3xl p-5 sm:p-7 lg:p-8 space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Simulation Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>{isArabic ? 'محاكاة تعليمية تفاعلية' : 'Interactive Educational Simulation'}</span>
            <span className="bg-pink-950/60 border border-pink-500/30 text-pink-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
              {isArabic ? 'تعليمي فقط - لا ينفذ أوامر' : 'Educational Only - No Execution'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            {isArabic ? 'كيف يعمل الوكيل الفرعي؟' : 'How Does a Subagent Work?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {isArabic
              ? 'تتبع خطوة بخطوة كيف يعزل Claude Code المهام الثقيلة ويحمي نافذة السياق من التضخم.'
              : 'Trace step-by-step how Claude Code isolates heavy tasks and guards token capacity.'}
          </p>
        </div>

        {/* Step Counter Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
          <span className="text-pink-400 font-bold">{currentStepIndex + 1}</span>
          <span className="text-slate-600">/</span>
          <span>{steps.length}</span>
        </div>
      </div>

      {/* Progress Dots Track */}
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {steps.map((s, idx) => {
          const isPassed = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentStepIndex(idx)}
              className={`flex-1 h-2 rounded-full transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-pink-500 shadow-md shadow-pink-500/30'
                  : isPassed
                  ? 'bg-purple-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title={isArabic ? s.title.ar : s.title.en}
            />
          );
        })}
      </div>

      {/* Current Step Card */}
      <div className="bg-[#0C1220] border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-6">
        {/* Step Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${currentStep.color}20`, color: currentStep.color, border: `1px solid ${currentStep.color}40` }}
            >
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {isArabic ? currentStep.badge.ar : currentStep.badge.en}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-heading mt-1">
                {isArabic ? currentStep.title.ar : currentStep.title.en}
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic ? currentStep.subtitle.ar : currentStep.subtitle.en}
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {isArabic ? currentStep.description.ar : currentStep.description.en}
        </p>

        {/* Dual Systems Visual Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Orchestrator Parent Box */}
          <div className="p-4 rounded-xl bg-blue-950/15 border border-blue-500/25 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-300 font-mono">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>{isArabic ? 'المنسق الرئيسي (Orchestrator)' : 'Parent Orchestrator'}</span>
              </span>
              <span className="text-[11px] text-blue-400/80">{currentStep.orchestratorView.contextTokens}</span>
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-slate-400 ml-1">{isArabic ? 'الحالة:' : 'Status:'}</strong>
              {currentStep.orchestratorView.status}
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-slate-400 ml-1">{isArabic ? 'الإجراء:' : 'Action:'}</strong>
              {currentStep.orchestratorView.action}
            </div>
          </div>

          {/* Isolated Subagent Box */}
          <div className="p-4 rounded-xl bg-pink-950/15 border border-pink-500/25 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-pink-300 font-mono">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-pink-400" />
                <span>{isArabic ? 'الوكيل الفرعي المعزول (Subagent)' : 'Isolated Subagent'}</span>
              </span>
              <span className="text-[11px] text-pink-400/80">{currentStep.subagentView.isolatedTokens}</span>
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-slate-400 ml-1">{isArabic ? 'الحالة:' : 'State:'}</strong>
              {currentStep.subagentView.state}
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-slate-400 ml-1">{isArabic ? 'النشاط:' : 'Activity:'}</strong>
              {currentStep.subagentView.activity}
            </div>
          </div>
        </div>

        {/* Code / Report snippet if step 6 */}
        {currentStep.codeSnippet && (
          <div className="p-3 bg-[#080D18] rounded-xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-[10px] text-slate-500 pb-1 border-b border-slate-800/80 flex items-center justify-between">
              <span>{currentStep.codeSnippet.filename}</span>
              <span className="text-emerald-400 text-[10px]">{isArabic ? 'موجز معتمد' : 'Verified Digest'}</span>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pt-1">
              {currentStep.codeSnippet.content}
            </pre>
          </div>
        )}

        {/* Key Architectural Takeaway */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-200/95 leading-relaxed">
            <strong className="text-amber-400 ml-1">{isArabic ? 'الفكرة المعمارية:' : 'Architectural Takeaway:'}</strong>
            {isArabic ? currentStep.keyInsight.ar : currentStep.keyInsight.en}
          </p>
        </div>
      </div>

      {/* Simulation Controls Toolbar */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isArabic ? 'إعادة المحاكاة' : 'Restart Simulation'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={handlePrev}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            {isArabic ? 'الخطوة السابقة' : 'Previous Step'}
          </button>

          {currentStepIndex < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'الخطوة التالية' : 'Next Step'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isArabic ? 'اكتملت المحاكاة' : 'Simulation Complete'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
