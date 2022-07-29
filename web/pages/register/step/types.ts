import { StandardRegisterProps } from '@/components/Form/Register/types'
import { RegisterUserResponse } from '@/service/types'
import { ComponentType } from 'react'

export type Props = {
  stepInt: number
  title: string
  backUrl: string
  nextUrl: string
  progress: number
  skip: boolean
}

export type Steps = {
  form: ComponentType<StandardRegisterProps<unknown>>
  title: string
  prevUrl?: string
  nextUrl?: string
  skip?: boolean
  isHidden?: (data: RegisterUserResponse) => boolean
}
