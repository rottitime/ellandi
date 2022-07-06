import { Divider as MuiDivider, styled } from '@mui/material'

const Divider2 = styled(MuiDivider)<{ spacing?: number }>`
  margin-top: ${({ spacing }) => (spacing ? `${spacing}px` : 0)};
  margin-bottom: ${({ spacing }) => (spacing ? `${spacing}px` : 0)};
`

export default Divider2
