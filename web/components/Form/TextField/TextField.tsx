import { TextField as MuiTextField, styled, alpha } from '@mui/material'

const TextField = styled(MuiTextField)`
  .MuiOutlinedInput-notchedOutline {
    border-color: ${(p) => alpha(p.theme.colors.black, 0.23)};
  }
`

export default TextField
