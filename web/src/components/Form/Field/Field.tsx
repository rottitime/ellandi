import { Box, styled } from '@mui/material'
import { Props } from './types'

export const Field = styled(Box)<Props>`
  margin-bottom: ${({ theme, noMargin }) => (noMargin ? 0 : theme.spacing(3))};
`
