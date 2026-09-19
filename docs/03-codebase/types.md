# نظام الأنواع والواجهات | TypeScript Types & Interfaces

يمثل ملف `src/types.ts` **مصدر الحقيقة الموحد لجميع الأنواع والواجهات** في المشروع. يضمن هذا الملف فحصاً دقيقاً لجميع الخصائص أثناء التطوير ويمنع أخطاء وقت التشغيل.

---

## 1. الأنواع الرئيسية في `src/types.ts`

### 1.1 نوع الواجهات النشطة (`ActiveView`)
يحدد الشاشات العشر المتاحة للتنقل داخل التطبيق:
```typescript
export type ActiveView = 
  | 'home' 
  | 'map' 
  | 'capabilities' 
  | 'learn' 
  | 'learning-paths' 
  | 'commands' 
  | 'playbooks' 
  | 'generators' 
  | 'claude-md-generator'
  | 'skill-generator'
  | 'subagent-generator'
  | 'prompt-lab' 
  | 'dashboard';
```

### 1.2 عقدة القدرة المعمارية (`CapabilityNode`)
تمثل الكيان الأساسي لكل مفهوم في الأطلس:
```typescript
export interface CapabilityNode {
  id: string;
  title: string;
  titleEn: string;
  category: CapabilityCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  summary: string;
  description: string;
  icon: string;
  badge?: string;
  prerequisites?: string[];
  relatedIds?: string[];
  points?: string[]; // النقاط التأسيسية
}
```

### 1.3 واجهة الإثراء المعرفي للدرس (`CapabilityEnrichment`)
تمثل التفاصيل المتقدمة لنظام الـ 14 نقطة والتمارين والاختبارات:
```typescript
export interface CapabilityEnrichment {
  id: string;
  simplifiedDefinition?: string;
  technicalNomenclature?: string;
  whyItMatters?: string;
  mechanism?: string;
  whenToUse?: string[];
  whenNotToUse?: string[];
  relations?: string[];
  codeExamples?: { title: string; language: string; code: string }[];
  antiPatterns?: { pattern: string; whyBad: string; fix: string }[];
  commonPitfalls?: string[];
  bestPractices?: string[];
  interactiveExercise?: {
    task: string;
    starterCode?: string;
    hints: string[];
    solution: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  nextStep?: { id: string; title: string };
}
```

---

## 2. قواعد التعامل مع الأنواع
- **ممنوع استخدام `any`**: أي خاصية جديدة يجب أن تكون مصرحة بنوع محدد أو `unknown` مع التحقق.
- **تحديث مركزي**: عند الحاجة لإضافة خاصية جديدة لأي مكون أو كائن بيانات، أضفها أولاً في `src/types.ts`، ثم نفذها في البيانات والواجهات.

---
*الوثائق ذات الصلة:*
- [طبقة البيانات](./data-layer.md)
- [دليل التوسيع](./extension-guide.md)
