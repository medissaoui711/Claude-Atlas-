import { Playbook } from '../types';

export const PLAYBOOKS: Playbook[] = [
  {
    id: 'monorepo-modernization',
    title: {
      ar: 'ترقية وإعادة هيكلة المستودعات الضخمة (Monorepo Modernization)',
      en: 'Monorepo Modernization & Zero-Regression Refactoring',
    },
    subtitle: {
      ar: 'دليل شامل لإعادة هيكلة الحزم المشتركة وتحديث المكتبات بدون كسر التوافق العكسي',
      en: 'Phased guide for large-scale package modernization and safe breaking-change prevention',
    },
    targetRole: 'fullstack',
    targetRoleLabel: {
      ar: 'مهندس برمجيات شامل (Full-Stack)',
      en: 'Full-Stack Developer',
    },
    difficulty: 'advanced',
    status: 'official',
    estimatedMinutes: 45,
    description: {
      ar: 'كيف تدير عملية تحديث معمارية واسعة عبر 20+ ملف في مستودع monorepo باستخدام ميزانية التفكير الممتد وحصر نطاق السياق عبر .claudeignore وأوامر الفحص المرحلية.',
      en: 'How to coordinate multi-package modernization across monorepos using extended reasoning budgets, tight scope barriers, and staged verification loops.',
    },
    prerequisites: [
      'معرفة بأدوات إدارة الحزم مثل pnpm workspaces أو Turborepo',
      'وجود ملف CLAUDE.md يحدد معايير الـ monorepo',
      'فهم لآلية استدعاء أداة git diff',
    ],
    requiredCapabilities: ['models', 'context', 'claude_md', 'hooks'],
    deliverables: [
      'شجرة اعتماديات محدثة بدون تعارضات بين الحزم',
      'تحديث تواقيع TypeScript مع الحفاظ على التوافق الخلفي',
      'تقرير تحقق آلي لنتائج اختبارات Vitest / Jest',
    ],
    proTips: [
      'استخدم `/compact` بعد كل حزمة يتم الانتهاء منها لمنع تراكم مخلفات السياق في النافذة.',
      'اطلب من Claude صراحة وضع خطة ذات 3 مراحل قبل تحرير أي ملف.',
      'عيّن صلاحية الكتابة فقط للحزمة المستهدفة لتجنب التعديلات العشوائية.',
    ],
    copyableSetupScript: `# 1. Set environment budget for deep monorepo analysis
export CLAUDE_THINKING_BUDGET=8000

# 2. Scope the workspace to target packages
echo "node_modules/\n.turbo/\npackages/*/dist/" >> .claudeignore

# 3. Launch Claude Code with strict project instructions
claude -p "Review packages/core for deprecated Node.js APIs according to CLAUDE.md"`,
    steps: [
      {
        stepNumber: 1,
        title: {
          ar: 'مسح التبعيات ورسم خريطة الاعتماديات',
          en: 'Dependency Topology Scan',
        },
        description: {
          ar: 'توجيه Claude لقراءة package.json في جذر المستودع والحزم الفرعية واستخراج شجرة الاعتماديات المتشابكة.',
          en: 'Direct Claude to read the workspace package manifests and map shared dependency linkages.',
        },
        commandSnippet: `pnpm recursive list --depth 1 > .claude/temp-deps.txt`,
        promptSnippet: `Read .claude/temp-deps.txt. Map out which packages import from @workspace/core. Identify any circular dependency risks before we start refactoring.`,
        expectedOutcome: {
          ar: 'قائمة مرتبة طوبولوجياً بالحزم التي يجب تحديثها أولاً بأول.',
          en: 'A topologically sorted list of packages indicating safe refactoring order.',
        },
      },
      {
        stepNumber: 2,
        title: {
          ar: 'تحديث الحزمة المركزية مع حظر كسر الواجهات (API Freeze)',
          en: 'Core Package Modernization with Frozen Surface',
        },
        description: {
          ar: 'إعادة كتابة الدوال الداخلية مع الإبقاء على ملفات d.ts والتواقيع المصدرة كما هي 100%.',
          en: 'Refactor internal logic while enforcing 100% backward-compatible public exports.',
        },
        commandSnippet: `claude -p "Refactor packages/core/src/utils without modifying exported function signatures. Run pnpm --filter @workspace/core test after each file."`,
        promptSnippet: `You are refactoring packages/core. You MUST NOT modify any exported function signatures or types in packages/core/src/index.ts. Validate against CLAUDE.md.`,
        expectedOutcome: {
          ar: 'اجتياز اختبارات الحزمة المركزية بنجاح مع تحسين الأداء وتقليص حجم الحزمة.',
          en: 'Core package passes test suite with zero public API breakage.',
        },
      },
      {
        stepNumber: 3,
        title: {
          ar: 'التحقق التدريجي من الحزم المستهلكة (Downstream Verification)',
          en: 'Downstream Consumer Verification Loop',
        },
        description: {
          ar: 'تشغيل اختبارات الحزم التابعة واحدة تلو الأخرى لضمان عدم حدوث أي انحدار خفي.',
          en: 'Run typechecks and tests across downstream consumers sequentially.',
        },
        commandSnippet: `pnpm turbo run test --filter=...@workspace/core`,
        promptSnippet: `Inspect the turbo test output. If any consumer fails, pinpoint if the issue is a silent type mismatch and fix with minimal delta.`,
        expectedOutcome: {
          ar: 'جميع الحزم الفرعية تبنى وتجتاز اختبارات التكامل بنجاح.',
          en: 'All consumer packages build cleanly with zero broken imports.',
        },
      },
    ],
  },
  {
    id: 'prompt-architecture',
    title: {
      ar: 'هندسة موجهات المشاريع الكبرى والتفكير الممتد',
      en: 'Enterprise Prompt Architecture & Extended Thinking',
    },
    subtitle: {
      ar: 'صياغة موجهات حتمية لسطر الأوامر تقلل الهلوسة وتضبط استهلاك الرموز',
      en: 'Crafting deterministic CLI prompts that eradicate hallucination and optimize token velocity',
    },
    targetRole: 'prompt_engineer',
    targetRoleLabel: {
      ar: 'مهندس موجهات (Prompt Engineer)',
      en: 'Prompt Engineer',
    },
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 35,
    description: {
      ar: 'تحويل أهداف الأعمال غير المحددة إلى موجهات سطر أوامر صارمة تستغل خاصية التفكير الممتد في Claude 3.7 Sonnet وتفرض مخرجات منظمة قابلة للدمج في خطوط الإنتاج.',
      en: 'Transforming vague business intents into deterministic CLI prompts utilizing Claude 3.7 Sonnet Extended Thinking with strict output constraints.',
    },
    prerequisites: [
      'فهم عميق لبنية موجهات Claude (System, User, Tool Results)',
      'التعامل مع ملفات التكوين .claude/config.json',
      'فهم ميزانيات التفكير (Thinking Token Budgets)',
    ],
    requiredCapabilities: ['prompt_engineering', 'models', 'context', 'reports'],
    deliverables: [
      'مكتبة موجهات منظمة بصيغة Markdown في .claude/commands/',
      'قالب تدقيق معماري يجبر النموذج على التفكير المتسلسل قبل الكتابة',
      'مؤشرات قياس سرعة ودقة المخرجات',
    ],
    proTips: [
      'حدد دائماً "سقف النطاق" (Scope Ceiling) صراحة في أول جملة من الموجه.',
      'امنع طباعة الأكواد الكاملة في الطرفية عندما تكون التعديلات طفيفة لتوفير التوكنات.',
      'استخدم تقنية "Think-Then-Verify" عبر إلزام الموديل بتشغيل الاختبارات قبل إعلان نجاح المهمة.',
    ],
    copyableSetupScript: `# Configure custom prompt for architectural review
cat << 'EOF' > .claude/commands/review-arch.md
---
description: "Audit working tree against enterprise architecture guidelines"
arguments: "[scope]"
---
Inspect the git diff of $ARGUMENTS.
Evaluate:
1. Architectural integrity vs CLAUDE.md
2. Security: Injection risks & secret leaks
3. Performance: Async bottlenecks
EOF`,
    steps: [
      {
        stepNumber: 1,
        title: {
          ar: 'هندسة سقف النطاق والحدود السلبية (Negative Constraints)',
          en: 'Defining Scope Ceiling & Negative Boundaries',
        },
        description: {
          ar: 'تحديد ما يجب على النموذج "عدم فعله" أولاً، لأن ذلك يوفر أكثر من 60% من التعديلات العشوائية.',
          en: 'Define explicit anti-patterns and negative boundaries first to eliminate speculative code creep.',
        },
        promptSnippet: `Task: Implement JWT refresh rotation.
STRICT NEGATIVE CONSTRAINTS:
- Do NOT install any new npm packages.
- Do NOT alter the database schema or migration files.
- Do NOT touch frontend auth components.
- Scope is strictly src/auth/refresh.ts and src/auth/refresh.test.ts.`,
        expectedOutcome: {
          ar: 'تركيز كامل على الملفات المعنية فقط بدون مساس ببقية أجزاء المشروع.',
          en: 'Surgical focus exclusively on specified target modules.',
        },
      },
      {
        stepNumber: 2,
        title: {
          ar: 'تفعيل ميزانية التفكير الحركي (Extended Thinking Tuning)',
          en: 'Extended Thinking Calibration',
        },
        description: {
          ar: 'معايرة ميزانية التفكير بين 2,000 للمهام السريعة إلى 12,000 للمهام الخوارزمية المعقدة.',
          en: 'Calibrate thinking tokens between 2k (routine) and 12k (complex state machines).',
        },
        commandSnippet: `claude --thinking 6000 -p "Analyze concurrent race conditions in src/queue/worker.ts"`,
        expectedOutcome: {
          ar: 'تفكير متعمق يفحص سيناريوهات التزامن قبل تعديل سطر برمجي واحد.',
          en: 'Deep reasoning chain surfacing edge cases prior to code mutation.',
        },
      },
    ],
  },
  {
    id: 'architectural-governance',
    title: {
      ar: 'الحوكمة المعمارية وبوابات جودة الدمج (PR Quality Gatekeeper)',
      en: 'Architectural Governance & PR Quality Gatekeeper',
    },
    subtitle: {
      ar: 'أتمتة مراجعة طلبات السحب وحماية الدستور البرمجي في خطوط التكامل المستمر CI',
      en: 'Automate pull request reviews and enforce CLAUDE.md compliance in CI pipelines',
    },
    targetRole: 'tech_lead',
    targetRoleLabel: {
      ar: 'مدير مشروع تقني / مهندس رئيسي',
      en: 'Technical PM / Lead Architect',
    },
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 30,
    description: {
      ar: 'بناء خط دفاع معماري آلي يراجع فروع Git قبل الدمج، ويكتشف الانحراف عن المعايير المعمارية (Architectural Drift)، ويولد تقارير مفصلة للمديرين التقنيين.',
      en: 'Building an automated architectural gatekeeper checking git diffs before merging, detecting system drift, and generating executive reports.',
    },
    prerequisites: [
      'وجود ملف CLAUDE.md مكتمل ومعتمد للفريق',
      'صلاحيات إعداد GitHub Actions أو GitLab CI',
      'إلمام بصيغ تقارير Markdown و SARIF',
    ],
    requiredCapabilities: ['claude_md', 'hooks', 'permissions', 'reports', 'security'],
    deliverables: [
      'سير عمل CI آلي يرفض طلبات السحب المخالفة للدستور',
      'خطاف Git محلي (pre-push hook) يمنع دفع كود غير متوافق',
      'لوحة تقارير دورية لانحراف الشفرة المعمارية',
    ],
    proTips: [
      'اجعل دستور CLAUDE.md المصدر الوحيد للحقيقة (Single Source of Truth) ولا تكرر القواعد في أماكن متعددة.',
      'فعّل وضع القراءة فقط (read-only mode) في CI لحماية المستودع من التعديل غير المقصود.',
      'استخدم وسوم واضحة للخطورة: [BLOCKER]، [WARNING]، [SUGGESTION].',
    ],
    copyableSetupScript: `# Create GitHub Action for Claude Code PR Gatekeeper
mkdir -p .github/workflows
cat << 'EOF' > .github/workflows/claude-gatekeeper.yml
name: Claude Architectural Gatekeeper
on: [pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Run Claude Code Audit
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npx @anthropic-ai/claude-code -p "Audit git diff origin/main...HEAD against CLAUDE.md. Output markdown table of compliance."
EOF`,
    steps: [
      {
        stepNumber: 1,
        title: {
          ar: 'تثبيت خطافات التحقق المحلية (Local Pre-Commit Hooks)',
          en: 'Installing Local Verification Hooks',
        },
        description: {
          ar: 'منع كتابة الكود غير المطابق للمواصفات على أجهزة المطورين قبل الدفع للمستودع.',
          en: 'Catch architectural violations locally before code hits remote branches.',
        },
        commandSnippet: `echo 'npx @anthropic-ai/claude-code -p "Verify staged files match CLAUDE.md guidelines"' > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`,
        expectedOutcome: {
          ar: 'فحص فوري في أقل من 5 ثوانٍ لكل عملية Commit.',
          en: 'Sub-5-second local validation on every commit attempt.',
        },
      },
      {
        stepNumber: 2,
        title: {
          ar: 'توليد تقرير التدقيق المعماري التنفيذي',
          en: 'Executive Architectural Audit Generation',
        },
        description: {
          ar: 'إنشاء ملخص عالي المستوى للمدير التقني يلخص نسبة الالتزام ومخاطر الأمان المحتملة.',
          en: 'Generate high-level compliance summaries highlighting security or performance risks.',
        },
        promptSnippet: `Generate an executive PR review report for branch origin/feature-checkout against main:
Include:
- Summary of functional changes (max 3 bullets)
- Architecture alignment rating (1-10) with references to CLAUDE.md
- Any new libraries added and their licensing risk
- Sign-off recommendation: [APPROVE / REQUEST_CHANGES]`,
        expectedOutcome: {
          ar: 'تقرير تنفيذي منسق بصيغة Markdown جاهز للتعليق على الـ Pull Request.',
          en: 'Polished markdown review report posted directly to the PR.',
        },
      },
    ],
  },
  {
    id: 'documentation-workflows',
    title: {
      ar: 'أتمتة التوثيق التقني ومخططات المعمارية وتوليد المخططات',
      en: 'Automated Technical Documentation & Visual Diagrams',
    },
    subtitle: {
      ar: 'استخراج التوثيق الشامل، ومخططات Mermaid، وسجلات التغيير تلقائياً من الشفرة',
      en: 'Synthesizing living API docs, Mermaid architecture diagrams, and release changelogs directly from code',
    },
    targetRole: 'creator',
    targetRoleLabel: {
      ar: 'صانع محتوى تقني / موثق أنظمة',
      en: 'Technical Writer / Content Creator',
    },
    difficulty: 'beginner',
    status: 'community',
    estimatedMinutes: 20,
    description: {
      ar: 'دليل مبسط وعملي لتمكين صناع المحتوى والموثقين التقنيين من استخدام Claude Code لتوليد مقالات تقنية، ومخططات تدفق البيانات بصيغة Mermaid، وسجلات الإصدارات للمستخدمين.',
      en: 'A pragmatic guide for technical writers and content creators to turn raw codebase commits into human-friendly documentation, visual Mermaid graphs, and release notes.',
    },
    prerequisites: [
      'فهم عام لصيغة Markdown و Mermaid Diagrams',
      'القدرة على تشغيل Claude Code داخل مجلد المشروع',
    ],
    requiredCapabilities: ['reports', 'workflows', 'claude_md', 'context'],
    deliverables: [
      'ملف README.md جذاب ومحدث مع شارات الحالة',
      'مخطط تدفق بيانات تفاعلي بصيغة Mermaid.js',
      'سجل تغييرات الإصدار (CHANGELOG.md) متوافق مع Keep a Changelog',
    ],
    proTips: [
      'اطلب من Claude تمثيل تدفق البيانات كـ sequence diagram أو flowchart بصيغة Mermaid.',
      'حدد الفئة المستهدفة للتوثيق (مثلاً: "للمطورين المبتدئين" أو "لإدارات الأعمال").',
      'استخدم أمر `/compact` بين كتابة المقالات للحفاظ على نقاء الأسلوب الأدبي.',
    ],
    copyableSetupScript: `# Generate complete technical documentation suite
claude -p "Scan src/ and create docs/ARCHITECTURE.md with Mermaid diagrams explaining module interactions."`,
    steps: [
      {
        stepNumber: 1,
        title: {
          ar: 'استخراج المخطط البصري (Mermaid Topology)',
          en: 'Visual Architecture Synthesis (Mermaid)',
        },
        description: {
          ar: 'توليد رسم بياني يوضح كيفية انتقال البيانات بين الواجهة الخلفية وقاعدة البيانات والخدمات الخارجية.',
          en: 'Produce clean, renderable Mermaid flowcharts illustrating data flows.',
        },
        promptSnippet: `Scan our API route handlers in src/routes/ and render a clean Mermaid graph TD showing:
- Client requests
- Middleware authentication
- Controller dispatch
- Database queries
Enclose in a valid \`\`\`mermaid code fence.`,
        expectedOutcome: {
          ar: 'مخطط Mermaid دقيق يعكس بدقة البنية البرمجية الحالية.',
          en: 'Valid Mermaid diagram accurately mirroring code routing.',
        },
      },
      {
        stepNumber: 2,
        title: {
          ar: 'توليد سجل التغييرات للمستخدمين (Human-Friendly Changelog)',
          en: 'Human-Friendly Release Changelog Synthesis',
        },
        description: {
          ar: 'تحويل رسائل Git commit الجافة إلى سجل إنجازات شيق يمكن مشاركته مع العملاء والمستخدمين.',
          en: 'Translate raw git commits into engaging, user-facing product release notes.',
        },
        promptSnippet: `Inspect git log since tag v1.4.0. Translate engineering commits into a user-friendly product announcement:
Categories:
- 🚀 New Features
- ⚡ Performance Improvements
- 🛠️ Bug Fixes
Tone: Professional, inspiring, and concise.`,
        expectedOutcome: {
          ar: 'سجل إصدار احترافي جاهز للنشر في النشرة البريدية أو المدونة التقنية.',
          en: 'Polished release notes ready for community distribution.',
        },
      },
    ],
  },
  {
    id: 'secure-subagent-swarm',
    title: {
      ar: 'أوركسترا الوكلاء المتخصصين وسير العمل متعدد المهام',
      en: 'Multi-Subagent Swarm & Sandboxed Orchestration',
    },
    subtitle: {
      ar: 'توزيع المهام المعقدة على وكلاء فرعيين معزولي السياق مع بوابات صلاحيات أمنية',
      en: 'Distribute complex engineering tasks across isolated subagents with zero-trust tool access',
    },
    targetRole: 'fullstack',
    targetRoleLabel: {
      ar: 'مهندس نظم متقدم (Systems Architect)',
      en: 'Systems Architect / Full-Stack',
    },
    difficulty: 'expert',
    status: 'official',
    estimatedMinutes: 50,
    description: {
      ar: 'بناء شبكة وكلاء متوازية: وكيل لقراءة الكود والتحليل، ووكيل لكتابة حالات الاختبار، ووكيل لتنفيذ العمليات في بيئة Sandbox معزولة بدون استهلاك نافذة السياق الرئيسية.',
      en: 'Architect parallel subagent workflows: an auditor agent, a test generator agent, and a sandboxed execution agent operating with pristine isolated context.',
    },
    prerequisites: [
      'فهم بنية ملفات تعريف الوكلاء في .claude/agents/',
      'إلمام ببروتوكول سياق النموذج (MCP)',
      'إدارة أذونات الأمان وسماحيات الأدوات (Permission Guardrails)',
    ],
    requiredCapabilities: ['subagents', 'mcp', 'permissions', 'skills', 'security'],
    deliverables: [
      'ملفات تهيئة الوكلاء الفرعيين المتخصصين',
      'حاجز أمني يمنع وصول الوكلاء غير المصرح لهم لبيانات الحساسة',
      'تقرير مخرجات مجمع من كافة الوكلاء الفرعيين',
    ],
    proTips: [
      'حدد قائمة أدوات حصرية لكل وكيل (مثلاً: أداة Read فقط لوكيل التدقيق لمنع التعديل).',
      'مرر فقط النتائج النهائية للأوركسترا وتجنب تمرير السجلات الطرفية الكاملة.',
      'اضبط حد الذاكرة للوكلاء الفرعيين ليعاد ضبطها مع بداية كل مهمة جديدة.',
    ],
    copyableSetupScript: `# Define specialized security auditor subagent
mkdir -p .claude/agents
cat << 'EOF' > .claude/agents/security-auditor.md
---
name: security-auditor
role: "Security & Vulnerability Specialist"
tools: [Bash, FileRead]
memory: "ephemeral"
---
You are a read-only security auditor. Scan specified source files for injection vulnerabilities, hardcoded secrets, and unsafe dependencies. Return findings in markdown.
EOF`,
    steps: [
      {
        stepNumber: 1,
        title: {
          ar: 'توزيع الأدوار وتحديد نطاق أدوات كل وكيل',
          en: 'Role Specialization & Tool Whitelisting',
        },
        description: {
          ar: 'إنشاء ملفات تعريف الوكلاء وتعيين الصلاحيات الصارمة لكل وكيل بشكل منفصل.',
          en: 'Define subagent YAML specifications with isolated tool permissions.',
        },
        commandSnippet: `ls -la .claude/agents/`,
        expectedOutcome: {
          ar: 'وكلاء مستقلون جاهزون للاستدعاء دون تداخل في الصلاحيات.',
          en: 'Well-defined specialist subagents configured and ready.',
        },
      },
      {
        stepNumber: 2,
        title: {
          ar: 'تنفيذ المهمة التوزيعية وجمع النتائج',
          en: 'Distributed Task Dispatch & Result Aggregation',
        },
        description: {
          ar: 'إطلاق الوكلاء الفرعيين بشكل متزامن واستلام التقارير المجمعة في سياق الأوركسترا الرئيسي.',
          en: 'Dispatch subagents to investigate separate modules and aggregate their synthesized outcomes.',
        },
        promptSnippet: `Spawn security-auditor subagent to inspect src/auth/ and spawn test-orchestrator subagent to generate unit tests in tests/auth/. Summarize both findings.`,
        expectedOutcome: {
          ar: 'إنجاز متوازي فائق السرعة مع الحفاظ على سياق النواة نظيفاً بنسبة 100%.',
          en: 'High-speed parallel task completion with zero context bloat in main agent.',
        },
      },
    ],
  },
  {
    id: 'test-driven-development-loop',
    title: {
      ar: 'دورة التطوير الصارمة المبنية على الاختبارات (Strict TDD Loop)',
      en: 'Strict Test-Driven Development (TDD) Orchestration',
    },
    subtitle: {
      ar: 'كتابة الاختبارات الفاشلة أولاً ثم كتابة أقل كود لازم لاجتيازها بنجاح',
      en: 'Author failing test suites first, then produce minimal implementation code to achieve green status',
    },
    targetRole: 'fullstack',
    targetRoleLabel: {
      ar: 'مهندس برمجيات (Software Engineer)',
      en: 'Software Engineer',
    },
    difficulty: 'intermediate',
    status: 'official',
    estimatedMinutes: 25,
    description: {
      ar: 'منهجية معمارية تمنع Claude Code من كتابة كود وهمي غير مختبر عبر فرض دورة Red-Green-Refactor ميكانيكية مدعومة بـ CLI.',
      en: 'Enforces a mechanical Red-Green-Refactor loop preventing speculative code generation and ensuring 100% verified test coverage.',
    },
    prerequisites: [
      'تثبيت مشغل اختبارات (مثل Vitest أو Jest أو Pytest)',
      'تكوين أمر الاختبار في ملف CLAUDE.md',
    ],
    requiredCapabilities: ['workflows', 'claude_md', 'hooks', 'models'],
    deliverables: [
      'مجموعة اختبارات شاملة تغطي الحالات السعيدة والحرجة (Edge Cases)',
      'كود تنفيذي بسيط ومختصر وموثوق',
      'سجل تحقق من اجتياز كافة الاختبارات بنسبة نجاح 100%',
    ],
    proTips: [
      'اطلب من Claude تأكيد فشل الاختبار أولاً (Red Phase) قبل كتابة الكود التنفيذي.',
      'امنع Claude من تعديل ملف الاختبار بعد كتابة كود التنفيذ لضمان النزاهة.',
      'قم بتفعيل خطاف post-edit لتشغيل الاختبارات آلياً بعد كل حفظ للملف.',
    ],
    copyableSetupScript: `# Configure TDD slash command
cat << 'EOF' > .claude/commands/tdd.md
---
description: "Execute strict Test-Driven Development cycle"
arguments: "<feature_name>"
---
Phase 1 (Red): Create tests/<feature_name>.test.ts with failing test cases. Run tests to confirm failure.
Phase 2 (Green): Implement src/<feature_name>.ts with minimal code to pass.
Phase 3 (Refactor): Clean up without breaking tests.
EOF`,
    steps: [
      {
        stepNumber: 1,
        title: {
          ar: 'المرحلة الحمراء: صياغة الاختبارات الفاشلة',
          en: 'Red Phase: Author Failing Tests',
        },
        description: {
          ar: 'توليد ملف الاختبار أولاً وتأكيد فشله في الطرفية لضمان أن الاختبار يقيس متطلباً حقيقياً.',
          en: 'Generate unit test file and confirm failure in terminal.',
        },
        commandSnippet: `claude -p "Write comprehensive unit tests in tests/payment-calc.test.ts for tiered volume pricing. Run vitest to verify it fails."`,
        expectedOutcome: {
          ar: 'ملف اختبار متكامل يفشل لأن الدالة لم يتم إنشاؤها بعد.',
          en: 'Comprehensive test suite failing due to missing implementation.',
        },
      },
      {
        stepNumber: 2,
        title: {
          ar: 'المرحلة الخضراء: كتابة كود التنفيذ الأدنى',
          en: 'Green Phase: Minimal Implementation',
        },
        description: {
          ar: 'كتابة أقل كود برمجي ممكن لجعل الاختبارات تجتاز بنجاح دون إضافة ميزات غير مطلوبة.',
          en: 'Write minimal code satisfying all test assertions without unsolicited extras.',
        },
        commandSnippet: `claude -p "Implement src/payment-calc.ts to make all tests in tests/payment-calc.test.ts pass. Do not modify the test file."`,
        expectedOutcome: {
          ar: 'جميع الاختبارات تتحول إلى اللون الأخضر (Passed).',
          en: 'All tests turn green with zero regressions.',
        },
      },
    ],
  },
];
