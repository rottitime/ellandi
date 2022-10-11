import { LearningAddFormalType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

export type Props = {
  loading: boolean
  error?: string
  defaultValues?: Partial<LearningAddFormalType>
  onFormSubmit: SubmitHandler<LearningAddFormalType>
}
