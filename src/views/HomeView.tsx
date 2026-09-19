import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { GoalCardsSection } from '../components/home/GoalCardsSection';
import { CapabilityMap } from '../components/map/CapabilityMap';
import { LearningTimelineSection } from '../components/home/LearningTimelineSection';
import { TemplatesSection } from '../components/home/TemplatesSection';
import { CtaSection } from '../components/home/CtaSection';
import { useApp } from '../context/AppContext';
import { Network, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { language, navigateTo } = useApp();
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Goal Cards Section ("استكشف حسب هدفك") */}
      <GoalCardsSection />

      {/* Interactive Architecture Knowledge Map Showcase */}
      <section className="py-16 border-b border-slate-800/60 bg-[#060A14]" id="interactive-map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8" dir={isArabic ? 'rtl' : 'ltr'}>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isArabic ? 'الخريطة البصرية الحية' : 'Interactive Knowledge Graph'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {isArabic ? 'خريطة المنظومة: استكشف ترابط العقد المعمارية' : 'System Architecture Map'}
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                {isArabic
                  ? 'اضغط على أي عقدة لاستعراض الشرح المعماري، وأمثلة الكود، ومفاهيم الترابط البيني.'
                  : 'Click on any node to view architecture definitions, practical snippets, and prerequisites.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('map')}
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <span>{isArabic ? 'فتح الخريطة بحجم الشاشة الكاملة' : 'Open Full Screen Map'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Capability Map Component */}
          <CapabilityMap />
        </div>
      </section>

      {/* Structured Learning Roadmap (مسارات التعلم الخمسة) */}
      <LearningTimelineSection />

      {/* Practical Templates (القوالب العملية الجاهزة للنسخ) */}
      <TemplatesSection />

      {/* CTA Section (الدعوة إلى الإجراء) */}
      <CtaSection />
    </div>
  );
};
