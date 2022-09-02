import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'

export const fetchMe = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}
