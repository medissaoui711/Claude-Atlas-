import { LearningPath } from '../types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    level: 1,
    id: 'path-understanding-system',
    title: {
      ar: 'المسار الأول: فهم المنظومة',
      en: 'Path 1: Understanding the System',
    },
    subtitle: {
      ar: 'النموذج الذهني الأساسي، نافذة السياق، ودور محركات التفكير في Claude Code',
      en: 'Foundational mental model, context window, and model reasoning engines',
    },
    description: {
      ar: 'استكشف الفلسفة الهندسية خلف Claude Code كوكيل طرفية، وكيف يتفاعل السياق مع النماذج لتنفيذ المهام.',
      en: 'Explore the engineering philosophy behind Claude Code as a terminal agent.',
    },
    duration: '35 دقيقة',
    unitsCount: 4,
    difficulty: 'beginner',
    badge: {
      ar: 'المستكشف الأولي',
      en: 'System Explorer',
    },
    color: '#3B82F6',
    capabilityIds: ['models', 'context'],
    units: [
      {
        id: 'p1-l1',
        title: {
          ar: 'ما هو Claude Code؟',
          en: 'What is Claude Code?',
        },
        capabilityId: 'models',
        durationMinutes: 8,
        description: {
          ar: 'فهم الفارق الجوهري بين المساعد النصي العادي ووكيل الطرفية القادر على قراءة المستودعات وتنفيذ الأدوات.',
          en: 'Differentiate between conversational chatbots and an agentic CLI tool runner.',
        },
      },
      {
        id: 'p1-l2',
        title: {
          ar: 'كيف يعمل السياق؟',
          en: 'How Context Works?',
        },
        capabilityId: 'context',
        durationMinutes: 10,
        description: {
          ar: 'آلية إدارة نافذة الرموز (200k tokens)، متى يمتلئ السياق، وكيف يتم ضغطه للحفاظ على جودة المخرجات.',
          en: 'How context tokens are consumed, managed, and compressed via /compact.',
        },
      },
      {
        id: 'p1-l3',
        title: {
          ar: 'ما دور النماذج؟',
          en: 'The Role of Models & Extended Thinking',
        },
        capabilityId: 'models',
        durationMinutes: 9,
        description: {
          ar: 'الفروق بين Sonnet 3.7 وOpus وHaiku، ومفهوم التفكير الهجين (Extended Thinking) لحل المشاكل الصعبة.',
          en: 'Model specialization and hybrid reasoning token allocation for complex bugs.',
        },
      },
      {
        id: 'p1-l4',
        title: {
          ar: 'كيف ترتبط مكونات المنظومة؟',
          en: 'How System Components Connect?',
        },
        capabilityId: 'workflows',
        durationMinutes: 8,
        description: {
          ar: 'نظرة شمولية على تكامل الذاكرة، الدستور، الأوامر، المهارات، والوكلاء في حلقة عمل متصلة.',
          en: 'Holistic overview of how memory, constitution, commands, skills, and agents connect.',
        },
      },
    ],
  },
  {
    level: 2,
    id: 'path-memory-context',
    title: {
      ar: 'المسار الثاني: الذاكرة وسياق المشروع',
      en: 'Path 2: Memory & Project Context',
    },
    subtitle: {
      ar: 'صياغة الدستور البرمجي، بنك الذاكرة التراكمي، وإدارة القواعد المستمرة',
      en: 'Crafting constitutions, persistent memory, and project rules',
    },
    description: {
      ar: 'تعلم كيف تحافظ على استمرارية المعرفة المعمارية لمشروعك عبر الجلسات دون إعادة الشرح.',
      en: 'Master cross-session architectural persistence and project rules without context pollution.',
    },
    duration: '45 دقيقة',
    unitsCount: 5,
    difficulty: 'intermediate',
    badge: {
      ar: 'مهندس السياق',
      en: 'Context Architect',
    },
    color: '#A855F7',
    capabilityIds: ['memory', 'claude_md', 'project_rules', 'auto_memory'],
    units: [
      {
        id: 'p2-l1',
        title: {
          ar: 'Memory',
          en: 'Memory Bank Architecture',
        },
        capabilityId: 'memory',
        durationMinutes: 10,
        description: {
          ar: 'بنية بنك المعرفة الدائم المخزن محلياً لتسجيل تفضيلات الفريق والقرارات المعمارية.',
          en: 'Local persistent memory architecture for storing technical decisions.',
        },
      },
      {
        id: 'p2-l2',
        title: {
          ar: 'CLAUDE.md',
          en: 'CLAUDE.md Constitution',
        },
        capabilityId: 'claude_md',
        durationMinutes: 10,
        description: {
          ar: 'دستور المشروع الإلزامي في جذر المستودع لتحديد أوامر البناء والمعايير والممنوعات.',
          en: 'The single source of truth defining build scripts, style rules, and constraints.',
        },
      },
      {
        id: 'p2-l3',
        title: {
          ar: 'Project Rules',
          en: 'Project Rules & Constraints',
        },
        capabilityId: 'project_rules',
        durationMinutes: 8,
        description: {
          ar: 'وضع قيود معمارية حازمة لحماية الملفات الأساسية وهندسة الطبقات البرمجية.',
          en: 'Defending core files and architectural boundaries with explicit rules.',
        },
      },
      {
        id: 'p2-l4',
        title: {
          ar: 'Auto Memory',
          en: 'Auto Memory Engine',
        },
        capabilityId: 'auto_memory',
        durationMinutes: 8,
        description: {
          ar: 'كيف يتعلم المساعد اختياراتك البرمجية تلقائياً ويوثقها للمستقبل.',
          en: 'Automatic capture of stylistic agreements and user conventions.',
        },
      },
      {
        id: 'p2-l5',
        title: {
          ar: 'الفرق بين التعليمات والذاكرة',
          en: 'Instructions vs. Memory',
        },
        capabilityId: 'claude_md',
        durationMinutes: 9,
        description: {
          ar: 'مقارنة مفصلة: متى توثق القاعدة في CLAUDE.md ومتى تتركها للذاكرة التراكمية.',
          en: 'Deep comparison: binding invariant rules vs evolving factual memory.',
        },
      },
    ],
  },
  {
    level: 3,
    id: 'path-commands-skills',
    title: {
      ar: 'المسار الثالث: الأوامر والمهارات',
      en: 'Path 3: Commands & Skills',
    },
    subtitle: {
      ar: 'الأوامر السريعة التفاعلية والمهارات البرمجية المجهزة بأدوات مساعدة',
      en: 'Interactive slash commands and specialized executable skills',
    },
    description: {
      ar: 'افهم الفرق بين أمر Slash سريع ومهارة Skill تخصصية، وكيف تصمم سير عمل عالي الجودة.',
      en: 'Learn when to leverage slash commands vs reusable skills, authoring verifiable outputs.',
    },
    duration: '45 دقيقة',
    unitsCount: 5,
    difficulty: 'intermediate',
    badge: {
      ar: 'خبير الأدوات',
      en: 'Tool Specialist',
    },
    color: '#14B8A6',
    capabilityIds: ['slash_commands', 'skills'],
    units: [
      {
        id: 'p3-l1',
        title: {
          ar: 'Slash Commands',
          en: 'Slash Commands Architecture',
        },
        capabilityId: 'slash_commands',
        durationMinutes: 10,
        description: {
          ar: 'بنية أوامر سطر الأوامر في .claude/commands/*.md واستقبال المعاملات المتغيرة.',
          en: 'Dynamic CLI commands with parameter substitution for rapid execution.',
        },
      },
      {
        id: 'p3-l2',
        title: {
          ar: 'Skills',
          en: 'Skills (SKILL.md) Packaging',
        },
        capabilityId: 'skills',
        durationMinutes: 10,
        description: {
          ar: 'معمارية حزم المهارات التي تجمع الإرشادات المتخصصة مع سكريبتات الفحص المرافقة.',
          en: 'Packaged domain knowledge with accompanying deterministic validation scripts.',
        },
      },
      {
        id: 'p3-l3',
        title: {
          ar: 'الفرق بين الأمر والمهارة',
          en: 'Commands vs. Skills: Deep Comparison',
        },
        capabilityId: 'slash_commands',
        durationMinutes: 8,
        description: {
          ar: 'مقارنة معمارية من حيث طريقة الاستدعاء، نطاق السياق، وقابلية إعادة الاستخدام.',
          en: 'Compare invocation, context scope, complexity, and tooling boundaries.',
        },
      },
      {
        id: 'p3-l4',
        title: {
          ar: 'متى تستخدم كل واحد؟',
          en: 'When to Use Each?',
        },
        capabilityId: 'skills',
        durationMinutes: 8,
        description: {
          ar: 'شجرة قرارات واضحة تحدد ما إذا كانت مهمتك تحتاج أمراً خفيفاً أم مهارة معقدة.',
          en: 'Decision framework mapping problem types to either commands or skills.',
        },
      },
      {
        id: 'p3-l5',
        title: {
          ar: 'كيف تصمم سير عمل واضحاً؟',
          en: 'Designing Clear Workflows',
        },
        capabilityId: 'workflows',
        durationMinutes: 9,
        description: {
          ar: 'مبادئ بناء خطوات قابلة للتحقق مع معايير إخراج صارمة وقوائم فحص دقيقة.',
          en: 'Design deterministic sequences with verifiable output schemas and checklists.',
        },
      },
    ],
  },
  {
    level: 4,
    id: 'path-subagents-automation',
    title: {
      ar: 'المسار الرابع: الوكلاء والأتمتة',
      en: 'Path 4: Subagents & Automation',
    },
    subtitle: {
      ar: 'عزل السياق للوكلاء الفرعيين، خطافات دورة الحياة، وبوابات المراجعة البشرية',
      en: 'Subagent context isolation, lifecycle event hooks, and human review gates',
    },
    description: {
      ar: 'تعلم كيف تعزل المهام الكثيفة عن المحادثة الرئيسية وتحمي مشروعك بأتمتة آمنة.',
      en: 'Understand context-isolated child workers and event-driven quality triggers.',
    },
    duration: '50 دقيقة',
    unitsCount: 5,
    difficulty: 'advanced',
    badge: {
      ar: 'معماري الوكلاء والأتمتة',
      en: 'Automation Architect',
    },
    color: '#EC4899',
    capabilityIds: ['subagents', 'hooks', 'permissions'],
    units: [
      {
        id: 'p4-l1',
        title: {
          ar: 'Subagents',
          en: 'Subagents Architecture',
        },
        capabilityId: 'subagents',
        durationMinutes: 12,
        description: {
          ar: 'المفهوم التعليمي لتفويض مهمة ثقيلة لوكيل فرعي مستقل بنطاق توكنات خاص.',
          en: 'Educational mental model for delegating heavy audits into an isolated subagent.',
        },
      },
      {
        id: 'p4-l2',
        title: {
          ar: 'Hooks',
          en: 'Hooks & Event Triggers',
        },
        capabilityId: 'hooks',
        durationMinutes: 10,
        description: {
          ar: 'فلسفة خطافات الأحداث: اعتراض العمليات قبل أو بعد تنفيذ الأدوات لفرض الجودة.',
          en: 'Event interception before and after tool runs to enforce formatting and tests.',
        },
      },
      {
        id: 'p4-l3',
        title: {
          ar: 'Permissions',
          en: 'Permissions & Execution Gates',
        },
        capabilityId: 'permissions',
        durationMinutes: 9,
        description: {
          ar: 'مصفوفة الصلاحيات، القائمة البيضاء لأوامر Bash، وحظر العمليات المدمرة.',
          en: 'Permission matrices, whitelisting safe scripts, and blocking destructive actions.',
        },
      },
      {
        id: 'p4-l4',
        title: {
          ar: 'العزل والسياق',
          en: 'Context Isolation & Scratchpads',
        },
        capabilityId: 'subagents',
        durationMinutes: 9,
        description: {
          ar: 'كيف يحمي عزل السياق المحادثة الأم من آلاف التوكنات الناتجة عن تصفح الملفات.',
          en: 'Why isolated subagents prevent token exhaustion in the parent conversation.',
        },
      },
      {
        id: 'p4-l5',
        title: {
          ar: 'المراجعة البشرية',
          en: 'Human-in-the-Loop Governance',
        },
        capabilityId: 'permissions',
        durationMinutes: 10,
        description: {
          ar: 'ضرورة وجود بوابة موافقة بشرية قبل اعتماد نتائج الوكلاء ودمج تغييرات الكود.',
          en: 'Enforcing human approval checkpoints before changes become permanent.',
        },
      },
    ],
  },
  {
    level: 5,
    id: 'path-building-workflow',
    title: {
      ar: 'المسار الخامس: بناء نموذج عمل',
      en: 'Path 5: Building Production Workflows',
    },
    subtitle: {
      ar: 'تكامل المنظومة بالكامل، أدلة التشغيل، التقارير المعمارية، والأمان الشامل',
      en: 'Orchestrating capabilities, operational playbooks, and security governance',
    },
    description: {
      ar: 'تعلم كيف تجمع كل مكونات المنظومة في نموذج عمل متماسك ومرن يخدم مشاريع الإنتاج الحقيقية.',
      en: 'Assemble all capabilities into an integrated, repeatable production workflow.',
    },
    duration: '55 دقيقة',
    unitsCount: 5,
    difficulty: 'expert',
    badge: {
      ar: 'قائد المنظومة المعمارية',
      en: 'Systems Lead',
    },
    color: '#22C55E',
    capabilityIds: ['workflows', 'playbooks', 'security', 'reports'],
    units: [
      {
        id: 'p5-l1',
        title: {
          ar: 'ربط القدرات معاً',
          en: 'Connecting Capabilities',
        },
        capabilityId: 'workflows',
        durationMinutes: 12,
        description: {
          ar: 'خريطة التفاعل المتبادل بين CLAUDE.md والذاكرة والأوامر والوكلاء في سياق تطوير واحد.',
          en: 'Cross-capability interaction flywheel from initial prompt to verified code.',
        },
      },
      {
        id: 'p5-l2',
        title: {
          ar: 'تصميم Workflow',
          en: 'Designing Robust Workflows',
        },
        capabilityId: 'workflows',
        durationMinutes: 12,
        description: {
          ar: 'هندسة سلاسل العمل المغلقة (مثل TDD Red-Green-Refactor) وضمان التحقق المرحلي.',
          en: 'Closed-loop workflow engineering with automated regression verification gates.',
        },
      },
      {
        id: 'p5-l3',
        title: {
          ar: 'بناء Playbook تعليمي',
          en: 'Authoring Educational Playbooks',
        },
        capabilityId: 'playbooks',
        durationMinutes: 10,
        description: {
          ar: 'تحويل المهام المتكررة (مثل ترقية إصدار أو فحص ثغرة) إلى سيناريو تشغيلي موثق.',
          en: 'Documenting multi-phase operational procedures for engineering teams.',
        },
      },
      {
        id: 'p5-l4',
        title: {
          ar: 'التحقق من المخرجات',
          en: 'Verifying Outputs & Automated Quality',
        },
        capabilityId: 'reports',
        durationMinutes: 10,
        description: {
          ar: 'معايير فحص جودة المخرجات، اختبارات التحقق، وكيفية التأكد من خلو الكود من الآثار الجانبية.',
          en: 'Output verification checklists, test assertions, and side-effect audits.',
        },
      },
      {
        id: 'p5-l5',
        title: {
          ar: 'الأمان والحوكمة',
          en: 'Security & Enterprise Governance',
        },
        capabilityId: 'security',
        durationMinutes: 11,
        description: {
          ar: 'حماية الأسرار ومفاتيح البيئة، تدقيق التبعيات، وسياسات الامتثال داخل الفريق.',
          en: 'Secrets sanitization, dependency auditing, and team-wide AI governance.',
        },
      },
    ],
  },
];
