import getConfig from 'next/config'
import { SignInType } from '@/components/Form/SignInForm/SignInForm'
import { AuthUser } from './types'

const { publicRuntimeConfig } = getConfig()

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
