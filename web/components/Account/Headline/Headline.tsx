import { Box, styled } from '@mui/material'
import { Props } from './types'

const Headline = styled(Box)<Props>`
  margin-bottom: ${(p) => p.theme.spacing(5)};
  h1.MuiTypography-h1 {
    display: flex;
    align-items: center;
    color: ${({ theme, textColor }) => theme.colors[textColor]};
    svg {
      font-size: 50px;
      margin-right: ${(p) => p.theme.spacing(3)};
    }
  }
`

export default Headline
