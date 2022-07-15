export enum Query {
  RegisterUser = 'RegisterUser',
  Countries = 'countries',
  Grades = 'grades',
  Professions = 'professions',
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
}

export type GradeType = {
  grade: string
}

export type PrivacyAcceptType = {
  privacy_policy_agreement: boolean
}

export type RegisterUserResponse = {
  id: string
  email: string
  url: string
  profession: string[]
  contract_type: string
  skills: string[]
  languages: string[]
} & PrivacyAcceptType &
  RegisterDetailsType &
  GradeType
