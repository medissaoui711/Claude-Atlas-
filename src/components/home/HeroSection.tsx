import React from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  FileCode2,
  Boxes,
  Bot,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { navigateTo, language } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const keyMetrics = [
    { number: '16', label: isArabic ? 'قدرة معمارية مترابطة' : 'Interconnected Nodes' },
    { number: '5', label: isArabic ? 'مسارات تعلم متسلسلة' : 'Structured Paths' },
    { number: '24+', label: isArabic ? 'قالب عملي قابل للنسخ' : 'Production Templates' },
    { number: '100%', label: isArabic ? 'خالية من المحادثات العشوائية' : 'Visual Architecture' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800/60">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-right" dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Top pill notification */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{isArabic ? 'الموسوعة المعمارية الأولى لمنظومة Claude Code' : 'First Architectural Knowledge Engine for Claude Code'}</span>
            </div>

            {/* Main Headlines */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading leading-tight">
              {isArabic ? 'أطلس كلود' : 'Claude Atlas'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-300 mt-2 text-2xl sm:text-3xl lg:text-4xl">
                {isArabic
                  ? 'اكتشف المنظومة، افهم كيف تعمل، واصنع نظام عملك الخاص'
                  : 'Understand the internal ecosystem and build your developer workflow'}
              </span>
            </h1>

            {/* Subtitle & Scope notice */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {isArabic
                ? 'موسوعة تفاعلية وهندسة معرفية بصرية تشرح كيفية ترابط ملفات CLAUDE.md، والذاكرة التراكمية، ومهارات SKILL.md، والوكلاء المستقلين (Subagents)، وخطافات التنفيذ (Hooks). ليست واجهة محادثة تقليدية، بل خريطة معمارية شاملة.'
                : 'An interactive visual knowledge map explaining how CLAUDE.md constitutions, memory banks, skills, subagents, and hooks form a cohesive autonomous workflow. Not a chatbot, but a deep system architecture.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigateTo('map')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-purple-950/50 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
                <span>{isArabic ? 'استكشف الخريطة التفاعلية' : 'Explore Knowledge Map'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('capabilities')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>{isArabic ? 'ابدأ مسار التعلم' : 'Start Learning Path'}</span>
              </button>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              {keyMetrics.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl font-extrabold text-white font-heading tracking-tight">
                    {item.number}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Interactive Cognitive Graph Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0D1424] to-[#080D1A] p-6 border border-slate-800 shadow-2xl overflow-hidden">
              {/* Radial gradient backing */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs">
                <span className="font-mono text-purple-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>{isArabic ? 'محاكاة المنظومة الحية' : 'Live Ecosystem Simulation'}</span>
                </span>
                <span className="text-slate-500 text-[11px] font-mono">NODE_GRAPH.LIVE</span>
              </div>

              {/* Animated node network visual */}
              <div className="py-6 flex flex-col items-center justify-center relative">
                {/* Center Hub */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-0.5 shadow-xl shadow-purple-900/40 relative z-10 flex items-center justify-center text-center animate-pulse-subtle">
                  <div className="w-full h-full bg-[#0D1424] rounded-[14px] p-2 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-white font-heading">Claude Code</span>
                    <span className="text-[10px] text-purple-300 font-medium">النواة</span>
                  </div>
                </div>

                {/* Satellite Mini Nodes */}
                <div className="w-full grid grid-cols-3 gap-3 mt-6 relative z-10">
                  <div
                    onClick={() => navigateTo('capabilities', 'claude_md')}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer text-center group"
                  >
                    <FileCode2 className="w-4 h-4 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <div className="text-[11px] font-bold text-slate-200">CLAUDE.md</div>
                    <div className="text-[10px] text-slate-500">{isArabic ? 'دستور العمل' : 'Rules'}</div>
                  </div>

                  <div
                    onClick={() => navigateTo('capabilities', 'memory')}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-500 transition-all cursor-pointer text-center group"
                  >
                    <Layers className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <div className="text-[11px] font-bold text-slate-200">Memory</div>
                    <div className="text-[10px] text-slate-500">{isArabic ? 'الذاكرة الدائمة' : 'Bank'}</div>
                  </div>

                  <div
                    onClick={() => navigateTo('capabilities', 'skills')}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-teal-500/30 hover:border-teal-500 transition-all cursor-pointer text-center group"
                  >
                    <Boxes className="w-4 h-4 text-teal-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <div className="text-[11px] font-bold text-slate-200">Skills</div>
                    <div className="text-[10px] text-slate-500">{isArabic ? 'مهارات موسعة' : 'SKILL.md'}</div>
                  </div>

                  <div
                    onClick={() => navigateTo('capabilities', 'subagents')}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-pink-500/30 hover:border-pink-500 transition-all cursor-pointer text-center group"
                  >
                    <Bot className="w-4 h-4 text-pink-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <div className="text-[11px] font-bold text-slate-200">Subagents</div>
                    <div className="text-[10px] text-slate-500">{isArabic ? 'وكلاء مستقلون' : 'Delegates'}</div>
                  </div>

                  <div
                    onClick={() => navigateTo('capabilities', 'hooks')}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-orange-500/30 hover:border-orange-500 transition-all cursor-pointer text-center group"
                  >
                    <Zap className="w-4 h-4 text-orange-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <div className="text-[11px] font-bold text-slate-200">Hooks</div>
                    <div className="text-[10px] text-slate-500">{isArabic ? 'خطافات الجودة' : 'Lifecycle'}</div>
                  </div>

                  <div
                    onClick={() => navigateTo('capabilities', 'mcp')}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-blue-500/30 hover:border-blue-500 transition-all cursor-pointer text-center group"
                  >
                    <Cpu className="w-4 h-4 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <div className="text-[11px] font-bold text-slate-200">MCP</div>
                    <div className="text-[10px] text-slate-500">{isArabic ? 'خوادم البيانات' : 'Protocol'}</div>
                  </div>
                </div>
              </div>

              {/* Bottom live stats */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isArabic ? 'بيئة سياق متوازنة (200k Tokens)' : 'Context: 200k Optimized'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => navigateTo('map')}
                  className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
                >
                  {isArabic ? 'فتح الخريطة الكاملة ←' : 'Open Full Graph →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
