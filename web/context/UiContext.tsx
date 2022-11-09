import { useRouter } from 'next/router'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import Link from '@/components/UI/Link'

type Props = {
  bannerHeight: number
  loading: boolean
  error: string | ReactNode
  setLoading: (p: boolean) => void
  setError: (p: string | ReactNode) => void
  setBannerHeight: (p: number) => void
  scroll: (el: HTMLElement, arg?: ScrollToOptions, offsetBanner?: boolean) => void
  isErrorEcode: () => boolean
}

const ecodes = {
  1: 'Please register to proceed',
  2: (
    <>
      You need to <Link href="/signin">sign in</Link> or{' '}
      <Link href="/register">create an account</Link> before using this service
    </>
  ),
  3: 'You are no longer logged in. Sign in to continue using the platform',
  4: "Your 'confirm your email address' link expired after 24 hours or has already been used"
}

const UIContext = createContext<Props>({} as Props)

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | ReactNode>('')
  const [bannerHeight, setBannerHeight] = useState<number>(0)
  const router = useRouter()
  const ecode = router?.query?.ecode

  useEffect(() => {
    const message = ecodes[parseInt(ecode as string)]

    setError(!!message ? message : '')
  }, [ecode])

  const isErrorEcode = (): boolean => ecodes[parseInt(ecode as string)] === error

  const scroll = (el: HTMLElement, arg?: ScrollToOptions, offsetBanner = true) => {
    const position =
      el.getBoundingClientRect().top +
      window.scrollY -
      (offsetBanner ? bannerHeight + 16 : 0)
    window.scrollTo({ top: position, behavior: 'smooth', ...arg })
  }

  const context: Props = {
    bannerHeight,
    loading,
    error,
    setLoading,
    setError,
    setBannerHeight,
    scroll,
    isErrorEcode
  }

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>
}

export const useUiContext = () => {
  const context = useContext(UIContext)
  return context
}
