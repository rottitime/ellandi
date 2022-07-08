import { createContext, FC, ReactNode, useContext, useState } from 'react'

type Props = {
  loading: boolean
  // statusIndicator: number
  setLoading: (p: boolean) => void
  // setStatusIndicator: (p: number) => void
}
const UIContext = createContext<Props>({} as Props)

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  //const [statusIndicator, setStatusIndicator] = useState(null)

  const context: Props = {
    loading,
    setLoading
    // statusIndicator,
    // setStatusIndicator
  }

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>
}

export const useUiContext = () => {
  const context = useContext(UIContext)
  return context
}
