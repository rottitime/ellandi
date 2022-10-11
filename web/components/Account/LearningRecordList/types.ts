import { MeLearningFormalList, MeLearningList } from '@/service/types'

export type RowsType = {
  type: string
} & MeLearningList

export type ModalProps = {
  data: MeLearningFormalList | MeLearningList
}
