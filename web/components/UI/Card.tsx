import { Card as MuiCard } from '@mui/material'
import { ComponentProps, FC, ReactNode } from 'react'

type Props = { children: ReactNode; fullHeight?: boolean } & ComponentProps<
  typeof MuiCard
>

const Card: FC<Props> = ({ children, fullHeight, elevation = 0, ...props }) => {
  return (
    <MuiCard
      sx={{ padding: '20px', height: fullHeight ? '100%' : 'auto' }}
      elevation={elevation}
      {...props}
    >
      {children}
    </MuiCard>
  )
}

export default Card
