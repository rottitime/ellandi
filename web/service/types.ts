export enum Query {
  RegisterUser = 'RegisterUser',
  Countries = 'countries',
  Grades = 'grades',
  Professions = 'professions',
  PrimaryProfessions = 'primaryProfessions',
  Functions = 'functions',
  ContractTypes = 'contract-types',
  Languages = 'languages'
}

export type GenericDataList = {
  slug: string
  name: string
}

export interface AuthUser {
  expiry: string
  token: string
}

export type RegisterUser = {
  email: string
  password: string
}

export type RegisterDetailsType = {
  first_name: string
  last_name: string
  organisation: string
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
}

export type PrimaryProfessionType = {
  profession_primary: string
}

export type ContactType = {
  contract_type: string
}

export type RegisterUserResponse = {
  id: string
  email: string
  url: string
  skills: string[]
  languages: string[]
} & PrivacyAcceptType &
  RegisterDetailsType &
  GradeType &
  ProfessionType &
  ContactType &
  PrimaryProfessionType
