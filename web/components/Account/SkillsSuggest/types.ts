import { Box } from '@mui/material'
import { ComponentProps } from 'react'
import { MeSuggestedSkillsResponse } from '@/service/api'

export type SkillSuggestionType = 'default' | 'job-role'

export type Props = {
  hideOptions: string[]
  max?: number
  type: SkillSuggestionType
  hidden?: boolean
  loading?: boolean
  data: MeSuggestedSkillsResponse
  description: string
  onFetched?: (data: MeSuggestedSkillsResponse) => void
  onSelected: (value: string) => void
} & ComponentProps<typeof Box>
