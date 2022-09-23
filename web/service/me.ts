import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'
import { MeLearningList } from './types'

export const fetchMe = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/api/me/`, {
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

export const updatePassword = async (
  token: string,
  data: {
    currentPassword: string
    password: string
  }
) => {
  try {
    const res: Response = await fetch(
      `${publicRuntimeConfig.apiUrl}/api/me/password-change/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          old_password: data.currentPassword,
          new_password: data.password
        })
      }
    )
    if (res.ok) return res.json()
    const { detail } = await res.json()
    if (detail) return Promise.reject(new Error(detail))
  } catch (error) {
    throw new Error(defaultError)
  }
}

export const fetchMeSuggestedSkills = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/api/me/skills-suggested/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearningFormal = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/api/me/learning-formal/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearningSocial = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/api/me/learning-social/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearningWork = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/api/me/learning-work/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearning = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/api/me/learnings/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}
