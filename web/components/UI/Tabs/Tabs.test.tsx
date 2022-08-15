/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react'
import { ComponentProps } from 'react'
import Tabs from './Tabs'
import { renderWithProviders } from '@/lib/test-utils'
import { Props as LinkProps } from '@/components/UI/Link'
import userEvent from '@testing-library/user-event'

const mockLink = jest.fn()
jest.mock('next/link', () => (props: LinkProps) => (
  <button onClick={() => mockLink}>{props.href}</button>
))

const sitename = 'htp://myapp/'
const mockTabItems: ComponentProps<typeof Tabs>['tabItems'] = [
  {
    title: 'Tab1',
    content: <div>Tab one</div>
  },
  {
    title: 'Tab2',
    content: <div>Tab two</div>
  },
  {
    title: 'Tab3',
    disabled: true,
    content: <div>Tab three</div>
  }
]

describe('Tabs', () => {
  const { location } = window

  beforeAll(() => {
    delete (window as any).location
  })

  afterAll(() => {
    window.location = location
  })

  beforeEach(() => {
    window.location = {
      ...location,
      href: sitename
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Renders', async () => {
    renderWithProviders(<Tabs tabItems={mockTabItems} />)
    expect(screen.getByText('Tab1')).toBeVisible()
    expect(screen.getByText('Tab2')).toBeVisible()
    expect(screen.getByText('Tab3')).toBeVisible()
    expect(screen.getByText('Tab one')).toBeVisible()
  })

  it('second tab content active by activeIndex', async () => {
    renderWithProviders(<Tabs tabItems={mockTabItems} activeIndex={1} />)
    expect(screen.getByText('Tab two')).toBeVisible()
  })

  it('first tab active content by tab data', async () => {
    renderWithProviders(
      <Tabs
        tabItems={[
          ...mockTabItems,
          {
            title: 'Tab4',
            active: true,
            content: <div>Tab four</div>
          }
        ]}
      />
    )
    expect(screen.getByText('Tab four')).toBeVisible()
  })

  describe('activeOnUrl param', () => {
    const mockTabItems: ComponentProps<typeof Tabs>['tabItems'] = [
      {
        title: 'Tab1',
        content: <div>Tab one</div>,
        href: '/tab1'
      },
      {
        title: 'Tab2',
        content: <div>Tab two</div>,
        href: '/tab2'
      },
      {
        title: 'Tab3',
        disabled: true,
        content: <div>Tab three</div>,
        href: '/tab3'
      }
    ]
    it('first tab active by default', async () => {
      renderWithProviders(<Tabs tabItems={mockTabItems} activeOnUrl />)

      await waitFor(async () => {
        expect(screen.getByText('Tab one')).toBeVisible()
      })
    })
    it('second tab active on url', async () => {
      window.location.pathname = '/tab2'
      renderWithProviders(<Tabs tabItems={mockTabItems} activeOnUrl />)
      await waitFor(() => {
        expect(screen.getByText('Tab two')).toBeVisible()
      })
    })

    it.skip('external component update the tab', async () => {
      window.location.pathname = '/'

      const TabComponent = (
        <div>
          <button
            data-testid="change-url"
            onClick={() => (window.location.pathname = '/tab2')}
          >
            changeto tab2
          </button>
          <Tabs tabItems={mockTabItems} activeOnUrl />
        </div>
      )
      const { rerender } = await renderWithProviders(TabComponent)
      await waitFor(() => {
        expect(screen.getByText('Tab one')).toBeVisible()
      })

      await userEvent.click(screen.getByTestId('change-url'))

      rerender(TabComponent)
      await waitFor(() => {
        expect(screen.getByText('Tab two')).toBeVisible()
      })
    })
  })
})
