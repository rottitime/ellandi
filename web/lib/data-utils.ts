import { GenericDataList } from '@/service/types'

export const sortWithOrder = (a: number, b: number): number => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export const asStringList = (data: GenericDataList[]) => data.map(({ name }) => name)

export const csvDownload = (data: string, filename): void => {
  const href = encodeURI('data:text/csv;charset=utf-8,' + data)
  const hiddenElement = document.createElement('a')
  hiddenElement.href = href
  hiddenElement.target = '_blank'
  hiddenElement.download = filename + '.csv'
  hiddenElement.click()
}
