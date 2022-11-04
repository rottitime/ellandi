export enum Query {
  Countries = 'countries',
  Grades = 'grades',
  JobTitles = 'jobTitles',
  BusinessUnits = 'businessUnits',
  Professions = 'professions',
  PrimaryProfessions = 'primaryProfessions',
  Functions = 'functions',
  ContractTypes = 'contract-types',
  Languages = 'languages',
  LanguageSkillLevels = 'languageSkillLevels',
  Skills = 'skills',
  SkillLevels = 'skillLevels',
  Me = 'me',
  TeamMembers = 'teamMembers',
  SuggestedSkills = 'SuggestedSkills',
  SuggestedSkillsbyRole = 'SuggestedSkillsbyRole',
  MeLearning = 'meLearning',
  LearningTypes = 'LearningTypes',
  ReportSkills = 'ReportSkills',
  ReportLanguages = 'ReportLanguages'
}

export type GenericDataList = {
  slug: string
  name: string
  description?: string
  order?: number
}

export interface AuthUser {
  expiry: string
  token: string
}

export type FeedabckType = {
  name: string
  email: string
  issue: string
}

export type RegisterUser = {
  email: string
  password: string
}

export type RegisterDetailsType = {
  first_name: string
  last_name: string
  job_title: string
  line_manager_email: string
  location: string
  business_unit: string
}

export type GradeType = {
  grade: string
  grade_other: string
}

export type PrivacyAcceptType = {
  privacy_policy_agreement: boolean
}

export type ProfessionType = {
  professions: string[]
  profession_other: string
}

export type SkillType = {
  id?: string
  name: string
  level: string
  pending?: boolean
}

export type SkillDevelopType = {
  id?: string
  name: string
}

export type SkillsType = {
  skills: SkillType[]
}

export type SkillsDevelopType = {
  skills_develop: SkillDevelopType[]
}

export type PrimaryProfessionType = {
  primary_profession: string
  profession_other: string
}

export type ContactType = {
  contact_preference: boolean
}

export type ContractType = {
  contract_type: string
  contract_type_other: string
}

export type FunctionType = {
  function: string
  function_other: string
}

export type LanguageType = {
  id?: string
  name: string
  speaking_level: string
  writing_level: string
}

export type LanguagesType = {
  languages: LanguageType[]
}

type CustomFieldType = {
  fullname: string
}

export type RegisterUserResponse = {
  id: string
  email: string
  has_direct_reports: boolean
  verified: boolean
  department: string
  created_at: string
  modified_at: string
  is_line_manager: string
  is_mentor: string
  has_reports_access: boolean
} & PrivacyAcceptType &
  RegisterDetailsType &
  GradeType &
  ProfessionType &
  ContactType &
  PrimaryProfessionType &
  LanguagesType &
  SkillsType &
  ContractType &
  FunctionType &
  SkillsDevelopType

export type RegisterUserResponseWithCustomFields = RegisterUserResponse & CustomFieldType

export type TeamMember = {
  id: string
  email: string
  privacy_policy_agreement: boolean
  first_name: string
  last_name: string
  has_direct_reports: boolean
  department: string
  organisation: string
  job_title: string
  business_unit: string
  location: string
  line_manager_email: string
  grade: string
  grade_other: string
  professions: string[]
  profession_other: string
  primary_profession: string
  function: string
  function_other: string
  contract_type: string
  contract_type_other: string
  contact_preference: true
  skills: SkillType[]
  languages: LanguageType[]
  skills_develop: SkillDevelopType[]
  created_at: string
  modified_at: string
}

export type ResetEmailPasswordType = {
  email: string
}

export type ResetUpdatePasswordType = {
  new_password: string
}

export type MeSuggestedSkillsResponse = string[]

export type LearningBaseType = {
  name: string
  duration_minutes: number
  date_completed: string
}

export type LearningFormalType = LearningBaseType & {
  cost_pounds: number
  cost_unknown: boolean
}

export type LearningConditionalApiFields =
  | { id?: never; learning_type?: never }
  | LearningApiFields

type LearningApiFields = {
  id: string
  learning_type: string
}

export type MeLearningRecord = LearningBaseType & LearningFormalType & LearningApiFields

type ReportPagination = {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export type ReportSkillsData = {
  name: string
  skill_label: string
  skill_value_total: number
  skill_value_percentage: number
  skills_develop_label: string
  skills_develop_value_total: number
  skills_develop_value_percentage: number
  beginner_label: string
  beginner_value_percentage: number
  advanced_beginner_label: string
  advanced_beginner_value_percentage: number
  competent_label: string
  competent_value_percentage: number
  proficient_label: string
  proficient_value_percentage: number
  expert_label: string
  expert_value_percentage: number
}

export type MeReportSkills = {
  data: ReportSkillsData[]
} & ReportPagination

export type ReportLanguagesData = {
  name: string
  basic_label: string
  basic_value_total: number
  basic_value_percentage: number
  independent_label: string
  independent_value_total: number
  independent_value_percentage: number
  proficient_label: string
  proficient_value_total: number
  proficient_value_percentage: number
  native_label: string
  native_value_total: number
  native_value_percentage: number
}

export type MeReportLanguages = {
  data: ReportLanguagesData[]
} & ReportPagination
