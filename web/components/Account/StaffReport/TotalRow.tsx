import Chip from '@/components/Chip/Chip'
import Typography from '@/components/UI/Typography/Typography'
import { Box, styled } from '@mui/material'
import { FC } from 'react'
import { TotalRowProps } from './types'

const Total = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(p) => p.theme.colors.grey2};
  border-bottom: 1px solid ${(p) => p.theme.colors.grey2};
  height: 52px;
  align-items: center;
`

const TotalRow: FC<TotalRowProps> = ({ total }) =>
  !!total ? (
    <Total>
      <Typography variant="h3" component="p">
        Total users
      </Typography>
      <Chip label={total} brandColor="black" />
    </Total>
  ) : null

export default TotalRow
