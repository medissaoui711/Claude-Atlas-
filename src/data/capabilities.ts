import { CapabilityNode } from '../types';
import { CAPABILITY_ENRICHMENTS } from './capabilitiesEnrichment';

const RAW_CAPABILITIES: CapabilityNode[] = [
  // ==========================================
  // GROUP 1: CORE (النواة والنماذج)
  // ==========================================
  {
    id: 'models',
    slug: 'models-reasoning-engines',
    name: {
      ar: 'النماذج ومحركات التفكير',
      en: 'Models & Reasoning Engines',
    },
    tagline: {
      ar: 'تخصيص قوة الحوسبة، سلاسل التفكير Extended Thinking، وموازنة المخرجات',
      en: 'Model selection, extended thinking budgets, and inference optimization',
    },
    category: 'core',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 20,
    iconName: 'Cpu',
    summary: {
      ar: 'فهم الفروق الجوهرية بين أجيال Claude (Claude 3.7 Sonnet مع التفكير الهجين، Opus، وHaiku) وكيف يستغل Claude Code رموز التفكير لحل المهام المعقدة بدون تخمين.',
      en: 'Understanding the architectural differences between Claude models, hybrid reasoning in Sonnet 3.7, and token allocation.',
    },
    whyItMatters: {
      ar: 'اختيار النموذج وضبط ميزانية التفكير يحدد مباشرة دقة كتابة الشفرات المعقدة وتكلفة الاستهلاك وسرعة إنجاز المهام الكبيرة.',
      en: 'Configuring reasoning budgets directly affects architectural correctness and cost efficiency.',
    },
    whenToUse: [
      'عند إعادة هيكلة (Refactoring) معمارية كاملة تتطلب تفكيراً ممتداً',
      'عند تشخيص أخطاء غامضة (Race Conditions أو Memory Leaks)',
      'عند التبديل السريع إلى Haiku للمهام الروتينية الخفيفة لتقليل التكلفة',
    ],
    whenNotToUse: [
      'لا تستخدم أقصى ميزانية تفكير لتعديلات CSS البسيطة أو استبدال نصوص',
      'لا تعتمد على نماذج غير قادرة على استدعاء الأدوات للتعامل مع سطر الأوامر',
    ],
    prerequisites: ['فهم أساسيات التوكنات (Tokens)', 'معرفة عامة بسياق عمل LLMs في سطر الأوامر'],
    relatedNodeIds: ['context', 'prompt_engineering', 'memory'],
    learningPathIds: ['p1-foundations', 'p2-workflows'],
    architectureDiagram: {
      inputs: ['مهمة معقدة من المستخدم', 'سياق المشروع والملفات'],
      process: ['تفعيل Extended Thinking', 'بناء شجرة الفرضيات', 'التحقق البرمجي قبل الكتابة'],
      outputs: ['كود مصحح خالٍ من الآثار الجانبية', 'تقرير التفكير البرمجي'],
    },
    codeExample: {
      language: 'json',
      filename: '.claude/config.json',
      code: `{\n  "model": "claude-3-7-sonnet-20250219",\n  "thinking": {\n    "type": "enabled",\n    "budget_tokens": 4096\n  },\n  "max_output_tokens": 8192\n}`,
      description: 'ضبط نموذج Claude 3.7 مع تفعيل التفكير الممتد بميزانية 4096 رمز للمهام المعقدة.',
    },
    keyTakeaways: [
      'Claude 3.7 Sonnet يجمع التفكير المنطقي الفوري والممتد في نموذج واحد.',
      'التفكير الممتد يقلل بنسبة كبيرة من أخطاء التراجع (Regression Bugs).',
    ],
  },
  {
    id: 'context',
    slug: 'context-window-pruning',
    name: {
      ar: 'إدارة السياق والنافذة',
      en: 'Context Window & Pruning',
    },
    tagline: {
      ar: 'استثمار نافذة الـ 200k توكن بذكاء وتجنب تشتت النموذج والضغط المفرط',
      en: 'Smart 200k token utilization, token degradation prevention, and context compaction',
    },
    category: 'core',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 25,
    iconName: 'Maximize2',
    summary: {
      ar: 'إدارة ما يدخل وما يخرج من سياق النموذج. يشمل ذلك آلية الضغط التلقائي `/compact`، واستبعاد الملفات الكبيرة من خلال `.claudeignore`، وتقنيات إبقاء السياق حاداً ونقياً.',
      en: 'Managing context window limits, utilizing /compact, and using .claudeignore to keep context sharp.',
    },
    whyItMatters: {
      ar: 'امتلاء السياق بتفاصيل ومخرجات اختبارات ضخمة يسبب ضياع التعليمات الدقيقة وتراجع جودة الحلول وزيادة التكاليف.',
      en: 'Bloated context degrades reasoning accuracy and raises latency and inference costs.',
    },
    whenToUse: [
      'عند إجراء جلسة برمجية طويلة وتجاوز استهلاك السياق أكثر من 50%',
      'عندما تبدأ إجابات النموذج في تجاهل تفاصيل قيلت في بداية المحادثة',
      'قبل إطلاق مهمة صعبة تحتاج إلى كامل انتباه النموذج',
    ],
    whenNotToUse: [
      'لا تمسح السياق بالكامل أثناء تصحيح مشكلة معقدة تعتمد خطواتها على النتائج السابقة مباشرة',
    ],
    prerequisites: ['فهم مفهوم Token Counts', 'معرفة بنية الملفات عبر Git'],
    relatedNodeIds: ['models', 'memory', 'claude_md', 'reports'],
    learningPathIds: ['p1-foundations', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['مخرجات الأوامر الطويلة', 'محتويات الملفات المستعرضة'],
      process: ['تحليل التردد والأهمية', 'استخلاص القرارات الحاسمة', 'حذف السجلات المؤقتة'],
      outputs: ['سياق مضغوط ونقي بنسبة توفير 70%', 'احتفاظ بالمسار المعماري'],
    },
    codeExample: {
      language: 'bash',
      filename: 'terminal.sh',
      code: `# التحقق من حجم السياق الحالي واستخدامه\nclaude /cost\n\n# ضغط السياق واستبقاء النقاط المعمارية فقط\nclaude /compact "حافظ على قرارات هيكلة قاعدة البيانات ومسارات API"`,
      description: 'أمر فحص التكلفة وحجم السياق متبوعاً بأمر الضغط التوجيهي للحفاظ على القرارات الجوهرية.',
    },
    keyTakeaways: [
      'أمر /compact لا يمسح كل شيء، بل يستخلص ملخصاً مركّزاً للأحداث السابقة.',
      'الملف `.claudeignore` هو خط دفاعك الأول لمنع ملفات الـ lock وbuild artifacts من تلويث السياق.',
    ],
  },
  {
    id: 'prompt_engineering',
    slug: 'deterministic-prompting',
    name: {
      ar: 'هندسة الموجهات البرمجية',
      en: 'Deterministic Prompting',
    },
    tagline: {
      ar: 'صياغة الموجهات فائقة الدقة بنمط الأهداف، السياق، القيود، وشكل المخرجات',
      en: 'Formulating high-precision coding prompts using constraints, persona, and output contracts',
    },
    category: 'core',
    difficulty: 'intermediate',
    status: 'educational',
    estimatedMinutes: 25,
    iconName: 'Sparkles',
    summary: {
      ar: 'المنهجية العلمية لمخاطبة Claude Code: كيفية تحديد الهدف (Goal)، وتوفير السياق الضروري فقط (Context)، وفرض القيود الصارمة (Constraints)، وتحديد شكل المخرجات (Output Format) لضمان إجابات خالية من الحشو.',
      en: 'The engineering framework for constructing unambiguous, actionable prompts that eliminate hallucinations.',
    },
    whyItMatters: {
      ar: 'الفرق بين موجه عشوائي وموجه مهندس بدقة هو الفرق بين الحصول على كود مليء بالأخطاء أو الحصول على حل معماري نظيف وجاهز للإنتاج من أول محاولة.',
      en: 'Turns unpredictable trial-and-error prompting into deterministic, high-quality code outputs.',
    },
    whenToUse: [
      'عند كتابة ملفات الأوامر السريعة والمهارات الدائمة',
      'عند طلب حلول لمعضلات معمارية معقدة تتضمن عدة تقنيات متداخلة',
      'لتوجيه النموذج للامتناع عن كتابة تعليقات زائدة أو تغيير كود لا علاقة له بالمهمة',
    ],
    whenNotToUse: [
      'لا تكتب نصوصاً شعرية أو لغة مجاملة، بل اعتمد لغة هندسية حاسمة ومحددة',
    ],
    prerequisites: ['أساسيات التواصل التقني', 'فهم بنية الشفرات البرمجية'],
    relatedNodeIds: ['models', 'claude_md', 'slash_commands'],
    learningPathIds: ['p1-foundations', 'p2-workflows'],
    architectureDiagram: {
      inputs: ['طلب خام غير منظم من المطور'],
      process: ['استخراج الهدف الأساسي', 'تحديد القيود التكنولوجية', 'صياغة عقد المخرجات الصارم'],
      outputs: ['موجه تنفيذي فائق التركيز يمنح النتيجة الصحيحة فوراً'],
    },
    codeExample: {
      language: 'markdown',
      filename: 'prompts/refactor-recipe.md',
      code: `**الهدف**: إعادة صياغة دالة \`processPayment\` لاستخدام الـ async/await بدلاً من الوعود المتداخلة.\n**السياق**: الملف \`src/services/payment.ts\` وقاعدة بيانات Postgres.\n**القيود**:\n- لا تغير أي نوع من أنواع المعاملات أو المخرجات (Signature Compatibility).\n- احتفظ بنظام معالجة الأخطاء الدقيق وسجل العمليات.\n- لا تضف أي مكتبات جديدة.\n**المخرجات**: الكود المحدث فقط مع شرح بنقطتين لأبرز تحسين تم إجراؤه.`,
      description: 'قالب موجه هندسي متكامل يطبق نموذج الأركان الأربعة: هدف، سياق، قيود، وشكل مخرجات.',
    },
    keyTakeaways: [
      'القيود الصريحة (Negative Constraints) أهم بكثير من التوجيهات العامة.',
      'تحديد شكل المخرجات يمنع إسهاب المساعد في الكلام غير البرمجي.',
    ],
  },

  // ==========================================
  // GROUP 2: MEMORY AND PROJECT CONTEXT (الذاكرة وسياق المشروع)
  // ==========================================
  {
    id: 'memory',
    slug: 'memory-bank',
    name: {
      ar: 'الذاكرة التراكمية الدائمة',
      en: 'Memory Bank & Persistence',
    },
    tagline: {
      ar: 'استبقاء القرارات المعمارية والتفضيلات عبر الجلسات وتفادي إعادة الشرح',
      en: 'Session-spanning architectural memory, preference tracking, and decision logs',
    },
    category: 'memory_context',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 20,
    iconName: 'Database',
    summary: {
      ar: 'نظام الذاكرة في Claude Code يتيح للمساعد حفظ الحقائق الهندسية، تفضيلات الفريق، وأنماط الكود عبر ملفات الذاكرة المحلية، مما يجعله يتذكر سياق مشروعك دائماً حتى بعد إغلاق الطرفية.',
      en: 'Cross-session memory subsystem in Claude Code that stores project lore, conventions, and architectural choices.',
    },
    whyItMatters: {
      ar: 'بدون الذاكرة، تضطر لإعادة شرح معمارية مشروعك وتفضيلاتك في كل جلسة جديدة. مع الذاكرة، يستمر المساعد كعضو فريق أصيل.',
      en: 'Eliminates repetitive explanations across terminal sessions and ensures architectural consistency.',
    },
    whenToUse: [
      'لتسجيل نمط كتابة الاختبارات المعتمد في الفريق (مثل Jest مع React Testing Library)',
      'لتخزين أسماء الفروع ومسارات السيرفرات التطويرية',
      'لحفظ قرارات المعمارية (ADRs) لعدم نقضها مستقبلاً',
    ],
    whenNotToUse: [
      'لا تخزن في الذاكرة كلمات مرور، مفاتيح API، أو بيانات عملاء سرية',
      'لا تضع أكواداً برمجية كاملة في الذاكرة، بل ضع القواعد والأنماط فقط',
    ],
    prerequisites: ['فهم مفاهيم الحالة عبر الجلسات (State across sessions)'],
    relatedNodeIds: ['claude_md', 'project_rules', 'auto_memory'],
    learningPathIds: ['p1-foundations', 'p2-workflows'],
    architectureDiagram: {
      inputs: ['أمر حفظ من المطور', 'استنتاج قرار معماري أثناء الجلسة'],
      process: ['تنسيق الملاحظة في شكل حقيقة مجردة', 'تحديث ملف الذاكرة في المسار المحلي'],
      outputs: ['تحميل تلقائي للحقيقة في الجلسات القادمة دون استهلاك سياق ضخم'],
    },
    codeExample: {
      language: 'markdown',
      filename: '.claude/memory/architecture.md',
      code: `# قرارات المعمارية الدائمة للمشروع\n\n- **مكتبة الحالة**: نستخدم Zustand فقط، وتمنع مكتبات Redux أو Context المعقد.\n- **التعامل مع التاريخ**: نعتمد dayjs بدلاً من moment.js لتوفير الحجم.\n- **اختبارات API**: نعتمد على MSW (Mock Service Worker) حصراً لمطابقة استجابات الخادم.\n- **معايير الأمان**: كل استعلام لقاعدة البيانات يجب أن يمر عبر Drizzle ORM المعد مسبقاً.`,
      description: 'هيكل ملف الذاكرة التراكمي المعتمد لتوثيق القرارات المعمارية الدائمة.',
    },
    keyTakeaways: [
      'الذاكرة الدائمة تلخص القرارات ولا تستهلك نافذة السياق إلا عند الحاجة.',
      'يمكن تعديل ملفات الذاكرة يدوياً في أي وقت لتحديث متطلبات الفريق.',
    ],
  },
  {
    id: 'claude_md',
    slug: 'claude-md-constitution',
    name: {
      ar: 'ملف CLAUDE.md',
      en: 'Project Instructions (CLAUDE.md)',
    },
    tagline: {
      ar: 'الدستور البرمجي للمشروع الذي يحدد الأوامر والمعايير والمحظورات بدقة',
      en: 'The project constitution defining commands, code style, testing, and strict boundaries',
    },
    category: 'memory_context',
    difficulty: 'beginner',
    status: 'official',
    estimatedMinutes: 15,
    iconName: 'FileCode2',
    summary: {
      ar: 'ملف تعليمات مستمر يحدد قواعد المشروع، أوامره، بنيته، معاييره، والقيود التي يجب على Claude الالتزام بها تلقائياً في كل مرة يفتح فيها المشروع.',
      en: 'A persistent markdown instructions file residing in project root that governs build commands, conventions, and architectural constraints.',
    },
    whyItMatters: {
      ar: 'يمثل ملف CLAUDE.md المصدر الوحيد للحقيقة (Single Source of Truth) بينك وبين Claude Code؛ يمنعه من تخمين أوامر البناء، وتثبيت حزم عشوائية، أو انتهاك معايير الشيفرة.',
      en: 'Guarantees that Claude adheres to your exact commands and team guidelines automatically on every prompt.',
    },
    whenToUse: [
      'في الجذر (Root) لأي مشروع يعمل عليه Claude Code',
      'لتحديد أوامر التشغيل والبناء والاختبار المحددة (`npm test`, `cargo check`)',
      'لوضع قائمة بالممنوعات (مثل: ممنوع استخدام inline styles، ممنوع `any` في TypeScript)',
    ],
    whenNotToUse: [
      'لا تجعل الملف كتاباً ضخماً، احرص على أن يكون موجزاً ومرتباً في نقاط مباشرة',
      'لا تضع فيه تفاصيل متغيرة يومياً (استخدم مهام سريعة أو الذاكرة بدلاً منه)',
    ],
    prerequisites: ['معرفة تنسيق Markdown البسيط', 'معرفة بنية مشروعك الحالي'],
    relatedNodeIds: ['project_rules', 'memory', 'auto_memory', 'slash_commands'],
    learningPathIds: ['p1-foundations', 'p2-workflows'],
    architectureDiagram: {
      inputs: ['ملف CLAUDE.md في مسار المشروع أو مجلد العمل'],
      process: ['قراءة تلقائية في بداية تشغيل Claude Code', 'حقن التعليمات في نظام التوجيه الأولي كقوانين ثابتة'],
      outputs: ['التزام كامل بأوامر البناء ومعايير التنسيق طوال الجلسة'],
    },
    codeExample: {
      language: 'markdown',
      filename: 'CLAUDE.md',
      code: `# أوامر المشروع\n- البناء: \`npm run build\`\n- الاختبار: \`npm test -- --watchAll=false\`\n- التدقيق: \`npm run lint\`\n\n# معايير الكود والأسلوب\n- استخدام TypeScript الصارم مع منع الـ \`any\` تماماً.\n- تنسيق Tailwind CSS فقط، بدون ملفات CSS خارجية مخصصة.\n- أسماء الدوال بنمط camelCase، والمكونات بنمط PascalCase.\n\n# القيود الصارمة\n- لا تقم بتثبيت حزم npm جديدة دون طلب مسبق من المطور.\n- تأكد من تشغيل الاختبارات ونجاحها قبل إعلان اكتمال أي مهمة.`,
      description: 'نموذج مصغر لملف CLAUDE.md احترافي يحتوي على الأوامر والمعايير والقيود.',
    },
    copyableTemplate: {
      language: 'markdown',
      filename: 'CLAUDE.md',
      content: `# تعليمات مشروع Claude Code\n\n## أوامر التطوير الأساسية\n- بدء السيرفر: \`npm run dev\`\n- فحص الأخطاء: \`npm run lint\`\n- الاختبارات: \`npm test\`\n\n## القواعد المعمارية الصارمة\n- لا تعدل ملفات الإعدادات الجذرية دون إذن صريح.\n- حافظ على الفصل التام بين منطق العمل (Business Logic) وواجهات العرض (UI Components).\n- جميع المكونات يجب أن تكون مسؤولة وتدعم الوضع الداكن وشاشات الجوال.`,
      description: 'قالب أساسي جاهز للنسخ المباشر في جذر مشروعك.',
    },
    keyTakeaways: [
      'Claude يقرأ CLAUDE.md تلقائياً في بداية كل جلسة في المشروع.',
      'الملف يمنع Claude من ارتكاب الأخطاء المتكررة ويوفر وقت التوجيه اليدوي.',
    ],
  },
  {
    id: 'project_rules',
    slug: 'project-rules-directory',
    name: {
      ar: 'قواعد ومعايير المشروع',
      en: 'Project Rules (.claude/rules)',
    },
    tagline: {
      ar: 'تقسيم القواعد الضخمة إلى ملفات متخصصة في مجلد .claude/rules حسب المجال',
      en: 'Modular rule files organized under .claude/rules for specialized domains and scopes',
    },
    category: 'memory_context',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 20,
    iconName: 'ScrollText',
    summary: {
      ar: 'تنظيم القواعد الهندسية الضخمة إلى ملفات متخصصة داخل مجلد `.claude/rules/*.md` مثل قواعد الواجهات، قواعد قاعدة البيانات، وقواعد الاختبارات، لتحميل السياق بدقة دون إثقال CLAUDE.md.',
      en: 'Splitting architectural guidelines into scoped modular rulebooks under the .claude/rules directory for granular context targeting.',
    },
    whyItMatters: {
      ar: 'في المشاريع الكبيرة والـ Monorepos، وضع جميع القواعد في ملف CLAUDE.md واحد يجعله ضخماً ويهدر السياق. تقسيم القواعد يتيح تفعيل القواعد حسب نوع الملف الذي يحرره المساعد.',
      en: 'Prevents context pollution by scoping architectural rules to relevant sub-domains and packages.',
    },
    whenToUse: [
      'عند وجود معايير مختلفة لـ Frontend (React) عن Backend (Node/Python)',
      'في مستودعات Monorepo متعددة الحزم والتطبيقات',
      'لتوثيق قواعد أمنية صارمة خاصة بمسارات الدفع والمصادقة',
    ],
    whenNotToUse: [
      'في المشاريع الصغيرة ذات الصفحة الواحدة (يكفي CLAUDE.md بسيط)',
    ],
    prerequisites: ['معرفة بملف CLAUDE.md', 'هيكلة المجلدات في المشاريع الكبيرة'],
    relatedNodeIds: ['claude_md', 'memory', 'auto_memory'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['.claude/rules/frontend.md', '.claude/rules/security.md'],
      process: ['اكتشاف المسارات تلقائياً', 'مطابقة مجال الملف المحرر مع ملف القواعد المخصص'],
      outputs: ['تطبيق القواعد الدقيقة للمجال فقط'],
    },
    codeExample: {
      language: 'markdown',
      filename: '.claude/rules/frontend.md',
      code: `# قواعد تطوير الواجهات الأمامية\n\n- جميع المكونات يجب أن تكون Functional Components مع TypeScript.\n- ممنوع استخدام useEffect لجلب البيانات؛ استخدم TanStack Query حصراً.\n- احترام معايير إمكانية الوصول (Accessibility WCAG AA) في كل الأزرار والحقول.\n- استخدام مكتبة Lucide Icons للأيقونات مع منع SVGs المضمنة عشوائياً.`,
      description: 'ملف قواعد متخصص لواجهات المستخدم يوضع في `.claude/rules/frontend.md`.',
    },
    keyTakeaways: [
      'مجلد `.claude/rules/` يتيح توسيع إرشادات المشروع دون تضخيم ملف CLAUDE.md الأساسي.',
      'يمكن تخصيص قواعد لكل تقنية داخل نفس المستودع.',
    ],
  },
  {
    id: 'auto_memory',
    slug: 'auto-memory-distillation',
    name: {
      ar: 'الاستبقاء التلقائي للذاكرة',
      en: 'Auto Memory & Distillation',
    },
    tagline: {
      ar: 'استخلاص تلقائي للحقائق الهندسية وتفضيلات المطور أثناء الحوار بدون تدخل يدوي',
      en: 'Automatic extraction and distillation of architectural facts and developer feedback',
    },
    category: 'memory_context',
    difficulty: 'advanced',
    status: 'official',
    estimatedMinutes: 20,
    iconName: 'Sparkle',
    summary: {
      ar: 'آلية ذكية يقوم بها Claude Code بملاحظة تفضيلاتك وتصحيحاتك أثناء العمل، وتحديث ملفات الذاكرة التراكمية تلقائياً في الخلفية لضمان عدم تكرار نفس التوجيه في المستقبل.',
      en: 'Autonomous learning loop where Claude Code identifies architectural feedback and updates its memory bank without manual prompting.',
    },
    whyItMatters: {
      ar: 'يحول التفاعل مع المساعد إلى تجربة تتطور بمرور الوقت؛ فإذا صححت له طريقة كتابة دالة معينة، يتذكرها في كل محادثة قادمة تلقائياً.',
      en: 'Creates a continuous improvement flywheel that adapts to individual developer style and project quirks.',
    },
    whenToUse: [
      'لتسجيل اختيارات المكتبات والحلول البديلة التي اعتمدها الفريق بعد نقاش',
      'لحفظ ملاحظات تصحيح الأخطاء التي تكررت في بيئة التطوير المحلية',
      'لتحسين الاستجابات تدريجياً على مدار أسابيع من التطوير المستمر',
    ],
    whenNotToUse: [
      'لا تعتمد عليها للأسرار أو التوجيهات المؤقتة التي تنطبق على جلسة واحدة فقط',
    ],
    prerequisites: ['فهم نظام الذاكرة الدائمة في Claude Code'],
    relatedNodeIds: ['memory', 'claude_md', 'project_rules'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['ملاحظات المطور أثناء المحادثة (مثل: "لا نستخدم هذا النمط")', 'قرارات معمارية معتمدة'],
      process: ['تحليل الأنماط المتكررة', 'صياغة ملخص دقيق', 'حفظها في ملفات الذاكرة الدائمة'],
      outputs: ['استدعاء ذاتي في الجلسات اللاحقة يمنع تكرار الخطأ'],
    },
    codeExample: {
      language: 'markdown',
      filename: '.claude/memory/auto-learned.md',
      code: `# حقائق مستخلصة تلقائياً من الجلسات السابقة\n\n- [2026-03] المطور يفضل دوماً أسماء متغيرات واضحة بدلاً من الاختصارات (e.g., \`userAccount\` بدلاً من \`usrAcc\`).\n- [2026-03] بيئة Docker على هذا الجهاز تستخدم المنفذ 5433 لـ Postgres بدلاً من 5432 الافتراضي.\n- [2026-03] الاختبارات تتطلب تشغيل الأمر \`npm run test:unit\` لتخطي اختبارات E2E البطيئة.`,
      description: 'سجل الحقائق المستخلصة تلقائياً مع تواريخ استنتاجها لدعم التكيف المستمر.',
    },
    keyTakeaways: [
      'الاستبقاء التلقائي يقلل احتكاك العمل اليومي عبر التكيف المستمر مع بيئتك.',
      'يمكنك مراجعة وتعديل وحذف أي حقيقة مستخلصة تلقائياً بكل شفافية.',
    ],
  },

  // ==========================================
  // GROUP 3: AUTOMATION (الأتمتة والوكلاء)
  // ==========================================
  {
    id: 'slash_commands',
    slug: 'slash-commands',
    name: {
      ar: 'أوامر الطرفية المخصصة',
      en: 'Slash Commands (/commands)',
    },
    tagline: {
      ar: 'أوامر جاهزة ومخصصة لتنفيذ سلاسل تفكير وإجراءات معقدة بكلمة واحدة',
      en: 'Custom reusable execution commands defined in markdown for rapid workflow triggering',
    },
    category: 'automation',
    difficulty: 'beginner',
    status: 'official',
    estimatedMinutes: 15,
    iconName: 'Terminal',
    summary: {
      ar: 'أوامر سريعة تبدأ بـ `/` تمكنك من تنفيذ مهام متكررة ومعقدة (مثل مراجعة الكود، إنشاء الاختبارات، أو تدقيق الأداء) بنقرة واحدة وتمرير المعاملات إليها.',
      en: 'Built-in and custom slash commands defined in .claude/commands/*.md to trigger structured workflows.',
    },
    whyItMatters: {
      ar: 'توفر كتابة نفس الموجهات الطويلة في كل مرة، وتتيح للفريق مشاركة أفضل أساليب المراجعة والتدقيق كأوامر برمجية موحدة.',
      en: 'Standardizes repetitive multi-step prompts across the team into version-controlled commands.',
    },
    whenToUse: [
      'لإنشاء أمر مراجعة طلبات السحب: `/review-pr`',
      'لإنشاء أمر توليد اختبارات الوحدة: `/generate-tests`',
      'لتلخيص التغييرات وتوليد رسالة Git Commit قياسية: `/commit`',
    ],
    whenNotToUse: [
      'لا تستخدم أوامر Slash للمهام العشوائية التي تنفذها مرة واحدة فقط في حياتك',
    ],
    prerequisites: ['أساسيات سطر الأوامر', 'صياغة الموجهات بـ Markdown'],
    relatedNodeIds: ['skills', 'subagents', 'hooks', 'claude_md'],
    learningPathIds: ['p1-foundations', 'p2-workflows'],
    architectureDiagram: {
      inputs: ['كتابة أمر /command في الطرفية مع معاملات اختيارية'],
      process: ['قراءة ملف التعريف من `.claude/commands/`', 'استبدال المتغيرات وتوليد موجه متخصص'],
      outputs: ['تنفيذ مباشر للمهمة المحددة بدقة متناهية'],
    },
    codeExample: {
      language: 'markdown',
      filename: '.claude/commands/review-pr.md',
      code: `---
description: مراجعة معمارية لفرع العمل الحالي ومقارنته بالـ main
---

قم بتشغيل \`git diff main\` وحلل التغييرات وفق المعايير التالية:
1. هل توجد أي ثغرات أمنية أو استعلامات SQL غير آمنة؟
2. هل تم الالتزام بتنسيق TypeScript بدون \`any\`؟
3. هل كتبت اختبارات تغطي الدوال الجديدة؟
اكتب ملخصاً في جدول بالملفات، مع التقييم ودرجة الخطورة (Low, Medium, High).`,
      description: 'تعريف أمر مخصص `/review-pr` داخل ملف `.claude/commands/review-pr.md`.',
    },
    keyTakeaways: [
      'أي ملف Markdown تضعه في `.claude/commands/` يتحول فوراً لأمر متاح في الطرفية.',
      'يمكن مشاركة الأوامر مع كل أعضاء الفريق عبر دفعها لمستودع Git.',
    ],
  },
  {
    id: 'skills',
    slug: 'skills-architecture',
    name: {
      ar: 'مهارات سطر الأوامر المستقلة',
      en: 'Skills Architecture (SKILL.md)',
    },
    tagline: {
      ar: 'حزم برمجية قائمة بذاتها تمنح Claude قدرات جديدة مع نصوص برمجية وأمثلة',
      en: 'Modular, self-contained capability packages containing instructions, scripts, and domain patterns',
    },
    category: 'automation',
    difficulty: 'advanced',
    status: 'official',
    estimatedMinutes: 30,
    iconName: 'Wand2',
    summary: {
      ar: 'المهارات (Skills) هي وحدات معيارية تحتوي على ملف `SKILL.md` مع scripts مساعدة وأمثلة توضيحية لتعليم Claude كيفية تنفيذ تخصص تقني محدد بدقة احترافية.',
      en: 'Self-contained bundles with instructions, automation scripts, and reference patterns extending Claude Code capabilities.',
    },
    whyItMatters: {
      ar: 'تمنحك طريقة قياسية وقابلة للنقل لنقل المعرفة التقنية المعقدة إلى Claude، مع سكريبتات قابلة للتنفيذ في الطرفية.',
      en: 'Provides a composable, reusable architecture for specialized developer workflows and enterprise integrations.',
    },
    whenToUse: [
      'عند دمج أدوات معقدة مثل ترحيل قواعد البيانات (Drizzle / Prisma)',
      'لتعليم Claude معايير الأمان وسياسات المؤسسة الداخلية الخاصة بشركتك',
      'عند الحاجة لتشغيل سكريبتات Python أو Bash مساعدة أثناء المهمة',
    ],
    whenNotToUse: [
      'لا تنشئ مهارة كاملة لمجرد اختصار بسيط؛ استخدم Slash Command بدلاً منها',
    ],
    prerequisites: ['فهم بنية YAML Frontmatter', 'مهارات كتابة Shell Scripts'],
    relatedNodeIds: ['slash_commands', 'subagents', 'hooks', 'mcp'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['طلب تنفيذ يتطابق مع نطاق المهارة'],
      process: ['تحميل ملف SKILL.md تلقائياً', 'تنفيذ السكريبتات المرفقة عند الحاجة', 'تطبيق الأنماط الموثقة'],
      outputs: ['تنفيذ خبير معتمد على الدليل البرمجي للمهارة'],
    },
    codeExample: {
      language: 'markdown',
      filename: '.claude/skills/db-migrate/SKILL.md',
      code: `---
name: Database Migration Specialist
description: إدارة وترحيل مخططات قواعد البيانات PostgreSQL بأمان تام
---

# تعليمات ترحيل قاعدة البيانات

1. قبل إجراء أي تعديل، افحص المخطط الحالي باستخدام \`./scripts/inspect.sh\`.
2. تأكد من أن كل ترحيل يحتوي على عملية تراجع (Down Migration) مقابلة.
3. لا تقم أبداً بحذف أعمدة تحتوي على بيانات إنتاجية دون خطوة انتقالية (Deprecated Column).`,
      description: 'هيكل ملف SKILL.md مع ترويسة YAML وإرشادات التخصص التقني.',
    },
    keyTakeaways: [
      'المهارة تجمع بين التوجيه النظري والسكريبتات التنفيذية.',
      'تتكامل المهارات مع وكلاء Claude لإنجاز مهام مؤسسية بالغة الدقة.',
    ],
  },
  {
    id: 'subagents',
    slug: 'subagents-system',
    name: {
      ar: 'الوكلاء الفرعيون المتخصصون',
      en: 'Autonomous Subagents',
    },
    tagline: {
      ar: 'تفويض المهام الفرعية لوكلاء مستقلين بذاكرة وصلاحيات وسياق معزول',
      en: 'Delegating complex parallel work to isolated, domain-specific child agents',
    },
    category: 'automation',
    difficulty: 'expert',
    status: 'official',
    estimatedMinutes: 35,
    iconName: 'Bot',
    summary: {
      ar: 'قدرة متقدمة تتيح لـ Claude Code تفريخ وكلاء فرعيين (Subagents) للعمل على مهام فرعية محددة (مثل فحص ثغرات، كتابة اختبارات، أو تدقيق توثيق) دون تلويث سياق المحادثة الرئيسي.',
      en: 'Spawning specialized, sandboxed child agents with separate contexts and targeted scopes to work on parallel tasks.',
    },
    whyItMatters: {
      ar: 'يحافظ على نظافة سياقك الرئيسي، ويتيح إنجاز مهام هائلة تتطلب آلاف الأسطر من القراءة والتحليل دون نفاد الذاكرة.',
      en: 'Prevents context pollution, enforces principle of least privilege, and speeds up complex tasks.',
    },
    whenToUse: [
      'عند إجراء تدقيق أمني شامل للمستودع بأكمله',
      'لتشغيل وكيل مخصص للبحث في آلاف أسطر سجلات الأخطاء (Log Analyzer)',
      'لكتابة اختبارات E2E متفرقة عبر وحدات متعددة في الخلفية',
    ],
    whenNotToUse: [
      'لا تستخدم الوكلاء الفرعيين لتعديل ملف واحد بسيط (زيادة في التعقيد والوقت)',
    ],
    prerequisites: ['فهم إدارة العمليات المتوازية والمجالات المعزولة'],
    relatedNodeIds: ['skills', 'hooks', 'slash_commands', 'permissions'],
    learningPathIds: ['p3-advanced', 'p4-expert'],
    architectureDiagram: {
      inputs: ['مهمة استكشافية ضخمة'],
      process: ['توليد وكيل فرعي بهدف محدد وسياق نظيف', 'تنفيذ المهمة في العزل', 'إعادة ملخص مركز للوكيل الأب'],
      outputs: ['حل جاهز ومختبر دون التأثير على سياق الجلسة الرئيسية'],
    },
    codeExample: {
      language: 'markdown',
      filename: '.claude/agents/security-auditor.md',
      code: `---
name: Security Auditor
scope: read-only
tools: [bash, grep, file_view]
---

أنت وكيل فرعي متخصص في التدقيق الأمني لملفات الشفرة:
- صلاحياتك للقراءة والبحث فقط، وتمنع من كتابة أو تعديل أي ملف.
- ابحث عن أي استخدام غير آمن لـ \`eval()\` أو مفاتيح API مكشوفة في الكود.
- ارفع تقريرك النهائي للوكيل الرئيسي متضمناً رقم السطر والحل المقترح.`,
      description: 'مواصفة وكيل فرعي بصلاحيات قراءة فقط مخصص للتدقيق الأمني.',
    },
    keyTakeaways: [
      'الوكيل الفرعي يعمل في سياق معزول ومخصص.',
      'تحديد صلاحيات ضيقة للوكلاء الفرعيين يحمي مشروعك من التعديلات غير المرغوبة.',
    ],
  },
  {
    id: 'hooks',
    slug: 'lifecycle-hooks',
    name: {
      ar: 'خطافات دورة حياة التنفيذ',
      en: 'Execution Lifecycle Hooks',
    },
    tagline: {
      ar: 'تشغيل سكريبتات آلية قبل وبعد تنفيذ الأوامر، أو عند حدوث أخطاء محددة',
      en: 'Automated scripts executed pre-tool, post-tool, or on specific events in Claude Code',
    },
    category: 'automation',
    difficulty: 'advanced',
    status: 'official',
    estimatedMinutes: 25,
    iconName: 'Workflow',
    summary: {
      ar: 'خطافات برمجية (Hooks) يتم تفعيلها تلقائياً عند أحداث محددة في دورة حياة Claude Code (مثل قبل تنفيذ أمر Bash، بعد حفظ ملف، أو عند حدوث خطأ)، لتطبيق سياسات تدقيق وتنسيق تلقائية.',
      en: 'Lifecycle triggers that execute local scripts automatically before/after tool runs or on system errors.',
    },
    whyItMatters: {
      ar: 'تضمن تطبيق معايير الأمان وتنسيق الكود تلقائياً (مثل تشغيل Prettier بعد كل تعديل) دون الحاجة لتذكير المساعد بذلك في كل مرة.',
      en: 'Guarantees project governance, auto-formatting, and security validation deterministically.',
    },
    whenToUse: [
      'لتشغيل Prettier أو ESLint تلقائياً فور كتابة أي ملف بواسطة المساعد',
      'لمنع تنفيذ أوامر Bash خطيرة (مثل `rm -rf` أو مسار الإنتاج)',
      'لإرسال إشعار للمطور فور انتهاء مهمة استغرقت وقتاً طويلاً',
    ],
    whenNotToUse: [
      'لا تضع سكريبتات بطيئة في الخطافات المتكررة لئلا تؤخر استجابات المساعد',
    ],
    prerequisites: ['فهم دورة حياة الأحداث (Event-driven lifecycle)', 'كتابة برمجيات Bash النصية'],
    relatedNodeIds: ['permissions', 'security', 'slash_commands', 'subagents'],
    learningPathIds: ['p3-advanced', 'p4-expert'],
    architectureDiagram: {
      inputs: ['حدث داخلي: كتابة ملف أو تنفيذ أمر'],
      process: ['اعتراض الحدث بواسطة Hook محلي', 'تنفيذ سكريبت الفحص والتحقق', 'السماح أو الإلغاء مع رسالة خطأ'],
      outputs: ['حماية وحوكمة حتمية ومؤتمتة بالكامل'],
    },
    codeExample: {
      language: 'json',
      filename: '.claude/hooks.json',
      code: `{\n  "hooks": {\n    "post_file_write": "npx prettier --write \${FILE_PATH}",\n    "pre_bash_execute": "node .claude/scripts/validate-command.js \${COMMAND}"\n  }\n}`,
      description: 'ملف إعدادات يحدد خطاف لتنسيق الملفات تلقائياً وخطاف لفحص أوامر Bash قبل تشغيلها.',
    },
    keyTakeaways: [
      'الخطافات تفرض القواعد بشكل حتمي على مستوى النظام، وليس فقط عبر النصائح اللغوية.',
      'ممتازة للأتمتة الخفية التي ترفع جودة الكود دون إزعاج المطور.',
    ],
  },

  // ==========================================
  // GROUP 4: TOOLS AND INTEGRATIONS (الأدوات والتكاملات)
  // ==========================================
  {
    id: 'mcp',
    slug: 'mcp-architecture',
    name: {
      ar: 'بروتوكول سياق النماذج MCP',
      en: 'Model Context Protocol (MCP)',
    },
    tagline: {
      ar: 'الربط الآمن والموحد بين Claude وقواعد البيانات والخدمات السحابية والأدوات',
      en: 'The open standard for connecting Claude to databases, APIs, dev tools, and external context',
    },
    category: 'tools_integrations',
    difficulty: 'advanced',
    status: 'official',
    estimatedMinutes: 30,
    iconName: 'Boxes',
    summary: {
      ar: 'بروتوكول مفتوح المصدر (MCP) ابتكره Anthropic لتوحيد اتصال نماذج الذكاء الاصطناعي مع الأنظمة الخارجية: قواعد بيانات، مستودعات GitHub، خوادم Slack، وأدوات المطورين.',
      en: 'An open protocol enabling seamless, secure integration between Claude Code and local or remote data providers and execution servers.',
    },
    whyItMatters: {
      ar: 'يحرر Claude Code من العزلة؛ فيمكنه الاستعلام مباشرة من قاعدة بيانات Postgres أو سحب قضايا Jira وتحديثها أثناء كتابة الكود.',
      en: 'Transforms Claude from a local text tool into a connected system orchestrator with live real-world data.',
    },
    whenToUse: [
      'للربط مع قاعدة بيانات محلية أو سحابية وقراءة المخططات الفعلية والجداول',
      'للربط مع خدمات سحابية مثل AWS أو Cloudflare أو Docker',
      'لاستخدام أدوات بحث متقدمة وتصفح المستندات الحية',
    ],
    whenNotToUse: [
      'لا تقم بربط خوادم MCP غير موثوقة أو غير معروفة المصدر بحساباتك الإنتاجية',
    ],
    prerequisites: ['فهم بنية خادم/عميل Client-Server', 'التعامل مع ملفات JSON الإعدادية'],
    relatedNodeIds: ['files_folders', 'github', 'integrations', 'security'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['طلب استعلام من Claude Code'],
      process: ['إرسال استدعاء JSON-RPC لخادم MCP', 'الخادم ينفذ العملية بأمان', 'إرجاع البيانات المعيارية للمساعد'],
      outputs: ['بيانات حية ومحدثة من النظام الخارجي مدمجة في الحل البرمجي'],
    },
    codeExample: {
      language: 'json',
      filename: '.claude/mcp.json',
      code: `{\n  "mcpServers": {\n    "postgres-db": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost:5432/app_db"]\n    },\n    "github-tools": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": {\n        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."\n      }\n    }\n  }\n}`,
      description: 'تهيئة خادمي MCP: خادم قاعدة بيانات Postgres محلي وخادم GitHub API.',
    },
    keyTakeaways: [
      'بروتوكول MCP هو المعيار القياسي لتوسيع قدرات Claude Code خارج حدود الطرفية المحلية.',
      'تدار الأذونات والأمان بدقة بحيث يمكنك التحكم بما يقرأه الخادم وينفذه.',
    ],
  },
  {
    id: 'files_folders',
    slug: 'files-and-folders-navigation',
    name: {
      ar: 'الملفات والمجلدات وهيكل المشروع',
      en: 'Files, Folders & Globbing',
    },
    tagline: {
      ar: 'استكشاف المستودعات، قراءة الشفرات، واستخدام أنماط Globbing بدقة وسرعة',
      en: 'Efficient repo exploration, smart file viewing, editing, and glob patterns',
    },
    category: 'tools_integrations',
    difficulty: 'beginner',
    status: 'official',
    estimatedMinutes: 15,
    iconName: 'FolderTree',
    summary: {
      ar: 'الأدوات الداخلية التي يستخدمها Claude Code للتعامل مع ملفات نظامك: تصفح شجرة المجلدات، البحث بالأنماط (Globbing وGrep)، والتعديل الجراحي المحدد على الملفات دون استهلاك غير ضروري.',
      en: 'Built-in tools in Claude Code for traversing filesystem structures, fast pattern matching via glob, surgical editing, and directory mapping.',
    },
    whyItMatters: {
      ar: 'فهم كيفية وصول Claude لملفاتك يجعلك تصوغ موجهات توجهه فوراً إلى الملفات الدقيقة وتتجنب قراءة ملفات ضخمة تعطل الجلسة.',
      en: 'Allows you to direct the model to precise project files, speeding up search and saving massive token costs.',
    },
    whenToUse: [
      'للبحث السريع عن نمط كود عبر كامل المشروع: `src/**/*.tsx`',
      'لقراءة وفهم بنية المجلدات في مشروع جديد تم استنساخه مؤخراً',
      'للتعديل الجراحي على جزء محدد من ملف دون إتلاف بقية الأكواد',
    ],
    whenNotToUse: [
      'لا تطلب منه قراءة ملفات ثنائية (Binaries) أو صور أو حزم مضغوطة عبر أدوات النصوص',
    ],
    prerequisites: ['أساسيات تنظيم الملفات في نظام التشغيل', 'أنماط Globbing البسيطة'],
    relatedNodeIds: ['mcp', 'github', 'integrations', 'context'],
    learningPathIds: ['p1-foundations', 'p2-workflows'],
    architectureDiagram: {
      inputs: ['اسم ملف أو نمط بحث مثل `src/components/*.tsx`'],
      process: ['فحص مطابقة المسار واستبعاد `.claudeignore`', 'قراءة سريعة واستخراج الأسطر المستهدفة'],
      outputs: ['سياق نظيف ودقيق جاهز للتعديل الفوري'],
    },
    codeExample: {
      language: 'bash',
      filename: 'terminal-search.sh',
      code: `# استعراض ملفات الواجهة بنمط Globbing\nclaude "ابحث في src/components/**/*.tsx عن أي مكون يستخدم useFetch القديم واقترح تحويله إلى TanStack Query"`,
      description: 'توجيه Claude للبحث في مسارات محددة باستخدام نمط Globbing لتوفير الوقت والسياق.',
    },
    keyTakeaways: [
      'تحديد المسارات الدقيقة يقلل من وقت استكشاف المساعد ويوفر رصيد التوكنات.',
      'Claude يتجنب تلقائياً الملفات المدرجة في `.gitignore` و`.claudeignore`.',
    ],
  },
  {
    id: 'github',
    slug: 'github-workflow-integration',
    name: {
      ar: 'تكاملات GitHub وطلبات السحب',
      en: 'GitHub PR & Issues Integration',
    },
    tagline: {
      ar: 'إدارة طلبات السحب، ربط التذاكر، وأتمتة مراجعة الفروع عبر Git',
      en: 'Automating pull request creation, reviewing branches, and integrating with GitHub issues',
    },
    category: 'tools_integrations',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 20,
    iconName: 'GitPullRequest',
    summary: {
      ar: 'الربط المباشر بين Claude Code وأدوات Git وGitHub CLI (`gh`): إنشاء الفروع، صياغة طلبات السحب، فحص الفروق (Diffs)، وتلخيص المشكلات (Issues) وحلها برمجياً.',
      en: 'Deep native interoperability with Git and GitHub CLI for branch automation, PR reviews, and issue resolution.',
    },
    whyItMatters: {
      ar: 'ينقل دور المساعد من مجرد محرر نصوص إلى عضو فريق يشارك في دورة مراجعة الكود المؤسسية وإغلاق التذاكر.',
      en: 'Streamlines the developer loop from local bugfix to reviewed and merged GitHub pull request.',
    },
    whenToUse: [
      'لتحليل فرع كامل وصياغة طلب سحب مفصل بجميع التغييرات المعمارية',
      'لمراجعة طلب سحب زميل قبل دمجه وتقديم ملاحظات تدقيق موضوعية',
      'لحل تذكرة GitHub Issue مباشرة وقراءة متطلباتها من الطرفية',
    ],
    whenNotToUse: [
      'لا تجعل المساعد يدمج (Merge) طلبات السحب في الفروع الإنتاجية تلقائياً دون مراجعة بشرية أخيرة',
    ],
    prerequisites: ['استخدام Git الأساسي', 'تثبيت أداة GitHub CLI `gh`'],
    relatedNodeIds: ['mcp', 'files_folders', 'integrations', 'audit_review'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['تذكرة GitHub أو فرع قيد المراجعة'],
      process: ['استدعاء gh pr diff', 'تحليل الاختلافات وتوليد مراجعة تفصيلية', 'صياغة تقرير الدمج'],
      outputs: ['طلب سحب احترافي مع تعليقات مراجعة دقيقة'],
    },
    codeExample: {
      language: 'bash',
      filename: 'gh-workflow.sh',
      code: `# مراجعة طلب سحب بالرقم 142 وإصدار تقرير معماري\nclaude "راجع PR #142 باستخدام gh pr diff ولخص تأثير التغييرات على أداء التطبيق"`,
      description: 'استدعاء تحليل ومراجعة طلب سحب مباشرة عبر أداة GitHub CLI.',
    },
    keyTakeaways: [
      'تكامل GitHub يجعل المساعد فاعلاً في دورة الحياة التعاونية لفريق التطوير.',
      'يمكن صياغة رسائل Commit وPR Descriptions بدقة رياضية مذهلة.',
    ],
  },
  {
    id: 'integrations',
    slug: 'ide-terminal-cicd-integrations',
    name: {
      ar: 'التكامل مع بيئات العمل',
      en: 'IDE, Terminal & CI/CD Integrations',
    },
    tagline: {
      ar: 'ربط Claude Code بـ VS Code وtmux وخطوط أنابيب GitHub Actions بسلاسة',
      en: 'Integrating Claude Code with VS Code, terminal multiplexers, and GitHub Actions pipelines',
    },
    category: 'tools_integrations',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 25,
    iconName: 'Layers',
    summary: {
      ar: 'كيف تدمج Claude Code بسلاسة في سير عملك اليومي: العمل داخل VS Code Terminal مع اختصارات لوحة المفاتيح، الاستفادة من بيئات tmux، وتشغيل فحوصات Claude آلياً داخل خطوط أنابيب GitHub Actions.',
      en: 'Maximizing developer velocity by binding Claude Code into IDE terminals, multiplexers, and CI workflows.',
    },
    whyItMatters: {
      ar: 'يوفر عليك التبديل المستمر بين النوافذ ويجعل المساعد جزءاً طبيعياً من بيئة التطوير المفضلة لديك دون إبطاء لسرعتك.',
      en: 'Removes context-switching friction and integrates intelligent auditing into your deployment pipeline.',
    },
    whenToUse: [
      'لإعداد بيئة شاشات مقسمة (Split Terminal) تتيح مراقبة الخادم ومحادثة Claude في نفس الوقت',
      'لتشغيل فحص تلقائي لمراجعة طلبات السحب (PR Reviews) في GitHub Actions',
      'لربط إشعارات سطح المكتب فور انتهاء المهام الطويلة',
    ],
    whenNotToUse: [
      'لا تشغل أوامر طويلة غير مراقبة دون وضع سقف أقصى للوقت والتكلفة (Timeouts & Budgets)',
    ],
    prerequisites: ['استخدام الطرفية المتقدم ومحررات الأكواد', 'معرفة بـ CI/CD YAML'],
    relatedNodeIds: ['mcp', 'files_folders', 'github', 'projects'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['حدث إنشاء Pull Request في GitHub'],
      process: ['تشغيل Claude Code في خط أنابيب CI بدون تفاعل (Headless)', 'تنفيذ أمر /review-pr', 'كتابة التعليقات في الـ PR'],
      outputs: ['مراجعة برمجية معمارية شاملة جاهزة في غضون ثوانٍ'],
    },
    codeExample: {
      language: 'yaml',
      filename: '.github/workflows/claude-audit.yml',
      code: `name: Claude Architectural Audit\non: [pull_request]\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Claude PR Audit\n        env:\n          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}\n        run: |\n          npx @anthropic-ai/claude-code /review-pr`,
      description: 'نموذج لسير عمل GitHub Actions يشغل مراجعة معمارية لطلبات الدمج آلياً.',
    },
    keyTakeaways: [
      'Claude Code يمكن تشغيله كأداة تفاعلية في الطرفية أو كأداة غير تفاعلية Headless في CI/CD.',
      'تكامل المساعد مع أدواتك الحالية يضاعف سرعة فريق التطوير.',
    ],
  },

  // ==========================================
  // GROUP 5: WORKFLOWS (سلاسل العمل والتشغيل)
  // ==========================================
  {
    id: 'projects',
    slug: 'projects-monorepos-architecture',
    name: {
      ar: 'إدارة المشاريع الكبيرة',
      en: 'Multi-Project & Monorepos',
    },
    tagline: {
      ar: 'التعامل مع المستودعات الضخمة، تقسيم المهام، وعزل حزم العمل في Monorepos',
      en: 'Architecting Claude Code workflows for massive codebases, monorepos, and multi-package repos',
    },
    category: 'workflows',
    difficulty: 'advanced',
    status: 'official',
    estimatedMinutes: 25,
    iconName: 'FolderGit2',
    summary: {
      ar: 'استراتيجيات تشغيل Claude Code بكفاءة عالية داخل المشاريع الضخمة التي تحتوي على مئات آلاف الأسطر، واستخدام مسارات العمل المجزأة لتفادي استنزاف السياق وضمان دقة التعديل.',
      en: 'Scoping strategies for multi-project repositories, monorepos (Turborepo, Nx), and large enterprise systems.',
    },
    whyItMatters: {
      ar: 'في المشاريع الضخمة، إذا تركت المساعد يبحث بشكل عشوائي سيتشتت سياقه فوراً وتتدهور جودة إجاباته. الاستراتيجية الصحيحة تضمن بقاءه سريعاً ودقيقاً.',
      en: 'Essential for enterprise engineering teams working on monorepos with hundreds of thousands of lines of code.',
    },
    whenToUse: [
      'في مستودعات Turborepo أو Nx أو Cargo Workspaces',
      'عند تحديث مكتبة مشتركة مستخدمة في أكثر من تطبيق داخل نفس المستودع',
      'لتنظيم ملفات CLAUDE.md فرعية داخل كل مجلد حزمة على حدة',
    ],
    whenNotToUse: [
      'لا تطلق أوامر شاملة على كامل الـ Monorepo دفعة واحدة دون تحديد نطاق الحزم',
    ],
    prerequisites: ['مفاهيم Monorepo وهندسة النظم الموزعة'],
    relatedNodeIds: ['tasks', 'reports', 'playbooks', 'claude_md'],
    learningPathIds: ['p3-advanced', 'p4-expert'],
    architectureDiagram: {
      inputs: ['مستودع ضخم متعدد الحزم والمجلدات'],
      process: ['تحديد الحزمة المستهدفة', 'تطبيق ملف CLAUDE.md المحلي للحزمة', 'عزل سياق التعديل'],
      outputs: ['تطوير سريع ومستقر خالٍ من تلوث السياق بين الحزم'],
    },
    codeExample: {
      language: 'bash',
      filename: 'monorepo-scope.sh',
      code: `# تشغيل Claude Code داخل مسار حزمة محددة فقط في المستودع الضخم\ncd packages/payment-service\nclaude "تحديث تكامل Stripe SDK إلى الإصدار 14 مع تشغيل اختبارات هذه الحزمة فقط"`,
      description: 'حصر عمل Claude Code داخل مجلد الحزمة المستهدفة لتوفير السياق وضمان السرعة.',
    },
    keyTakeaways: [
      'في الـ Monorepo، ضع ملف CLAUDE.md في كل حزمة فرعية بجانب الملف الجذري.',
      'تشغيل المساعد في مجلد الحزمة يقلل من حجم شجرة الملفات المحللة بنسبة 90%.',
    ],
  },
  {
    id: 'tasks',
    slug: 'tasks-execution-pipelines',
    name: {
      ar: 'المهام وسير التنفيذ',
      en: 'Tasks & Execution Pipelines',
    },
    tagline: {
      ar: 'تقسيم الأهداف الضخمة إلى مهام مرحلية متسلسلة مع نقاط تحقق واختبار',
      en: 'Deconstructing massive goals into verifiable incremental milestones with test checkpoints',
    },
    category: 'workflows',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 20,
    iconName: 'ListOrdered',
    summary: {
      ar: 'منهجية تحويل المشروعات المعقدة إلى خطة مهام مرحلية (Execution Roadmap) مع نقاط تحقق اختبارية حاسمة تضمن عدم الانتقال لخطوة جديدة إلا بعد استقرار الخطوة السابقة.',
      en: 'Structuring large implementation goals into sequential task checklists with intermediate compilation checkpoints.',
    },
    whyItMatters: {
      ar: 'المحاولة في حل مشكلة معقدة دفعة واحدة تؤدي غالباً لانهيار الكود وأخطاء التراجع. التدرج المرحلي هو ضمانة النجاح المعماري.',
      en: 'Prevents catastrophic regressions by forcing verified validation gates at each milestone.',
    },
    whenToUse: [
      'عند بناء ميزة جديدة كاملة تتضمن واجهة وقاعدة بيانات ومسارات API',
      'عند إجراء ترحيل لنسخة رئيسية (Major Version Migration)',
      'لمتابعة الإنجاز وضمان عدم ضياع أي متطلب فرعي',
    ],
    whenNotToUse: [
      'لا تعقد الأمور بإنشاء قوائم مهام ضخمة لتعديلات تافهة أو أسطر فردية',
    ],
    prerequisites: ['أساسيات التخطيط الهندسي وإدارة المشاريع الرشيقة'],
    relatedNodeIds: ['projects', 'reports', 'playbooks'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['ميزة جديدة ضخمة'],
      process: ['توليد قائمة مهام تتابعية', 'تنفيذ المهمة 1 -> فحص الاختبارات -> الانتقال للمهمة 2'],
      outputs: ['ميزة مكتملة ومختبرة خطوة بخطوة بأعلى موثوقية'],
    },
    codeExample: {
      language: 'markdown',
      filename: 'docs/task-plan.md',
      code: `## خطة تنفيذ ميزة المحفظة الإلكترونية\n\n- [x] الخطوة 1: إنشاء جداول قاعدة البيانات ومخطط Drizzle Schema.\n- [x] الخطوة 2: كتابة اختبارات الوحدة لدوال الرصيد والخصم.\n- [/] الخطوة 3: تنفيذ مسارات API الآمنة مع قفل العمليات (Row-level Locking).\n- [ ] الخطوة 4: ربط واجهة المستخدم مع التحقق من حالات الخطأ والشبكة.\n- [ ] الخطوة 5: تشغيل الاختبارات الشاملة (Integration Tests).`,
      description: 'سجل مهام مرحلي يوجه جلسات Claude Code بنقاط تحقق واضحة.',
    },
    keyTakeaways: [
      'المرحلية تمنع أخطاء التراجع وتبقي تركيز المساعد في أعلى مستوياته.',
      'طلب وضع قائمة مهام وتحديثها بعد كل خطوة يعطيك وضوحاً كاملاً في مسار التطوير.',
    ],
  },
  {
    id: 'reports',
    slug: 'architectural-reports',
    name: {
      ar: 'التقارير المعمارية وتوثيق التغييرات',
      en: 'Architectural Reports & Changelogs',
    },
    tagline: {
      ar: 'استخراج وثائق المعمارية، مخططات Mermaid، وسجلات التغيير المؤتمتة',
      en: 'Automated architectural documentation, Mermaid sequence diagrams, and release changelogs',
    },
    category: 'workflows',
    difficulty: 'intermediate',
    status: 'educational',
    estimatedMinutes: 20,
    iconName: 'FileText',
    summary: {
      ar: 'توظيف Claude Code لتوليد تقارير معمارية عالية الاحترافية، تشمل مخططات Mermaid التفاعلية، توثيق مسارات API، وسجلات التغيير (Changelogs) المتوافقة مع المعايير.',
      en: 'Leveraging Claude Code to generate comprehensive architecture reviews, Mermaid diagrams, and versioned changelogs.',
    },
    whyItMatters: {
      ar: 'التوثيق اليدوي غالباً ما يُهمل ويكون قديماً. أتمتة التقارير تجعل توثيق نظامك محدثاً بدقة مع كل تعديل كود.',
      en: 'Keeps team documentation continuously synced with actual codebase state without manual overhead.',
    },
    whenToUse: [
      'بعد الانتهاء من ميزة معقدة لتوثيق تدفق البيانات (Data Flow)',
      'عند تسليم المشروع لفريق صيانة جديد أو مطورين جدد (Onboarding)',
      'لإنشاء سجل تغييرات رسمي قبل إصدار نسخة جديدة',
    ],
    whenNotToUse: [
      'لا تولد تقارير تفصيلية ضخمة لتعديلات كود بسيطة لا تغير في المعمارية شيئاً',
    ],
    prerequisites: ['أساسيات لغة Mermaid للمخططات', 'معايير التوثيق التقني'],
    relatedNodeIds: ['projects', 'tasks', 'playbooks', 'context'],
    learningPathIds: ['p2-workflows', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['شفرات المشروع البرمجية وسجل التغييرات الحديثة'],
      process: ['تحليل العلاقات بين الوحدات', 'توليد مخطط تسلسلي بـ Mermaid', 'صياغة تقرير Markdown'],
      outputs: ['تقرير معماري شامل جاهز للمشاركة والنشر'],
    },
    codeExample: {
      language: 'markdown',
      filename: 'docs/architecture-summary.md',
      code: `## تدفق عملية الدفع\n\n\`\`\`mermaid\nsequenceDiagram\n  Client->>API Gateway: POST /checkout\n  API Gateway->>Payment Service: Validate Token\n  Payment Service->>Stripe: Charge Request\n  Stripe-->>Payment Service: Success\n  Payment Service->>Postgres DB: Update Balance\n  Payment Service-->>Client: 200 OK & Receipt\n\`\`\``,
      description: 'مخطط تسلسلي بصيغة Mermaid يولد تلقائياً لشرح تدفق العمليات.',
    },
    keyTakeaways: [
      'مخططات Mermaid المضمنة تجعل التوثيق مفهوماً بصرياً لجميع أعضاء الفريق.',
      'تحديث التوثيق فور انتهاء الكود يمنع تراكم الديون التقنية التوثيقية.',
    ],
  },
  {
    id: 'playbooks',
    slug: 'engineering-playbooks',
    name: {
      ar: 'أدلة التشغيل القياسية',
      en: 'Engineering Playbooks',
    },
    tagline: {
      ar: 'سيناريوهات تشغيل جاهزة للمطورين، مهندسي الموجهات، والمدراء التقنيين',
      en: 'Standard operational playbooks for fullstack devs, prompt engineers, CTOs, and technical writers',
    },
    category: 'workflows',
    difficulty: 'advanced',
    status: 'template',
    estimatedMinutes: 30,
    iconName: 'BookMarked',
    summary: {
      ar: 'أدلة تشغيل قياسية (SOPs) متكاملة تصف خطوة بخطوة كيفية التعامل مع التحديات الهندسية الكبرى بواسطة Claude Code، مخصصة للأدوار التقنية الأربعة الأساسية.',
      en: 'Curated scenario-based operating procedures guiding role-based architectural interventions with Claude Code.',
    },
    whyItMatters: {
      ar: 'تمنح الفريق مسارات مجربة ومختبرة للمهام الحساسة (مثل ترحيل قاعدة بيانات أو مراجعة أمنية عاجلة) وتضمن تطبيق أفضل الممارسات الموحدة.',
      en: 'Equips team leads and engineers with field-tested recipes for critical migrations and architectural reviews.',
    },
    whenToUse: [
      'عند بدء مشروع تحديث ضخم (Legacy Modernization)',
      'عند وضع بوابة جودة طلبات السحب (PR Gatekeeper)',
      'لأتمتة إنتاج التوثيق التقني ورسم المعماريات البرمجية',
    ],
    whenNotToUse: [
      'لا تعتبر الدليل قالباً جامداً؛ قم بتكييفه ليناسب خصوصيات نظامك ولغاتك',
    ],
    prerequisites: ['فهم معماريات التطبيقات المعاصرة', 'خبرة في إدارة سلاسل التطوير'],
    relatedNodeIds: ['projects', 'tasks', 'reports', 'audit_review'],
    learningPathIds: ['p3-advanced', 'p4-expert'],
    architectureDiagram: {
      inputs: ['سيناريو هندسي معقد (مثل تحديث مكتبة قديمة)'],
      process: ['تطبيق مراحل الدليل القياسي (تحليل، حصر، تنفيذ مرحلي، تحقق)'],
      outputs: ['إنجاز آمن ومنضبط للمهمة بدون مفاجآت'],
    },
    codeExample: {
      language: 'markdown',
      filename: 'playbooks/monorepo-modernize.md',
      code: `# دليل تحديث المستودعات الضخمة\n\n1. فحص الشفرات القديمة وتحديد التبعيات المتروكة.\n2. إنشاء خطة تغييرات مرحلية تعتمد على الاختبارات كبوابة أمان.\n3. تفعيل Extended Thinking لتحليل التأثيرات الجانبية عبر الحزم.\n4. توليد تقرير فحص التوافقية قبل الدمج النهائي.`,
      description: 'مقتطف من دليل تشغيل تحديث المستودعات المخصص للفرق الهندسية.',
    },
    keyTakeaways: [
      'أدلة التشغيل تنقل الخبرة المعمارية المتراكمة إلى إجراءات عملية واضحة.',
      'تساعد في تدريب المطورين الجدد على التعامل مع منظومة Claude Code باحترافية.',
    ],
  },

  // ==========================================
  // GROUP 6: GOVERNANCE AND SAFETY (الحوكمة والأمان)
  // ==========================================
  {
    id: 'permissions',
    slug: 'permission-matrix-sandboxing',
    name: {
      ar: 'مصفوفة الصلاحيات والأذونات',
      en: 'Permission Matrix & Sandboxing',
    },
    tagline: {
      ar: 'التحكم الدقيق في صلاحيات تنفيذ أوامر Bash، القراءة، والكتابة التلقائية',
      en: 'Granular control over command execution approvals, filesystem mutations, and tool boundaries',
    },
    category: 'governance_safety',
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 20,
    iconName: 'Sliders',
    summary: {
      ar: 'نظام حوكمة الصلاحيات في Claude Code: كيف تحدد الأوامر المسموح بتشغيلها تلقائياً بدون مقاطعتك، وتلك التي تتطلب موافقة صريحة، والبيئة المعزولة (Sandbox) التي تحمي نظامك.',
      en: 'The execution authorization model in Claude Code balancing developer velocity with strict security boundaries.',
    },
    whyItMatters: {
      ar: 'يمنحك الأمان التام أثناء تشغيل الذكاء الاصطناعي في بيئة التطوير الخاصة بك، ويمنع تنفيذ أوامر غير مقصودة قد تؤثر على نظام التشغيل أو البيانات.',
      en: 'Prevents accidental or malicious command execution while keeping developer flow smooth.',
    },
    whenToUse: [
      'للسماح بتشغيل أوامر البناء والاختبار التلقائية (`npm test`, `git status`)',
      'لفرض طلب تأكيد مسبق لأي أمر يتضمن حذف ملفات أو تعديل شبكات',
      'عند تشغيل Claude في وضع عدم المراقبة (Headless Mode) في بيئات CI',
    ],
    whenNotToUse: [
      'لا تعطل طلبات الموافقة (Auto-approve everything) إلا داخل حاويات Docker معزولة تماماً',
    ],
    prerequisites: ['فهم أذونات نظام التشغيل POSIX/Linux', 'أوامر سطر الأوامر الأساسية'],
    relatedNodeIds: ['security', 'audit_review', 'hooks', 'subagents'],
    learningPathIds: ['p1-foundations', 'p3-advanced'],
    architectureDiagram: {
      inputs: ['أمر مقترح من المساعد (مثل `rm -rf dist` أو `git commit`)'],
      process: ['مطابقة الأمر مع قائمة الأذونات المعتمدة', 'إذا كان آمناً: تشغيل تلقائي. إذا كان حساساً: طلب موافقة المطور'],
      outputs: ['تنفيذ آمن ومراقب بنسبة 100%'],
    },
    codeExample: {
      language: 'json',
      filename: '.claude/permissions.json',
      code: `{\n  "auto_approve": [\n    "git status",\n    "git diff",\n    "npm test",\n    "npm run lint"\n  ],\n  "require_approval": [\n    "git push *",\n    "npm publish",\n    "rm *",\n    "curl *"\n  ]\n}`,
      description: 'مصفوفة أذونات تفصل بين الأوامر الآمنة التي تعمل تلقائياً والأوامر الحساسة التي تتطلب موافقة.',
    },
    keyTakeaways: [
      'أنت المتحكم الأول والنهائي في كل ما يُنفذ في جهازك.',
      'مصفوفة الأذونات تمكنك من تحقيق السرعة القصوى مع الحفاظ على الأمان المطلق.',
    ],
  },
  {
    id: 'security',
    slug: 'security-secret-sanitization',
    name: {
      ar: 'الأمن وحماية البيانات',
      en: 'Security & Secret Sanitization',
    },
    tagline: {
      ar: 'منع تسريب المفاتيح، حجب البيانات الحساسة، والتصدي لحقن الموجهات الخبيثة',
      en: 'Preventing credential leakage, prompt injection defenses, and safe sandboxing practices',
    },
    category: 'governance_safety',
    difficulty: 'expert',
    status: 'official',
    estimatedMinutes: 30,
    iconName: 'ShieldCheck',
    summary: {
      ar: 'أفضل الممارسات الأمنية للتعامل مع أدوات الذكاء الاصطناعي في بيئة المطورين: كيفية منع تسريب ملفات `.env` ومفاتيح API في السياق، وتفادي هجمات حقن الأوامر غير المباشرة (Indirect Prompt Injection) من حزم npm غير الموثوقة.',
      en: 'Hardening developer environments against prompt injection, secret leaks, and unverified package dependencies.',
    },
    whyItMatters: {
      ar: 'حماية أمن الشركة وبيانات المستخدمين من أي تسريب غير مقصود أثناء تفاعل المساعد مع الملفات والخدمات السحابية.',
      en: 'Guarantees compliance and protects enterprise secrets from unintentional exposure to remote contexts.',
    },
    whenToUse: [
      'عند تهيئة مشروع جديد يحتوي على مفاتيح سرية وبيئات إنتاجية',
      'قبل السماح لـ Claude بقراءة ملفات من مصادر خارجية أو صفحات ويب غير موثوقة',
      'لإعداد قواعد تدقيق مشددة تمنع إرسال أي رمز أمان في موجهات الاستعلام',
    ],
    whenNotToUse: [
      'لا تعتبر أن أدوات الفحص الأمني تغنيك عن تطبيق أفضل ممارسات إدارة الأسرار مثل Vault أو Secret Manager',
    ],
    prerequisites: ['مبادئ أمن المعلومات OWASP', 'إدارة المتغيرات البيئية والتشفير'],
    relatedNodeIds: ['permissions', 'audit_review', 'hooks', 'claude_md'],
    learningPathIds: ['p3-advanced', 'p4-expert'],
    architectureDiagram: {
      inputs: ['ملفات المشروع ومخرجات الأوامر'],
      process: ['فحص Regex لحجب المفاتيح والأسرار', 'تطبيق عزل سياق البيئة المحمية', 'منع تنفيذ البرمجيات النصية المشبوهة'],
      outputs: ['سياق عمل آمن تماماً خالٍ من أي بيانات اعتماد مكشوفة'],
    },
    codeExample: {
      language: 'bash',
      filename: '.claudeignore',
      code: `# حجب الأسرار والمتغيرات الحساسة تماماً عن سياق Claude\n.env\n.env.*\n*.pem\n*.key\ncredentials.json\nsecrets/\n\n# حجب مخرجات البناء وملفات القفل الضخمة\nnode_modules/\ndist/\npackage-lock.json\n*.log`,
      description: 'ملف `.claudeignore` مثالي لحجب ملفات الأسرار وسجلات النظام الحساسة.',
    },
    keyTakeaways: [
      'الملفات المحجوبة في `.claudeignore` لن تُقرأ ولن تُرفع لسياق النموذج أبداً.',
      'احذر من فتح ملفات HTML أو Markdown من مصادر مجهولة تحتوي على تعليمات حقن موجهات خبيثة.',
    ],
  },
  {
    id: 'audit_review',
    slug: 'audit-and-review-gatekeeper',
    name: {
      ar: 'التدقيق ومراجعة الكود',
      en: 'Audit & Code Review Gatekeeper',
    },
    tagline: {
      ar: 'بوابة تدقيق معمارية حازمة لفحص جودة طلبات السحب واكتشاف الانحرافات',
      en: 'Architectural PR gatekeeping, automated code health checks, and drift detection',
    },
    category: 'governance_safety',
    difficulty: 'advanced',
    status: 'official',
    estimatedMinutes: 25,
    iconName: 'CheckSquare',
    summary: {
      ar: 'إطار تدقيق آلي يفحص التغييرات البرمجية قبل دمجها: مطابقة بنية الشفرات مع دستور CLAUDE.md، اكتشاف أي انحراف معماري (Architectural Drift)، وضمان خلو الكود من التراجعات غير المقصودة.',
      en: 'Automated architectural verification framework checking code diffs against project rules before merge.',
    },
    whyItMatters: {
      ar: 'يحافظ على تماسك المعمارية مع نمو المشروع وفريق العمل، ويمنع تراكم الديون التقنية الناتجة عن التعديلات المتسرعة.',
      en: 'Maintains codebase integrity as teams scale, catching stylistic and architectural regressions early.',
    },
    whenToUse: [
      'قبل دمج أي طلب سحب (Pull Request) في الفرع الرئيسي',
      'في التدقيق الدوري للمشروع لاكتشاف الملفات المتروكة أو المهملة',
      'للتأكد من التزام جميع أعضاء الفريق بالقواعد المعمارية دون إحراج شخصي',
    ],
    whenNotToUse: [
      'لا تجعل التدقيق الآلي بديلاً كاملاً عن النقاش البشري المعماري في القرارات الكبرى',
    ],
    prerequisites: ['معايير جودة الشفرات البرمجية', 'فحص الفروقات بـ Git'],
    relatedNodeIds: ['permissions', 'security', 'github', 'claude_md'],
    learningPathIds: ['p3-advanced', 'p4-expert'],
    architectureDiagram: {
      inputs: ['تغييرات الكود الحديثة (Git Diff)'],
      process: ['مطابقة التغييرات مع قواعد CLAUDE.md', 'فحص تغطية الاختبارات والأنواع', 'إصدار تقرير القبول أو الرفض المسبب'],
      outputs: ['تقرير تدقيق موضوعي يعزز موثوقية المنتج النهائي'],
    },
    codeExample: {
      language: 'markdown',
      filename: '.claude/commands/audit-diff.md',
      code: `---
description: تدقيق معايير الجودة والانحراف المعماري
---

قم بفحص جميع الملفات المعدلة في الفرع الحالي وتحقق من:
1. هل تمت إضافة أي تبعية خارجية بدون توثيق السبب في PR؟
2. هل التزمت كل الدوال الجديدة بتسجيل الأخطاء ومعالجتها؟
3. هل مؤشرات TypeScript سليمة بدون استخدام \`as any\`؟
إذا وجدت مخالفات، اذكر رقم السطر والاقتراح البديل المناسب.`,
      description: 'أمر تدقيق مخصص لفحص الجودة والانحراف المعماري في فروع العمل.',
    },
    keyTakeaways: [
      'التدقيق المعماري يحمي المشروع من التدهور التدريجي لجودة الكود.',
      'الربط بين قواعد المشروع والتدقيق الآلي يخلق منظومة تطوير ذاتية التصحيح.',
    ],
  },
];

export const CAPABILITIES: CapabilityNode[] = RAW_CAPABILITIES.map((cap) => {
  const enrichment = CAPABILITY_ENRICHMENTS[cap.id];
  return enrichment ? { ...cap, ...enrichment } : cap;
});

