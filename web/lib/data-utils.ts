import { GenericDataList } from '@/service/types'
import getConfig from 'next/config'
import { defaultError } from '@/service/auth'
import { createUrl } from './url-utils'
const { publicRuntimeConfig } = getConfig()

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

export const api = async (
  token: string,
  path: RequestInfo | URL,
  init: RequestInit = {},
  params?: URLSearchParams
): Promise<Response> => {
  const url = createUrl(`${publicRuntimeConfig.apiUrl}${path}`, params)
  let detailMessage
  const res: Response = await fetch(url, {
    ...init,
    headers: { ...init.headers, Authorization: `Token ${token}` }
  })
  if (res.ok) return res
  try {
    const { detail } = await res.json()
    detailMessage = detail
  } catch (e) {}
  throw new Error(detailMessage || defaultError)
}
