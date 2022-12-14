import { RegisterUserResponse } from '@/service/types'

export const isRegisterComplete = (d: RegisterUserResponse): boolean =>
  !!d.first_name &&
  !!d.last_name &&
  !!d.job_title &&
  !!d.business_unit &&
  !!d.location &&
  !!d.line_manager_email &&
  !!(d.grade || d.grade_other) &&
  !!(d.function || d.function_other) &&
  !!(d.contract_type || d.contract_type_other) &&
  !!d.primary_profession &&
  !!d.is_line_manager &&
  !!d.is_mentor
