export const createIdFromHref = (href: string, defaultValue = '', removePath = '') =>
  href.replace(removePath, '').split('/').at(-1) || defaultValue
