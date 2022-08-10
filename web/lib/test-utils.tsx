import { ThemeProvider } from '@mui/material'
import { render, RenderOptions } from '@testing-library/react'
import { ReactNode } from 'react'
import theme from '@/style/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UiProvider } from '@/context/UiContext'

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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
  const rendered = await render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UiProvider>
          <>{ui}</>
        </UiProvider>
      </ThemeProvider>
    </QueryClientProvider>,
    options
  )
  return {
    ...rendered
    // rerender: (ui, options) =>
    //   renderWithProviders(ui, { container: rendered.container, ...options })
  }
}

export * from '@testing-library/react'
export { renderWithProviders as render }
