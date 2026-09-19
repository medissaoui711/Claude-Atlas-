import { CapabilityNode, CategoryInfo } from '@/src/types';

export const mockCapability: CapabilityNode = {
  id: 'test_node',
  slug: 'test-node',
  name: {
    ar: 'عقدة اختبارية',
    en: 'Test Node',
  },
  tagline: {
    ar: 'سطر وصفي اختباري',
    en: 'Test tagline description',
  },
  category: 'core',
  difficulty: 'beginner',
  status: 'official',
  estimatedMinutes: 15,
  iconName: 'Cpu',
  summary: {
    ar: 'ملخص اختباري دقيق',
    en: 'Precise test summary',
  },
  whyItMatters: {
    ar: 'أهمية العقدة الاختبارية',
    en: 'Why this test node matters',
  },
  whenToUse: ['في سيناريوهات الاختبار'],
  whenNotToUse: ['في بيئات الإنتاج الحقيقية'],
  prerequisites: ['فهم أساسي'],
  relatedNodeIds: ['models'],
  codeExample: {
    language: 'json',
    filename: '.claude/test.json',
    code: '{\n  "test": true\n}',
    description: 'إعداد اختباري نموذجي',
  },
  keyTakeaways: [
    'نقطة استخلاص اختبارية أولى',
    'نقطة استخلاص اختبارية ثانية',
  ],
};

export const mockCategory: CategoryInfo = {
  id: 'core',
  name: {
    ar: 'النواة والنماذج',
    en: 'Core',
  },
  description: {
    ar: 'المفاهيم التأسيسية',
    en: 'Fundamental concepts',
  },
  color: '#3B82F6',
  bgLight: 'rgba(59, 130, 246, 0.12)',
  borderColor: 'rgba(59, 130, 246, 0.35)',
  iconName: 'Cpu',
};
