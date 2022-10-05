import { render, RenderOptions, waitFor } from '@testing-library/react'
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider'
import LocalizationProvider from '@/components/LocalizationProvider/LocalizationProvider'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UiProvider } from '@/context/UiContext'

beforeAll(() => {
  Object.defineProperty(global, 'sessionStorage', { value: mockStorage })
  Object.defineProperty(global, 'localStorage', { value: mockStorage })
})

afterEach(() => {
  window.sessionStorage.clear()
})

const mockStorage = (() => {
  let store = {}
  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    }
  }
})()

export const renderWithProviders = async (
  ui: ReactNode,
  options: Omit<RenderOptions, 'queries'> = {}
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
  const rendered = await render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocalizationProvider>
          <UiProvider>
            <>{ui}</>
          </UiProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>,
    options
  )
  return {
    ...rendered
    // rerender: (ui, options) =>
    //   renderWithProviders(ui, { container: rendered.container, ...options })
  }
}

export const bugfixForTimeout = async () =>
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))

export * from '@testing-library/react'
export { renderWithProviders as render }

// Mock data
export const mockMe = {
  id: 'myownid-123',
  email: 'myself@test.com',
  privacy_policy_agreement: true,
  first_name: 'James',
  last_name: 'Bond',
  department: null,
  organisation: null,
  job_title: 'Admin',
  business_unit: 'Testing unit',
  location: null,
  line_manager_email: 'manager@test.com',
  has_direct_reports: false,
  grade: 'Senior Officer',
  grade_other: null,
  professions: ['Audit', 'Management'],
  profession_other: null,
  primary_profession: null,
  function: 'Finance',
  function_other: null,
  contract_type: 'full time',
  contract_type_other: null,
  contact_preference: null,
  skills: [],
  languages: [],
  skills_develop: [],
  created_at: '2022-08-25T10:06:53.513495Z',
  modified_at: '2022-08-25T10:07:11.814344Z'
}

export const mockTeam = [
  {
    id: 'teamember-id-1',
    email: 'team1@test.com',
    privacy_policy_agreement: true,
    first_name: 'Albert',
    last_name: 'Einstein',
    department: null,
    organisation: null,
    job_title: 'Developer',
    business_unit: 'Coding',
    location: 'London',
    line_manager_email: 'manager@test.com',
    has_direct_reports: false,
    grade: 'Senior Advisors',
    grade_other: null,
    professions: [
      'Legal',
      'Medical',
      'Occupational psychology',
      'Operational delivery',
      'Operational research',
      'Other'
    ],
    profession_other: 'Another profession',
    primary_profession: 'Occupational psychology',
    function: 'best function',
    function_other: null,
    contract_type: 'full time',
    contract_type_other: null,
    contact_preference: true,
    skills: [
      {
        id: 'skillid-1',
        name: 'Analysis',
        level: 'Advanced beginner',
        validated: false
      },
      {
        id: 'skillid-2',
        name: 'Analysis and synthesis',
        level: 'Competent',
        validated: false
      },
      {
        id: 'skillid-3',
        name: 'Agile working',
        level: 'Expert',
        validated: false
      }
    ],
    languages: [],
    skills_develop: [],
    created_at: '2022-08-15T07:32:28.100294Z',
    modified_at: '2022-08-22T15:56:40.942252Z'
  },

  {
    id: 'teamember-id-2',
    email: 'team2@test.com',
    privacy_policy_agreement: true,
    first_name: 'Sherlock',
    last_name: 'Holmes ',
    department: null,
    organisation: null,
    job_title: 'Admin',
    business_unit: 'Security',
    location: 'London',
    line_manager_email: 'manager@test.com',
    has_direct_reports: false,
    grade: 'Other',
    grade_other: 'MyOther" Grade',
    professions: ['Legal', 'Medical', 'Occupational psychology', 'Other'],
    profession_other: 'MyOther: Profession',
    primary_profession: 'MyOther: Profession',
    function: 'Other',
    function_other: 'myother: function',
    contract_type: 'Other',
    contract_type_other: 'myother: contract',
    contact_preference: null,
    skills: [],
    languages: [],
    skills_develop: [],
    created_at: '2022-08-25T10:06:53.513495Z',
    modified_at: '2022-08-25T10:08:32.863561Z'
  }
]

export const mockLevels = [
  {
    slug: 'average',
    name: 'Aasic',
    order: 0
  },
  {
    slug: 'good',
    name: 'Good',
    order: 1
  },
  {
    slug: 'dont-know',
    name: 'Who knows?',
    order: 3
  },
  {
    slug: 'super',
    name: 'Super',
    order: 2
  }
]
