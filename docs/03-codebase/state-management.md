# إدارة الحالة المركزية | State Management

يعتمد تطبيق **Claude Atlas** على **React Context API** المخصص لإدارة وتوزيع الحالة عالمياً دون الحاجة لمكتبات إدارة حالة خارجية معقدة مثل Redux أو Zustand.

---

## 1. موفر الحالة المركزي (`AppContext.tsx`)

يتم تغليف التطبيق بالكامل داخل `<AppProvider>` في `src/App.tsx`. 
تتيح دالة الخطاف المخصصة `useApp()` لأي مكون الوصول للحالة وتحديثها فورياً:

```tsx
import { useApp } from '@/src/context/AppContext';

export const MyComponent = () => {
  const { 
    activeView, 
    navigateTo, 
    learningPathCapabilityIds, 
    toggleLearningPath 
  } = useApp();

  return (
    <button onClick={() => toggleLearningPath('claude_md')}>
      حفظ في مساري
    </button>
  );
};
```

---

## 2. خريطة متغيرات الحالة في `AppContext`

| المتغير | النوع | الوصف والمسؤولية | هل يحفظ في `localStorage`؟ |
| :--- | :--- | :--- | :--- |
| `activeView` | `ActiveView` | الواجهة المعروضة حالياً في التطبيق. | لا (يتزامن مع عنوان URL) |
| `selectedCapabilityId` | `string \| null` | معرّف العقدة المعمارية المفتوحة حالياً. | لا |
| `activeCategoryFilter` | `CapabilityCategory \| 'all'` | التصنيف المختار لتصفية العقد. | لا |
| `searchQuery` | `string` | نص استعلام البحث العام. | لا |
| `isCommandPaletteOpen` | `boolean` | حالة فتح لوحة أوامر `Cmd+K`. | لا |
| `isDetailDrawerOpen` | `boolean` | حالة فتح درج التفاصيل الجانبي. | لا |
| `isLearningPathModalOpen` | `boolean` | حالة فتح نافذة المسار الشخصي. | لا |
| `toast` | `ToastState` | كائن إشعار التنبيه العائم. | لا |
| `learningPathCapabilityIds` | `string[]` | مصفوفة معرّفات العقد في مسار المستخدم. | **نعم** (`cfw_learning_path`) |
| `bookmarkedCapabilityIds` | `string[]` | مصفوفة معرّفات العقد المفضلة. | **نعم** (`cfw_bookmarks`) |
| `savedTemplateIds` | `string[]` | مصفوفة معرّفات القوالب المحفوظة. | **نعم** (`cfw_saved_templates`) |
| `completedUnitIds` | `string[]` | مصفوفة معرّفات الوحدات التي اجتاز اختبارها. | **نعم** (`cfw_completed_units`) |
| `language` | `Language` ('ar' \| 'en') | تفضيل لغة واجهة العرض. | **نعم** (`cfw_lang`) |
| `theme` | `ThemeMode` | سمة العرض (Dark الافتراضية). | **نعم** (`cfw_theme`) |

---

## 3. آليات التحديث الذري والمزامنة (Atomic Updates & Sync)
يتم تحديث الحالة عبر دوال مخصصة داخل السياق تضمن التحديث المتسق (Consistent Updates):
- **`toggleBookmark(id)`**: يضيف المعرّف إذا لم يكن موجوداً، أو يحذفه إذا كان موجوداً، مع حفظ النتيجة فوراً في `localStorage` وإطلاق إشعار Toast.
- **`toggleCompleteUnit(id)`**: يسجل إتمام الوحدة التعليمية بعد حل الاختبار بنجاح ويحدث نسبة الإنجاز المعروضة في لوحة التحكم.
- **`navigateTo(view, capabilityId)`**: يوجه التطبيق إلى واجهة محددة ويحدث مسار التاريخ في المتصفح `window.history.pushState`.

---
*الوثائق ذات الصلة:*
- [معمارية الواجهة والتوجيه](../02-architecture/application-architecture.md)
- [التخزين المحلي](../06-storage-and-state/persistence.md)
