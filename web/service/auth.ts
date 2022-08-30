import getConfig from 'next/config'
import {
  RegisterUser,
  RegisterUserResponse,
  ResetEmailPasswordType,
  ResetUpdatePasswordType
} from './types'
import { SignInType } from '@/components/Form/SignInForm/types'
import { AuthUser } from './types'
const { publicRuntimeConfig } = getConfig()

export const defaultError = 'Sorry, there is a problem with the service. Try again later.'

export const updateUser = async (token: string, data: Partial<RegisterUserResponse>) => {
  try {
    const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    })
    if (res.ok) return res.json()
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {
    throw new Error(defaultError)
  }
}

export const createUser = async (data: RegisterUser): Promise<RegisterUserResponse> => {
  try {
    const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, email: data.email.toLowerCase() })
    })
    if (res.ok) return res.json()
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {
    throw new Error(defaultError)
  }
}

export const loginWithEmailAndPassword = async (data: SignInType): Promise<AuthUser> => {
  try {
    const res = await fetch(`${publicRuntimeConfig.apiUrl}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, email: data.email.toLowerCase() })
    })

    if (res.ok) return await res.json()
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {
    return Promise.reject(new Error(defaultError))
  }
}

export const logoutUser = async (token: string) => {
  await fetch(`${publicRuntimeConfig.apiUrl}/logout/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` }
  })
}

export const resetEmailPassword = async (data: ResetEmailPasswordType) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/password-reset/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return true

  try {
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {}

  throw new Error(defaultError)
}

export const resetUpdatePassword = async (
  data: ResetUpdatePasswordType,
  user_id: string,
  token: string
) => {
  const res: Response = await fetch(
    `${publicRuntimeConfig.apiUrl}/user/${user_id}/password-reset/${token}/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
  if (res.ok) return true

  try {
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {}

  throw new Error(defaultError)
}
