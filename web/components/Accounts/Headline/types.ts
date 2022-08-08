import { ColorBrands, Colors } from '@/style/types'
import { Box } from '@mui/material'
import { ComponentProps } from 'react'

export type Props = {
  textColor: keyof Colors | keyof ColorBrands
} & ComponentProps<typeof Box>
