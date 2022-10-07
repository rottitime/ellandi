import { screen, waitFor } from '@testing-library/react'
import LearningRecordList from './LearningRecordList'
import fetchMock from 'jest-fetch-mock'
import { bugfixForTimeout, renderWithProviders } from '@/lib/test-utils'
import { MeLearningList } from '@/service/types'

const mockSuccess: MeLearningList[] = [
  {
    id: 'test1',
    name: 'Skill Something A',
    learning_type: 'Holiday',
    duration_minutes: 122,
    date_completed: '2022-01-23'
  },
  {
    id: 'test2',
    name: 'Skill Something B',
    learning_type: 'Food making',
    duration_minutes: 122,
    date_completed: '2022-01-24'
  },
  {
    id: 'test3',
    name: 'Skill Something C',
    learning_type: 'Review',
    duration_minutes: 122,
    date_completed: '2022-01-25'
  }
]

describe('LearningRecordList', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders with data after loading', async () => {
    fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    await renderWithProviders(<LearningRecordList />)

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByText(mockSuccess[0].name)).toBeInTheDocument()
    })
    expect(screen.getByText(mockSuccess[1].name)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess[2].name)).toBeInTheDocument()

    expect(screen.getByText(mockSuccess[0].learning_type)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess[1].learning_type)).toBeInTheDocument()
    expect(screen.getByText(mockSuccess[2].learning_type)).toBeInTheDocument()
  })

  it('message for no skills', async () => {
    fetchMock.mockResponse(JSON.stringify([]), {
      status: 200
    })
    renderWithProviders(<LearningRecordList />)

    await bugfixForTimeout()

    await waitFor(async () => {
      expect(screen.getByTestId('empty')).toBeInTheDocument()
    })
  })
})
