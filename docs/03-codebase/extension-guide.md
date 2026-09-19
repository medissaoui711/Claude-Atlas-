# دليل التوسيع وإضافة الميزات | How to Extend the Codebase

يوفر هذا الدليل مساراً تطبيقياً واضحاً خطوة بخطوة لأي مطور يرغب في إضافة ميزة جديدة، أو مفهوم جديد، أو واجهة جديدة في مشروع **Claude Atlas**.

---

## 🛠️ السيناريو 1: إضافة مفهوم أو قدرة جديدة إلى الأطلس

إذا كنت تريد إضافة مفهوم معماري جديد (مثل أداة جديدة أو ميزة مستحدثة في Claude Code):

### الخطوة 1: أضف العقدة الأساسية في `src/data/capabilities.ts`
أضف كائناً جديداً داخل مصفوفة `CAPABILITIES`:
```typescript
{
  id: 'new_capability_id',
  title: 'اسم القدرة بالعربية',
  titleEn: 'New Capability English Name',
  category: 'tools', // اختر إحدى الفئات: core, memory, tools, subagents, hooks, testing, governance, integrations
  difficulty: 'intermediate',
  summary: 'ملخص موجز يشرح المفهوم في سطرين...',
  description: 'شرح تفصيلي موسع...',
  icon: 'Terminal', // اسم أيقونة صالحة من lucide-react
  prerequisites: ['claude_md'],
  relatedIds: ['subagents'],
}
```

### الخطوة 2: أضف الإثراء المعرفي في `src/data/capabilitiesEnrichment.ts`
أضف مفتاحاً يطابق نفس المعرّف `new_capability_id` مع تفاصيل الـ 14 نقطة، والتمرين العملي، وسؤال الاختبار:
```typescript
new_capability_id: {
  id: 'new_capability_id',
  simplifiedDefinition: '...',
  technicalNomenclature: '...',
  whyItMatters: '...',
  mechanism: '...',
  whenToUse: ['...'],
  whenNotToUse: ['...'],
  relations: ['...'],
  codeExamples: [{ title: '...', language: 'bash', code: '...' }],
  antiPatterns: [{ pattern: '...', whyBad: '...', fix: '...' }],
  commonPitfalls: ['...'],
  bestPractices: ['...'],
  interactiveExercise: {
    task: '...',
    hints: ['...'],
    solution: '...'
  },
  quiz: {
    question: '...',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    explanation: '...'
  },
  nextStep: { id: '...', title: '...' }
}
```

### الخطوة 3: التحقق البرمجي
شغّل أمر التحقق الصارم من الأنواع:
```bash
npm run lint
```
بمجرد نجاح الفحص، ستظهر العقدة فوراً في:
- الخريطة البصرية التفاعلية
- قائمة مستكشف القدرات
- محرك البحث ولوحة أوامر `Cmd+K`
- مركز الدروس بنقاطه الـ 14 كاملة

---

## 🖥️ السيناريو 2: إضافة واجهة (View) جديدة بالكامل

إذا كنت تريد إنشاء شاشة رئيسية جديدة في التطبيق:
1. **تحديث النوع**: أضف اسم الواجهة الجديد إلى نوع `ActiveView` في `src/types.ts`.
2. **إنشاء المكون**: أنشئ ملف الواجهة في `src/views/MyNewView.tsx`.
3. **تحديث الموجه**: أضف الواجهة في دالة `renderView()` داخل `src/App.tsx`.
4. **تحديث شريط التنقل**: أضف الرابط وزر الانتقال في `src/components/common/Navbar.tsx` و `MobileBottomNav.tsx`.
5. **تحديث لوحة الأوامر**: أضف خيار الانتقال للواجهة الجديدة في `CommandPalette.tsx`.

---
*الوثائق ذات الصلة:*
- [دليل المكونات](./components.md)
- [إدارة الحالة](./state-management.md)
- [المعايير البرمجية](../04-development/coding-standards.md)
