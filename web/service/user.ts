import getConfig from 'next/config'
import { RegisterUser, RegisterUserResponse } from './types'
const { publicRuntimeConfig } = getConfig()

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
