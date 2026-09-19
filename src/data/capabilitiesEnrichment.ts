import { BilingualText } from '../types';

export interface EnrichedCapabilityData {
  howItWorksInSystem?: BilingualText;
  ecosystemRelation?: BilingualText;
  antiPatternExample?: {
    title: string;
    description: string;
    code: string;
    language?: string;
  };
  exercise?: {
    prompt: string;
    hint: string;
    solution: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  nextStep?: {
    title: string;
    actionLabel: string;
    targetCapabilityId?: string;
  };
}

export const CAPABILITY_ENRICHMENTS: Record<string, EnrichedCapabilityData> = {
  models: {
    howItWorksInSystem: {
      ar: 'يعمل محرك النماذج كنواة الاستدلال المركزية؛ يتلقى سياق المحادثة المجمع (التعليمات، أدوات CLI، الملفات)، ويحدد مسار التفكير المنطقي، ثم يقرر استدعاء أدوات سطر الأوامر بالتتابع للوصول للحل.',
      en: 'The model engine acts as the central inference core, ingesting aggregated context, reasoning through steps, and emitting tool calls.',
    },
    ecosystemRelation: {
      ar: 'يتحكم في كيفية استيعاب Context واستخدام Memory؛ ويقرر متى يستدعي Slash Commands أو Subagents لإنجاز المهام.',
      en: 'Directs Context consumption and Memory retrieval; decides when to spawn Subagents or run Commands.',
    },
    antiPatternExample: {
      title: 'استخدام ميزانية تفكير قصوى لمهام تنسيق أو تغيير نصوص عادية',
      description: 'إهدار رموز التفكير (Thinking Tokens) وإبطاء الاستجابة لعملية تغيير ألوان CSS لا تحتاج استدلالاً برمجياً.',
      language: 'json',
      code: `// ❌ استخدام غير مناسب
{
  "model": "claude-3-7-sonnet",
  "thinking": { "budget_tokens": 16000 },
  "task": "Change navbar background color to #1e293b"
}`,
    },
    exercise: {
      prompt: 'قم بإعداد ميزانية تفكير مناسبة لمهمة إعادة هيكلة مصادقة JWT لمنع ثغرات انتهاء الصلاحية.',
      hint: 'المهمة معمارية وحساسة أمنياً، لذا تحتاج ميزانية تفكير ممتد بين 4000 و 8000 توكن.',
      solution: '{\n  "model": "claude-3-7-sonnet-20250219",\n  "thinking": {\n    "type": "enabled",\n    "budget_tokens": 6000\n  }\n}',
    },
    quiz: {
      question: 'متى يجب تفعيل Extended Thinking في Claude Code؟',
      options: [
        'لتغيير نصوص الروابط وتعديل تنسيقات CSS',
        'عند تشخيص أخطاء التزامن (Race Conditions) والمعماريات المعقدة',
        'فقط عند تشغيل أوامر git status البسيطة',
        'لا ينصح بتفعيله أبداً في البرمجة',
      ],
      correctIndex: 1,
      explanation: 'التفكير الممتد (Extended Thinking) مصمم للمهام الحسابية والمعمارية المعقدة لتجنب الهلوسة وحل المشكلات متعددة الطبقات.',
    },
    nextStep: {
      title: 'إدارة السياق والرموز (Context Window)',
      actionLabel: 'الانتقال لدرس السياق',
      targetCapabilityId: 'context',
    },
  },

  context: {
    howItWorksInSystem: {
      ar: 'يمثل Context مساحة العمل اللحظية للنموذج. يقرأ Claude Code الملفات والأدوات إلى الذاكرة المؤقتة، ويقوم بضغطها أو استبعاد الزائد منها تلقائياً للحفاظ على أعلى تركيز.',
      en: 'Context represents active working memory. Files and tool outputs fill the window, requiring compaction when nearing limits.',
    },
    ecosystemRelation: {
      ar: 'يرتبط مباشرة بـ Memory (التي تحفظ المستفاد خارج السياق) وبـ Subagents (التي تمنع تضخم السياق بعزل المهام الثقيلة).',
      en: 'Interacts with Memory for long-term retention and Subagents for isolating token-heavy exploration.',
    },
    antiPatternExample: {
      title: 'قراءة مجلدات كاملة كـ node_modules أو dist في نافذة السياق',
      description: 'حشو السياق بملفات مبنية أو حزم تابعة مما يستهلك 150,000 توكن فجأة ويؤدي لفقدان الانتباه.',
      language: 'bash',
      code: `// ❌ خطأ استهلاك السياق
claude "اقرأ مجلد node_modules وابحث عن سبب فشل البناء"
// البديل الصحيح: استخدام grep أو npm ls لفحص التبعيات المستهدفة`,
    },
    exercise: {
      prompt: 'ما الأمر الذي تستخدمه لتفريغ وتلخيص نافذة السياق عندما تتجاوز 70% من سعتها؟',
      hint: 'هناك أمر مخصص لضغط السياق والحفاظ على النقاط الجوهرية.',
      solution: '/compact',
    },
    quiz: {
      question: 'ما التأثير المباشر لامتلاء نافذة السياق بمعلومات غير ضرورية؟',
      options: [
        'زيادة سرعة استجابة النموذج',
        'تشتت الانتباه وزيادة احتمالية نسيان التعليمات الأساسية وارتفاع التكلفة',
        'حذف ملفات المشروع تلقائياً',
        'تثبيت الحزم التابعة تلقائياً',
      ],
      correctIndex: 1,
      explanation: 'تضخم السياق بالبيانات غير المفيدة يؤدي لتشتت الانتباه (Context Drift)، نسيان القواعد، وزيادة تكلفة الاستهلاك.',
    },
    nextStep: {
      title: 'بنك الذاكرة المستمرة (Memory Bank)',
      actionLabel: 'الانتقال لدرس الذاكرة',
      targetCapabilityId: 'memory',
    },
  },

  memory: {
    howItWorksInSystem: {
      ar: 'يوفر بنك الذاكرة تخزيناً مستمراً للقرارات والاختيارات بين الجلسات. يكتب فيه Claude الحقائق المستفادة تلقائياً أو عبر توجيه المطور، ولا يُحمَّل كاملاً إلا عند الحاجة لتوفير الرموز.',
      en: 'Memory persists learned decisions across terminal sessions without polluting active tokens until explicitly queried.',
    },
    ecosystemRelation: {
      ar: 'يكمل CLAUDE.md؛ حيث يركز CLAUDE.md على الأوامر الصارمة، بينما تركز Memory على الخبرات التراكمية وسياق المنظومة المتغير.',
      en: 'Complements CLAUDE.md: CLAUDE.md enforces strict invariants, while Memory stores learned architectural lore.',
    },
    antiPatternExample: {
      title: 'كتابة قواعد البناء الإلزامية الصارمة داخل الذاكرة بدلاً من CLAUDE.md',
      description: 'وضع أمر مثل "ممنوع استخدام npm، استخدم pnpm فقط" في الذاكرة حيث قد لا تُحمَّل فوراً بدلاً من فرضها في CLAUDE.md.',
      language: 'markdown',
      code: `// ❌ استخدام غير سليم للذاكرة
/memory "قاعدة صارمة: لا تستخدم Axios واستخدم Fetch فقط"
// الصواب: وضع هذه القاعدة الإلزامية في CLAUDE.md مباشرة`,
    },
    exercise: {
      prompt: 'اكتب أمراً لتخزين قرار معماري تم الاتفاق عليه في الجلسة بخصوص استخدام Tailwind v4.',
      hint: 'استخدم أمر الذاكرة السريع مع صياغة واضحة للقرار.',
      solution: '/memory "اعتمدنا رسمياً Tailwind CSS v4 مع استيراد @import \\"tailwindcss\\"; في index.css"',
    },
    quiz: {
      question: 'ما الفرق الأساسي بين Memory و CLAUDE.md؟',
      options: [
        'لا يوجد فرق بينهما، كلاهما يؤدي نفس الغرض تماماً',
        'CLAUDE.md يفرض القواعد الإلزامية وأوامر البناء، بينما الذاكرة تحفظ القرارات والخبرات التراكمية',
        'الذاكرة تُحذف بعد إغلاق الطرفية فوراً',
        'CLAUDE.md يُكتب تلقائياً فقط بدون تدخل بشري',
      ],
      correctIndex: 1,
      explanation: 'CLAUDE.md هو دستور المشروع الملزم، بينما بنك الذاكرة هو سجل تراكمي للقرارات والتجارب.',
    },
    nextStep: {
      title: 'دستور المشروع CLAUDE.md',
      actionLabel: 'الانتقال لدرس CLAUDE.md',
      targetCapabilityId: 'claude_md',
    },
  },

  claude_md: {
    howItWorksInSystem: {
      ar: 'يُعد ملف CLAUDE.md أول ملف يقرأه المساعد عند بدء أي جلسة في المستودع. يعامل كدستور حاكم يحدد أوامر البناء، معايير الاختبار، والممنوعات الصريحة.',
      en: 'CLAUDE.md is the invariant project constitution loaded at session bootstrap to govern all code actions.',
    },
    ecosystemRelation: {
      ar: 'يوجه كافة القدرات الأخرى: يحدد صلاحيات Permissions، يوجه مخرجات Slash Commands، ويضع ضوابط تشغيل Hooks.',
      en: 'Governs all system capabilities, defining permissions bounds, command standards, and hook guidelines.',
    },
    antiPatternExample: {
      title: 'تحويل CLAUDE.md إلى مقال أدبي طويل ومبهم',
      description: 'كتابة نصوص إنشائية طويلة دون أوامر bash محددة أو معايير قياس حتمية.',
      language: 'markdown',
      code: `<!-- ❌ غير فعال: كلام إنشائي -->
# مشروعنا
نرجو كتابة كود نظيف وممتاز والاهتمام بتجربة المستخدم قدر المستطاع.

<!-- ✅ فعال: أوامر صريحة ومحددة -->
# Build & Test Commands
- Build: pnpm build
- Test: pnpm test --run
- Linter: pnpm lint
# Non-negotiables
- Never use 'any' in TypeScript
- Never commit secrets to .env.example`,
    },
    exercise: {
      prompt: 'صغ قيداً سلبياً (Negative Constraint) صريحاً في CLAUDE.md لمنع استخدام مكتبة Moment.js.',
      hint: 'استخدم لغة قاطعة توضح الحظر والبديل المعتمد.',
      solution: '- DO NOT use Moment.js. Use native Intl or Date-fns instead.',
    },
    quiz: {
      question: 'متى يتم تحميل ملف CLAUDE.md في Claude Code؟',
      options: [
        'فقط عندما يستدعي المستخدم أمر /claude-md',
        'تلقائياً وإلزامياً في مستهل كل جلسة عمل بالطرفية',
        'عند فشل أمر البناء فقط',
        'مرة واحدة في السنة',
      ],
      correctIndex: 1,
      explanation: 'يتم تحميل ملف CLAUDE.md تلقائياً عند إقلاع أي جلسة لتأطير كل استجابة بالمعايير الإلزامية للمشروع.',
    },
    nextStep: {
      title: 'أوامر الاختصار السريعة (Slash Commands)',
      actionLabel: 'الانتقال لدرس Slash Commands',
      targetCapabilityId: 'slash_commands',
    },
  },

  slash_commands: {
    howItWorksInSystem: {
      ar: 'تترجم الأوامر المائلة قوالب موجهات سريعة قابلة لإعادة الاستخدام مخزنة في `.claude/commands/`. تمكّن المطور من استدعاء إجراءات مسبقة التصميم بتمرير متغيرات بسيطة.',
      en: 'Slash commands map custom markdown recipes inside .claude/commands/ to quick, repeatable developer CLI invocations.',
    },
    ecosystemRelation: {
      ar: 'تستدعي سياق Context وتوجه النموذج للالتزام بقواعد CLAUDE.md؛ ويمكن أن تستخدم سكريبتات Skills لتنفيذ المهام.',
      en: 'Bridges user intent to structured workflow, coordinating context and referencing CLAUDE.md rules.',
    },
    antiPatternExample: {
      title: 'بناء أمر سلاش لعملية تتطلب 20 ملفاً وتحتاج أدوات فحص مخصصة وسياق معزول',
      description: 'محاولة حشر عملية تدقيق أمني ضخمة في أمر سريع بدلاً من استخدام Skill أو Subagent.',
      language: 'markdown',
      code: `<!-- ❌ إساءة استخدام للأمر المائل -->
/audit-entire-monorepo
// الصواب: تخصيص مهارة متكاملة (Skill) أو تشغيل وكيل فرعي معزول (Subagent)`,
    },
    exercise: {
      prompt: 'أين يجب حفظ ملف الأمر المائل المخصص /test-unit في مستودع المشروع؟',
      hint: 'ابحث في مسار مجلد .claude المخصص للأوامر.',
      solution: '.claude/commands/test-unit.md',
    },
    quiz: {
      question: 'ما هي الميزة الأبرز لإنشاء Slash Command مخصص؟',
      options: [
        'تشغيل السيرفر بدون اتصال بالإنترنت',
        'توحيد الموجهات المتكررة للفريق وجعلها قابلة للاستدعاء بنقرة زر مع تمرير متغيرات',
        'تجاوز صلاحيات نظام التشغيل وحذف الملفات بدون تأكيد',
        'تغيير تصميم واجهة الطرفية',
      ],
      correctIndex: 1,
      explanation: 'توفر الأوامر المائلة طريقة موحدة وسريعة لإعادة استخدام أفضل الموجهات واختبارات الجودة عبر كل أعضاء الفريق.',
    },
    nextStep: {
      title: 'حزم المهارات المتخصصة (Skills)',
      actionLabel: 'الانتقال لدرس المهارات',
      targetCapabilityId: 'skills',
    },
  },

  skills: {
    howItWorksInSystem: {
      ar: 'المهارات هي حزم معيارية تجمع وثيقة إرشادية (SKILL.md) وسكريبتات مساعدة. يتعرف Claude عليها عند بدء العمل ويستدعي إرشاداتها وأدواتها عندما تتطابق مع هدف المستخدم.',
      en: 'Skills package specialized domain guidelines and helper scripts, automatically referenced when relevant tasks emerge.',
    },
    ecosystemRelation: {
      ar: 'تعد أعلى تطوراً من Slash Commands؛ ويمكن أن يستعين بها الوكلاء الفرعيون (Subagents) كمرجع لتنفيذ تخصصاتهم بدقة.',
      en: 'More comprehensive than Commands; provides deterministic scripts and playbooks that Subagents can leverage.',
    },
    antiPatternExample: {
      title: 'إنشاء مهارة بدون سكريبتات تحقق واعتمادها فقط على نص عام',
      description: 'تحويل المهارة لمجرد نص إنشائي مكرر دون قواعد صارمة أو أدوات مساعدة واضحة.',
      language: 'markdown',
      code: `<!-- ❌ مهارة فارغة المضمون -->
# Skill: Be A Good Coder
Try your best to write clean code.
<!-- ✅ الصواب: مهارة ذات إرشادات فحص وأدوات حتمية -->
# Skill: Stripe Checkout
- Required steps: 1. Validate webhook signature, 2. Run test script.`,
    },
    exercise: {
      prompt: 'ما الملف الإلزامي الذي يجب أن يتواجد في جذر كل مجلد مهارة؟',
      hint: 'ملف التوثيق والمواصفات الرئيسي للمهارة.',
      solution: 'SKILL.md',
    },
    quiz: {
      question: 'متى يفضل تحويل الـ Slash Command إلى Skill كاملة؟',
      options: [
        'إذا كان الأمر يتكون من سطر واحد فقط',
        'عندما تتطلب المهمة سكريبتات تحقق حتمية، قوالب متعددة، ومجلد أدوات متكامل',
        'عند الرغبة في إخفاء الكود عن المطورين',
        'فقط عند كتابة CSS',
      ],
      correctIndex: 1,
      explanation: 'تُنشأ المهارة (Skill) عندما يتجاوز الإجراء مجرد موجه نصي ويحتاج لأدوات مساعدة، سكريبتات فحص، وقوالب موحدة.',
    },
    nextStep: {
      title: 'الوكلاء الفرعيون المعزولون (Subagents)',
      actionLabel: 'الانتقال لدرس الوكلاء',
      targetCapabilityId: 'subagents',
    },
  },

  subagents: {
    howItWorksInSystem: {
      ar: 'ينشئ Claude Code وكيلاً فرعياً مستقلاً بذاكرة فارغة (Clean Sandbox Context) لإنجاز مهمة استكشافية مكثفة، ثم يعود بتقرير ملخص مقتضب ويغلق العملية لحماية المحادثة الرئيسية.',
      en: 'Spawns an isolated subprocess with a clean scratchpad to execute heavy investigations and return an executive briefing.',
    },
    ecosystemRelation: {
      ar: 'يحمي نافذة السياق (Context) من التضخم، ويتقيد بصلاحيات الحوكمة (Permissions)، ويعيد نتائجه للمنسق الرئيسي للمراجعة البشرية.',
      en: 'Protects parent Context from explosion, adheres to Permissions boundaries, and submits results for human review.',
    },
    antiPatternExample: {
      title: 'إطلاق وكيل فرعي لمهمة تعديل سطر واحد في ملف مفتوح',
      description: 'إهدار الوقت والموارد في تهيئة بيئة معزولة لعملية تافهة يمكن إنجازها فوراً في المحادثة الحالية.',
      language: 'text',
      code: `// ❌ إفراط في التفويض
Spawn subagent to change button text from "Submit" to "Send"
// ✅ الصواب: تعديل مباشر في السياق الحالي بضغطة زر واحدة`,
    },
    exercise: {
      prompt: 'لماذا يعتبر عزل السياق (Context Isolation) في الوكلاء الفرعيين ميزة حاسمة في المشاريع الكبرى؟',
      hint: 'فكر في عدد التوكنات وتشتت انتباه النموذج.',
      solution: 'لأنه يسمح للوكيل بقراءة عشرات الملفات وسجلات الاختبار دون استهلاك نافذة سياق المحادثة الرئيسية، مما يحافظ على سرعة وتركيز النموذج الرئيسي.',
    },
    quiz: {
      question: 'ما الذي يجب أن يعود به الوكيل الفرعي إلى المنسق الرئيسي عند إنجاز مهمته؟',
      options: [
        'كل الـ 50,000 توكن وسجلات القراءة الخام التي تصفحها',
        'تقرير ملخص مقتضب ودقيق بالنتائج مع التوصيات للمراجعة البشرية',
        'مفتاح API جديد',
        'حذف المستودع بالكامل',
      ],
      correctIndex: 1,
      explanation: 'الهدف من الوكيل الفرعي هو استخلاص القيمة وتصفية الضجيج، فيعود بتقرير مكثف لا يتجاوز مئات الرموز.',
    },
    nextStep: {
      title: 'خطافات دورة الحياة (Hooks)',
      actionLabel: 'الانتقال لدرس الخطافات',
      targetCapabilityId: 'hooks',
    },
  },

  hooks: {
    howItWorksInSystem: {
      ar: 'تعمل الخطافات كنقاط اعتراض أوتوماتيكية تعترض دورة حياة الأدوات: إما قبل تشغيل الأداة (Pre-Tool) لمنع الأوامر الخطر، أو بعدها (Post-Tool) لتشغيل أدوات التنسيق والفحص الحتمي.',
      en: 'Hooks intercept lifecycle moments: Pre-tool to block unsafe actions, and Post-tool for instant formatting and linting.',
    },
    ecosystemRelation: {
      ar: 'تشكل الحارس الخفي (Invisible Guardrail) للأوامر والملفات؛ تضمن جودة المخرجات قبل أن يراها المطور.',
      en: 'Acts as safety guardrails between tool calls, enforcing invariants defined in CLAUDE.md.',
    },
    antiPatternExample: {
      title: 'تشغيل سكريبت فحص بطيء يستغرق 30 ثانية في كل تعديل ملف',
      description: 'تعطيل سير عمل المطور بربط خطاف Post-Edit باختبارات تكامل بطيئة وشبكية بدلاً من أدوات فحص سريعة خفيفة.',
      language: 'bash',
      code: `// ❌ خطاف كارثي يعطل العمل
# .claude/hooks/post-edit.sh
npm run test:e2e-all-browsers # يستغرق 4 دقائق في كل حفظ!
// ✅ الصواب: تشغيل Prettier أو linter محلي يستغرق 100ms فقط`,
    },
    exercise: {
      prompt: 'ما الفرق الزمني والأمني بين خطاف Pre-Tool وخطاف Post-Tool؟',
      hint: 'أحدهما يمنع وقوع الحدث والآخر يعالج تبعاته.',
      solution: 'Pre-Tool يعمل قبل تشغيل الأداة ويمكنه منع تنفيذها إذا كانت خطرة؛ بينما Post-Tool يعمل بعد اكتمال الأداة لتنظيف أو فحص النتيجة.',
    },
    quiz: {
      question: 'لماذا يجب أن تكون سكريبتات الـ Hooks حتمية (Deterministic) وفائقة السرعة؟',
      options: [
        'لأنها تعمل في كل خطوة أداة، وبطؤها أو عدم استقرارها يعطل المطور ويجعل البيئة غير موثوقة',
        'لأن أنظمة التشغيل تمنع البرامج التي تزيد عن ثانيتين',
        'لا يشترط أن تكون سريعة أبداً',
        'لتوفير مساحة القرص الصلب فقط',
      ],
      correctIndex: 0,
      explanation: 'الخطافات تقع في المسار الحرج (Critical Path) لتفاعل المطور، ويجب أن تفشل بأمان وتعمل في أجزاء من الثانية.',
    },
    nextStep: {
      title: 'بروتوكول سياق النماذج (MCP)',
      actionLabel: 'الانتقال لدرس MCP',
      targetCapabilityId: 'mcp',
    },
  },

  mcp: {
    howItWorksInSystem: {
      ar: 'يوفر بروتوكول Model Context Protocol معياراً مفتوحاً يربط Claude Code بمصادر بيانات خارجية (قواعد بيانات Postgres، واجهات GitHub، بيئات سحابية) كأدوات موحدة دون الحاجة لشيفرات ربط مخصصة.',
      en: 'Model Context Protocol standardizes connections between Claude Code and external data sources or APIs via unified tool schemas.',
    },
    ecosystemRelation: {
      ar: 'يوسع قدرات سياق المساعد؛ يتيح استعلام قواعد البيانات وجلب سجلات المراقبة ودمجها في السياق التفاعلي.',
      en: 'Expands Context capability by bridging external databases, trackers, and services seamlessly.',
    },
    antiPatternExample: {
      title: 'منح خادم MCP صلاحيات كتابة وحذف غير مقيدة على قاعدة بيانات الإنتاج',
      description: 'ربط أداة ذكاء اصطناعي بحساب Production Database يمتلك صلاحية DROP TABLE بدون بوابات مراجعة وتأكيد.',
      language: 'json',
      code: `// ❌ خطورة أمنية بالغة
{
  "mcpServers": {
    "prod-db": {
      "command": "npx",
      "args": ["-y", "@mcp/postgres", "postgres://admin:pass@prod.db/master?ssl=true"]
    }
  }
}
// ✅ الصواب: استخدام حساب Read-Only على بيئة تجريبية Staging`,
    },
    exercise: {
      prompt: 'ما نوع الاتصال الافتراضي الأكثر شيوعاً وأماناً لربط خوادم MCP المحلية بـ Claude Code؟',
      hint: 'بروتوكول الإدخال والإخراج القياسي لنظام التشغيل.',
      solution: 'stdio (Standard Input / Output)',
    },
    quiz: {
      question: 'ما هي الفائدة الكبرى لبروتوكول MCP مقارنة بكتابة واجهات API مخصصة؟',
      options: [
        'تسريع سرعة الإنترنت',
        'معيار مفتوح وموحد للأدوات والموارد يسمح بتبديل خوادم البيانات بسهولة دون إعادة كتابة تكاملات مخصصة',
        'تشغيل النماذج دون استهلاك توكنات',
        'إلغاء الحاجة لكتابة شيفرات برمجية',
      ],
      correctIndex: 1,
      explanation: 'MCP هو معيار صناعي يجعل أي خادم بيانات متوافقاً مع كل النماذج دون الحاجة لبناء أدوات خاصة لكل بيئة.',
    },
    nextStep: {
      title: 'حوكمة الصلاحيات والأمان (Permissions)',
      actionLabel: 'الانتقال لدرس الصلاحيات',
      targetCapabilityId: 'permissions',
    },
  },

  permissions: {
    howItWorksInSystem: {
      ar: 'يشكل نظام الصلاحيات صمام الأمان الفاصل بين النموذج ونظام التشغيل؛ يراقب كل عملية قراءة أو كتابة أو تشغيل أمر bash ويطلب إذناً بشرياً صريحاً إلا إذا كانت الأداة مسموحة مسبقاً في القائمة المعتمدة.',
      en: 'Enforces principle of least privilege, requiring explicit confirmation before dangerous shell actions or external writes.',
    },
    ecosystemRelation: {
      ar: 'يتحكم في خطافات Hooks، استدعاءات MCP، والوكلاء الفرعيين؛ وهو الدرع الواقي ضد الأخطاء غير المقصودة.',
      en: 'Protects the developer workspace by governing Subagents, MCP tools, and command execution.',
    },
    antiPatternExample: {
      title: 'منح موافقة مطلقة (Bypass All Permissions) في بيئة إنتاجية أو غير معزولة',
      description: 'تعطيل شاشات التأكيد لأوامر الحذف والتعديل مما قد يمسح ملفات التكوين الحساسة عن طريق الخطأ.',
      language: 'bash',
      code: `// ❌ تعطيل خطير لضوابط الأمان
claude --dangerously-skip-permissions
// ✅ الصواب: الاحتفاظ بتأكيد الأوامر الحساسة أو حصر التخطي في القراءة فقط`,
    },
    exercise: {
      prompt: 'ما الأمر الذي يعرض لك قائمة الأدوات والصلاحيات الممنوحة حالياً في الجلسة لمراجعتها؟',
      hint: 'أمر إداري يبدأ بعلامة السلاش.',
      solution: '/permissions',
    },
    quiz: {
      question: 'ما هو المبدأ الهندسي الذي يجب اتباعه عند ضبط صلاحيات أدوات Claude Code؟',
      options: [
        'منح كافة الصلاحيات فوراً لتسريع الكتابة',
        'مبدأ الصلاحيات الأقل (Least Privilege) ومنح إذن القراءة والتعديل فقط للمجلدات والعمليات المستهدفة',
        'حظر كل الأدوات تماماً وعدم السماح بأي قراءة للملفات',
        'تغيير كلمة مرور الجذر في كل دقيقة',
      ],
      correctIndex: 1,
      explanation: 'مبدأ الصلاحيات الأقل يضمن بقاء مساحة عمل المطور آمنة ولا يمكن لأي نموذج إحداث تغييرات مدمرة بدون علمه.',
    },
    nextStep: {
      title: 'إدارة وتكوين المشاريع (Projects)',
      actionLabel: 'الانتقال لدرس المشاريع',
      targetCapabilityId: 'projects',
    },
  },

  projects: {
    howItWorksInSystem: {
      ar: 'ينظم مجلد المشروع وهيكليته علاقة المساعد بالمستودع؛ حيث ينشئ مجلد `.claude/` الحاوي على الإعدادات، القواعد المحلية، الذاكرة، والتكوينات الخاصة ببيئة الفريق.',
      en: 'Establishes repository-level configuration within the .claude/ directory, storing local memory, configs, and commands.',
    },
    ecosystemRelation: {
      ar: 'يحتضن ملف CLAUDE.md، أوامر Slash Commands، وسجلات الذاكرة، ويضمن تجربة عمل متناسقة لكل مطوري الفريق.',
      en: 'Serves as the root anchor for CLAUDE.md, .claude/commands/, and project-scoped configurations.',
    },
    antiPatternExample: {
      title: 'رفع ملفات الذاكرة الشخصية أو المفاتيح السرية داخل مجلد .claude إلى Git',
      description: 'عدم إضافة ملفات الجلسات الخاصة والبيانات الحساسة إلى ملف .gitignore مما يؤدي لتسريب معلومات خاصة.',
      language: 'gitignore',
      code: `// ❌ نسيان استبعاد الملفات الخاصة
# تأكد دائماً من إضافة المسارات الحساسة لملف .gitignore:
.claude/memory/private-*
.claude/*.local.json`,
    },
    exercise: {
      prompt: 'ما الأمر التفاعلي الذي يهيئ ملفات الإعداد والقواعد الأساسية لمشروع جديد تلقائياً؟',
      hint: 'أمر تهيئة مشهور في كل أدوات CLI البرمجية.',
      solution: '/init',
    },
    quiz: {
      question: 'ما الميزة الأساسية لتوحيد إعدادات المشروع داخل `.claude/` في مستودع الفريق؟',
      options: [
        'زيادة سرعة معالج الحاسوب',
        'مشاركة نفس سياق البناء والقواعد والأوامر المخصصة بين كافة المطورين دون تكرار الإعداد اليدوي',
        'إلغاء الحاجة لكتابة كود برمجي',
        'تغيير لغة نظام التشغيل تلقائياً',
      ],
      correctIndex: 1,
      explanation: 'توحيد إعدادات المشروع يضمن أن كل مطور ينضم للمشروع يحصل فوراً على نفس الإرشادات والأوامر المخصصة.',
    },
    nextStep: {
      title: 'سلاسل العمل وأدلة التشغيل القياسية (Workflows & Playbooks)',
      actionLabel: 'الانتقال لدرس سلاسل العمل',
      targetCapabilityId: 'playbooks',
    },
  },

  playbooks: {
    howItWorksInSystem: {
      ar: 'تربط سلاسل العمل وأدلة التشغيل القياسية (SOPs) كافة إمكانيات المنظومة في خطوات متتالية ومحكمة لتنفيذ السيناريوهات الكبرى (مثل ترحيل قاعدة بيانات أو إطلاق إصدار جديد) بأمان وموثوقية.',
      en: 'Chains all system capabilities into deterministic multi-phase playbooks for complex operational milestones.',
    },
    ecosystemRelation: {
      ar: 'تنسق النماذج، السياق، الأوامر، المهارات، وفحوصات الأمان في سيمفونية هندسية متكاملة تضمن عدم إغفال أي خطوة.',
      en: 'Orchestrates models, skills, subagents, and permissions into end-to-end engineering procedures.',
    },
    antiPatternExample: {
      title: 'تنفيذ ترقية معمارية حرجة بدون خطة مرحلية واختبارات فحص وسيطة',
      description: 'مطالبة المساعد بتحديث كل حزم المشروع دفعة واحدة دون تقسيم العمل لمراحل قابلة للتحقق.',
      language: 'markdown',
      code: `// ❌ مجازفة خطيرة
"قم بتحديث كل الحزم في package.json إلى أحدث إصدار وأعد بناء كل شيء الآن"
// ✅ الصواب: اتباع دليل تشغيل مرحلي: 1. تحليل التبعيات، 2. تحديث الحزم التابعة، 3. تشغيل الاختبارات بعد كل خطوة`,
    },
    exercise: {
      prompt: 'ما المراحل الأربع القياسية التي يجب أن يتضمنها أي دليل تشغيلي لإعادة هيكلة كود قديم؟',
      hint: 'تبدأ بالاستكشاف والتحليل وتنتهي بالتحقق.',
      solution: '1. الاستكشاف والتحليل (Discovery)، 2. صياغة خطة التغيير (Planning)، 3. التنفيذ المرحلي المعزول (Execution)، 4. التحقق والاختبارات (Verification).',
    },
    quiz: {
      question: 'لماذا تعد أدلة التشغيل القياسية (Playbooks) ركيزة النضج الهندسي مع Claude Code؟',
      options: [
        'لأنها تحول الذكاء الاصطناعي من مجرد أداة دردشة وتخمين إلى منظومة هندسية منضبطة وذات خطوات موثقة ومقاسة',
        'لأنها تحذف ملفات المشروع التالفة تلقائياً',
        'لأنها تتطلب كتابة كود بلغة C فقط',
        'لأنها تمنع المطور من مراجعة الكود',
      ],
      correctIndex: 0,
      explanation: 'أدلة التشغيل القياسية هي الجسر الذي ينقل العمل مع وكلاء الذكاء الاصطناعي من التجربة العشوائية إلى الانضباط الهندسي الاحترافي.',
    },
    nextStep: {
      title: 'النماذج ومحركات التفكير (العودة للبداية)',
      actionLabel: 'الانتقال لأول قدرة',
      targetCapabilityId: 'models',
    },
  },
};
