export enum Query {
  Countries = 'countries',
  Grades = 'grades',
  Professions = 'professions',
  PrimaryProfessions = 'primaryProfessions',
  Functions = 'functions',
  ContractTypes = 'contract-types',
  Languages = 'languages',
  LanguageSkillLevels = 'languageSkillLevels',
  Skills = 'skills',
  SkillLevels = 'skillLevels',
  Me = 'me'
}

export type GenericDataList = {
  slug: string
  name: string
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

export type RegisterUserResponse = {
  id: string
  email: string
  url: string
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
