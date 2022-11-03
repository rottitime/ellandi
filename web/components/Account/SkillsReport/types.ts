import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { ComponentProps } from 'react'

export type FiltersType = {
  skills?: string
  users?: string
  professions?: string
  functions?: string
  grades?: string
  business_unit?: string
}

export type Props = ComponentProps<typeof AccountCard>
