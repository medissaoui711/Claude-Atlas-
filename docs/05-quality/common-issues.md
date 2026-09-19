# المشاكل الشائعة وحلولها المثبتة | Common Issues & Troubleshooting

توثق هذه الوثيقة المشاكل الفعلية التي قد تواجه المطور أثناء تشغيل أو بناء المشروع وحلولها المباشرة.

---

## 1. مشكلة: المنفذ 3000 مشغول مسبقاً (Port Already in Use)

- **العرض**: فشل تشغيل `npm run dev` مع رسالة خطأ تفيد بأن المنفذ 3000 مستخدم.
- **السبب**: وجود عملية سابقة تعمل في الخلفية أو خادم محلي لم يتم إغلاقه.
- **الحل**:
  - على Linux / macOS:
    ```bash
    lsof -ti:3000 | xargs kill -9
    ```
  - على Windows (PowerShell):
    ```powershell
    Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
    ```
  - ثم أعد تشغيل `npm run dev`.

---

## 2. مشكلة: فشل التحقق من الأنواع (`npm run lint` Fails)

- **العرض**: تظهر رسائل خطأ مثل `Property 'xyz' is missing in type...`.
- **السبب**: تم تعديل واجهة في `src/types.ts` دون تحديث كائنات البيانات في `src/data/capabilities.ts` أو `src/data/capabilitiesEnrichment.ts`.
- **الحل**:
  - افحص اسم الملف ورقم السطر المذكور في تقرير الخطأ.
  - تأكد من إضافة الخاصية الناقصة أو جعلها اختيارية (`xyz?: string`) في واجهة النوع.

---

## 3. مشكلة: فقدان البيانات أو تعارض التخزين المحلي (LocalStorage Inconsistency)

- **العرض**: ظهور شاشة بيضاء أو استمرار عرض بيانات قديمة غير مطابقة للتعديلات الجديدة في مسار التعلم.
- **السبب**: وجود كائنات قديمة مخزنة في متصفحك بصيغة غير متوافقة مع التحديثات الأخيرة.
- **الحل**:
  - افتح لوحة المطورين في المتصفح (F12 -> Application -> Local Storage).
  - احذف المفاتيح التي تبدأ بـ `cfw_` (مثل `cfw_learning_path` و `cfw_bookmarks`).
  - أو شغل الأمر في الـ Console:
    ```javascript
    Object.keys(localStorage).filter(k => k.startsWith('cfw_')).forEach(k => localStorage.removeItem(k));
    location.reload();
    ```

---
*الوثائق ذات الصلة:*
- [إعداد البيئة](../04-development/setup.md)
- [التخزين المحلي](../06-storage-and-state/persistence.md)
