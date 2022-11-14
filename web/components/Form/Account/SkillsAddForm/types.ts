import { Props as SuggesttionProps } from '@/components/UI/SkillsSuggest/types'
import { SkillsType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

type SubmitType = SubmitHandler<SkillsType>

export type Props = {
  loading: boolean
  showAll?: boolean
  onFormSubmit: SubmitType
  suggestionProps?: SuggesttionProps[]
  hideSubmit?: boolean
}

export type RefHandler = {
  submitForm: SubmitType
}
