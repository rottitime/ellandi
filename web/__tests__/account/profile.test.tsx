import { screen, waitFor } from '@testing-library/react'
import ProfilePage from '@/pages/account/profile'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, mockMe } from '@/lib/test-utils'
import { RegisterUserResponse } from '@/service/types'

describe('Page: Profile', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('Successfull response', () => {
    beforeEach(() => {
      fetchMock.mockResponses([JSON.stringify(mockMe), { status: 200 }])
    })

    it('renders', async () => {
      renderWithProviders(<ProfilePage />)

      await waitFor(async () => {
        expect(screen.getByText(mockMe.email)).toBeInTheDocument()
      })

      expect(
        screen.getByText(`${mockMe.first_name} ${mockMe.last_name}`)
      ).toBeInTheDocument()

      expect(screen.getByText(mockMe.job_title)).toBeInTheDocument()
      expect(screen.getByText(mockMe.business_unit)).toBeInTheDocument()
      expect(screen.getByText(mockMe.business_unit)).toBeInTheDocument()
      expect(screen.getByText(mockMe.line_manager_email)).toBeInTheDocument()
      expect(screen.getByText(mockMe.line_manager_email)).toBeInTheDocument()
      expect(screen.getByText(mockMe.grade)).toBeInTheDocument()
      expect(screen.getByText(mockMe.function)).toBeInTheDocument()
      expect(screen.getByText(mockMe.contract_type)).toBeInTheDocument()
      expect(screen.getByText('Audit, Management')).toBeInTheDocument()
    })
  })

  it('renders other fields', async () => {
    const data: RegisterUserResponse = {
      ...mockMe,
      professions: ['Chosen profession', 'Other'],
      profession_other: 'Custom other profession',
      grade_other: 'Custom other grade',
      function_other: 'Custom other function',
      contract_type_other: 'custom other contract'
    }

    fetchMock.mockResponses([JSON.stringify(data), { status: 200 }])

    renderWithProviders(<ProfilePage />)

    await waitFor(async () => {
      expect(screen.getByText(data.grade_other)).toBeInTheDocument()
    })
    expect(screen.getByText(data.function_other)).toBeInTheDocument()
    expect(screen.getByText(data.contract_type_other)).toBeInTheDocument()
    expect(
      screen.getByText('Chosen profession, Custom other profession')
    ).toBeInTheDocument()
  })
})
