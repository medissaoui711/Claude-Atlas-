import React from 'react';
import { Compass, Network, BookOpen, Terminal, LayoutDashboard } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { activeView, navigateTo, language } = useApp();
  const isArabic = language === 'ar';

  const items: { id: ActiveView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: isArabic ? 'الرئيسية' : 'Home', icon: Compass },
    { id: 'map', label: isArabic ? 'الخريطة' : 'Map', icon: Network },
    { id: 'learn', label: isArabic ? 'تعلّم' : 'Learn', icon: BookOpen },
    { id: 'commands', label: isArabic ? 'الأوامر' : 'Commands', icon: Terminal },
    { id: 'dashboard', label: isArabic ? 'لوحتي' : 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070B16]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors cursor-pointer min-w-[56px] min-h-[44px] ${
              isActive ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-purple-400 scale-110' : 'text-slate-400'}`} />
            <span className={`text-[10px] font-medium leading-none ${isActive ? 'font-bold' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
