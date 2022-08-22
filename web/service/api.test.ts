import { fetchLanguageSkillLevels, GenericDataList } from './api'
import fetchMock from 'jest-fetch-mock'

describe('fetchLanguageSkillLevels()', () => {
  const mockResult: GenericDataList[] = [
    {
      slug: '1',
      name: 'Basic',
      order: 0
    },
    {
      slug: 'independent',
      name: 'Independent',
      order: 1
    },
    {
      slug: '2',
      name: 'None',
      order: 3
    },
    {
      slug: '3',
      name: 'Proficient',
      order: 2
    }
  ]
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  it('returns results in order', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResult), {
      status: 200
    })

    expect(await fetchLanguageSkillLevels()).toMatchObject([
      {
        slug: '1',
        name: 'Basic',
        order: 0
      },
      {
        slug: 'independent',
        name: 'Independent',
        order: 1
      },
      {
        slug: '3',
        name: 'Proficient',
        order: 2
      },
      {
        slug: '2',
        name: 'None',
        order: 3
      }
    ])
  })
})
