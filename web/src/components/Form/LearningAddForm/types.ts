import {
  LearningFormalType,
  LearningBaseType,
  LearningConditionalApiFields
} from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

export type FormData = (LearningBaseType | LearningFormalType) &
  LearningConditionalApiFields

type SubmitType = SubmitHandler<FormData>

export type Props = {
  loading: boolean
  error?: string
  defaultValues?: FormData
  onFormSubmit: SubmitType
  compact?: boolean
  type?: 'generic' | 'formal'
}

export type RefHandler = {
  submitForm: SubmitType
}
