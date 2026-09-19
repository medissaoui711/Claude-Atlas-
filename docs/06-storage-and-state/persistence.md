# استراتيجية التخزين المحلي | LocalStorage Persistence Strategy

يعتمد تطبيق **Claude Atlas** على التخزين المحلي للمتصفح (`localStorage`) للاحتفاظ ببيانات وتفضيلات المستخدم محلياً ودون الحاجة لأي خادم أو اتصال بالشبكة.

---

## 1. مفاتيح التخزين المعتمدة (LocalStorage Keys Schema)

تستخدم جميع المفاتيح بادئة موحدة `cfw_` (اختصاراً لـ Claude Framework / Workspace) لتفادي التعارض مع أي تطبيقات أخرى:

| المفتاح (Key) | نوع القيمة المخزنة | القيمة الافتراضية عند عدم الوجود | الوصف والهدف |
| :--- | :--- | :--- | :--- |
| `cfw_learning_path` | مصفوفة سلاسل نصية مشفرة بـ JSON (`string[]`) | `['claude_md', 'memory', 'skills', 'subagents']` | قائمة معرّفات العقد المحفوظة في مسار التعلم المخصص للمستخدم. |
| `cfw_bookmarks` | مصفوفة سلاسل نصية مشفرة بـ JSON (`string[]`) | `['claude_md', 'memory', 'subagents']` | قائمة معرّفات العقد المعمارية التي وضع المستخدم إشارة مرجعية عليها. |
| `cfw_saved_templates` | مصفوفة سلاسل نصية مشفرة بـ JSON (`string[]`) | `['tpl-nextjs-claude-md', 'tpl-review-pr-command']` | قائمة معرّفات القوالب التي قام المستخدم بحفظها في مفضلته. |
| `cfw_completed_units` | مصفوفة سلاسل نصية مشفرة بـ JSON (`string[]`) | `[]` | قائمة معرّفات الوحدات التي اجتاز المستخدم اختباراتها بنجاح لحساب نسبة الإنجاز. |
| `cfw_lang` | سلسلة نصية `'ar' \| 'en'` | `'ar'` | اللغة المفضلة لواجهة المستخدم (عربي أو إنجليزي). |
| `cfw_theme` | سلسلة نصية `'dark' \| 'light'` | `'dark'` | سمة العرض المفضلة للمستخدم. |

---

## 2. معالجة الأخطاء والـ Fallbacks (Defensive Storage Access)
- لتفادي تعطل التطبيق في حالات المتصفح الصارمة (مثل وضع التصفح المتخفي Incognito أو حظر ملفات تعريف الارتباط والتخزين)، يتم تغليف جميع عمليات قراءة وكتابة `localStorage` داخل كتل `try/catch`:
```typescript
const [bookmarkedCapabilityIds, setBookmarkedCapabilityIds] = useState<string[]>(() => {
  try {
    const saved = localStorage.getItem('cfw_bookmarks');
    return saved ? JSON.parse(saved) : ['claude_md', 'memory', 'subagents'];
  } catch {
    return ['claude_md', 'memory', 'subagents'];
  }
});
```

---
*الوثائق ذات الصلة:*
- [إدارة الحالة المركزية](../03-codebase/state-management.md)
- [مصادر الحقيقة](./source-of-truth.md)
