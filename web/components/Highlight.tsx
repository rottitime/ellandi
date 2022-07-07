import { styled } from '@mui/material'

type Props = {
  newLine?: boolean
}

const Highlight = styled('span')<Props>`
  color: rgb(244, 158, 118);
  display: ${(p) => (p.newLine ? 'block' : 'inline')};
`

export default Highlight
