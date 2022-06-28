import { GlobalStyle } from 'govuk-react'
import { ThemeProvider } from 'styled-components'
import theme from '@/style/theme'
import './global_styles.scss'

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
