import { defaultError } from '@/service/auth'
import {
  sortWithOrder,
  asStringList,
  convertFilters,
  professionsDisplayText,
  api
} from './data-utils'

describe('sortWithOrder()', () => {
  it('is same order', () => {
    expect(sortWithOrder(0, 0)).toEqual(0)
  })
  it('is ordered before', () => {
    expect(sortWithOrder(1, 0)).toEqual(1)
  })
  it('is ordered after', () => {
    expect(sortWithOrder(0, 1)).toEqual(-1)
  })
})

describe('asStringList()', () => {
  it('returned as string', () => {
    expect(
      asStringList([
        { name: 'item 1', slug: 'item-1' },
        { name: 'item 2', slug: 'item-2' },
        { name: 'item 3', slug: 'item-3' }
      ])
    ).toEqual(['item 1', 'item 2', 'item 3'])
  })
})

describe('convertFilters()', () => {
  it('returns pipe seperated values', () => {
    expect(
      convertFilters({
        title: 'hello world',
        shoppinglist: ['apples', 'filters'],
        age: 27
      })
    ).toEqual({ age: 27, shoppinglist: 'apples|filters', title: 'hello world' })
  })
  it('empty', () => {
    expect(convertFilters(null)).toBeNull()
    expect(convertFilters({})).toEqual({})
  })
})

describe('professionsDisplayText()', () => {
  it('returns data', () => {
    expect(professionsDisplayText('Agent', ['Cook', 'Footballer'])).toEqual({
      primary_profession: 'Agent',
      professions: 'Cook, Footballer'
    })
  })

  it('removes primary professions from professions', () => {
    expect(professionsDisplayText('Agent', ['Cook', 'Agent', 'Footballer'])).toEqual({
      primary_profession: 'Agent',
      professions: 'Cook, Footballer'
    })
  })

  it('returns empty string', () => {
    expect(professionsDisplayText('Agent', [])).toEqual({
      primary_profession: 'Agent',
      professions: ''
    })
    expect(professionsDisplayText('Agent')).toEqual({
      primary_profession: 'Agent',
      professions: ''
    })

    expect(professionsDisplayText(undefined, undefined, undefined)).toEqual({
      primary_profession: '',
      professions: ''
    })

    expect(professionsDisplayText(null, null, null)).toEqual({
      primary_profession: '',
      professions: ''
    })
  })

  it('replaces other text in professions', () => {
    expect(
      professionsDisplayText('Agent', ['Cook', 'Other', 'Footballer'], 'My other text')
    ).toEqual({
      primary_profession: 'Agent',
      professions: 'Cook, My other text, Footballer'
    })
  })

  it('replaces other text in primary professions', () => {
    expect(
      professionsDisplayText('Other', ['Cook', 'Other', 'Footballer'], 'My other text')
    ).toEqual({
      primary_profession: 'My other text',
      professions: 'Cook, Footballer'
    })

    expect(
      professionsDisplayText(
        'Other',
        [
          'Counter fraud',
          'Knowledge and information management',
          'International trade',
          'Science and engineering',
          'Policy',
          'Veterinary',
          'my other work',
          'invalid random stuff'
        ],
        'invalid random stuff'
      )
    ).toEqual({
      primary_profession: 'invalid random stuff',
      professions:
        'Counter fraud, Knowledge and information management, International trade, Science and engineering, Policy, Veterinary, my other work'
    })
  })
})

describe('api()', () => {
  const mockSuccess = { fruit: 'apples' }
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSuccess), { status: 200 })
    const data = await (await api('my-token', '/api')).json()
    expect(data).toEqual(expect.objectContaining(mockSuccess))
  })

  it('Error on initial fetch', async () => {
    fetchMock.mockReject(new Error('fake error message'))
    await expect(api('my-token', '/api')).rejects.toThrowError(defaultError)
  })

  it('custom error', async () => {
    const errorMessage = 'my custom error'
    fetchMock.mockResponseOnce(JSON.stringify({ detail: 'my custom error' }), {
      status: 401
    })
    await expect(api('my-token', '/api')).rejects.toThrowError(errorMessage)
  })

  it('default error fallback', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSuccess), { status: 401 })
    await expect(api('my-token', '/api')).rejects.toThrowError(defaultError)
  })
})
