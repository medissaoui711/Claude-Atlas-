# خريطة الشيفرة المصدرية | Codebase Overview

يقدم هذا الدليل خريطة إرشادية سريعة للمطور للتعرف على مكان وجود كل عنصر من عناصر المنظومة داخل الشيفرة، وكيفية ترابط الأجزاء ببعضها.

---

## 1. أين أجد كل جزء في الشيفرة؟ (Where to Find What)

| المفهوم / الميزة | المسار في المشروع | المكون أو الملف المسؤول |
| :--- | :--- | :--- |
| **تعريف الأنواع والواجهات** | `src/types.ts` | يحتوي على واجهات `CapabilityNode`, `ActiveView`, `Category`, إلخ. |
| **إدارة الحالة ومزامنة التخزين** | `src/context/AppContext.tsx` | موفر السياق `AppProvider` والخطاف `useApp()`. |
| **الموجه الأساسي للواجهات** | `src/App.tsx` | المكون `MainRouter` وتوزيع الشاشات بناءً على `activeView`. |
| **شريط التنقل العلوي والفوتر** | `src/components/common/` | `Navbar.tsx`, `Footer.tsx`, `MobileBottomNav.tsx`. |
| **لوحة الأوامر السريعة (Cmd+K)** | `src/components/common/` | `CommandPalette.tsx`. |
| **درج المسار الشخصي (Slideout)** | `src/components/common/` | `MyPathDrawer.tsx`. |
| **محرك الخريطة البصرية (SVG)** | `src/components/map/` | `ArchitectureMap.tsx`, `MapControls.tsx`, `CapabilityDetailDrawer.tsx`. |
| **عارض الدروس ذو الـ 14 نقطة** | `src/components/lessons/` | `LessonViewer.tsx`, `QuizModal.tsx`, `InteractiveExercise.tsx`. |
| **محاكي الوكلاء الفرعيين** | `src/components/simulations/` | `SubagentsSandboxSimulator.tsx`. |
| **محاكي الخطافات الزمنية** | `src/components/simulations/` | `HooksLifecycleTimeline.tsx`. |
| **بيانات العقد والدروس** | `src/data/` | `capabilities.ts`, `capabilitiesEnrichment.ts`. |
| **بيانات الأوامر والكتيبات** | `src/data/` | `commands.ts`, `playbooks.ts`, `templates.ts`. |

---

## 2. قواعد استيراد الوحدات (Import Conventions)
- يستخدم المشروع الاسم المستعار `@/` للإشارة إلى جذر المشروع كما هو مهيأ في `vite.config.ts`:
```typescript
import { CapabilityNode } from '@/src/types';
import { useApp } from '@/src/context/AppContext';
```
- يتم فصل استيرادات React والأيقونات والمكتبات الخارجية في أعلى الملف، متبوعة بالمكونات المحلية، ثم أنواع البيانات.

---
*الوثائق ذات الصلة:*
- [توثيق المكونات](./components.md)
- [توثيق الواجهات](./views.md)
- [دليل التوسيع](./extension-guide.md)
