import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Terminal,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Users,
  Shield,
  Layers,
  Wand2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PLAYBOOKS } from '../data/playbooks';
import { Playbook, DifficultyLevel } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';

export const PlaybooksView: React.FC = () => {
  const { language, navigateTo, showToast } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activePlaybookId, setActivePlaybookId] = useState<string>(PLAYBOOKS[0].id);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const activePlaybook = useMemo(() => {
    return PLAYBOOKS.find((p) => p.id === activePlaybookId) || PLAYBOOKS[0];
  }, [activePlaybookId]);

  const filteredPlaybooks = useMemo(() => {
    return PLAYBOOKS.filter((p) => {
      const matchRole = selectedRole === 'all' || p.targetRole === selectedRole;
      const matchDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
      const matchSearch =
        !search.trim() ||
        p.title.ar.toLowerCase().includes(search.toLowerCase()) ||
        p.title.en.toLowerCase().includes(search.toLowerCase()) ||
        p.description.ar.toLowerCase().includes(search.toLowerCase()) ||
        p.description.en.toLowerCase().includes(search.toLowerCase());
      return matchRole && matchDiff && matchSearch;
    });
  }, [selectedRole, selectedDifficulty, search]);

  const handleCopyScript = (script: string, id: string) => {
    navigator.clipboard.writeText(script);
    setCopiedScriptId(id);
    showToast(isArabic ? 'تم نسخ سكريبت التهيئة' : 'Setup script copied');
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const rolesList = [
    { id: 'all', label: isArabic ? 'كافة الأدوار' : 'All Roles' },
    { id: 'fullstack', label: isArabic ? 'مطور Full-Stack' : 'Full-Stack Dev' },
    { id: 'prompt_engineer', label: isArabic ? 'مهندس موجهات' : 'Prompt Engineer' },
    { id: 'tech_lead', label: isArabic ? 'مدير تقني / مهندس رئيسي' : 'Technical Lead' },
    { id: 'creator', label: isArabic ? 'صانع محتوى / موثق' : 'Content Creator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <Breadcrumbs
        items={[
          { label: isArabic ? 'أدلة التشغيل وسير العمل (Playbooks)' : 'Production Playbooks', active: true },
        ]}
      />

      {/* Header Section */}
      <div className="my-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-purple-400" />
          <span>{isArabic ? 'أدلة التشغيل المعمارية المتكاملة' : 'Enterprise Operational Playbooks'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          {isArabic ? 'أدلة تشغيل Claude Code للمؤسسات والفرق' : 'Claude Code Playbooks'}
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl">
          {isArabic
            ? 'سيناريوهات عملية متكاملة ومصممة خصيصاً للمطورين، مهندسي الموجهات، والمديرين التقنيين لضمان تنفيذ المهام المعقدة بدون تخمين أو انحدار في جودة الكود.'
            : 'End-to-end battle-tested workflows for developers, prompt engineers, and technical leaders executing complex codebase milestones.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0D1424] border border-slate-800 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? 'بحث في أدلة التشغيل...' : 'Search playbooks...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
          />
        </div>

        {/* Roles Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {rolesList.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRole(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                selectedRole === r.id
                  ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List of Playbooks on Left, Active Playbook Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Playbooks Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            <span>{isArabic ? 'الأدلة المتاحة' : 'Available Playbooks'}</span>
            <span>({filteredPlaybooks.length})</span>
          </div>

          {filteredPlaybooks.length === 0 ? (
            <div className="p-8 text-center bg-[#0D1424] border border-slate-800 rounded-2xl text-slate-500 text-xs">
              {isArabic ? 'لا توجد أدلة مطابقة لمعايير البحث' : 'No matching playbooks found.'}
            </div>
          ) : (
            filteredPlaybooks.map((p) => {
              const isSelected = p.id === activePlaybook.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePlaybookId(p.id)}
                  className={`w-full p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg'
                      : 'bg-[#0D1424] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {isArabic ? p.targetRoleLabel.ar : p.targetRoleLabel.en}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-400" />
                      {p.estimatedMinutes}m
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-heading mb-1 text-white">
                    {isArabic ? p.title.ar : p.title.en}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {isArabic ? p.subtitle.ar : p.subtitle.en}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Playbook Detailed Runner */}
        <div className="lg:col-span-8 bg-[#0D1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {isArabic ? activePlaybook.targetRoleLabel.ar : activePlaybook.targetRoleLabel.en}
                </span>
                <Badge type="difficulty" value={activePlaybook.difficulty} />
                <Badge type="status" value={activePlaybook.status} />
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{activePlaybook.estimatedMinutes} {isArabic ? 'دقيقة تنفيذ' : 'min execution'}</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              {isArabic ? activePlaybook.title.ar : activePlaybook.title.en}
            </h2>
            <p className="text-sm text-purple-300/90 mt-1 font-medium">
              {isArabic ? activePlaybook.subtitle.ar : activePlaybook.subtitle.en}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {isArabic ? activePlaybook.description.ar : activePlaybook.description.en}
            </p>
          </div>

          {/* Quick Setup Script Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>{isArabic ? 'سكريبت التهيئة لسطر الأوامر' : 'CLI Initialization Script'}</span>
              </span>

              <button
                type="button"
                onClick={() => handleCopyScript(activePlaybook.copyableSetupScript, activePlaybook.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  copiedScriptId === activePlaybook.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {copiedScriptId === activePlaybook.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'نسخ السكريبت' : 'Copy Script'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#070B16] border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed" dir="ltr">
              <pre>{activePlaybook.copyableSetupScript}</pre>
            </div>
          </div>

          {/* Step-by-Step Phased Execution Sequence */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>{isArabic ? 'مراحل التنفيذ المتسلسلة' : 'Phased Execution Steps'}</span>
            </h3>

            <div className="space-y-4">
              {activePlaybook.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-sm font-bold text-white font-heading">
                      {isArabic ? step.title.ar : step.title.en}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pr-10">
                    {isArabic ? step.description.ar : step.description.en}
                  </p>

                  {step.promptSnippet && (
                    <div className="mr-10 p-3 rounded-xl bg-[#070B16] border border-slate-800 text-xs font-mono text-emerald-300">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans font-bold">
                        {isArabic ? 'الموجه المقترح (Prompt):' : 'Engineered Prompt:'}
                      </div>
                      <div className="whitespace-pre-wrap">{step.promptSnippet}</div>
                    </div>
                  )}

                  {step.commandSnippet && (
                    <div className="mr-10 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-blue-300 flex items-center justify-between" dir="ltr">
                      <span>$ {step.commandSnippet}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(step.commandSnippet || '');
                          showToast(isArabic ? 'تم نسخ الأمر' : 'Command copied');
                        }}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        title="Copy command"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="mr-10 flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-300 font-medium">
                        {isArabic ? 'النتيجة المتوقعة: ' : 'Expected outcome: '}
                      </strong>
                      {isArabic ? step.expectedOutcome.ar : step.expectedOutcome.en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables & Pro Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-800">
            {/* Deliverables */}
            <div className="bg-[#121B2F] border border-slate-800 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase font-mono text-emerald-400 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isArabic ? 'المخرجات المحققة' : 'Key Deliverables'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activePlaybook.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tips */}
            <div className="bg-[#181528] border border-purple-500/20 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase font-mono text-purple-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isArabic ? 'نصائح معمارية متقدمة' : 'Architectural Pro-Tips'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activePlaybook.proTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
