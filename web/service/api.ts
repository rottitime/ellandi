import getConfig from 'next/config'
import { GenericDataList } from './types'

const { publicRuntimeConfig } = getConfig()

export const fetchGrades = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/grades/`)
  if (res.ok) return res.json()
  throw new Error('Service unavailable')
}

export const fetchProfessions = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/professions/`)
  if (res.ok) return res.json()
  throw new Error('Service unavailable')
}

export const fetchContractTypes = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/contract-types/`)
  if (res.ok) return res.json()
  throw new Error('Service unavailable')
}

export const fetchLanguages = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/languages/`)
  if (res.ok) return res.json()
  throw new Error('Service unavailable')
}

export const fetchCountries = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/countries/`)
  if (res.ok) return res.json()
  throw new Error('Service unavailable')
}

export const fetchPrimaryProfession = async (): Promise<GenericDataList[]> => {
  return [
    { name: 'Corporate Finance Profession', slug: 'Corporate Finance Profession' },
    {
      name: 'Counter-fraud Standards and Profession',
      slug: 'Counter-fraud Standards and Profession'
    },
    {
      name: 'Digital, Data and Technology Professions',
      slug: 'Digital, Data and Technology Professions'
    }
  ]
}

export const fetchFunctions = async (): Promise<GenericDataList[]> => {
  //const res = await fetch(`${publicRuntimeConfig.apiUrl}/functions/`)
  // if (res.ok) return res.json()
  //TODO: replace with above fetch call once API is ready

  return [
    { name: 'Analysis', slug: 'Analysis' },
    { name: 'Commercial', slug: 'Commercial' },
    { name: 'Communications', slug: 'Communications' },
    { name: 'Corporate finance', slug: 'Corporate finance' },
    { name: 'Digital', slug: 'Digital' },
    { name: 'Finance', slug: 'Finance' },
    { name: 'Fraud, error, debt and grants', slug: 'Fraud, error, debt and grants' },
    { name: 'Human resources', slug: 'Human resources' },
    { name: 'Internal audit', slug: 'Internal audit' },
    { name: 'Legal', slug: 'Legal' },
    { name: 'Project delivery', slug: 'Project delivery' },
    { name: 'Property', slug: 'Property' }
  ]
  // throw new Error('Service unavailable')
}

export * from './types'
