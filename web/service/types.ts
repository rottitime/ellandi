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

export type RegisterUserResponse = {
  id: string
  email: string
  url: string
  first_name: string
  last_name: string
  privacy_policy_agreement: string
  organisation: string
  job_title: string
  grade: string
  profession: string[]
  contract_type: string
  line_manager_email: string
  location: string
  skills: string[]
  languages: string[]
}
