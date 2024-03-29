import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'
import { api } from '@/lib/data-utils'

export const fetchMe = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) {
    const data = await res.json()
    if (data?.first_name) data.fullname = `${data?.first_name} ${data?.last_name}`
    return data
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
      `${publicRuntimeConfig.apiUrl}/me/password-change/`,
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
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/skills-suggested/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeSuggestedSkillsByRole = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/title-recommender/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearningFormal = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/learning-formal/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearningSocial = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/learning-social/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearningWork = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/learning-work/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchMeLearning = async (token: string, params) => {
  const res = await api(token, '/me/learnings/', params)
  return res.json()
}

export type Course = {
  cost_pounds: number
  course_type: string
  duration_minutes: number
  id: number
  long_description: string
  private: boolean
  short_description: string
  status: string
  title: string
}

export type SkillGroup =
  | 'all_skills'
  | 'job_title_skills'
  | 'popular_skills'
  | 'profession_skills'
  | 'skill_skills'

export type RecommendedSkillBundleResponse = {
  [key in SkillGroup]: string[]
}

export const fetchCourses = async (token: string, params) => {
  const res = await api(token, '/courses/', params)
  if (res.ok) return res.json()
}

export const fetchRecommendedSkillBundle = async (
  token: string
): Promise<RecommendedSkillBundleResponse> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/recommended-skill-bundle/`, {
    headers: { Authorization: `Token ${token}` }
  })

  if (res.ok) {
    const reponse = await res.json()

    const computedResponse = Object.keys(reponse)
      .filter((k) => k !== 'all_skills')
      .reduce(
        (acc, key) => {
          const z = reponse[key].filter((x) => !acc.list.includes(x))
          acc.list = [...acc.list, ...z]
          acc.result[key as SkillGroup] = z
          return acc
        },
        {
          result: {},
          list: []
        }
      )

    return Promise.resolve({
      ...computedResponse.result,
      all_skills: reponse['all_skills']
    } as RecommendedSkillBundleResponse)
  }
  throw new Error(defaultError)
}
