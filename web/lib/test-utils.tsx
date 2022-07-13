import { ThemeProvider } from '@mui/material'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { NextRouter } from 'next/router'
import { ReactNode } from 'react'
import theme from '@/style/theme'

export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false
}

export const renderWithProviders = (
  ui: ReactNode,
  options: Omit<RenderOptions, 'queries'> = {}
): RenderResult => {
  const { rerender, ...props } = render(
    <RouterContext.Provider value={mockRouter}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </RouterContext.Provider>,
    options
  )
  return { ...props, rerender }
}
