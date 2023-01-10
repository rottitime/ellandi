export const createIdFromHref = (href: string, defaultValue = '', removePath = '') =>
  href.replace(removePath, '').split('/').at(-1) || defaultValue

export const createUrl = (
  url: RequestInfo | URL,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: string | URLSearchParams | Record<string, any> | string[][]
): string => {
  const queryString = new URLSearchParams(params).toString()
  return `${url}${queryString && `?${queryString}`}`
}
