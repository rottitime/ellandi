import getConfig from 'next/config'
import {
  LanguageType,
  LearningFormalType,
  LearningBaseType,
  SkillDevelopType,
  SkillType
} from './types'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'

export const deleteSkill = async (token: string, id: string) => {
  await api(token, `/user-skills/${id}/`, {
    method: 'DELETE'
  })
  return { id }
}

export const deleteLanguage = async (token: string, id: string) => {
  await api(token, `/user-languages/${id}/`, {
    method: 'DELETE'
  })
  return { id }
}

export const deleteSkillDevelop = async (token: string, id: string) => {
  await api(token, `/user-skills-develop/${id}/`, {
    method: 'DELETE'
  })
  return { id }
}

export const addSkills = async (token: string, data: SkillType[]) => {
  const res = await api(token, `/me/skills/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const editSkill = async (token: string, data: SkillType) => {
  const res = await api(token, `/me/skills/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return await res.json()
}

export const addLanguages = async (token: string, data: LanguageType[]) => {
  const res = await api(token, `/me/languages/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const addSkillsToDevelop = async (token: string, data: SkillDevelopType[]) => {
  const res = await api(token, `/me/skills-develop/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const fetchTeam = async (token: string) => {
  const res = await api(token, `/me/direct-reports/`, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}

export const addLearningOnTheJob = async (token: string, data: LearningBaseType) => {
  const res = await api(token, `/me/learning-on-the-job/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const addLearningSocial = async (token: string, data: LearningBaseType) => {
  const res = await api(token, `/me/learning-social/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const addLearningFormal = async (token: string, data: LearningFormalType) => {
  const res = await api(token, `/me/learning-formal/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteLearning = async (token: string, id: string) => {
  await api(token, `/me/learnings/${id}/`, {
    method: 'DELETE'
  })
  return id
}

export const editLearning = async (
  token: string,
  data: LearningBaseType | LearningFormalType
) => {
  const res = await api(token, '/me/learnings/', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return await res.json()
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
