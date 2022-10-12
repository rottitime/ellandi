import { LearningAddType, MeLearningRecord } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

type SubmitType = SubmitHandler<Partial<MeLearningRecord>>

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
