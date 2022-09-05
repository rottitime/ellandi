import getConfig from 'next/config'
import { LanguageType, SkillDevelopType, SkillType } from './types'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'

export const deleteSkill = async (token: string, id: string) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/user-skills/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` }
  })

  if (res.ok) return { id }
  throw new Error(defaultError)
}

export const deleteLanguage = async (token: string, id: string) => {
  const res: Response = await fetch(
    `${publicRuntimeConfig.apiUrl}/user-languages/${id}/`,
    {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` }
    }
  )
  if (res.ok) return { id }
  throw new Error(defaultError)
}

export const deleteSkillDevelop = async (token: string, id: string) => {
  const res: Response = await fetch(
    `${publicRuntimeConfig.apiUrl}/user-skills-develop/${id}/`,
    {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` }
    }
  )
  if (res.ok) return { id }
  throw new Error(defaultError)
}

export const addSkills = async (token: string, data: SkillType[]) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/skills/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return await res.json()
  throw new Error(defaultError)
}

export const editSkill = async (token: string, data: SkillType) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/skills/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return await res.json()
  throw new Error(defaultError)
}

export const addLanguages = async (token: string, data: LanguageType[]) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/languages/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return await res.json()
  throw new Error(defaultError)
}

export const addSkillsToDevelop = async (token: string, data: SkillDevelopType[]) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/skills-develop/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return await res.json()
  throw new Error(defaultError)
}

export const fetchTeam = async (token: string) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/direct-reports/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
  if (res.ok) return await res.json()
  throw new Error(defaultError)
}
