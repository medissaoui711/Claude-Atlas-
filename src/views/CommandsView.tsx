import React, { useState, useMemo } from 'react';
import {
  Terminal,
  Search,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Wand2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMMANDS } from '../data/commands';
import { SlashCommand } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CommandsView: React.FC = () => {
  const { language, navigateTo, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'built-in' | 'custom'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const filtered = useMemo(() => {
    return COMMANDS.filter((cmd) => {
      const matchCat = categoryFilter === 'all' || cmd.category === categoryFilter;
      const matchSearch =
        !search.trim() ||
        cmd.command.toLowerCase().includes(search.toLowerCase()) ||
        cmd.name.ar.toLowerCase().includes(search.toLowerCase()) ||
        cmd.name.en.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.ar.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [categoryFilter, search]);

  const handleCopyCommand = (commandStr: string, id: string) => {
    navigator.clipboard.writeText(commandStr);
    setCopiedId(id);
    showToast(isArabic ? `تم نسخ الأمر: ${commandStr}` : `Copied command: ${commandStr}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <Breadcrumbs
        items={[
          { label: isArabic ? 'مكتبة الأوامر السريعة' : 'Slash Commands Library', active: true },
        ]}
      />

      {/* Page Header */}
      <div className="my-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2">
            {isArabic ? 'دليل الأوامر السريعة' : 'Command Reference Manual'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {isArabic ? 'مكتبة أوامر سطر الأوامر (Slash Commands)' : 'Claude Code Slash Commands'}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {isArabic
              ? 'مرجع شامل للأوامر المدمجة والأوامر المخصصة في .claude/commands/ مع صيغ الاستدعاء وأفضل ممارسات إدارة السياق.'
              : 'Complete syntax reference for built-in and user-defined CLI slash commands.'}
          </p>
        </div>

        {/* CTA to generate custom command */}
        <button
          type="button"
          onClick={() => navigateTo('generators')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-purple-950/40"
        >
          <Wand2 className="w-4 h-4" />
          <span>{isArabic ? 'اصنع أمر مخصص جديد' : 'Generate Custom Command'}</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-[#0D1424] border border-slate-800 rounded-2xl mb-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
              categoryFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            {isArabic ? 'كافة الأوامر' : 'All Commands'} ({COMMANDS.length})
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('built-in')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
              categoryFilter === 'built-in'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            {isArabic ? 'الأوامر المدمجة الرسمية' : 'Built-in Official'}
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('custom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
              categoryFilter === 'custom'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            {isArabic ? 'أوامر المشاريع المخصصة' : 'Custom Project Commands'}
          </button>
        </div>

        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? 'ابحث عن أمر أو وظيفة...' : 'Search commands...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
          />
        </div>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cmd) => {
          const isCopied = copiedId === cmd.id;

          return (
            <div
              key={cmd.id}
              className="rounded-2xl bg-[#0D1424] border border-slate-800/90 p-5 flex flex-col justify-between hover:border-purple-500/50 hover:shadow-xl transition-all"
            >
              <div>
                {/* Header: Command chip & Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span className="font-mono text-sm font-bold text-white bg-purple-950/40 border border-purple-500/30 px-2.5 py-0.5 rounded-lg">
                      {cmd.command}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                      cmd.category === 'built-in'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    {cmd.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-heading mb-1">
                  {isArabic ? cmd.name.ar : cmd.name.en}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {isArabic ? cmd.description.ar : cmd.description.en}
                </p>

                {/* Example Call */}
                <div className="bg-[#090E1A] border border-slate-800/80 rounded-xl p-3 mb-4" dir="ltr">
                  <div className="text-[10px] uppercase font-mono text-slate-500 mb-1">
                    CLI INVOCATION
                  </div>
                  <code className="text-xs font-mono text-purple-300 select-all">
                    {cmd.example}
                  </code>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo('capabilities', 'slash_commands')}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'شرح المعمارية' : 'Architecture'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyCommand(cmd.example, cmd.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'نسخ الأمر' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
