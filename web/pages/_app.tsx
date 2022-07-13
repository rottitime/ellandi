import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '@/style/theme'
import createEmotionCache from '@/lib/createEmotionCache'
import { ReactNode } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { UiProvider } from '@/context/UiContext'
import { AppProps } from 'next/app'
import { NextPage } from 'next'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: NextPage & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000 } }
})

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Civil Service Skills and Learning</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <UiProvider>{getLayout(<Component {...pageProps} />)}</UiProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
