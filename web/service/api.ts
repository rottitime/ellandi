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

export * from './types'
