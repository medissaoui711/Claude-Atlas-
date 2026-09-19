import React from 'react';
import {
  Layers,
  FileCode2,
  Terminal,
  Boxes,
  Bot,
  Zap,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAPABILITIES } from '../../data/capabilities';
import { CATEGORIES } from '../../data/categories';
import { Badge } from '../common/Badge';

export const CoreCapabilitiesSection: React.FC = () => {
  const { navigateTo, language, showToast } = useApp();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // The 6 requested core concepts
  const targetIds = ['memory', 'claude_md', 'slash_commands', 'skills', 'subagents', 'hooks'];
  const coreNodes = CAPABILITIES.filter((c) => targetIds.includes(c.id));

  const handleCopyMini = (code: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    showToast(isArabic ? 'تم نسخ المثال البرمجي' : 'Example code copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-16 border-b border-slate-800/60 bg-[#070B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12" dir={isArabic ? 'rtl' : 'ltr'}>
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-2">
              {isArabic ? 'الأعمدة المعمارية الستة' : 'The Six Architectural Pillars'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {isArabic ? 'القدرات الأساسية لمنظومة Claude Code' : 'Core Capabilities of the System'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('map')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            <span>{isArabic ? 'استكشف كافة القدرات الـ 16 في الخريطة' : 'Explore all 16 nodes in system map'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreNodes.map((node) => {
            const cat = CATEGORIES[node.category];
            const isCopied = copiedId === node.id;

            return (
              <div
                key={node.id}
                onClick={() => navigateTo('capabilities', node.id)}
                className="group relative rounded-2xl bg-[#0D1424] border border-slate-800/80 p-6 flex flex-col justify-between hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-950/20 transition-all duration-300 cursor-pointer"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {/* Header: Badges & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge type="category" value={node.category} size="sm" />
                    <Badge type="difficulty" value={node.difficulty} size="sm" />
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: cat?.bgLight || 'rgba(168, 85, 247, 0.1)',
                        border: `1px solid ${cat?.borderColor || 'rgba(168, 85, 247, 0.3)'}`,
                        color: cat?.color || '#A855F7',
                      }}
                    >
                      {node.id === 'memory' && <Layers className="w-5 h-5" />}
                      {node.id === 'claude_md' && <FileCode2 className="w-5 h-5" />}
                      {node.id === 'slash_commands' && <Terminal className="w-5 h-5" />}
                      {node.id === 'skills' && <Boxes className="w-5 h-5" />}
                      {node.id === 'subagents' && <Bot className="w-5 h-5" />}
                      {node.id === 'hooks' && <Zap className="w-5 h-5" />}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white font-heading group-hover:text-purple-300 transition-colors">
                        {isArabic ? node.name.ar : node.name.en}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {isArabic ? node.tagline.ar : node.tagline.en}
                      </p>
                    </div>
                  </div>

                  {/* Short Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {isArabic ? node.summary.ar : node.summary.en}
                  </p>

                  {/* Mini Code Example Preview */}
                  {node.codeExample && (
                    <div
                      className="rounded-xl bg-[#090E1A] border border-slate-800 p-3 mb-4 font-mono text-[11px] relative overflow-hidden"
                      dir="ltr"
                    >
                      <div className="flex items-center justify-between text-slate-500 mb-1.5 pb-1 border-b border-slate-800/80">
                        <span className="truncate max-w-[180px]">{node.codeExample.filename}</span>
                        <button
                          type="button"
                          onClick={(e) => handleCopyMini(node.codeExample.code, node.id, e)}
                          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800 transition-colors cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-slate-300 line-clamp-3 leading-tight opacity-90">
                        {node.codeExample.code}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer link */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-purple-300 transition-colors">
                  <span>{node.estimatedMinutes} {isArabic ? 'دقيقة للدراسة' : 'mins study'}</span>
                  <span className="flex items-center gap-1 font-semibold text-purple-400">
                    <span>{isArabic ? 'اعرف المزيد والدرس' : 'Learn More'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
