import { SkillType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

export type ReviewFields = {
  id: string
  name: string
  approve: string
  comment?: string
}

export type Props = {
  data: SkillType[]
  onFormSubmit: SubmitHandler<ReviewFields[]>
}

export type SchemaType = { reviewed: ReviewFields[] }
