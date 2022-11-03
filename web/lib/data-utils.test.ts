import { sortWithOrder, asStringList } from './data-utils'

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
