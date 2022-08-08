import { FeedabckType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

export type Props = {
  onFormSubmit: SubmitHandler<FeedabckType>
  loading: boolean
}
