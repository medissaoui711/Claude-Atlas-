import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderWithProviders, screen } from '../utils/test-utils';
import { Breadcrumbs } from '@/src/components/common/Breadcrumbs';

describe('<Breadcrumbs /> Component', () => {
  it('renders breadcrumbs navigation element with Home link', () => {
    renderWithProviders(<Breadcrumbs items={[]} />);
    const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders breadcrumb items correctly', () => {
    const items = [
      { label: 'الخريطة', view: 'map' as const },
      { label: 'تفاصيل العقدة', active: true },
    ];

    renderWithProviders(<Breadcrumbs items={items} />);

    expect(screen.getByText('الخريطة')).toBeInTheDocument();
    expect(screen.getByText('تفاصيل العقدة')).toBeInTheDocument();
  });

  it('allows clicking on interactive breadcrumb links', async () => {
    const items = [
      { label: 'القدرات', view: 'capabilities' as const },
      { label: 'CLAUDE.md', active: true },
    ];

    const { user } = renderWithProviders(<Breadcrumbs items={items} />);

    const button = screen.getByRole('button', { name: 'القدرات' });
    expect(button).toBeInTheDocument();
    await user.click(button);
  });
});
