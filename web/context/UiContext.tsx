import { useRouter } from 'next/router'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import Link from '@/components/UI/Link'

type Props = {
  loading: boolean
  error: string | ReactNode
  setLoading: (p: boolean) => void
  setError: (p: string | ReactNode) => void
}

const ecodes = {
  1: 'Please register to proceed',
  2: (
    <>
      You need to <Link href="/signin">sign in</Link> or{' '}
      <Link href="/register/step/0">create an account</Link> before using this service
    </>
  )
}

const UIContext = createContext<Props>({} as Props)

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | ReactNode>('')
  const router = useRouter()

  useEffect(() => {
    const ecode = router?.query?.ecode
    const message = ecodes[parseInt(ecode as string)]

    setError(!!message ? message : '')
  }, [router])

  const context: Props = {
    loading,
    error,
    setLoading,
    setError
  }

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>
}

export const useUiContext = () => {
  const context = useContext(UIContext)
  return context
}
