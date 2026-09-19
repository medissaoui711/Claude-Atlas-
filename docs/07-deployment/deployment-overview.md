# النشر وبيئة الإنتاج | Deployment Overview

توثق هذه الوثيقة متطلبات وعملية نشر تطبيق **Claude Atlas** إلى بيئات الإنتاج المختلفة.

---

## 1. نمط التطبيق في الإنتاج (Production SPA Mode)

- **طبيعة البناء**: يتم بناء المشروع كتطبيق صفحة واحدة ثابت (Client-side Single Page Application).
- **أمر التجميع للإنتاج**:
  ```bash
  npm run build
  ```
- **مخرجات البناء**: يتم تجميع كامل الأصول البرمجية في مجلد `dist/` المستقل، والذي يحتوي على:
  - `index.html`: نقطة الدخول الرئيسية.
  - `assets/*.js`: الشيفرة المصدرية المجمعة والمصغرة.
  - `assets/*.css`: أنماط Tailwind CSS v4 المحسنة والمصغرة.
  - ملفات الأيقونات والوسائط الثابتة.

---

## 2. خيارات الاستضافة الموصى بها (Hosting Options)

نظراً لأن المشروع يخرج كملفات ثابتة تماماً (`dist/`)، يمكن نشره واستضافته على أي منصة استضافة ثابتة أو سحابية:

### 2.1 Google Cloud Run / Containerized Environments
- يتم تزويد الحاوية بخادم ملفات ثابتة خفيف (مثل nginx أو express static server) لخدمة مجلد `dist/` على المنفذ 3000 مع إعادة توجيه كافة المسارات (`*`) إلى `index.html`.

### 2.2 منصات الاستضافة الثابتة (Cloudflare Pages, Vercel, Netlify, GitHub Pages)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Fallback**: إعادة توجيه (Rewrite) كافة الطلبات 404 إلى `/index.html`.

---
*الوثائق ذات الصلة:*
- [متغيرات البيئة](./environment-variables.md)
- [سير عمل CI/CD](./ci-cd.md)
