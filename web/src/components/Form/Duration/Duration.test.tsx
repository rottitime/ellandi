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
    renderWithProviders(<Duration value={25} onChange={jest.fn()} />)
    expect(screen.getByTestId('duration-days')).toHaveValue(0)
    expect(screen.getByTestId('duration-hours')).toHaveValue(0)
    expect(screen.getByTestId('duration-minutes')).toHaveValue(25)
  })

  it('renders duration with minutes', async () => {
    renderWithProviders(<Duration value={12127} onChange={jest.fn()} />)
    expect(screen.getByTestId('duration-days')).toHaveValue(27)
    expect(screen.getByTestId('duration-hours')).toHaveValue(2)
    expect(screen.getByTestId('duration-minutes')).toHaveValue(19)
  })

  describe('onChange', () => {
    it('other fields remain null', async () => {
      const mockChange = jest.fn()
      renderWithProviders(<Duration value={null} onChange={mockChange} />)

      const days = screen.getByTestId('duration-days')
      const minutes = screen.getByTestId('duration-minutes')
      const hours = screen.getByTestId('duration-hours')

      await userEvent.type(days, '10')
      expect(days).toHaveValue(10)
      expect(mockChange).toHaveBeenLastCalledWith(4440)
      expect(minutes).toHaveValue(null)
      expect(hours).toHaveValue(null)

      await userEvent.type(hours, '1')
      expect(mockChange).toHaveBeenLastCalledWith(4500)
      expect(minutes).toHaveValue(null)

      await userEvent.type(minutes, '55')
      expect(mockChange).toHaveBeenLastCalledWith(4555)
    })
  })
})
