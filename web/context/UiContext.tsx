import { createContext, FC, ReactNode, useContext, useState } from 'react'

type Props = {
  loading: boolean
  setLoading: (p: boolean) => void
}
const UIContext = createContext<Props>({} as Props)

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const context: Props = {
    loading,
    setLoading
  }

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>
}

export const useUiContext = () => {
  const context = useContext(UIContext)
  return context
}
