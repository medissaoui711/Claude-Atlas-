export interface ComparisonRow {
  aspect: { ar: string; en: string };
  itemA: { ar: string; en: string };
  itemB: { ar: string; en: string };
  verdict?: { ar: string; en: string };
}

export interface ComparisonTopic {
  id: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  itemAName: { ar: string; en: string };
  itemBName: { ar: string; en: string };
  itemATag: { ar: string; en: string };
  itemBTag: { ar: string; en: string };
  summary: { ar: string; en: string };
  rows: ComparisonRow[];
  recommendation: { ar: string; en: string };
  relatedCapabilities: string[];
}

export const COMPARISON_TOPICS: ComparisonTopic[] = [
  {
    id: 'memory-vs-claude-md',
    title: {
      ar: 'Memory مقابل CLAUDE.md',
      en: 'Memory vs. CLAUDE.md',
    },
    subtitle: {
      ar: 'الفرق الجوهري بين بنك الذاكرة التراكمي ودستور المشروع الصارم',
      en: 'Persistent accumulated memory vs. invariant project constitution',
    },
    itemAName: { ar: 'Memory (بنك الذاكرة)', en: 'Memory Bank' },
    itemBName: { ar: 'CLAUDE.md (الدستور)', en: 'CLAUDE.md' },
    itemATag: { ar: 'حقائق متغيرة تراكمياً', en: 'Accumulated Facts' },
    itemBTag: { ar: 'تعليمات إلزامية ثابتة', en: 'Binding Invariants' },
    summary: {
      ar: 'يُعد CLAUDE.md دستوراً يكتبه المطور لفرض الأوامر والممنوعات، بينما الذاكرة هي بنك حقائق يتعلمه ويديره المساعد أو يدوّن فيه المطور ملاحظات تراكمية.',
      en: 'CLAUDE.md is the binding constitution written by developers, while Memory is an evolving fact store.',
    },
    rows: [
      {
        aspect: { ar: 'الهدف الأساسي (Purpose)', en: 'Primary Purpose' },
        itemA: {
          ar: 'تخزين القرارات المعمارية المستفادة، السياق التاريخي، وتفضيلات المطور عبر الجلسات.',
          en: 'Store learned architecture decisions, project lore, and preferences across sessions.',
        },
        itemB: {
          ar: 'تحديد أوامر البناء والاختبار، معايير الشيفرة، والممنوعات الصارمة الإلزامية.',
          en: 'Define non-negotiable build commands, code formatting rules, and strict boundaries.',
        },
      },
      {
        aspect: { ar: 'من يكتب المعلومات؟ (Who writes)', en: 'Author / Maintainer' },
        itemA: {
          ar: 'Claude Code تلقائياً عبر Auto Memory، أو المطور يدوياً بأمر /memory.',
          en: 'Claude Code automatically via Auto Memory, or user via /memory command.',
        },
        itemB: {
          ar: 'مهندس المشروع أو الفريق البرمجي يدوياً في جذر المستودع.',
          en: 'The project developer or tech lead in repo root.',
        },
      },
      {
        aspect: { ar: 'متى يتم التحميل؟ (When it loads)', en: 'Loading Lifecycle' },
        itemA: {
          ar: 'يتم استرجاعه عند الحاجة فقط أو كملخص مقتضب لتفادي ملء نافذة السياق.',
          en: 'Retrieved on-demand or loaded as concise summaries to preserve context.',
        },
        itemB: {
          ar: 'يُحمَّل تلقائياً وإلزامياً في بداية كل محادثة وجلسة عمل.',
          en: 'Loaded unconditionally at the very start of every terminal session.',
        },
      },
      {
        aspect: { ar: 'نطاق التطبيق (Scope)', en: 'Scope & Boundary' },
        itemA: {
          ar: 'قد يخص مشروعاً معيناً أو تفضيلات عامة للمطور عبر مشاريع متعددة.',
          en: 'Can be project-specific or global across multiple dev workspaces.',
        },
        itemB: {
          ar: 'مرتبط بمجلد المستودع الحالي (أو مجلد فرعي داخل Monorepo).',
          en: 'Strictly tied to the active repository directory or sub-package.',
        },
      },
      {
        aspect: { ar: 'طبيعة المعلومات (Type of Info)', en: 'Information Nature' },
        itemA: {
          ar: 'حقائق ديناميكية، نتائج تجارب سابقة، واختيارات متفق عليها.',
          en: 'Dynamic observations, bug discoveries, and agreed patterns.',
        },
        itemB: {
          ar: 'قواعد حتمية وممنوعات صريحة (Negative Constraints) وأوامر bash.',
          en: 'Deterministic rules, forbidden patterns, and verifiable build CLI commands.',
        },
      },
      {
        aspect: { ar: 'أمثلة مناسبة (Appropriate Examples)', en: 'Typical Examples' },
        itemA: {
          ar: '"نواجه مشكلة في Docker مع node-alpine، نستخدم debian-slim بدلاً منه."',
          en: '"Docker alpine has musl bug, always use debian-slim in this repo."',
        },
        itemB: {
          ar: '"npm run build يجب أن ينتج صفر أخطاء؛ ممنوع استخدام مكتبة Moment.js."',
          en: '"pnpm test must pass; forbidden to use any type in TypeScript."',
        },
      },
    ],
    recommendation: {
      ar: 'القاعدة الذهبية: إذا كانت معلومة إلزامية لا يجوز للنموذج مخالفتها أبداً، ضعها في CLAUDE.md. إذا كانت معلومة تراكمية توضح سياقاً أو قراراً سابقاً، ضعها في Memory.',
      en: 'Golden rule: Put strict non-negotiable rules in CLAUDE.md. Put historical context and preferences in Memory.',
    },
    relatedCapabilities: ['memory', 'claude_md', 'auto_memory'],
  },
  {
    id: 'commands-vs-skills',
    title: {
      ar: 'Slash Commands مقابل Skills',
      en: 'Slash Commands vs. Skills',
    },
    subtitle: {
      ar: 'المقارنة بين أوامر الاختصار السريعة وحزم المهارات التخصصية المتكاملة',
      en: 'Lightweight markdown command recipes vs. packaged executable skills',
    },
    itemAName: { ar: 'Slash Commands (الأوامر)', en: 'Slash Commands' },
    itemBName: { ar: 'Skills (المهارات)', en: 'Packaged Skills' },
    itemATag: { ar: 'أمر مباشر وسريع', en: 'Quick Parametric CLI' },
    itemBTag: { ar: 'حزمة أدوات وسير عمل', en: 'Packaged Workflow & Scripts' },
    summary: {
      ar: 'الأوامر عبارة عن قوالب موجهات سريعة تستدعى بالاسم المباشر (مثل /review)، بينما المهارات هي حزم معرفية (SKILL.md) مجهزة بسكريبتات فحص وتوجيهات متخصصة.',
      en: 'Commands are quick parametric prompt shortcuts; Skills are structured capability packages with scripts.',
    },
    rows: [
      {
        aspect: { ar: 'طريقة الاستدعاء (Invocation)', en: 'How it is invoked' },
        itemA: {
          ar: 'استدعاء صريح بالاسم يكتبه المطور في الطرفية (مثل /review-pr main).',
          en: 'Explicit trigger typed by the user (e.g., /review-pr main).',
        },
        itemB: {
          ar: 'استدعاء ذاتي يقرره المساعد عند رصد حاجة للمهارة، أو توجيه مباشر في الموجه.',
          en: 'Autonomous matching when relevant, or invoked through explicit skill guidelines.',
        },
      },
      {
        aspect: { ar: 'قابلية إعادة الاستخدام (Reusability)', en: 'Reusability' },
        itemA: {
          ar: 'ممتازة للأفعال المتكررة يومياً داخل المشروع نفسه بنقرة واحدة.',
          en: 'Ideal for daily repetitive tasks inside the specific repository.',
        },
        itemB: {
          ar: 'عالية جداً؛ حزمة كاملة يمكن نقلها ومشاركتها عبر مستودعات مختلفة بسهولة.',
          en: 'High portability; self-contained directory easily shared across repositories.',
        },
      },
      {
        aspect: { ar: 'نطاق المكونات (Scope & Structure)', en: 'Structure' },
        itemA: {
          ar: 'ملف Markdown واحد بسيط في .claude/commands/ يحتوي موجه واستبدال متغيرات.',
          en: 'Single markdown file with prompt instructions and argument placeholders.',
        },
        itemB: {
          ar: 'مجلد كامل يحتوي SKILL.md، مجلد سكريبتات scripts/، وأمثلة templates/.',
          en: 'Folder containing SKILL.md specification, helper scripts, and templates.',
        },
      },
      {
        aspect: { ar: 'سلوك سير العمل (Workflow Behavior)', en: 'Workflow behavior' },
        itemA: {
          ar: 'تنفيذ تسلسلي مباشر لطلب المطور في سياق المحادثة الحالية.',
          en: 'Direct prompt expansion injected into the current conversation flow.',
        },
        itemB: {
          ar: 'اتباع خطوات منهجية وفحص المخرجات ضد سكريبتات تحقق حتمية.',
          en: 'Systematic multi-step flow with deterministic script validations.',
        },
      },
      {
        aspect: { ar: 'متى تختار كل واحد؟ (When to use)', en: 'When to choose' },
        itemA: {
          ar: 'لتوليد كود سريع، مراجعة فرع Git، أو صياغة اختبار لوحدة واحدة.',
          en: 'For git reviews, formatting a file, or running a quick repetitive prompt.',
        },
        itemB: {
          ar: 'عندما تتطلب المهمة فحصاً معقداً، أدوات خارجية، أو خطوات قياسية لا تقبل الخطأ.',
          en: 'When the domain requires strict validation scripts and multi-phase execution.',
        },
      },
    ],
    recommendation: {
      ar: 'ابدأ دائماً بـ Slash Command إذا كان الأمر مجرد صياغة موجه؛ وعندما تجد نفسك بحاجة إلى سكريبتات مساعدة وفحص حتمي، حوّله إلى Skill.',
      en: 'Start with a Slash Command for simple workflows; upgrade to a Skill when you need verification scripts.',
    },
    relatedCapabilities: ['slash_commands', 'skills', 'workflows'],
  },
  {
    id: 'skills-vs-subagents',
    title: {
      ar: 'Skills مقابل Subagents',
      en: 'Skills vs. Subagents',
    },
    subtitle: {
      ar: 'المقارنة بين حزم المعرفة التخصصية والوكيل المستقل المعزول',
      en: 'Reusable knowledge assets vs. autonomous context-isolated workers',
    },
    itemAName: { ar: 'Skills (المهارات)', en: 'Skills' },
    itemBName: { ar: 'Subagents (الوكلاء الفرعيون)', en: 'Subagents' },
    itemATag: { ar: 'حزمة تعليمات وسكريبتات', en: 'Knowledge & Tool Pack' },
    itemBTag: { ar: 'عامل مستقل بسياق منفصل', en: 'Isolated Autonomous Worker' },
    summary: {
      ar: 'المهارة هي "كتيب إرشادات وأدوات" يقرؤه المساعد الرئيسي، بينما الوكيل الفرعي هو "عامل مستقل" يُطلق في غرفة منفصلة لينجز مهمة ثقيلة ويعود بالملخص فقط.',
      en: 'Skills are structured manuals and scripts; Subagents are isolated workers delegated heavy tasks.',
    },
    rows: [
      {
        aspect: { ar: 'المفهوم الجوهري (Core Concept)', en: 'Core Mental Model' },
        itemA: {
          ar: 'حزمة تعليمات وسكريبتات يتبعها الوكيل نفسه داخل المحادثة.',
          en: 'A manual and script package executed within the ongoing conversation.',
        },
        itemB: {
          ar: 'وكيل فرعي مستقل تماماً يُنشأ خصيصاً لمهمة واحدة ثم يُغلق.',
          en: 'An independent child process spawned for a single heavy task then terminated.',
        },
      },
      {
        aspect: { ar: 'سلوك السياق (Context Behavior)', en: 'Context Window' },
        itemA: {
          ar: 'يُحمِّل نصوص المهارة في نافذة السياق الحالية للمحادثة.',
          en: 'Consumes tokens inside the active main conversation context.',
        },
        itemB: {
          ar: 'يعمل في نافذة سياق معزولة تماماً (Isolated Sandbox)؛ لا ينقل للمحادثة سوى ملخص النتيجة.',
          en: 'Completely isolated tokens; parent conversation only receives the final executive briefing.',
        },
      },
      {
        aspect: { ar: 'المسؤولية (Responsibility)', en: 'Responsibility' },
        itemA: {
          ar: 'تحديد "كيف" تُنجز المهمة المتخصصة بدقة وفق المعايير.',
          en: 'Defines HOW a specialized task should be handled with precision.',
        },
        itemB: {
          ar: 'تنفيذ "مهمة استكشافية أو فحص مكثف" تتطلب قراءة عشرات الملفات دون تلويث السياق.',
          en: 'Executes high-token exploratory or exhaustive checks without bloating parent window.',
        },
      },
      {
        aspect: { ar: 'المخرجات والمراجعة (Output & Review)', en: 'Output & Review' },
        itemA: {
          ar: 'تعديلات كود مباشرة أو إجابات متخصصة فورية.',
          en: 'Direct file edits or domain answers directly in view.',
        },
        itemB: {
          ar: 'تقرير ملخص مقتضب يعود للمساعد الرئيسي ومراجعة بشرية للاعتماد.',
          en: 'Condensed outcome report handed to orchestrator for human approval gate.',
        },
      },
      {
        aspect: { ar: 'أمثلة عملية (Practical Examples)', en: 'Practical Example' },
        itemA: {
          ar: 'مهارة ربط Stripe، أو مهارة استخراج إحصاءات D3.js بدقة.',
          en: 'Stripe integration skill, or D3.js chart generation heuristics.',
        },
        itemB: {
          ar: 'وكيل تدقيق أمني يفحص 200 ملف، أو وكيل يشغل 500 اختبار Vitest ويعيد الفاشل منها فقط.',
          en: 'Auditing 200 files for secret leaks, or executing test suites off-context.',
        },
      },
    ],
    recommendation: {
      ar: 'استخدم Skills عندما تريد تزويد المساعد بالخبرة والأدوات اللازمة، واستخدم Subagents عندما تكون المهمة ثقيلة التوكنات وتريد عزلها بالكامل.',
      en: 'Use Skills to impart expertise and scripts; use Subagents to isolate token-heavy exploration.',
    },
    relatedCapabilities: ['skills', 'subagents', 'workflows'],
  },
  {
    id: 'commands-vs-hooks',
    title: {
      ar: 'Commands مقابل Hooks',
      en: 'Commands vs. Hooks',
    },
    subtitle: {
      ar: 'المقارنة بين الفعل اليدوي المستدعى والأتمتة المبنية على الأحداث',
      en: 'User-triggered manual actions vs. event-driven automated lifecycle gates',
    },
    itemAName: { ar: 'Commands (الأوامر)', en: 'Commands' },
    itemBName: { ar: 'Hooks (الخطافات)', en: 'Lifecycle Hooks' },
    itemATag: { ar: 'استدعاء إرادي يدوي', en: 'User-Initiated Trigger' },
    itemBTag: { ar: 'أتمتة حدثية تلقائية', en: 'Event-Driven Guardrail' },
    summary: {
      ar: 'الأوامر تستدعى برغبة المطور عندما يقرر ذلك (Manual Pull)، بينما الخطافات تعمل تلقائياً في الخلفية عند وقوع حدث معين مثل تعديل ملف (Event Push).',
      en: 'Commands are manually triggered by the developer; Hooks fire automatically on lifecycle events.',
    },
    rows: [
      {
        aspect: { ar: 'نوع المشغل (Trigger Type)', en: 'Trigger Mechanism' },
        itemA: {
          ar: 'يدوي وصريح؛ يكتبه المطور بنفسه في المحادثة عندما يشاء.',
          en: 'Explicitly typed by the developer when desired.',
        },
        itemB: {
          ar: 'تلقائي تماماً؛ ينطلق فور وقوع حدث دورة حياة محدد (مثل تعديل ملف أو تشغيل أداة).',
          en: 'Completely automated; triggers upon a lifecycle event (post-tool, pre-bash).',
        },
      },
      {
        aspect: { ar: 'التحكم والوعي (Control & Visibility)', en: 'Control & Flow' },
        itemA: {
          ar: 'المطور يتحكم بالتوقيت والمدخلات والخيارات المصاحبة للأمر.',
          en: 'Developer controls timing, arguments, and specific flags.',
        },
        itemB: {
          ar: 'يعمل كحارس أمني (Guardrail) غير مرئي يضمن الجودة بصمت ودون تدخل بشري.',
          en: 'Functions as an invisible quality guardrail running silently behind the scenes.',
        },
      },
      {
        aspect: { ar: 'التوقيت (Timing)', en: 'Execution Timing' },
        itemA: {
          ar: 'في أي وقت أثناء جلسة العمل بناءً على قرار المستخدم.',
          en: 'Ad-hoc at any point during active engineering.',
        },
        itemB: {
          ar: 'مرتبط بحلقات دورة حياة الأدوات: قبل تشغيل أداة (Pre-Tool) أو بعدها (Post-Tool).',
          en: 'Locked to lifecycle interception points: before tool execution or after file touch.',
        },
      },
      {
        aspect: { ar: 'اعتبارات الأمان (Safety Considerations)', en: 'Safety Considerations' },
        itemA: {
          ar: 'يعتمد على ما يطلبه المطور، ويسأل عن التأكيد إذا تضمن أمراً حساساً.',
          en: 'Depends on user prompt; confirms if sensitive bash commands are included.',
        },
        itemB: {
          ar: 'يجب أن تكون السكريبتات سريعة جداً وحتمية، وتفشل بأمان (Fail-Safe) حتى لا تعطل المطور.',
          en: 'Scripts must be fast, deterministic, and fail safely without locking the session.',
        },
      },
      {
        aspect: { ar: 'أمثلة نموذجية (Typical Examples)', en: 'Typical Example' },
        itemA: {
          ar: '/test-gen لتوليد اختبارات لوحدة معينة بعد الانتهاء منها.',
          en: '/test-gen to intentionally generate unit tests for a specific file.',
        },
        itemB: {
          ar: 'خطاف يشغل Prettier لتنسيق الكود تلقائياً فور حفظ أي ملف في المستودع.',
          en: 'Post-edit hook running Prettier or linter immediately after any file edit.',
        },
      },
    ],
    recommendation: {
      ar: 'استخدم الأوامر للمهام التي تتطلب تفكيراً وقراراً بشرياً؛ واستخدم الخطافات للعمليات الروتينية الإلزامية مثل التنسيق والفحص الأمني التلقائي.',
      en: 'Use Commands for intentional human-driven tasks; use Hooks for non-negotiable hygiene like formatting.',
    },
    relatedCapabilities: ['slash_commands', 'hooks', 'permissions'],
  },
];
