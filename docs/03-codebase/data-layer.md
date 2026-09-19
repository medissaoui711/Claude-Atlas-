# طبقة البيانات المعرفية | Data Layer

تعتبر طبقة البيانات في مجلد `src/data/` العمود الفقري لمحتوى **أطلس كلود**. تتميز هذه الطبقة بأنها مستقلة، مكتوبة بالكامل بصيغة TypeScript الصارمة، ولا تتطلب أي اتصال بشبكة أو خادم لتغذية الواجهات.

---

## 1. فهرس ملفات البيانات ومسؤولياتها

| الملف | الوصف والمسؤولية | نوع الكائنات المصدرة |
| :--- | :--- | :--- |
| `capabilities.ts` | مصفوفة العقد الأساسية في الخريطة المعمارية (`CAPABILITIES`). تحتوي على التعريف الأولي، التصنيف، المتطلبات المسبقة، والعلاقات. | `CapabilityNode[]` |
| `capabilitiesEnrichment.ts` | الإثراء المعرفي ونقاط الدروس الـ 14 لكل عقدة، شاملاً الأمثلة المضادة، التمارين، والاختبارات (`CAPABILITY_ENRICHMENTS`). | `Record<string, CapabilityEnrichment>` |
| `categories.ts` | التصنيفات المعمارية الثمانية، ألوان التمييز (Color codes)، والأيقونات والوصف. | `CategoryInfo[]` |
| `commands.ts` | موسوعة أوامر الطرفية الخاصة بـ Claude Code، المعاملات، أمثلة التنفيذ، وأفضل الممارسات. | `CommandItem[]` |
| `comparisons.ts` | بيانات المقارنات المعمارية وجداول المفاضلة بين الأدوات والأنماط المتقاربة. | `ComparisonItem[]` |
| `learningPaths.ts` | المسارات التعليمية المحددة مسبقاً (مبتدئ، متوسط، متقدم، معماري شركات). | `LearningPath[]` |
| `playbooks.ts` | كتيبات التشغيل والإرشادات المتسلسلة لمهام معقدة خطوة بخطوة. | `Playbook[]` |
| `templates.ts` | قوالب جاهزة لملفات `CLAUDE.md` ومواصفات المهارات والوكلاء الفرعيين. | `TemplateItem[]` |

---

## 2. مثال على هيكل العقدة في `capabilities.ts`

```typescript
export const CAPABILITIES: CapabilityNode[] = [
  {
    id: 'claude_md',
    title: 'دستور المشروع وقواعد السلوك',
    titleEn: 'CLAUDE.md Project Constitution',
    category: 'core',
    difficulty: 'beginner',
    summary: 'الملف التأسيسي في جذر المشروع الذي يحدد معايير الكود والأوامر والقيود الصارمة.',
    description: 'يمثل ملف CLAUDE.md المرجع الأساسي الذي يقرأه Claude Code عند كل جلسة...',
    icon: 'FileText',
    prerequisites: [],
    relatedIds: ['memory', 'skills', 'rules'],
    // ...
  }
];
```

---

## 3. آلية التوسع في البيانات
- لإضافة ميزة جديدة أو درس جديد، لا يتطلب الأمر تعديل أي كود React!
- يكفي إضافة كائن جديد يطابق الواجهة البرمجية في `capabilities.ts` وإثرائه في `capabilitiesEnrichment.ts`، وسيظهر تلقائياً في الخريطة ومستكشف القدرات ومحرك البحث وواجهة الدروس.

---
*الوثائق ذات الصلة:*
- [دليل الأنواع](./types.md)
- [دليل التوسيع](./extension-guide.md)
