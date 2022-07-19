import { ThemeProvider } from '@mui/material'
import { render, RenderOptions } from '@testing-library/react'
import { ReactNode } from 'react'
import theme from '@/style/theme'

beforeAll(() => {
  Object.defineProperty(global, 'sessionStorage', { value: mockStorage })
  Object.defineProperty(global, 'localStorage', { value: mockStorage })
})

afterEach(() => {
  window.sessionStorage.clear()
})

const mockStorage = (() => {
  let store = {}
  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    }
  }
})()

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
