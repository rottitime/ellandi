import getConfig from 'next/config'
import { FeedbackType } from './types'
import { defaultError } from '@/service/auth'

const { publicRuntimeConfig } = getConfig()

export const fetchSkills = async (): Promise<string[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/skills/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchFeedback = async (
  data: FeedbackType
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
