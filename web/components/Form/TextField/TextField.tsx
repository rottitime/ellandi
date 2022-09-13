import { TextField as MuiTextField, styled, alpha } from '@mui/material'

const StyledTextField = styled(MuiTextField)`
  .MuiInputBase-root,
  .MuiFormLabel-root {
    font-size: 16px;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${(p) => alpha(p.theme.colors.black, 0.23)};
  }
`

export default StyledTextField
