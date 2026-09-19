# المعايير البرمجية وأسلوب الشيفرة | Coding Standards

تحدد هذه الوثيقة المعايير البرمجية الواجب اتباعها لضمان اتساق الشيفرة المصدرية وسهولة صيانتها عبر كامل المشروع.

---

## 📐 1. معايير تسمية الملفات والمجلدات (Naming Conventions)

- **مكونات React والواجهات**: بصيغة PascalCase (مثل: `Navbar.tsx`, `FullMapView.tsx`, `LessonViewer.tsx`).
- **ملفات البيانات ومساعدات TypeScript**: بصيغة camelCase (مثل: `capabilities.ts`, `learningPaths.ts`).
- **المجلدات**: بصيغة kebab-case أو camelCase صغيرة متسقة (مثل: `src/components/common/`, `src/views/`).

---

## ⚛️ 2. معايير React و TypeScript

### 2.1 المكونات الوظيفية والخطافات (Functional Components & Hooks)
- كتابة كافة المكونات كمكونات وظيفية باستخدام `React.FC<Props>` أو تصريح دالة مباشر مع تعيين نوع الـ Props:
```tsx
interface CapabilityCardProps {
  capability: CapabilityNode;
  onSelect: (id: string) => void;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability, onSelect }) => {
  // ...
};
```

### 2.2 تجنب الحلقات اللانهائية في `useEffect`
- عدم تمرير دوال أو مصفوفات أو كائنات غير مستقرة كاعتماديات داخل مصفوفة الاعتماديات (`dependency array`) في `useEffect`.
- استخدام القيم البدائية (Strings, Booleans, Numbers) كاعتماديات مفضلة كلما أمكن.

### 2.3 حظر `any` والـ Type Casting غير الآمن
- تجنب استخدام `any` إطلاقاً؛ استخدم `unknown` مع حراس الأنواع (Type Guards)، أو عرّف واجهة دقيقة في `src/types.ts`.

---

## 🎨 3. معايير التصميم والتنسيق (Tailwind CSS v4)
- استخدام فئات Tailwind CSS المساعدة مباشرة في خاصية `className`.
- عدم استخدام وسوم `<style>` مضمنة أو ملفات CSS خارجية منفصلة (الملف الوحيد المعتمد هو `src/index.css`).
- استيراد الأيقونات حصرياً من مكتبة `lucide-react` وتجنب تضمين وسوم `<svg>` يدوية مكررة إلا داخل محرك الخريطة المخصص.

---
*الوثائق ذات الصلة:*
- [دليل الشيفرة](../03-codebase/codebase-overview.md)
- [إرشادات المساهمة](./contribution-guide.md)
