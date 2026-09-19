export type Language = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light';

export type CapabilityCategory =
  | 'core'
  | 'memory_context'
  | 'automation'
  | 'tools_integrations'
  | 'workflows'
  | 'governance_safety'
  | 'context_memory'
  | 'instructions'
  | 'extensibility'
  | 'agents_automation'
  | 'governance_security'
  | 'project_workflow';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ContentStatus = 'official' | 'educational' | 'template' | 'community';

export interface BilingualText {
  ar: string;
  en: string;
}

export interface CapabilityNode {
  id: string;
  slug?: string;
  name: BilingualText;
  tagline: BilingualText;
  category: CapabilityCategory;
  difficulty: DifficultyLevel;
  status: ContentStatus;
  estimatedMinutes: number;
  iconName: string;
  summary: BilingualText;
  whyItMatters: BilingualText;
  whenToUse: string[];
  whenNotToUse: string[];
  prerequisites: string[];
  relatedNodeIds: string[];
  learningPathIds?: string[];
  ecosystemRelation?: BilingualText;
  simplifiedExample?: {
    title: string;
    description: string;
    code: string;
    language?: string;
  };
  architectureDiagram?: {
    inputs: string[];
    process: string[];
    outputs: string[];
  };
  codeExample: {
    language: string;
    filename: string;
    code: string;
    description: string;
  };
  copyableTemplate?: {
    language: string;
    filename: string;
    content: string;
    description: string;
  };
  bestPractices?: string[];
  commonPitfalls?: string[];
  keyTakeaways: string[];
  howItWorksInSystem?: BilingualText;
  antiPatternExample?: {
    title: string;
    description: string;
    code: string;
    language?: string;
  };
  exercise?: {
    prompt: string;
    hint: string;
    solution: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  nextStep?: {
    title: string;
    actionLabel: string;
    targetCapabilityId?: string;
  };
}

export interface CategoryInfo {
  id: CapabilityCategory;
  name: BilingualText;
  description: BilingualText;
  color: string;
  bgLight: string;
  borderColor: string;
  iconName: string;
}

export interface CommandItem {
  id: string;
  command: string;
  name: BilingualText;
  category: 'core' | 'memory' | 'project' | 'subagent' | 'audit' | 'custom';
  description: BilingualText;
  technicalPurpose?: BilingualText;
  whenToUse?: string[];
  whenNotToUse?: string[];
  usage: string;
  example: string;
  expectedOutput?: string;
  relatedCapabilities?: string[];
  difficulty: DifficultyLevel;
  isCustomAllowed: boolean;
  status: ContentStatus;
  flags?: { flag: string; desc: string }[];
  variations?: { syntax: string; description: string }[];
  popularity?: number;
  usefulnessScore?: number;
}

export type SlashCommand = CommandItem;

export interface LearningUnit {
  id: string;
  title: BilingualText;
  capabilityId?: string;
  durationMinutes: number;
  description: BilingualText;
  isCompleted?: boolean;
}

export interface LearningPath {
  level: number;
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  duration: string;
  unitsCount: number;
  difficulty?: DifficultyLevel;
  badge: BilingualText;
  color: string;
  units: LearningUnit[];
  capabilityIds?: string[];
}

export interface PracticalTemplate {
  id: string;
  title: BilingualText;
  category: string;
  description: BilingualText;
  filename: string;
  language: string;
  content: string;
  tags: string[];
  status: ContentStatus;
}

export interface PlaybookStep {
  stepNumber: number;
  title: BilingualText;
  description: BilingualText;
  commandSnippet?: string;
  promptSnippet?: string;
  expectedOutcome: BilingualText;
}

export interface Playbook {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  targetRole: 'fullstack' | 'prompt_engineer' | 'tech_lead' | 'creator';
  targetRoleLabel: BilingualText;
  difficulty: DifficultyLevel;
  status: ContentStatus;
  estimatedMinutes: number;
  description: BilingualText;
  prerequisites: string[];
  requiredCapabilities: string[];
  steps: PlaybookStep[];
  deliverables: string[];
  proTips: string[];
  copyableSetupScript: string;
}

export interface PromptLabData {
  goal: string;
  context: string;
  constraints: string;
  outputFormat: string;
  taskType: 'coding' | 'architecture' | 'refactor' | 'debug' | 'documentation';
}

export interface PromptMetrics {
  clarity: number; // 0-100
  contextCompleteness: number; // 0-100
  actionability: number; // 0-100
  reusability: number; // 0-100
  score: number; // overall
}

export type ActiveView =
  | 'home'
  | 'map'
  | 'capabilities'
  | 'learn'
  | 'learning-paths'
  | 'commands'
  | 'playbooks'
  | 'prompt-lab'
  | 'generators'
  | 'claude-md-generator'
  | 'command-generator'
  | 'skill-generator'
  | 'subagent-generator'
  | 'hooks-generator'
  | 'dashboard';
