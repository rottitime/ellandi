import { LearningAddFormalType, LearningBaseType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

type SubmitType = SubmitHandler<LearningBaseType | LearningAddFormalType>

export type Props = {
  loading: boolean
  error?: string
  defaultValues?: LearningBaseType
  onFormSubmit: SubmitType
  compact?: boolean
  type?: 'generic' | 'formal'
}

export type RefHandler = {
  submitForm: SubmitType
}
