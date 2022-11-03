import getConfig from 'next/config'
import { FeedabckType, GenericDataList } from './types'
import { sortWithOrder } from '@/lib/data-utils'
import { defaultError } from '@/service/auth'

const { publicRuntimeConfig } = getConfig()

const byOrder = (a: GenericDataList, b: GenericDataList) =>
  sortWithOrder(a.order, b.order)

export const fetchGrades = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/grades/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchJobTitles = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/job-titles/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchBusinessUnit = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/business-units/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchProfessions = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/professions/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchContractTypes = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/contract-types/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchLanguages = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/languages/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchLanguageSkillLevels = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/language-skill-levels/`)
  if (res.ok) return ((await res.json()) as GenericDataList[]).sort(byOrder)
  throw new Error(defaultError)
}

export const fetchCountries = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/countries/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchSkills = async (): Promise<string[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/skills/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchSkillLevels = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/skill-levels/`)
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

export const fetchFunctions = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/functions/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
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
