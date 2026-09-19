import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Terminal, Cpu, FileCode2, BookMarked, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAPABILITIES } from '../../data/capabilities';
import { COMMANDS } from '../../data/commands';
import { TEMPLATES } from '../../data/templates';
import { PLAYBOOKS } from '../../data/playbooks';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, navigateTo, language } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return {
        capabilities: CAPABILITIES.slice(0, 4),
        commands: COMMANDS.slice(0, 3),
        playbooks: PLAYBOOKS.slice(0, 2),
        templates: TEMPLATES.slice(0, 2),
      };
    }
    const q = query.toLowerCase();

    return {
      capabilities: CAPABILITIES.filter(
        (c) =>
          c.name.ar.toLowerCase().includes(q) ||
          c.name.en.toLowerCase().includes(q) ||
          c.tagline.ar.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      ),
      commands: COMMANDS.filter(
        (cmd) =>
          cmd.command.toLowerCase().includes(q) ||
          cmd.name.ar.toLowerCase().includes(q) ||
          cmd.name.en.toLowerCase().includes(q)
      ),
      playbooks: PLAYBOOKS.filter(
        (p) =>
          p.title.ar.toLowerCase().includes(q) ||
          p.title.en.toLowerCase().includes(q) ||
          p.description.ar.toLowerCase().includes(q)
      ),
      templates: TEMPLATES.filter(
        (t) =>
          t.title.ar.toLowerCase().includes(q) ||
          t.title.en.toLowerCase().includes(q) ||
          t.filename.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#0D1424] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isArabic
                ? 'ابحث عن قدرة، أمر سريع، قالب، أو مفهوم معماري...'
                : 'Search capabilities, slash commands, templates...'
            }
            className="w-full bg-transparent px-3 py-1 text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Capabilities Group */}
          {filteredResults.capabilities.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>{isArabic ? 'قدرات المنظومة (16)' : 'Capabilities'}</span>
              </div>
              <div className="space-y-1">
                {filteredResults.capabilities.map((cap) => (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      navigateTo('capabilities', cap.id);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-purple-950/40 hover:border-purple-500/30 border border-transparent transition-colors text-right cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-purple-300">
                          {isArabic ? cap.name.ar : cap.name.en}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1">
                          {isArabic ? cap.tagline.ar : cap.tagline.en}
                        </div>
                      </div>
                    </div>
                    <ArrowIcon className="w-4 h-4 text-slate-600 group-hover:text-purple-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Commands Group */}
          {filteredResults.commands.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>{isArabic ? 'الأوامر السريعة (Slash Commands)' : 'Commands'}</span>
              </div>
              <div className="space-y-1">
                {filteredResults.commands.map((cmd) => (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      navigateTo('commands');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-purple-950/40 hover:border-purple-500/30 border border-transparent transition-colors text-right cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {cmd.command}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200">
                          {isArabic ? cmd.name.ar : cmd.name.en}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1">
                          {isArabic ? cmd.description.ar : cmd.description.en}
                        </div>
                      </div>
                    </div>
                    <ArrowIcon className="w-4 h-4 text-slate-600 group-hover:text-purple-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Playbooks Group */}
          {filteredResults.playbooks.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-amber-400" />
                <span>{isArabic ? 'أدلة التشغيل (Playbooks)' : 'Playbooks'}</span>
              </div>
              <div className="space-y-1">
                {filteredResults.playbooks.map((pb) => (
                  <button
                    key={pb.id}
                    type="button"
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      navigateTo('playbooks');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-amber-950/40 hover:border-amber-500/30 border border-transparent transition-colors text-right cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <BookMarked className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-amber-300">
                          {isArabic ? pb.title.ar : pb.title.en}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1">
                          {isArabic ? pb.subtitle.ar : pb.subtitle.en}
                        </div>
                      </div>
                    </div>
                    <ArrowIcon className="w-4 h-4 text-slate-600 group-hover:text-amber-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Templates Group */}
          {filteredResults.templates.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isArabic ? 'القوالب البرمجية الجاهزة' : 'Templates'}</span>
              </div>
              <div className="space-y-1">
                {filteredResults.templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      navigateTo('home');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-emerald-950/40 hover:border-emerald-500/30 border border-transparent transition-colors text-right cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <FileCode2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-emerald-300">
                          {isArabic ? tpl.title.ar : tpl.title.en}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                          {tpl.filename}
                        </div>
                      </div>
                    </div>
                    <ArrowIcon className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredResults.capabilities.length === 0 &&
            filteredResults.commands.length === 0 &&
            filteredResults.templates.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                {isArabic
                  ? 'لم يتم العثور على نتائج تطابق بحثك. جرب كلمات مثل: ذاكرة، CLAUDE.md، أوامر، أو Subagent.'
                  : 'No matching capabilities or templates found.'}
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#090E1A] border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>{isArabic ? 'استخدم الأسهم للتنقل و Enter للاختيار' : 'Use arrows to navigate, Enter to select'}</span>
          <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">ESC للإغلاق</span>
        </div>
      </div>
    </div>
  );
};
