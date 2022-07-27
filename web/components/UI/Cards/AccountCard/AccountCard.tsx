import { Card as MuiCard, styled, CardContent, Box } from '@mui/material'
import { FC } from 'react'
import { Props } from './types'

const Card = styled(MuiCard)<Props>`
  position: relative;
  word-wrap: break-word;
  border-radius: 12px;

  .card-header {
    margin-bottom: ${(p) => p.theme.spacing(4)};
    color: ${({ theme, color }) => theme.colors[color]};
    display: flex;
    align-items: center;

    .icon {
      font-size: 50px;
      margin-right: ${(p) => p.theme.spacing(3)};
    }
  }

  &:before {
    height: 20px;
    content: '';
    background-color: ${({ theme, color }) => theme.colors[color]};
    display: block;
  }

  .MuiCardContent-root {
    padding: ${({ theme: { spacing } }) => `${spacing(2)}`};
  }
`

const AccountCard: FC<Props> = ({ children, header, headerLogo, ...props }) => {
  return (
    <Card {...props}>
      <CardContent>
        {header && (
          <header className="card-header">
            {headerLogo && <Box className="icon">{headerLogo}</Box>} {header}
          </header>
        )}
        {children}
      </CardContent>
    </Card>
  )
}

export default AccountCard
