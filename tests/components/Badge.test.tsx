import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderWithProviders, screen } from '../utils/test-utils';
import { Badge } from '@/src/components/common/Badge';

describe('<Badge /> Component', () => {
  it('renders difficulty badge correctly', () => {
    renderWithProviders(<Badge type="difficulty" value="beginner" />);
    // In default AppContext language is 'ar'
    expect(screen.getByText('مبتدئ')).toBeInTheDocument();
  });

  it('renders status badge correctly', () => {
    renderWithProviders(<Badge type="status" value="official" />);
    expect(screen.getByText('مفهوم رسمي')).toBeInTheDocument();
  });

  it('renders category badge with category data', () => {
    renderWithProviders(<Badge type="category" value="core" />);
    expect(screen.getByText('النواة والنماذج')).toBeInTheDocument();
  });

  it('renders small size badge with appropriate classes', () => {
    const { container } = renderWithProviders(<Badge type="difficulty" value="advanced" size="sm" />);
    const badge = container.querySelector('#badge-diff-advanced');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-xs');
  });
});
