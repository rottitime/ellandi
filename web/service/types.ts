export enum Query {
  Countries = 'countries',
  Grades = 'grades',
  JobTitles = 'jobTitles',
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
  SuggestedSkills = 'SuggestedSkills'
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
  is_line_manager: boolean
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
  department: null
  organisation: null
  job_title: string
  business_unit: string
  location: string
  line_manager_email: string
  grade: string
  grade_other: null
  professions: string[]
  profession_other: null
  primary_profession: string
  function: string
  function_other: null
  contract_type: string
  contract_type_other: null
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
