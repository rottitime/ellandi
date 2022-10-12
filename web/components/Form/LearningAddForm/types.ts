import { LearningAddType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

type SubmitType = SubmitHandler<LearningAddType>

export type Props = {
  loading: boolean
  error?: string
  defaultValues?: LearningAddType
  onFormSubmit: SubmitType
  compact?: boolean
  type?: 'generic' | 'formal'
}

export type RefHandler = {
  submitForm: SubmitType
}
