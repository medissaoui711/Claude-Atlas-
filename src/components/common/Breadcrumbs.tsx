import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';

interface BreadcrumbItem {
  label: string;
  view?: ActiveView;
  capabilityId?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigateTo, language } = useApp();
  const isArabic = language === 'ar';
  const SeparatorIcon = isArabic ? ChevronLeft : ChevronRight;

  return (
    <nav className="flex items-center space-x-2 space-x-reverse text-xs text-slate-400 py-3" aria-label="Breadcrumb">
      <button
        type="button"
        onClick={() => navigateTo('home')}
        className="flex items-center gap-1.5 hover:text-slate-200 transition-colors cursor-pointer"
        title={isArabic ? 'الرئيسية' : 'Home'}
      >
        <Home className="w-3.5 h-3.5 text-purple-400" />
        <span>{isArabic ? 'الرئيسية' : 'Home'}</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <SeparatorIcon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          {item.active || !item.view ? (
            <span className="text-slate-200 font-medium truncate max-w-[200px] md:max-w-none">
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => navigateTo(item.view!, item.capabilityId)}
              className="hover:text-slate-200 transition-colors cursor-pointer truncate max-w-[150px] md:max-w-none"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
