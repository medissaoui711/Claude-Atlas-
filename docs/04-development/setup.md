# إعداد بيئة التطوير والتشغيل المحلي | Development Setup

يقدم هذا الدليل الخطوات الفعلية الدقيقة لتثبيت وتشغيل مشروع **Claude Atlas** محلياً على جهاز المطور.

---

## 📋 1. المتطلبات الأساسية (Prerequisites)

- **Node.js**: الإصدار 18 أو أحدث (يوصى بـ Node 20 LTS أو 22).
- **مدير الحزم (Package Manager)**: `npm` (مرفق مع Node.js) أو `bun` (اختياري).
- **نظام التشغيل**: متوافق مع Linux, macOS, Windows (WSL2 أو PowerShell).
- **المتصفح**: أي متصفح حديث يدعم معايير ES2020 و SVG (Chrome, Firefox, Edge, Safari).

---

## 🚀 2. خطوات التثبيت والتشغيل خطوة بخطوة

### الخطوة 1: استنساخ المستودع (Clone Repository)
```bash
git clone <repository-url>
cd claude-atlas
```

### الخطوة 2: تثبيت الاعتماديات (Install Dependencies)
قم بتثبيت حزم npm المعرفة في `package.json`:
```bash
npm install
```

### الخطوة 3: إعداد متغيرات البيئة (Environment Variables)
انسخ ملف النموذج `.env.example` إلى `.env`:
```bash
cp .env.example .env
```
*(ملاحظة: المتغيرات اختيارية للتشغيل الأساسي، حيث يعمل التطبيق كـ SPA جانب العميل ولا يتطلب مفاتيح لتصفح المحتوى الأساسي).*

### الخطوة 4: تشغيل خادم التطوير المحلي (Run Dev Server)
شغل خادم Vite المحلي:
```bash
npm run dev
```
سيظهر المخرج التالي في الطرفية:
```text
  VITE v6.2.3  ready in ... ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```
افتح المتصفح وانتقل إلى: `http://localhost:3000`

---

## 🛠️ 3. الأوامر البرمجية المتاحة (Available NPM Scripts)

تعتمد جميع الأوامر على ما هو معرف فعلياً داخل `package.json`:

| الأمر | الوصف الفعلي للأمر |
| :--- | :--- |
| `npm run dev` | تشغيل خادم تطوير Vite على المنفذ 3000 والمضيف `0.0.0.0`. |
| `npm run build` | بناء وتجميع حزمة الإنتاج المصغرة داخل مجلد `dist/`. |
| `npm run lint` | تشغيل فاحص الأنواع الصارم لمترجم TypeScript (`tsc --noEmit`). |
| `npm run preview` | تشغيل خادم محلي لمعاينة مخرجات مجلد الإنتاج `dist/`. |
| `npm run clean` | حذف مخلفات البناء ومجلد `dist/`. |

---
*الوثائق ذات الصلة:*
- [سير عمل التطوير اليومي](./development-workflow.md)
- [المعايير البرمجية](./coding-standards.md)
