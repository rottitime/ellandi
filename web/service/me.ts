import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'
import { MeLearningRecord } from './types'

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
  // const res = await fetch(
  //   `${publicRuntimeConfig.apiUrl}/me/learnings/?` + new URLSearchParams(params),
  //   {
  //     headers: { Authorization: `Token ${token}` }
  //   }
  // )
  // if (res.ok) return res.json()
  // throw new Error(defaultError)

  //TODO: Remove and replace with API call
  return await Promise.resolve({
    distribution: [
      { name: 'Formal', value_percentage: 40 },
      { name: 'Social', value_percentage: 40 },
      { name: 'On the job', value_percentage: 20 }
    ],
    goal_value_days: 1,
    goal_value_percentage: 8,
    data: [
      {
        id: 'e51ab315-e37c-4854-8b44-01462da1b12c',
        name: 'HTML Developer',
        duration_minutes: 444,
        date_completed: '2022-11-09',
        cost_pounds: null,
        cost_unknown: null,
        learning_type: 'On the job'
      },
      {
        id: 'e7638cd4-712d-4060-b4e2-4c4a49914430',
        name: 'Newsletter producer',
        duration_minutes: 444,
        date_completed: '2022-11-04',
        cost_pounds: null,
        cost_unknown: null,
        learning_type: 'Social'
      },
      {
        id: 'bd87d5bd-6b62-43bd-8d03-f8775ab0dd41',
        name: 'something1',
        duration_minutes: 444,
        date_completed: '2022-11-09',
        cost_pounds: 13,
        cost_unknown: false,
        learning_type: 'Formal'
      },
      {
        id: '40e9600e-6b61-498c-ae6b-69031d30ca2e',
        name: 'HTML Developer',
        duration_minutes: 444,
        date_completed: '2022-11-09',
        cost_pounds: null,
        cost_unknown: null,
        learning_type: 'On the job'
      },
      {
        id: '4ee4d57c-ef66-47c0-a0ba-41c4da384372',
        name: '1',
        duration_minutes: 444,
        date_completed: '2022-11-03',
        cost_pounds: null,
        cost_unknown: null,
        learning_type: 'On the job'
      },
      {
        id: 'a83aea7f-a31e-4f9d-b95f-b88f8e93b40c',
        name: '2',
        duration_minutes: 888,
        date_completed: '2022-11-09',
        cost_pounds: null,
        cost_unknown: null,
        learning_type: 'On the job'
      }
    ]
  } as MeLearningRecord)
}
