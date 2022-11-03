import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const createIdFromHref = (href: string, defaultValue = '', removePath = '') =>
  href.replace(removePath, '').split('/').at(-1) || defaultValue

export const createUrl = (url: RequestInfo | URL, params?: URLSearchParams): string => {
  const queryString = new URLSearchParams(params)
  return `${publicRuntimeConfig.apiUrl}${url}?${queryString}`
}
