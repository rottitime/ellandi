import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/lib/test-utils'
import DebugPage from '@/pages/_envz'

describe('Page: Debug page', () => {
  it('Success', async () => {
    renderWithProviders(
      <DebugPage enable={true} nodeEnv="localpc" serverEnvironment="magic_hat" />
    )
    expect(screen.getByTestId('success-page')).toBeInTheDocument()
  })

  it('Error 404', async () => {
    renderWithProviders(
      <DebugPage enable={false} nodeEnv="localpc" serverEnvironment="magic_hat" />
    )
    expect(screen.getByTestId('error-page')).toBeInTheDocument()
  })
})
