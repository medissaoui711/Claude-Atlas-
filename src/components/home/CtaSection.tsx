import React from 'react';
import { Network, Wand2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CtaSection: React.FC = () => {
  const { navigateTo, language } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 relative overflow-hidden bg-[#070B16]">
      {/* Background visual accents */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{isArabic ? 'حوّل المعرفة إلى أسلوب عمل متكامل' : 'From Theory to Production Architecture'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight max-w-3xl mx-auto leading-tight">
          {isArabic ? 'ابنِ طريقة عملك مع Claude Code' : 'Architect Your Workflow with Claude Code'}
        </h2>

        <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          {isArabic
            ? 'لا تكتفِ باستخدام الأدوات كسطر أوامر صامت. افهم كيف تترابط الذاكرة والوكلاء والدستور، ثم صمم نظامك الخاص المخصص لمشروعك.'
            : 'Do not settle for ad-hoc prompts. Understand how constitutions, memories, delegates, and hooks interlock to create a resilient autonomous ecosystem.'}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigateTo('map')}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-purple-950/50 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Network className="w-4 h-4" />
            <span>{isArabic ? 'ابدأ الاستكشاف في الخريطة' : 'Explore System Map'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigateTo('generators')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 font-semibold text-sm transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span>{isArabic ? 'أنشئ أول قالب مخصص' : 'Build Custom Template'}</span>
          </button>
        </div>

        {/* Security / Quality guarantee badge */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            {isArabic
              ? 'مبني وفق أحدث معايير الأمان وحماية الأسرار لمنظومة Claude Code'
              : 'Built according to official architecture and enterprise security guidelines'}
          </span>
        </div>
      </div>
    </section>
  );
};
