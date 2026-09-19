import { PracticalTemplate } from '../types';

export const TEMPLATES: PracticalTemplate[] = [
  {
    id: 'tpl-nextjs-claude-md',
    title: {
      ar: 'دستور CLAUDE.md لمشروع Next.js 15 مع Tailwind',
      en: 'Enterprise CLAUDE.md for Next.js 15 & Tailwind',
    },
    category: 'CLAUDE.md',
    description: {
      ar: 'قالب دستور عمل متكامل وشامل لتطبيقات Next.js مع App Router، TypeScript صارم، Tailwind CSS، واختبارات Vitest.',
      en: 'Production-ready CLAUDE.md for Next.js 15 App Router, TypeScript strict mode, and Vitest.',
    },
    filename: 'CLAUDE.md',
    language: 'markdown',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'CLAUDE.md'],
    status: 'template',
    content: `# دستور مشروع Next.js المعماري

## أوامر التشغيل والتحقق
- تشغيل خادم التطوير: \`npm run dev\` (يعمل على المنفذ 3000)
- التحقق من الأنواع: \`npm run typecheck\`
- تدقيق الكود: \`npm run lint\`
- تشغيل الاختبارات: \`npm run test\`
- بناء الإنتاج: \`npm run build\`

## المبادئ المعمارية الإلزامية
1. **App Router فقط**: استخدم بنية \`app/\` مع Server Components افتراضياً.
2. **استخدام 'use client' بحذر**: لا تضع 'use client' إلا في المكونات التفاعلية التي تحتوي على Hooks أو معالجات أحداث.
3. **الأنواع الصارمة**: ممنوع تماماً استخدام نوع \`any\` أو التعليق \`@ts-ignore\`. عرف واجهاتك في \`src/types/\`.
4. **التصميم والتنسيق**: استخدم Tailwind CSS حصراً. تجنب ملفات CSS المنفصلة أو الـ inline styles.
5. **التحقق من المدخلات**: كل Server Action أو Route Handler يجب أن يتحقق من بيانات الإدخال عبر Zod schema.

## الممنوعات الصارمة
- لا تقم بتثبيت حزم npm جديدة دون طلب إذن صريح.
- لا تعدل ملفات التهيئة \`next.config.ts\` أو \`tsconfig.json\` دون توضيح الأسباب.
- لا تترك أي \`console.log\` في كود الإنتاج.`,
  },
  {
    id: 'tpl-review-pr-command',
    title: {
      ar: 'أمر مراجعة الكود والتدقيق المعماري /review-pr',
      en: 'Custom Slash Command: PR Architectural Review',
    },
    category: 'Slash Command',
    description: {
      ar: 'أمر مخصص يفحص التغييرات الحالية عبر git diff ويقدم تقريراً شاملاً عن الأمان، الأداء، والتوافق مع المعايير.',
      en: 'Custom slash command analyzing git diff against security, edge cases, and performance criteria.',
    },
    filename: '.claude/commands/review-pr.md',
    language: 'markdown',
    tags: ['Slash Command', 'Code Review', 'Git', 'Quality'],
    status: 'template',
    content: `---
description: إجراء مراجعة معمارية وأمنية دقيقة للتغييرات في فرع Git الحالي قبل طلب الدمج
---

أنت الآن مهندس برمجيات أول ومراجع كود معتمد (Principal Code Reviewer).

قم بفحص التغييرات البرمجية الحالية في الفرع باستخدام \`git diff main...HEAD\`:

### معايير المراجعة الإلزامية:
1. **الأمان وحماية البيانات**:
   - هل توجد أسرار، رموز وصول، أو مفاتيح API مكشوفة؟
   - هل توجد احتمالية لثغرات SQL Injection أو XSS أو غيرها؟
2. **سلامة الأنواع والحالات الحدية (Edge Cases)**:
   - هل تم التعامل مع حالات القيم الخالية (\`null\` / \`undefined\`)؟
   - هل تمت معالجة حالات فشل الشبكة وانقطاع استجابة الخادم؟
3. **معايير الأداء والذاكرة**:
   - هل توجد عمليات إعادة تصيير غير ضرورية (Unnecessary Re-renders)؟
   - هل استعلامات قاعدة البيانات محسنة ولا تتضمن مشكلة N+1؟

### شكل التقرير المطلوب:
- **ملخص سريع**: جملتان تصفان جوهر التغييرات ومستوى الخطر (منخفض / متوسط / مرتفع).
- **ملاحظات حرجة (يجب إصلاحها قبل الدمج)**: قائمة واضحة ومحددة برقم السطر والملف.
- **اقتراحات تحسين (غير إلزامية)**: نصائح لرفع قابلية القراءة أو الصيانة.
- **قرار المراجعة النهائي**: (Approved / Request Changes).`,
  },
  {
    id: 'tpl-arch-doc-skill',
    title: {
      ar: 'Skill للتوثيق المعماري التلقائي للمستودع',
      en: 'Extended Skill: Architecture Documentation Generator',
    },
    category: 'Skill',
    description: {
      ar: 'حزمة مهارة SKILL.md متكاملة تستعرض مستودع الكود وتولد مخططات تدفق البيانات وتوثيقاً هيكلياً بنمط C4 Model.',
      en: 'Comprehensive skill generating architectural diagrams and module boundary documentation.',
    },
    filename: 'skills/architecture-docs/SKILL.md',
    language: 'markdown',
    tags: ['Skills', 'Documentation', 'Architecture', 'C4 Model'],
    status: 'template',
    content: `---
name: architecture-docs
description: مهارة استكشاف وتوثيق معمارية النظام ومخططات تدفق البيانات وتحديث docs/architecture/
---

# إرشادات المهارة التوثيقية

عند تشغيل هذه المهارة، اتبع البروتوكول الصارم التالي:

## 1. مرحلة الاستكشاف
- اقرأ ملفات \`package.json\` لتحديد المكتبات الأساسية ومحركات البيانات.
- استعرض خريطة المجلدات الرئيسية في \`src/\` وكون فهماً لتقسيم الوحدات.
- استخرج نقاط الدخول (Entry Points) ومسارات الـ API.

## 2. معايير كتابة التوثيق
- احفظ الوثائق دائماً في المجلد: \`docs/architecture/\`.
- استخدم مخططات Mermaid المنسقة لتوضيح تدفق البيانات (Sequence Diagrams).
- وضح مسؤولية كل وحدة برمجية بنمط سياق النطاق (Bounded Context).

## 3. التحقق الذاتي قبل الحفظ
- تأكد أن جميع مسارات الملفات المذكورة في الوثيقة موجودة بالفعل.
- تأكد من عدم ذكر أي كلمات مرور أو عناوين IP داخلية حساسة.`,
  },
  {
    id: 'tpl-qa-subagent',
    title: {
      ar: 'Subagent مستقل للاختبارات وفحص الجودة QA',
      en: 'Autonomous Subagent: Test Runner & QA Auditor',
    },
    category: 'Subagent',
    description: {
      ar: 'توصيف وكيل فرعي مستقل متخصص في تشغيل الاختبارات وتحليل أسباب الإخفاقات وتوليد حالات اختبار مفقودة بسياق معزول.',
      en: 'Context-isolated subagent configuration dedicated to test orchestration and regression debugging.',
    },
    filename: '.claude/subagents/qa-tester.json',
    language: 'json',
    tags: ['Subagent', 'Testing', 'QA', 'Automation'],
    status: 'template',
    content: `{
  "agent_id": "qa-tester",
  "display_name": "وكيل ضمان الجودة والاختبارات المستقل",
  "model": "claude-3-7-sonnet-20250219",
  "system_prompt": "أنت وكيل متخصص في جودة البرمجيات والاختبارات التلقائية. مهمتك تشغيل مجموعات الاختبارات، التقاط الإخفاقات، وتشخيص السبب الجذري دون إجراء أي تعديل مباشر على كود الإنتاج. أعد فقط تقريراً بالنتائج والحلول المقترحة للوكيل الرئيسي.",
  "allowed_tools": [
    "run_command",
    "view_file",
    "list_dir"
  ],
  "disallowed_tools": [
    "edit_file",
    "delete_file",
    "git_commit"
  ],
  "max_budget_tokens": 16000,
  "execution_rules": {
    "timeout_seconds": 180,
    "report_format": "markdown_structured"
  }
}`,
  },
  {
    id: 'tpl-formatter-hook',
    title: {
      ar: 'Hook لتنسيق الكود والتحقق التلقائي بعد التعديل',
      en: 'Lifecycle Hook: Prettier & Typecheck on File Edit',
    },
    category: 'Hook',
    description: {
      ar: 'ملف خطافات Hooks يقوم بتشغيل Prettier تلقائياً فور كتابة أي ملف لتنسيقه بدقة والتأكد من سلامته.',
      en: 'Lifecycle hook configuration triggering Prettier formatting instantly after tool writes.',
    },
    filename: '.claude/hooks.json',
    language: 'json',
    tags: ['Hooks', 'Prettier', 'Formatting', 'Automation'],
    status: 'template',
    content: `{
  "$schema": "https://json.schemastore.org/claude-hooks.json",
  "description": "خطافات أتمتة الجودة التلقائية في مشروع المنصة",
  "hooks": {
    "post_tool_execution": [
      {
        "name": "auto-format-code",
        "description": "تنسيق الملف المعدل تلقائياً عبر Prettier",
        "tool_match": "edit_file|create_file",
        "command": "npx prettier --write \${TARGET_FILE}",
        "silent": true,
        "continue_on_error": true
      }
    ],
    "pre_git_commit": [
      {
        "name": "verify-typescript-types",
        "description": "منع الدمج في حال وجود أخطاء في الأنواع البرمجية",
        "command": "npm run typecheck",
        "abort_if_fails": true
      }
    ]
  }
}`,
  },
  {
    id: 'tpl-weekly-sprint-report',
    title: {
      ar: 'خطة تقرير أسبوعي تنفيذي لتقدم الفريق والديون التقنية',
      en: 'Executive Sprint Report & Technical Debt Assessment',
    },
    category: 'Report',
    description: {
      ar: 'قالب تقرير أسبوعي مهيكل للمدراء التقنيين يجمع إنجازات الأسبوع، مؤشرات الأداء، ديون الكود، والتوصيات القادمة.',
      en: 'Structured weekly engineering brief tracking sprint velocity, refactoring milestones, and architectural debt.',
    },
    filename: 'docs/reports/weekly-sprint-template.md',
    language: 'markdown',
    tags: ['Reports', 'Sprint', 'Management', 'Technical Debt'],
    status: 'template',
    content: `# تقرير الإنجاز الأسبوعي التقني
**التاريخ**: \`YYYY-MM-DD\` | **المشروع**: \`المنظومة الذكية\` | **المشرف**: \`الفريق التقني\`

---

## 1. الإنجازات المحورية (Key Milestones)
- [ ] **الميزة البرمجية 1**: اكتمال بناء وتغطية اختبارات وحدة المصادقة.
- [ ] **تحسينات الأداء**: خفض زمن تحميل الصفحة بنسبة 40% عبر تحسين الصور والـ Caching.
- [ ] **تكاملات جديدة**: ربط خادم MCP مع مستودع GitHub لأتمتة مراجعة التذاكر.

## 2. مصفوفة الديون التقنية (Technical Debt Resolved)
| المسار / المكون | المشكلة السابقة | الإجراء المتخذ | حالة الاختبار |
| :--- | :--- | :--- | :--- |
| \`src/api/auth\` | استخدام مكتبة قديمة غير مدعومة | الانتقال إلى الحل المعياري الجديد | ناجح 100% |
| \`src/db/schema\` | عدم وجود فهارس على حقل المعرف | إضافة Index مركب وحل بطء الاستعلام | ناجح |

## 3. مؤشرات الجودة والأمان (Security & Quality Metrics)
- **تغطية الاختبارات**: \`87.4%\` (+3.2% مقارنة بالأسبوع الماضي).
- **تحذيرات الأمان (npm audit)**: \`0 حرجة\`، \`0 مرتفعة\`.
- **استهلاك التوكنات وتكلفة الذكاء الاصطناعي**: \`$14.20\` (ضمن الميزانية المقررة).

## 4. خطة الأسبوع القادم والتوصيات
1. البدء في تفعيل الوكيل المستقل لفحص اختبارات الـ E2E.
2. توحيد ملفات CLAUDE.md في جميع المجلدات الفرعية للمونو-ريبو.`,
  },
];
