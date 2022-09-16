import { screen } from '@testing-library/react'
import Duration from './Duration'
import { renderWithProviders } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'

describe('Duration', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('renders default', async () => {
    renderWithProviders(<Duration value={null} onChange={jest.fn()} />)
    expect(screen.getByTestId('duration-days')).toHaveValue(null)
    expect(screen.getByTestId('duration-hours')).toHaveValue(null)
    expect(screen.getByTestId('duration-minutes')).toHaveValue(null)
  })

  it('renders duration', async () => {
    renderWithProviders(<Duration value={2.5} onChange={jest.fn()} />)
    expect(screen.getByTestId('duration-days')).toHaveValue(2)
    expect(screen.getByTestId('duration-hours')).toHaveValue(12)
    expect(screen.getByTestId('duration-minutes')).toHaveValue(0)
  })

  it('renders duration with minutes', async () => {
    renderWithProviders(<Duration value={2.7} onChange={jest.fn()} />)
    expect(screen.getByTestId('duration-days')).toHaveValue(2)
    expect(screen.getByTestId('duration-hours')).toHaveValue(16)
    expect(screen.getByTestId('duration-minutes')).toHaveValue(48)
  })

  describe('onChange', () => {
    it('other fields remain null', async () => {
      const mockChange = jest.fn()
      renderWithProviders(<Duration value={null} onChange={mockChange} />)

      const days = screen.getByTestId('duration-days')
      const minutes = screen.getByTestId('duration-minutes')
      const hours = screen.getByTestId('duration-hours')

      await userEvent.type(days, '2')
      expect(days).toHaveValue(2)
      expect(mockChange).toHaveBeenLastCalledWith(2)
      expect(minutes).toHaveValue(null)
      expect(hours).toHaveValue(null)

      await userEvent.type(hours, '1')
      expect(mockChange).toHaveBeenLastCalledWith(2.04)
      expect(minutes).toHaveValue(null)

      await userEvent.type(minutes, '55')
      expect(mockChange).toHaveBeenLastCalledWith(2.08)
    })
  })
})
