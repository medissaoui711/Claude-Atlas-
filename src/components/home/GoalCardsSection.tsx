import React from 'react';
import {
  Compass,
  Terminal,
  Bot,
  FolderGit2,
  ArrowRight,
  ArrowLeft,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const GoalCardsSection: React.FC = () => {
  const { navigateTo, language } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const goals = [
    {
      id: 'understand-claude',
      title: isArabic ? 'أريد فهم Claude Code' : 'I want to understand Claude Code',
      description: isArabic
        ? 'تعلم كيف يفكر Claude في سطر الأوامر، متى تفعل التفكير الممتد (Extended Thinking)، وكيف تستغل نافذة الـ 200k توكن بأقصى كفاءة.'
        : 'Learn how Claude thinks in the CLI, when to leverage extended reasoning, and how to optimize context economics.',
      difficulty: 'beginner' as const,
      duration: isArabic ? '20 دقيقة' : '20 mins',
      icon: Compass,
      targetView: 'capabilities' as const,
      targetId: 'models',
      color: '#3B82F6',
    },
    {
      id: 'build-command-system',
      title: isArabic ? 'أريد بناء نظام أوامر احترافي' : 'I want to build a custom command suite',
      description: isArabic
        ? 'تحويل المهام الروتينية المتكررة إلى أوامر Slash Commands مخصصة في مجلد .claude/commands/ ومشاركتها مع كامل الفريق.'
        : 'Turn repetitive development workflows into version-controlled slash commands in .claude/commands.',
      difficulty: 'intermediate' as const,
      duration: isArabic ? '35 دقيقة' : '35 mins',
      icon: Terminal,
      targetView: 'commands' as const,
      targetId: 'slash_commands',
      color: '#A855F7',
    },
    {
      id: 'create-subagent',
      title: isArabic ? 'أريد إنشاء وكيل ذكي متخصص' : 'I want to build an autonomous subagent',
      description: isArabic
        ? 'تصميم وكلاء مستقلين Subagents بسياق معزول لفحص مئات ملفات الاختبارات أو تدقيق الأمان دون استهلاك السياق الرئيسي.'
        : 'Architect context-isolated delegates for heavy test suites or security audits without polluting parent memory.',
      difficulty: 'advanced' as const,
      duration: isArabic ? '45 دقيقة' : '45 mins',
      icon: Bot,
      targetView: 'capabilities' as const,
      targetId: 'subagents',
      color: '#EC4899',
    },
    {
      id: 'organize-project',
      title: isArabic ? 'أريد تنظيم وتأمين مشروع برمجي' : 'I want to govern an enterprise codebase',
      description: isArabic
        ? 'كتابة دستور CLAUDE.md صارم، وضبط بنك الذاكرة التراكمية، وحجب الأسرار بـ .claudeignore، وحماية أوامر الطرفية.'
        : 'Author bulletproof CLAUDE.md constitutions, persist architectural memory banks, and sanitize secrets.',
      difficulty: 'expert' as const,
      duration: isArabic ? '50 دقيقة' : '50 mins',
      icon: FolderGit2,
      targetView: 'generators' as const,
      targetId: 'claude_md',
      color: '#22C55E',
    },
  ];

  return (
    <section className="py-16 border-b border-slate-800/60 bg-[#070B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-2">
            {isArabic ? 'مسارات موجهة نحو الهدف' : 'Goal-Oriented Pathways'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {isArabic ? 'استكشف حسب هدفك العملي' : 'Explore by Your Functional Goal'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            {isArabic
              ? 'اختر التحدي الذي تواجهه اليوم وانطلق في مسار تعليمي مباشر يقودك إلى التطبيق الفوري'
              : 'Select your immediate technical objective and dive straight into actionable architecture'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.id}
                className="group relative rounded-2xl bg-[#0D1424] border border-slate-800/80 p-6 flex flex-col justify-between hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-950/20 transition-all duration-300"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {/* Top Badge & Time */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge type="difficulty" value={goal.difficulty} size="sm" />
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{goal.duration}</span>
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${goal.color}15`,
                      border: `1px solid ${goal.color}35`,
                      color: goal.color,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white font-heading mb-2 group-hover:text-purple-300 transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 mt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => navigateTo(goal.targetView, goal.targetId)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-800 hover:border-purple-500 transition-all cursor-pointer group-hover:shadow-md"
                  >
                    <span>{isArabic ? 'ابدأ هذا المسار' : 'Start Pathway'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
