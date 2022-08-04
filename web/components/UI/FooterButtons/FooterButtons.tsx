import { Box, styled } from '@mui/material'

const FooterButtons = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 15px;
  margin-top: ${(p) => p.theme.spacing(4)};
  align-items: center;
  justify-content: space-between;
`
export default FooterButtons
