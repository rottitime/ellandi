import getConfig from 'next/config'
import { SkillType } from './types'
const { publicRuntimeConfig } = getConfig()

const defaultError = 'Sorry, there is a problem with the service. Try again later.'

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

export const addSkills = async (token: string, data: SkillType) => {
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
