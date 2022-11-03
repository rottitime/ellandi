import { Typography as MuiTypography, styled } from '@mui/material'
import { Props } from './types'

const StyledTypography = styled(MuiTypography, {
  shouldForwardProp: (p) => p !== 'pending'
})<Props>`
  ${(p) =>
    !!p.pending &&
    `
color:${p.theme.colors.grey3};
  `}
`

export default StyledTypography
