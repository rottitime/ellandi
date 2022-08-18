import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders, bugfixForTimeout } from '@/lib/test-utils'
import LanguageForm from './LanguageForm'
import fetchMock from 'jest-fetch-mock'
import { GenericDataList, LanguageType } from '@/service/types'

const mockLanguages: GenericDataList[] = [
  { name: 'french', slug: '1' },
  { name: 'american', slug: '2' }
]

const mockLevels: GenericDataList[] = [
  { name: 'bad', slug: '1' },
  { name: 'good', slug: '2' }
]

const mockData: LanguageType[] = [
  { id: '1', name: 'french', writing_level: 'good', speaking_level: 'bad' },
  { id: '2', name: 'american', writing_level: 'bad', speaking_level: 'good' }
]

describe('LanguageForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockLanguages), { status: 200 }],
      [JSON.stringify(mockLevels), { status: 200 }]
    )

    await renderWithProviders(
      <LanguageForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    await bugfixForTimeout()

    expect(screen.getByTestId('button-addlanguagerow')).toBeInTheDocument()

    await waitFor(async () => {
      expect(screen.getByTestId('languages.0.name')).toHaveValue('')
    })

    expect(screen.getByTestId('language-form')).toHaveFormValues({})
  })

  it('fields are prepopulated', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockLanguages), { status: 200 }],
      [JSON.stringify(mockLevels), { status: 200 }]
    )

    renderWithProviders(
      <LanguageForm
        backUrl="/back"
        onFormSubmit={jest.fn()}
        defaultValues={{ languages: mockData }}
      />
    )

    await waitFor(async () => {
      expect(screen.getByTestId('language-form')).toHaveFormValues({
        'languages.0.name': mockData[0].name,
        'languages.1.name': mockData[1].name,
        'languages.0.writing_level': mockData[0].writing_level,
        'languages.1.writing_level': mockData[1].writing_level,
        'languages.0.speaking_level': mockData[0].speaking_level,
        'languages.1.speaking_level': mockData[1].speaking_level
      })
    })
  })
})
