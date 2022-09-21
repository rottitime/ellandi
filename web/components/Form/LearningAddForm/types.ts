import { LearningAddType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

export type Props = {
  loading: boolean
  onFormSubmit: SubmitHandler<LearningAddType>
}
