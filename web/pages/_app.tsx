import { GlobalStyle } from 'govuk-react'
import { ThemeProvider } from 'styled-components'
import theme from '@/style/theme'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
