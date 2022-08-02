import { useRouter } from 'next/router'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

const ecodes = {
  1: 'Please register to proceed',
  12: 'I am found'
}

type Props = {
  loading: boolean
  error: string
  setLoading: (p: boolean) => void
  setError: (p: string) => void
}
const UIContext = createContext<Props>({} as Props)

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const ecode = router?.query?.ecode
    const message = ecodes[parseInt(ecode as string)]

    if (!!message) {
      setError(message)
    } else {
      setError('')
    }
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
