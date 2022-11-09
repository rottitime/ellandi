import getConfig from 'next/config'
import { FeedabckType, GenericDataList } from './types'
import { defaultError } from '@/service/auth'

const { publicRuntimeConfig } = getConfig()

export const fetchSkills = async (): Promise<string[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/skills/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchLearningTypes = async (): Promise<GenericDataList[]> => {
  // const res = await fetch(`${publicRuntimeConfig.apiUrl}/learning-types/`)
  // if (res.ok) return res.json()
  // throw new Error(defaultError)
  return Promise.resolve([
    {
      slug: 'string',
      name: 'On the job',
      description:
        'Self-taught learning by doing, for example reading policies and guidance, using tools and software to do your job',
      order: 0
    },
    {
      slug: 'string',
      name: 'Social',
      description:
        'Learning from colleagues, job shadowing, mentoring, coaching, networks and communities',
      order: 1
    },
    {
      slug: 'string',
      name: 'Formal',
      description:
        'Completing a course on Civil Service Learning, external training, professional qualifications',
      order: 2
    }
  ])
}

export const fetchFeedback = async (
  data: FeedabckType
): Promise<{ success: boolean }> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/feedback/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) return res.json()

  throw new Error(defaultError)
}

export * from './types'
export * from './reports'
