import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAPABILITIES } from '../data/capabilities';
import { CATEGORY_LIST } from '../data/categories';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CapabilityLessonExperience } from '../components/lessons/CapabilityLessonExperience';

export const CapabilityView: React.FC = () => {
  const {
    language,
    selectedCapabilityId,
    setSelectedCapabilityId,
  } = useApp();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Selected capability
  const activeCap = useMemo(() => {
    return (
      CAPABILITIES.find((c) => c.id === selectedCapabilityId) ||
      CAPABILITIES[0]
    );
  }, [selectedCapabilityId]);

  // Sync scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCap.id]);

  const filteredList = useMemo(() => {
    return CAPABILITIES.filter((c) => {
      const matchCat = activeCategory === 'all' || c.category === activeCategory;
      const matchSearch =
        !search.trim() ||
        c.name.ar.toLowerCase().includes(search.toLowerCase()) ||
        c.name.en.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: isArabic ? 'مكتبة القدرات والدروس' : 'Capabilities Library', view: 'capabilities' },
          { label: isArabic ? activeCap.name.ar : activeCap.name.en, active: true },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        {/* Left Side: Capability Selector Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-20 bg-[#0D1424] border border-slate-800/90 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                {isArabic ? `فهرس المنظومة (${CAPABILITIES.length})` : `Architecture Index (${CAPABILITIES.length})`}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {filteredList.length} {isArabic ? 'عنصر' : 'items'}
              </span>
            </div>

            {/* Quick Search */}
            <div className="relative mt-3">
              <input
                type="text"
                placeholder={isArabic ? 'بحث في القدرات والدروس...' : 'Search capabilities & lessons...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 border-b border-slate-800/80 no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-purple-600 text-white font-medium'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                {isArabic ? 'الكل' : 'All'}
              </button>
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-purple-600 text-white font-medium'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {isArabic ? cat.name.ar : cat.name.en}
                </button>
              ))}
            </div>

            {/* Capability List */}
            <div className="mt-3 space-y-1.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {filteredList.map((cap) => {
                const isSelected = cap.id === activeCap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setSelectedCapabilityId(cap.id)}
                    className={`w-full text-right p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 group ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/50 text-white shadow-md shadow-purple-950/20'
                        : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs font-bold truncate group-hover:text-purple-300">
                        {isArabic ? cap.name.ar : cap.name.en}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5" dir="ltr">
                        {cap.id}
                      </div>
                    </div>
                    <ArrowIcon className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isSelected ? 'text-purple-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Reusable 14-Point Capability Lesson */}
        <div className="lg:col-span-8">
          <CapabilityLessonExperience
            capability={activeCap}
            onSelectCapability={setSelectedCapabilityId}
            allCapabilities={CAPABILITIES}
          />
        </div>
      </div>
    </div>
  );
};
