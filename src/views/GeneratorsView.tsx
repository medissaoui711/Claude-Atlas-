import React, { useState, useMemo, useEffect } from 'react';
import {
  Wand2,
  FileCode2,
  Terminal,
  Boxes,
  Bot,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

type GeneratorType = 'claude_md' | 'slash_command' | 'skill' | 'subagent';

export const GeneratorsView: React.FC = () => {
  const { language, showToast, activeView } = useApp();

  const getInitialGen = (): GeneratorType => {
    if (activeView === 'claude-md-generator') return 'claude_md';
    if (activeView === 'skill-generator') return 'skill';
    if (activeView === 'subagent-generator') return 'subagent';
    return 'claude_md';
  };

  const [activeGen, setActiveGen] = useState<GeneratorType>(getInitialGen);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeView === 'claude-md-generator') setActiveGen('claude_md');
    if (activeView === 'skill-generator') setActiveGen('skill');
    if (activeView === 'subagent-generator') setActiveGen('subagent');
  }, [activeView]);

  const isArabic = language === 'ar';

  // State for CLAUDE.md
  const [projectName, setProjectName] = useState('My Awesome App');
  const [framework, setFramework] = useState('Next.js 14 App Router + TypeScript + Tailwind');
  const [packageManager, setPackageManager] = useState('pnpm');
  const [testRunner, setTestRunner] = useState('vitest');
  const [strictMode, setStrictMode] = useState(true);
  const [languageRule, setLanguageRule] = useState<'ar' | 'en' | 'bilingual'>('bilingual');
  const [customRules, setCustomRules] = useState(
    '- Always write clean, self-documenting code with comprehensive TypeScript types.\n- Never delete user comments or alter unrelated files.\n- Run tests before completing any architectural task.'
  );

  // State for Slash Command
  const [cmdName, setCmdName] = useState('review-pr');
  const [cmdDesc, setCmdDesc] = useState('Review git diff against architectural standards');
  const [cmdArgs, setCmdArgs] = useState('[branch_name]');
  const [cmdPrompt, setCmdPrompt] = useState(
    'Inspect git diff against target branch. Highlight security risks, breaking changes, and style consistency.'
  );

  // State for Skill
  const [skillName, setSkillName] = useState('docker-security-audit');
  const [skillDesc, setSkillDesc] = useState('Audit Dockerfile and Compose configurations for root privilege leaks');
  const [skillRules, setSkillRules] = useState(
    '1. Inspect Dockerfile for non-root USER directive.\n2. Verify pinning of image tags to specific SHA digests.\n3. Check for exposed secrets in intermediate build stages.'
  );

  // State for Subagent
  const [agentName, setAgentName] = useState('qa-evaluator');
  const [agentRole, setAgentRole] = useState('Autonomous Unit & E2E Test Suite Orchestrator');
  const [agentTools, setAgentTools] = useState('Bash, File Read, File Edit');
  const [agentMemoryLimit, setAgentMemoryLimit] = useState('Isolated scratchpad (resets per task)');

  // Dynamic Output Generator
  const generatedCode = useMemo(() => {
    if (activeGen === 'claude_md') {
      return `# CLAUDE.md - Architectural Constitution for ${projectName}

## 1. Project Overview & Technology Stack
- **Framework & Core**: ${framework}
- **Package Manager**: \`${packageManager}\`
- **Testing Engine**: \`${testRunner}\`
- **Language Preference**: ${
        languageRule === 'ar'
          ? 'Arabic primary for documentation, English for code'
          : languageRule === 'bilingual'
          ? 'Bilingual (Arabic / English) contextual documentation'
          : 'English primary'
      }

## 2. Standard Development Commands
- **Install Dependencies**: \`${packageManager} install\`
- **Run Dev Server**: \`${packageManager} dev\`
- **Run Tests**: \`${packageManager} test\`
- **Run Typecheck & Lint**: \`${packageManager} run lint\`

## 3. Strict Architectural Rules
${strictMode ? '- **STRICT SCOPE**: Build strictly what was requested. Avoid unsolicited background daemons or playground tabs.' : ''}
${customRules}

## 4. Git & Commit Guidelines
- Use conventional commits: \`feat:\`, \`fix:\`, \`refactor:\`, \`docs:\`.
- Keep commit summaries under 72 characters.
`;
    }

    if (activeGen === 'slash_command') {
      return `---
description: "${cmdDesc}"
arguments: "${cmdArgs}"
category: "project"
---

# /${cmdName}

You are executing the custom project command \`/${cmdName}\`.

## User Intent & Target Arguments:
Target arguments provided: \`$ARGUMENTS\` (Default: ${cmdArgs})

## Execution Steps:
1. Parse the working tree and evaluate state: \`${cmdPrompt}\`.
2. Do not introduce breaking regressions.
3. Output a structured executive summary with clear checklist results.
`;
    }

    if (activeGen === 'skill') {
      return `---
name: ${skillName}
description: "${skillDesc}"
version: "1.0.0"
---

# Skill: ${skillName}

## Overview
${skillDesc}

## Operational Directives
${skillRules}

## Verification
- Validate all assumptions before applying code transformations.
- Run validation suite and confirm zero fatal errors.
`;
    }

    if (activeGen === 'subagent') {
      return `---
name: ${agentName}
role: "${agentRole}"
tools: [${agentTools}]
memory: "${agentMemoryLimit}"
---

# Subagent Prompt: ${agentName}

You are an isolated specialist subagent spawned by the primary Claude Code orchestrator.

## Your Mission:
${agentRole}

## Constraints & Isolation Boundary:
- You operate within a focused context window.
- Do NOT carry unrelated conversation history.
- Use only the permitted tools: ${agentTools}.
- Return your final findings directly to the parent orchestrator.
`;
    }

    return '';
  }, [
    activeGen,
    projectName,
    framework,
    packageManager,
    testRunner,
    strictMode,
    languageRule,
    customRules,
    cmdName,
    cmdDesc,
    cmdArgs,
    cmdPrompt,
    skillName,
    skillDesc,
    skillRules,
    agentName,
    agentRole,
    agentTools,
    agentMemoryLimit,
  ]);

  const targetFilename = useMemo(() => {
    switch (activeGen) {
      case 'claude_md':
        return 'CLAUDE.md';
      case 'slash_command':
        return `.claude/commands/${cmdName || 'command'}.md`;
      case 'skill':
        return `skills/${skillName || 'skill'}/SKILL.md`;
      case 'subagent':
        return `.claude/agents/${agentName || 'agent'}.md`;
    }
  }, [activeGen, cmdName, skillName, agentName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    showToast(isArabic ? 'تم نسخ الكود بنجاح' : 'Generated file copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = targetFilename.split('/').pop() || 'output.md';
    link.click();
    URL.revokeObjectURL(url);
    showToast(isArabic ? `تم تنزيل ${targetFilename}` : `Downloaded ${targetFilename}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <Breadcrumbs
        items={[
          { label: isArabic ? 'مولدات المنظومة والقوالب' : 'Generators & Wizards', active: true },
        ]}
      />

      {/* Header */}
      <div className="my-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2">
          {isArabic ? 'المولد التفاعلي الذكي' : 'Interactive Architectural Wizard'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          {isArabic ? 'توليد ملفات الدستور، الأوامر، المهارات والوكلاء' : 'Generators Studio'}
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          {isArabic
            ? 'قم بتهيئة وتوليد ملفات التكوين لمنظومة Claude Code وفق معايير إنتاجية صارمة بنقرة واحدة.'
            : 'Configure and export standard CLAUDE.md constitutions, slash commands, skills, and subagent specs.'}
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { id: 'claude_md', label: 'CLAUDE.md', icon: FileCode2, sub: isArabic ? 'دستور المشروع' : 'Project Rules' },
          { id: 'slash_command', label: 'Slash Command', icon: Terminal, sub: isArabic ? 'أمر مخصص' : 'Custom Action' },
          { id: 'skill', label: 'Skill (SKILL.md)', icon: Boxes, sub: isArabic ? 'مهارة مستقلة' : 'Extended Capability' },
          { id: 'subagent', label: 'Subagent Prompt', icon: Bot, sub: isArabic ? 'وكيل متخصص' : 'Specialist Agent' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeGen === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveGen(tab.id as GeneratorType)}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg shadow-purple-950/40'
                  : 'bg-[#0D1424] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                {isActive && <Sparkles className="w-4 h-4 text-purple-400" />}
              </div>
              <div>
                <div className="font-bold text-sm font-heading">{tab.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{tab.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Form Wizard & Code Output Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Parameters */}
        <div className="lg:col-span-5 bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white font-heading">
              {isArabic ? 'معايير التهيئة' : 'Configuration Parameters'}
            </h2>
            <span className="text-[11px] font-mono text-purple-400">
              {targetFilename}
            </span>
          </div>

          {/* CLAUDE.md Fields */}
          {activeGen === 'claude_md' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'اسم المشروع' : 'Project Name'}
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'بيئة العمل وحزمة التقنيات' : 'Tech Stack'}
                </label>
                <input
                  type="text"
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isArabic ? 'مدير الحزم' : 'Package Manager'}
                  </label>
                  <select
                    value={packageManager}
                    onChange={(e) => setPackageManager(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="pnpm">pnpm</option>
                    <option value="npm">npm</option>
                    <option value="yarn">yarn</option>
                    <option value="bun">bun</option>
                    <option value="cargo">cargo</option>
                    <option value="poetry">poetry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isArabic ? 'مشغل الاختبارات' : 'Test Runner'}
                  </label>
                  <select
                    value={testRunner}
                    onChange={(e) => setTestRunner(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="vitest">Vitest</option>
                    <option value="jest">Jest</option>
                    <option value="pytest">Pytest</option>
                    <option value="playwright">Playwright</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'سياسة لغة التوثيق' : 'Documentation Language'}
                </label>
                <select
                  value={languageRule}
                  onChange={(e) => setLanguageRule(e.target.value as 'ar' | 'en' | 'bilingual')}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="bilingual">عربي / إنجليزي (Bilingual)</option>
                  <option value="ar">العربية (Arabic Primary)</option>
                  <option value="en">English Primary</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'قواعد وتعليمات إضافية' : 'Custom Rules'}
                </label>
                <textarea
                  rows={4}
                  value={customRules}
                  onChange={(e) => setCustomRules(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* Slash Command Fields */}
          {activeGen === 'slash_command' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'اسم الأمر (بدون /)' : 'Command Name'}
                </label>
                <input
                  type="text"
                  value={cmdName}
                  onChange={(e) => setCmdName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'وصف الأمر للمستخدم' : 'Description'}
                </label>
                <input
                  type="text"
                  value={cmdDesc}
                  onChange={(e) => setCmdDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'المعاملات المقبولة (Arguments)' : 'Arguments'}
                </label>
                <input
                  type="text"
                  value={cmdArgs}
                  onChange={(e) => setCmdArgs(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'تعليمات التنفيذ (Execution Prompt)' : 'Execution Prompt'}
                </label>
                <textarea
                  rows={4}
                  value={cmdPrompt}
                  onChange={(e) => setCmdPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {/* Skill Fields */}
          {activeGen === 'skill' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'اسم المهارة (Skill Name)' : 'Skill Name'}
                </label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'الوصف والتوصيف' : 'Description'}
                </label>
                <input
                  type="text"
                  value={skillDesc}
                  onChange={(e) => setSkillDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'قواعد التوجيه والمعالجة' : 'Directives & Verification'}
                </label>
                <textarea
                  rows={4}
                  value={skillRules}
                  onChange={(e) => setSkillRules(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {/* Subagent Fields */}
          {activeGen === 'subagent' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'اسم الوكيل (Agent Identifier)' : 'Agent Identifier'}
                </label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'الدور والمسؤولية المحددة' : 'Specialist Role'}
                </label>
                <input
                  type="text"
                  value={agentRole}
                  onChange={(e) => setAgentRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isArabic ? 'الأدوات المصرح بها' : 'Permitted Tools'}
                </label>
                <input
                  type="text"
                  value={agentTools}
                  onChange={(e) => setAgentTools(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Code Live Preview & Export */}
        <div className="lg:col-span-7 bg-[#0D1424] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col">
          {/* Header Action Tools */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-bold text-slate-300" dir="ltr">
                {targetFilename}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isArabic ? 'تنزيل كملف' : 'Download'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'نسخ الملف' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Code Container */}
          <div className="mt-4 p-4 rounded-2xl bg-[#070B16] border border-slate-800/80 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[560px]" dir="ltr">
            <pre className="whitespace-pre-wrap">{generatedCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
