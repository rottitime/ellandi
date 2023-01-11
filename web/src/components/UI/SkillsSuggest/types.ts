import { Box } from '@mui/material'
import { ComponentProps } from 'react'
import { MeSuggestedSkillsResponse } from '@/service/api'
import { SkillGroup } from '@/service/me'

export type Props = {
  groupId?: SkillGroup
  hideOptions?: string[]
  max?: number
  hidden?: boolean
  loading?: boolean
  data: MeSuggestedSkillsResponse
  description?: string
  onSelected?: (value: string) => void
} & ComponentProps<typeof Box>
