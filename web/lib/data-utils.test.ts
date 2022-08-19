import { sortWithOrder } from './data-utils'

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
