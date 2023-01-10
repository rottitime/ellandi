import { Skeleton as MuiSkeleton, styled } from '@mui/material'
import { ComponentProps, FC } from 'react'

type Props = ComponentProps<typeof MuiSkeleton>

const StyledSkeleton = styled(MuiSkeleton)`
  border-radius: 0;
`

const Skeleton: FC<Props> = (props) => (
  <StyledSkeleton height={30} animation="wave" {...props} />
)

export default Skeleton
