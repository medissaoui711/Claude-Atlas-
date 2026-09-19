# سير عمل التطوير اليومي | Development Workflow

يشرح هذا الدليل دورة حياة العمل المتبعة لتطوير الميزات وإصلاح الأخطاء في مشروع **Claude Atlas**.

---

## 🔄 1. دورة حياة الميزة البرمجية (Feature Lifecycle)

```mermaid
flowchart LR
    Branch["1. إنشاء فرع عمل\n(feature/* أو fix/*)"] --> Code["2. كتابة الكود\nوالتحقق البصري"]
    Code --> Lint["3. فحص الأنواع الصارم\n(npm run lint)"]
    Lint --> Build["4. التحقق من البناء\n(npm run build)"]
    Build --> PR["5. فتح طلب دمج\n(Pull Request)"]
    PR --> CI["6. فحص CI الآلي\n(.github/workflows/ci.yml)"]
    CI --> Merge["7. الدمج في الفرع الرئيسي\n(main)"]
```

---

## ⚙️ 2. خطوات التحقق قبل الدفع (Pre-Push Verification)

قبل دفع التعديلات إلى المستودع أو فتح طلب دمج (PR)، يجب على المطور تشغيل الخطوتين التاليتين والتأكد من خلو الطرفية من أي أخطاء:

### 1. التحقق من صحة الأنواع (Type Checking)
```bash
npm run lint
```
*يجب ألا يُرجع هذا الأمر أي خطأ من مترجم TypeScript (`tsc --noEmit`).*

### 2. التحقق من بناء الإنتاج (Production Build Check)
```bash
npm run build
```
*يتحقق هذا الأمر من قدرة Vite على تجميع كافة الأصول والملفات داخل مجلد `dist/` دون أخطاء في مسارات الاستيراد أو حزم التبعيات.*

---

## 🌿 3. معايير تسمية الفروع (Branch Naming Conventions)

- **الميزات الجديدة**: `feature/add-mcp-simulator` أو `feature/enrich-memory-lesson`
- **إصلاح الأخطاء**: `fix/drawer-close-issue` أو `fix/search-arabic-normalization`
- **التوثيق**: `docs/update-architecture-guides`
- **إعادة الهيكلة**: `refactor/split-large-view`

---
*الوثائق ذات الصلة:*
- [إعداد البيئة](./setup.md)
- [إرشادات المساهمة](./contribution-guide.md)
