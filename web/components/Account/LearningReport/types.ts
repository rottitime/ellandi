import { FormControlLabel } from '@mui/material'
import { ComponentProps } from 'react'

export type FiltersType = {
  professions?: string[]
  functions?: string[]
  grades?: string[]
  business_units?: string[]
  users?: UsersType
}

export type UsersType = 'all' | 'line_managers' | 'mentors'

export type TotalRowProps = {
  total: number
}
export type UserOptions = Omit<ComponentProps<typeof FormControlLabel>, 'control'>[]
