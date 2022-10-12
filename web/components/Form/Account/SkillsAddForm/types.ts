import { Props as SuggesttionProps } from '@/components/Account/SkillsSuggest/types'
import { SkillsType } from '@/service/types'
import { SubmitHandler } from 'react-hook-form'

export type Props = {
  loading: boolean
  showAll?: boolean
  onFormSubmit: SubmitHandler<SkillsType>
  suggestionProps?: Partial<SuggesttionProps>
}
