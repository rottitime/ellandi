import { Box } from '@mui/material'
import { ComponentProps } from 'react'
import { MeSuggestedSkillsResponse } from '@/service/api'

export type Props = {
  hideOptions: string[]
  max?: number
  onFetched?: (data: MeSuggestedSkillsResponse) => void
  onSelected: (value: string) => void
} & ComponentProps<typeof Box>
