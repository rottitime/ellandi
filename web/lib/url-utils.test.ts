import { createIdFromHref } from './url-utils'

describe('createIdFromHref()', () => {
  it('returns a id', () => {
    expect(createIdFromHref('/path1/path2')).toEqual('path2')
    expect(createIdFromHref('/')).toEqual('')
  })

  it('returns default value', () => {
    expect(createIdFromHref('/path1/path2', 'ted')).toEqual('path2')
    expect(createIdFromHref('/', 'ted')).toEqual('ted')
  })

  it('removes url path', () => {
    expect(createIdFromHref('/path1/path2', '', '/path1/path2')).toEqual('')
  })
})
