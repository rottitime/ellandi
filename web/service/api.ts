import getConfig from 'next/config'
import { FeedabckType, GenericDataList } from './types'
import { sortWithOrder } from '@/lib/data-utils'
import { defaultError } from '@/service/auth'

const { publicRuntimeConfig } = getConfig()

const byOrder = (a: GenericDataList, b: GenericDataList) =>
  sortWithOrder(a.order, b.order)

export const fetchGrades = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/grades/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchProfessions = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/professions/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchContractTypes = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/contract-types/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchLanguages = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/languages/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export const fetchLanguageSkillLevels = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
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
  // const res = await fetch(`${publicRuntimeConfig.apiUrl}/skill-levels/`)
  // if (res.ok) return res.json()
  // throw new Error(defaultError)

  //TODO: replace with live data
  return [
    {
      slug: 'beginner',
      name: 'Beginner',
      description:
        'You have minimal or textbook knowledge and need close supervision or guidance',
      order: 0
    },
    {
      slug: 'advanced-beginner',
      name: 'Advanced beginner',
      description:
        'You have basic knowledge of key aspects and can do straightforward tasks using your own judgement',
      order: 1
    },
    {
      slug: 'competent',
      name: 'Competent',
      description:
        'You have good working and background knowledge and can achieve most tasks using your own judgement',
      order: 2
    },
    {
      slug: 'proficient',
      name: 'Proficient',
      description:
        'You have deep understanding and take full responsibility for your own work. You can deal with complex situations and make informed decisions',
      order: 3
    },
    {
      slug: 'expert',
      name: 'Expert',
      description:
        'You have authoritative knowledge and achieve excellence with ease, going beyond existing standards and seeing the bigger picture',
      order: 4
    }
  ]
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
