import Head from 'next/head'
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/lib/createEmotionCache'
import { ReactNode } from 'react'
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UiProvider } from '@/context/UiContext'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import LocalizationProvider from '@/components/LocalizationProvider/LocalizationProvider'
import { title } from '@/content'
import '@/style/fonts.css'
interface MyAppProps extends AppProps<{ dehydratedState: DehydratedState }> {
  emotionCache?: EmotionCache
  pageProps
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
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <LocalizationProvider>
              <UiProvider>{getLayout(<Component {...pageProps} />)}</UiProvider>
            </LocalizationProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
