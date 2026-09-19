import React from 'react';
import { CapabilityMap } from '../components/map/CapabilityMap';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { Sparkles, Network } from 'lucide-react';

export const FullMapView: React.FC = () => {
  const { language } = useApp();
  const isArabic = language === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <Breadcrumbs
        items={[
          { label: isArabic ? 'خريطة المنظومة التفاعلية' : 'System Knowledge Map', active: true },
        ]}
      />

      <div className="my-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
          <Network className="w-4 h-4 text-purple-400" />
          <span>{isArabic ? 'الهندسة المعمارية البصرية' : 'Visual Architectural Topology'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          {isArabic ? 'خريطة منظومة Claude Code من الداخل' : 'Claude Code Architectural Graph'}
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl">
          {isArabic
            ? 'توضح هذه الخريطة كيفية ترابط نواة Claude Code بـ 16 قدرة ومفهوم أساسي. انقر على أي عقدة لفتح تفاصيل المعمارية، حالات الاستخدام، والأمثلة البرمجية المباشرة.'
            : 'Explore the 16 interconnected capability nodes orbiting the Claude Code execution core.'}
        </p>
      </div>

      {/* Map with full page height */}
      <CapabilityMap fullPageView />
    </div>
  );
};
