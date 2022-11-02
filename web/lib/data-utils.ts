import { GenericDataList } from '@/service/types'

export const sortWithOrder = (a: number, b: number): number => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export const asStringList = (data: GenericDataList[]) => data.map(({ name }) => name)
