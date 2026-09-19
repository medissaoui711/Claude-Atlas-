import { CapabilityCategory, CategoryInfo } from '../types';

export const CATEGORIES: Record<CapabilityCategory, CategoryInfo> = {
  // 1. Core
  core: {
    id: 'core',
    name: {
      ar: 'النواة والنماذج',
      en: 'Core',
    },
    description: {
      ar: 'محركات التفكير، النماذج، نافذة السياق، وهندسة الموجهات',
      en: 'Reasoning models, context management, and foundational prompting',
    },
    color: '#3B82F6', // Blue
    bgLight: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.35)',
    iconName: 'Cpu',
  },

  // 2. Memory and project context
  memory_context: {
    id: 'memory_context',
    name: {
      ar: 'الذاكرة وسياق المشروع',
      en: 'Memory',
    },
    description: {
      ar: 'الذاكرة الدائمة، ملف CLAUDE.md، قواعد المشروع، والذاكرة التلقائية',
      en: 'Long-term memory, CLAUDE.md instructions, project rules, and auto memory',
    },
    color: '#F59E0B', // Amber
    bgLight: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    iconName: 'Database',
  },

  // 3. Automation
  automation: {
    id: 'automation',
    name: {
      ar: 'الأتمتة والوكلاء',
      en: 'Automation',
    },
    description: {
      ar: 'أوامر Slash، المهارات SKILL.md، الوكلاء الفرعيين، وخطافات التنفيذ Hooks',
      en: 'Slash commands, skills, subagents, and lifecycle event hooks',
    },
    color: '#A855F7', // Purple
    bgLight: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    iconName: 'Wand2',
  },

  // 4. Tools and integrations
  tools_integrations: {
    id: 'tools_integrations',
    name: {
      ar: 'الأدوات والتكاملات',
      en: 'Tools',
    },
    description: {
      ar: 'خوادم بروتوكول MCP، معالجة الملفات، تكاملات GitHub، والبيئات الخارجية',
      en: 'MCP servers, files & folders, GitHub integration, and external IDE tools',
    },
    color: '#06B6D4', // Cyan
    bgLight: 'rgba(6, 182, 212, 0.12)',
    borderColor: 'rgba(6, 182, 212, 0.35)',
    iconName: 'Boxes',
  },

  // 5. Workflows
  workflows: {
    id: 'workflows',
    name: {
      ar: 'سلاسل العمل والتشغيل',
      en: 'Workflows',
    },
    description: {
      ar: 'إدارة المشاريع، تتبع المهام، التقارير المعمارية، وأدلة التشغيل Playbooks',
      en: 'Projects, task pipelines, architectural reports, and playbooks',
    },
    color: '#10B981', // Emerald
    bgLight: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.35)',
    iconName: 'Workflow',
  },

  // 6. Governance and safety
  governance_safety: {
    id: 'governance_safety',
    name: {
      ar: 'الحوكمة والأمان',
      en: 'Security',
    },
    description: {
      ar: 'مصفوفة أذونات الصلاحيات، حماية الأسرار، وتدقيق ومراجعة الأكواد',
      en: 'Execution permissions, sandbox safety, secret protection, and audit',
    },
    color: '#EF4444', // Red
    bgLight: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
    iconName: 'ShieldCheck',
  },

  // Backwards compatibility aliases
  context_memory: {
    id: 'memory_context',
    name: { ar: 'الذاكرة وسياق المشروع', en: 'Memory' },
    description: { ar: 'الذاكرة الدائمة وسياق المشروع', en: 'Long-term memory & context' },
    color: '#F59E0B',
    bgLight: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    iconName: 'Database',
  },
  instructions: {
    id: 'memory_context',
    name: { ar: 'الذاكرة وسياق المشروع', en: 'Memory' },
    description: { ar: 'دستور الأوامر والتوجيه', en: 'Instructions & Governance' },
    color: '#F59E0B',
    bgLight: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    iconName: 'FileCode2',
  },
  extensibility: {
    id: 'tools_integrations',
    name: { ar: 'الأدوات والتكاملات', en: 'Tools' },
    description: { ar: 'الأدوات والتكاملات وMCP', en: 'Tools & MCP' },
    color: '#06B6D4',
    bgLight: 'rgba(6, 182, 212, 0.12)',
    borderColor: 'rgba(6, 182, 212, 0.35)',
    iconName: 'Boxes',
  },
  agents_automation: {
    id: 'automation',
    name: { ar: 'الأتمتة والوكلاء', en: 'Automation' },
    description: { ar: 'الوكلاء والخطافات', en: 'Subagents & Hooks' },
    color: '#A855F7',
    bgLight: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    iconName: 'Wand2',
  },
  governance_security: {
    id: 'governance_safety',
    name: { ar: 'الحوكمة والأمان', en: 'Security' },
    description: { ar: 'الأمان والأذونات', en: 'Security & Permissions' },
    color: '#EF4444',
    bgLight: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
    iconName: 'ShieldCheck',
  },
  project_workflow: {
    id: 'workflows',
    name: { ar: 'سلاسل العمل والتشغيل', en: 'Workflows' },
    description: { ar: 'المشاريع والتقارير وسلاسل العمل', en: 'Projects & Workflows' },
    color: '#10B981',
    bgLight: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.35)',
    iconName: 'Workflow',
  },
};

export const CATEGORY_LIST: CategoryInfo[] = [
  CATEGORIES.core,
  CATEGORIES.memory_context,
  CATEGORIES.automation,
  CATEGORIES.tools_integrations,
  CATEGORIES.workflows,
  CATEGORIES.governance_safety,
];
