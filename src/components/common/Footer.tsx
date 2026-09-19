import React from 'react';
import { Compass, BookOpen, Terminal, Wand2, Sparkles, LayoutDashboard, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, language } = useApp();
  const isArabic = language === 'ar';

  return (
    <footer className="border-t border-slate-800/80 bg-[#060913] text-slate-400 text-xs py-12" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Notice */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white font-heading">
                {isArabic ? 'أطلس كلود' : 'Claude Atlas'}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                v2.5
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              {isArabic
                ? 'موسوعة تفاعلية وهندسة معرفية بصرية تشرح منظومة Claude Code للمطورين والمهندسين. صُممت لتقديم تجربة استكشاف عميقة بعيداً عن أسلوب المحادثات التقليدية.'
                : 'An interactive architectural encyclopedia and visual knowledge graph explaining the Claude Code system for engineers, tech leads, and prompt designers.'}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <Shield className="w-3.5 h-3.5 text-slate-600" />
              <span>
                {isArabic
                  ? 'مشروع تعليمي معرفي مستقل. جميع حقوق Claude و Anthropic تعود لأصحابها.'
                  : 'Independent architectural knowledge platform. All trademarks belong to their respective owners.'}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-2">
              {isArabic ? 'أقسام المنصة' : 'Sections'}
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('map')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'خريطة المنظومة التفاعلية' : 'System Knowledge Map'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('capabilities')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'القدرات الـ 16 والأمثلة' : '16 Core Capabilities'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('commands')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'مكتبة الأوامر السريعة' : 'Slash Commands Library'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('generators')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'مولد ملفات CLAUDE.md والوكلاء' : 'Generators & Wizards'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Tools & Hub */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-2">
              {isArabic ? 'أدوات متقدمة' : 'Tools & Labs'}
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('prompt-lab')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'مختبر الموجهات (Prompt Lab)' : 'Prompt Engineering Lab'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('dashboard')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'لوحة المتابعة والمفضلة' : 'Learning Dashboard'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'مسارات التعلم الخمسة' : '5-Level Curriculum'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Claude Atlas — {isArabic ? 'أطلس كلود' : 'Architecture Platform'}.
          </div>
          <div className="text-slate-400">
            {isArabic ? 'صُنعت بحرفية معمارية وتصميم عربي فائق الجودة' : 'Engineered with premium craftsmanship and RTL first-class design.'}
          </div>
        </div>
      </div>
    </footer>
  );
};
