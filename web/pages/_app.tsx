import { GlobalStyle as GovStyles } from 'govuk-react'
import { ThemeProvider } from 'styled-components'
import theme from '@/style/theme'
import './global_styles.scss'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <GovStyles />
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  )
}
