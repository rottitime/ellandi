import { FeedbackType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

export type Props = {
  onFormSubmit: SubmitHandler<FeedbackType>
  loading: boolean
}
