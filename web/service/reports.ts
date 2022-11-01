import getConfig from 'next/config'
import {} from './types'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'

export const fetchReportSkills = async (token: string) => {
  const res = await api(token, `/me/reports/skills/`)
  return res.json()
}

export const fetchReportLanguages = async (token: string) => {
  const res = await api(token, `/me/reports/languages/`)
  return res.json()
}

const api = async (
  token: string,
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}${input}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Token ${token}` }
  })
  if (res.ok) return res
  try {
    const { detail } = await res.json()
    if (detail) throw new Error(detail)
  } catch (e) {}
  throw new Error(defaultError)
}
