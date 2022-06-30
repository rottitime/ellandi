import Head from 'next/head'
// import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '@/style/theme'
import createEmotionCache from '@/style/createEmotionCache'
import { SnackbarProvider } from 'notistack'
import { ReactNode } from 'react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

// interface MyAppProps extends AppProps {
//   emotionCache?: EmotionCache
// }

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={10}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
