import { ThemeProvider } from '@mui/material'
import { render, RenderOptions } from '@testing-library/react'
import { NextRouter } from 'next/router'
import { ReactNode } from 'react'
import theme from '@/style/theme'

export const renderWithProviders = async (
  ui: ReactNode,
  options: Omit<RenderOptions, 'queries'> = {}
) => {
  const { rerender, ...props } = await render(
    <ThemeProvider theme={theme}>
      <>{ui}</>
    </ThemeProvider>,
    options
  )
  return { ...props, rerender }
}
