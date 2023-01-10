import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@/style/theme'
import { FC } from 'react'
import { Props } from './types'

const ThemeProvider: FC<Props> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
)

export default ThemeProvider
