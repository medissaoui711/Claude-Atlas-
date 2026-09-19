import React from 'react';
import { CapabilityCategory, ContentStatus, DifficultyLevel } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { useApp } from '../../context/AppContext';

interface BadgeProps {
  type: 'category' | 'difficulty' | 'status';
  value: CapabilityCategory | DifficultyLevel | ContentStatus;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ type, value, size = 'md' }) => {
  const { language } = useApp();
  const isArabic = language === 'ar';
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  if (type === 'category') {
    const categoryInfo = CATEGORIES[value as CapabilityCategory];
    if (!categoryInfo) return null;
    return (
      <span
        id={`badge-cat-${value}`}
        className={`inline-flex items-center font-medium rounded-full border whitespace-nowrap transition-colors ${sizeClasses}`}
        style={{
          backgroundColor: categoryInfo.bgLight,
          borderColor: categoryInfo.borderColor,
          color: categoryInfo.color,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full inline-block mr-1.5 ml-1.5"
          style={{ backgroundColor: categoryInfo.color }}
        />
        {isArabic ? categoryInfo.name.ar : categoryInfo.name.en}
      </span>
    );
  }

  if (type === 'difficulty') {
    const config: Record<
      DifficultyLevel,
      { ar: string; en: string; bg: string; text: string; border: string }
    > = {
      beginner: {
        ar: 'مبتدئ',
        en: 'Beginner',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
      },
      intermediate: {
        ar: 'متوسط',
        en: 'Intermediate',
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
      },
      advanced: {
        ar: 'متقدم',
        en: 'Advanced',
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
      },
      expert: {
        ar: 'خبير',
        en: 'Expert',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
      },
    };

    const item = config[value as DifficultyLevel] || config.beginner;
    return (
      <span
        id={`badge-diff-${value}`}
        className={`inline-flex items-center font-medium rounded-full border whitespace-nowrap ${item.bg} ${item.text} ${item.border} ${sizeClasses}`}
      >
        {isArabic ? item.ar : item.en}
      </span>
    );
  }

  if (type === 'status') {
    const statusConfig: Record<
      ContentStatus,
      { ar: string; en: string; bg: string; text: string; border: string }
    > = {
      official: {
        ar: 'مفهوم رسمي',
        en: 'Official Architecture',
        bg: 'bg-sky-500/10',
        text: 'text-sky-400',
        border: 'border-sky-500/30',
      },
      educational: {
        ar: 'مثال تعليمي',
        en: 'Educational Case',
        bg: 'bg-violet-500/10',
        text: 'text-violet-400',
        border: 'border-violet-500/30',
      },
      template: {
        ar: 'قالب مقترح',
        en: 'Platform Template',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
      },
      community: {
        ar: 'محتوى متقدم',
        en: 'Community Spec',
        bg: 'bg-pink-500/10',
        text: 'text-pink-400',
        border: 'border-pink-500/30',
      },
    };

    const item = statusConfig[value as ContentStatus] || statusConfig.official;
    return (
      <span
        id={`badge-status-${value}`}
        className={`inline-flex items-center font-medium rounded-full border whitespace-nowrap ${item.bg} ${item.text} ${item.border} ${sizeClasses}`}
      >
        {isArabic ? item.ar : item.en}
      </span>
    );
  }

  return null;
};
