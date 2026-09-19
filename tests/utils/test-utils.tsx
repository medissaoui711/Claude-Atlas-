import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@/src/context/AppContext';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Can add custom provider options if needed
}

export function renderWithProviders(
  ui: ReactElement,
  options?: ExtendedRenderOptions
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <AppProvider>{children}</AppProvider>;
  };

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

export * from '@testing-library/react';
export { userEvent };
