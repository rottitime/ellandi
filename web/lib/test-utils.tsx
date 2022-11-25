import { render, renderHook, RenderOptions, waitFor } from '@testing-library/react'
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider'
import LocalizationProvider from '@/components/LocalizationProvider/LocalizationProvider'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UiProvider } from '@/context/UiContext'
import {
  AuthUser,
  MeReportLanguages,
  MeReportSkills,
  MeSuggestedSkillsResponse,
  RegisterUserResponse,
  ReportLanguagesData,
  ReportSkillsData,
  SkillType,
  TeamMember
} from '@/service/types'

beforeAll(() => {
  Object.defineProperty(global, 'sessionStorage', { value: mockStorage })
  Object.defineProperty(global, 'localStorage', { value: mockStorage })
  jest.spyOn(console, 'error').mockImplementation(jest.fn())
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

export const wrapper = (ui) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocalizationProvider>
          <UiProvider>
            <>{ui}</>
          </UiProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export const renderWithProviders = async (
  ui: ReactNode,
  options: Omit<RenderOptions, 'queries'> = {}
) => {
  const rendered = await render(wrapper(ui), options)
  return {
    ...rendered,
    rerender: (ui, options: Omit<RenderOptions, 'queries'> = {}) =>
      renderWithProviders(ui, { container: rendered.container, ...options })
  }
}

export const renderHookWithProviders: typeof renderHook = (...parameters) =>
  renderHook(parameters[0], {
    wrapper: ({ children }) => wrapper(children),
    ...parameters[1]
  })

export const bugfixForTimeout = async () =>
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))

export * from '@testing-library/react'
export { renderWithProviders as render }

export const mockAuthToken: AuthUser = {
  expiry: '2022-10-18T20:01:26.485002Z',
  token: 'token-abc123'
}

// Mock data

export const mockMeSkills: SkillType[] = [
  {
    id: 'test1',
    name: 'Skill Something A',
    level: 'Jon',
    pending: false
  },
  {
    id: 'test2',
    name: 'Skill Something B',
    level: 'Cersei',
    pending: false
  },
  {
    id: 'test3',
    name: 'Skill Something C',
    level: 'Jaime',
    pending: false
  }
]

export const mockMe: RegisterUserResponse = {
  id: 'myownid-123',
  email: 'myself@test.com',
  privacy_policy_agreement: true,
  first_name: 'James',
  last_name: 'Bond',
  job_title: 'Admin',
  is_line_manager: 'Yes',
  business_unit: 'Testing unit',
  department: null,
  location: 'Neverland',
  line_manager_email: 'manager@test.com',
  is_mentor: 'Yes',
  has_direct_reports: false,
  has_reports_access: true,
  grade: 'Senior Officer',
  grade_other: null,
  professions: ['Audit', 'Management'],
  profession_other: null,
  primary_profession: 'Train spotting',
  function: 'Finance',
  function_other: null,
  contract_type: 'full time',
  contract_type_other: null,
  contact_preference: null,
  verified: true,
  skills: [],
  languages: [],
  skills_develop: [],
  created_at: '2022-08-25T10:06:53.513495Z',
  modified_at: '2022-08-25T10:07:11.814344Z'
}

export const mockTeam: TeamMember[] = [
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

        pending: false
      },
      {
        id: 'skillid-2',
        name: 'Analysis and synthesis',
        level: 'Competent',

        pending: false
      },
      {
        id: 'skillid-3',
        name: 'Agile working',
        level: 'Expert',
        pending: true
      }
    ],
    languages: [],
    skills_develop: [],
    created_at: '2022-08-15T07:32:28.100294Z',
    modified_at: '2022-08-22T15:56:40.942252Z',
    is_line_manager: 'Yes',
    is_mentor: 'Yes'
  },

  {
    id: 'teamember-id-2',
    email: 'team2@test.com',
    privacy_policy_agreement: true,
    first_name: 'Sherlock',
    last_name: 'Holmes',
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
    modified_at: '2022-08-25T10:08:32.863561Z',
    is_line_manager: 'Yes',
    is_mentor: 'Yes'
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
  },
  {
    slug: 'the-best',
    name: 'The best',
    order: 4
  }
]

export const mockSkills = ['Analysis', 'Communication', 'Leading teams']

export const mockSuggested: MeSuggestedSkillsResponse = [
  'Flying',
  'Acrobats',
  'Train spotting',
  'Pizza',
  'Todu',
  'Onions',
  'Apples',
  'Nuts',
  'Seitan',
  'Noodles',
  'Orange'
]

export const mockReportSkills: MeReportSkills = {
  page: 1,
  per_page: 10,
  total: 100,
  total_pages: 10,
  data: mockSkills.map(
    (name, i) =>
      ({
        name,
        skill_label: `${i} (${i}%)`,
        skill_value_total: i,
        skill_value_percentage: i,
        skill_develop_label: `${i} (${i}%)`,
        skill_develop_value_total: i,
        skill_develop_value_percentage: i,
        beginner_label: `${i} (${i}%)`,
        advanced_beginner_label: `${i} (${i}%)`,
        competent_label: `${i} (${i}%)`,
        proficient_label: `${i} (${i}%)`,
        expert_label: `${i} (${i}%)`,
        beginner_value_percentage: i,
        beginner_value_total: i,
        advanced_beginner_value_percentage: i,
        competent_value_percentage: i,
        competent_value_total: i,
        proficient_value_percentage: i,
        proficient_value_total: i,
        expert_value_percentage: i,
        expert_value_total: i,
        total_users: i
      } as ReportSkillsData)
  )
}

export const mockReportLanguages: MeReportLanguages = {
  page: 1,
  per_page: 5,
  total: 6,
  total_pages: 2,
  data: [...Array(6).keys()].map(
    (i) =>
      ({
        name: `Language ${i}`,
        basic_label: `${i} (${i}%)`,
        basic_value_total: i,
        basic_value_percentage: i,
        independent_label: `${i} (${i}%)`,
        independent_value_total: i,
        independent_value_percentage: i,
        proficient_label: `${i} (${i}%)`,
        proficient_value_total: i,
        proficient_value_percentage: i,
        native_label: `${i} (${i}%)`,
        native_value_total: i,
        native_value_percentage: i
      } as ReportLanguagesData)
  )
}

//   data: [...Array(3).keys()].map((i) => ({
//     name: `User ${i}`,
//     total_label: `${i} (${i}%)`,
//     total_value_total: i,
//     total_value_percentage: i
//   }))
// } as MeReporResponsibility)
