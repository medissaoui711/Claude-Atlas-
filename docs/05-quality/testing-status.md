# واقع الاختبارات الآلية والخطط المستقبلية | Testing Status & Strategy

وفقاً للقاعدة الذهبية للتوثيق: *"Documentation must describe the actual project, not an imagined project."*

---

## 📊 1. الوضع الحالي للاختبارات (Current Testing Status)

- **الحالة الراهنة**: **بيئة الاختبارات الآلية نشطة ومفعلة بالكامل (Active & Ready)**.
- **المكتبات المدمجة**:
  - `vitest`: محرك الاختبارات السريع المتكامل مع Vite.
  - `@testing-library/react` + `@testing-library/user-event`: تصيير واختبار المكونات وفق سلوك المستخدم.
  - `@testing-library/jest-dom`: مطابقات DOM الموسعة.
  - `jsdom`: بيئة DOM كاملة تحاكي المتصفح.
  - `@vitest/coverage-v8`: محرك قياس التغطية البرمجية السريع.
- **أوامر التشغيل المعتمدة**:
  - `npm run test`: تشغيل كامل الاختبارات (CI Mode).
  - `npm run test:watch`: تشغيل الاختبارات بوضع المراقبة التفاعلي (Local Dev).
  - `npm run test:coverage`: قياس نسبة تغطية الشيفرة بالكامل.
- **التكامل مع CI/CD**: الاختبارات مدمجة كخطوة إلزامية في GitHub Actions (`.github/workflows/ci.yml`).

---

## 🗺️ 2. الخطة المستهدفة للاختبارات (Future Testing Roadmap)

تم إدراج إضافة منظومة اختبارات شاملة كبند أول في [سجل الدين التقني](../08-maintenance/technical-debt.md). البنية المقترحة للاختبارات عند اعتمادها:

### 2.1 اختبارات الوحدات لطبقة البيانات (Unit Testing for Data Integrity)
- التحقق التلقائي من أن كل كائن في `CAPABILITIES`:
  - يمتلك معرّفاً فريداً (`id`).
  - يرتبط بمعرّفات صالحة وموجودة فعلياً في مصفوفة `relatedIds`.
  - يمتلك سجلاً مقابلاً في مصفوفة `CAPABILITY_ENRICHMENTS`.

### 2.2 اختبارات المكونات (Component Testing with Vitest + RTL)
- فحص تصيير المكونات الأساسية مثل `Navbar`, `CommandPalette`, `MyPathDrawer`.
- محاكاة النقر على أزرار التبديل والتأكد من تحديث `localStorage`.

### 2.3 اختبارات طرف لطرف (E2E with Playwright)
- محاكاة رحلة المستخدم: فتح الخريطة -> اختيار عقدة -> فتح الدرس -> حل الاختبار -> التحقق من زيادة نسبة التقدم في لوحة التحكم.

---
*الوثائق ذات الصلة:*
- [التحقق البرمجي](./verification.md)
- [سجل الدين التقني](../08-maintenance/technical-debt.md)
