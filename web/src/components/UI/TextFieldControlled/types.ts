import TextField from '@/components/Form/TextField/TextField'
import { ComponentProps } from 'react'

export type Props = {
  label: string
  name: string
  subfield?: boolean
} & ComponentProps<typeof TextField>
