import getConfig from 'next/config'
import { RegisterUser, RegisterUserResponse } from './types'
import { SignInType } from '@/components/Form/SignInForm/SignInForm'
import { AuthUser } from './types'
const { publicRuntimeConfig } = getConfig()

// const handleResponse = async (res: Response): Promise<Response | Error> => {
//   if (res.ok) return res.json()
//   try {
//     const { detail } = await res.json()
//     if (detail) return Promise.reject(new Error(detail))
//   } catch (e) {}

//   throw new Error('Service unavailable')
// }

export const updateUser = async (id: string, data: Partial<RegisterUserResponse>) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/users/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return res.json()

  try {
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {}

  throw new Error('Service unavailable')
}

export const createUser = async (data: RegisterUser): Promise<RegisterUserResponse> => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return res.json()

  try {
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {}

  throw new Error('Service unavailable')
}

export const loginWithEmailAndPassword = async (data: SignInType): Promise<AuthUser> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) return await res.json()

  try {
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (e) {}

  return Promise.reject(new Error('Service unavailable'))
}

export const logoutUser = async (token: string) => {
  await fetch(`${publicRuntimeConfig.apiUrl}/logout/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` }
  })
}
