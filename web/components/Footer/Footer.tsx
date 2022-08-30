import { Box, Container, styled } from '@mui/material'
import Link from '@/components/UI/Link'
import Icon from '@/components/Icon/Icon'
import { FC } from 'react'
import { Props } from './types'

const StyledFooter = styled(Box)`
  .MuiContainer-root {
    border-top: 4px solid #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    a {
      color: ${(p) => p.theme.colors.black};
      font-weight: 300;
      font-size: 16px;
    }
    li {
      display: inline-block;
      margin-right: ${(p) => p.theme.spacing(3)};
    }
  }
  .copyright {
    display: flex;
    align-items: center;
    gap: 10px;
    svg {
      font-size: 50px;
    }
  }
`

const Footer: FC<Props> = ({ menu, ...props }) => (
  <StyledFooter className="main-footer" component="footer" {...props}>
    <Container maxWidth="xl">
      <nav>
        <ul>
          {menu.map(({ title, url, newWindow }) => (
            <li key={title}>
              <Link href={url} target={!!newWindow && '_blank'}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Box className="copyright">
        <Icon icon="crest" className="header-logo" />
        &copy; Crown copyright
      </Box>
    </Container>
  </StyledFooter>
)

export default Footer
