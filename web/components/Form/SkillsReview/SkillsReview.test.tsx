import SkillsReview from './SkillsReview'
import { renderWithProviders, screen, waitFor } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'

const data = [...Array(2).keys()].map((i) => ({
  id: `id${i}`,
  name: `Skill ${i}`,
  level: 'Ok',
  pending: true
}))

describe('SkillsReview', () => {
  it('renders', async () => {
    renderWithProviders(<SkillsReview data={data} onFormSubmit={jest.fn()} />)
    expect(screen.getByText(data[0].name)).toBeInTheDocument()
    expect(screen.getByTestId('textfield_reviewed.0.comment')).toHaveValue('')
    expect(screen.getByTestId('textfield_reviewed.0.comment')).not.toBeVisible()
    expect(screen.getByTestId('radio-0-yes')).toBeInTheDocument()
    expect(screen.getByTestId('radio-0-no')).toBeInTheDocument()

    expect(screen.getByText(data[1].name)).toBeInTheDocument()
    expect(screen.getByTestId('textfield_reviewed.1.comment')).toHaveValue('')
    expect(screen.getByTestId('textfield_reviewed.1.comment')).not.toBeVisible()
    expect(screen.getByTestId('radio-1-yes')).toBeInTheDocument()
    expect(screen.getByTestId('radio-1-no')).toBeInTheDocument()

    expect(screen.queryByTestId('textfield_reviewed.2.comment')).not.toBeInTheDocument()
    expect(screen.queryByTestId('radio-2-yes')).not.toBeInTheDocument()
    expect(screen.queryByTestId('radio-2-no')).not.toBeInTheDocument()

    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  describe('On submit', () => {
    it('sends all data', async () => {
      const mockSubmit = jest.fn()
      renderWithProviders(
        <SkillsReview data={data} onFormSubmit={(data) => mockSubmit(data)} />
      )

      await userEvent.click(screen.getByTestId('radio-1-no'))
      await userEvent.type(
        screen.getByTestId('textfield_reviewed.1.comment'),
        'my comment'
      )
      await userEvent.click(screen.getByTestId('submit-button'))

      await waitFor(async () =>
        expect(mockSubmit).toHaveBeenCalledWith([
          { approve: null, comment: null, id: 'id0', name: 'Skill 0' },
          { approve: null, comment: 'my comment', id: 'id1', name: 'Skill 1' }
        ])
      )
    })
  })
})
