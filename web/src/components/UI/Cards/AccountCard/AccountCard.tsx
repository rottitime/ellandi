import Icon from '@/components/Icon/Icon'
import { Card as MuiCard, styled, CardContent, Box, CardActions } from '@mui/material'
import { FC } from 'react'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import { Props } from './types'

const Card = styled(MuiCard, {
  shouldForwardProp: (p) => p !== 'headerLogoSize' && p !== 'headerColorInherit'
})<Props>`
  position: relative;
  word-wrap: break-word;
  border-radius: 12px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: flex;
    flex-flow: column;
  }

  .MuiCardActions-root {
    margin-top: auto;
    padding: 0 ${({ theme: { spacing } }) => `${spacing(3)}`};
    margin-bottom: ${(p) => p.theme.spacing(3)};
  }

  .card-header {
    margin-bottom: ${(p) => p.theme.spacing(4)};
    color: ${({ theme, color, headerColorInherit }) =>
      !!headerColorInherit ? theme.colors[color] : 'inherit'};
    display: flex;
    align-items: center;

    .icon {
      font-size: ${(p) => (p.headerLogoSize === 'large' ? '50px' : '30px')};
      margin-right: ${(p) => p.theme.spacing(3)};
      display: flex;
      align-items: center;
    }
  }

  &:before {
    height: 20px;
    content: ${({ color }) => (!!color ? "''" : 'normal')};
    background-color: ${({ theme, color }) => theme.colors[color]};
    display: block;
  }

  .MuiCardContent-root {
    padding: 0 ${({ theme: { spacing } }) => `${spacing(3)}`};
    margin-top: ${(p) => p.theme.spacing(3)};
    margin-bottom: ${(p) => p.theme.spacing(3)};
  }
`

const AccountCard: FC<Props> = ({
  action,
  children,
  header,
  headerLogo,
  loading,
  ...props
}) => (
  <Card {...props}>
    <CardContent>
      {loading ? (
        <>
          <header className="card-header">
            <Skeleton width={200} />
          </header>
          <TableSkeleton />
        </>
      ) : (
        <>
          {header && (
            <header className="card-header">
              {headerLogo && (
                <Box className="icon">
                  <Icon icon={headerLogo} />
                </Box>
              )}{' '}
              {header}
            </header>
          )}
          {children}
        </>
      )}
    </CardContent>
    {action && <CardActions>{action}</CardActions>}
  </Card>
)

export default AccountCard
