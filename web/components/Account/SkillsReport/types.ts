import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { ReportSkillsData } from '@/service/types'
import { AllColors } from '@/style/types'
import { FormControlLabel } from '@mui/material'
import { ComponentProps } from 'react'

export type FiltersType = {
  skills?: string[]
  users?: string
  professions?: string[]
  functions?: string[]
  grades?: string[]
  business_unit?: string[]
}

export type Props = ComponentProps<typeof AccountCard>

export type ChartValues = {
  label: string
  valueLabel: keyof ReportSkillsData
  valuePercentage: keyof ReportSkillsData
  color: AllColors
}

export type UserOptions = Omit<ComponentProps<typeof FormControlLabel>, 'control'>[]
