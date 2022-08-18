import { Box, styled } from '@mui/material'
import Icon from '@/components/Icon/Icon'
import { FC } from 'react'
import { Props } from './types'

const Banner = styled(Box)`
  background-color: ${(p) => p.theme.colors.white};
  border-bottom: 1px solid ${(p) => p.theme.colors.black};
  padding: ${(p) => p.theme.spacing(3)};
  display: flex;

  .title {
    font-weight: bold;
    text-transform: uppercase;
    margin-left: ${(p) => p.theme.spacing(3)};
    margin-right: ${(p) => p.theme.spacing(3)};
  }
`

const AlphaBanner: FC<Props> = ({ children, ...props }) => (
  <Banner {...props}>
    <Icon icon="circle-info" size={22} /> <span className="title">Alpha</span>
    {children}
  </Banner>
)

export default AlphaBanner
