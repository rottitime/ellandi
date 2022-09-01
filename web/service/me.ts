import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'

export const fetchMe = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) {
    const data = await res.json()
    return {
      ...data,
      fullname: data?.first_name ? `${data?.first_name} ${data?.last_name}` : ''
    }
  }
  throw new Error(defaultError)
}
