import getConfig from 'next/config'
import { GenericDataList } from './types'

const { publicRuntimeConfig } = getConfig()

const defaultError = 'Sorry, there is a problem with the service. Try again later.'

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

export const fetchFunctions = async (): Promise<GenericDataList[]> => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/functions/`)
  if (res.ok) return res.json()
  throw new Error(defaultError)
}

export * from './types'
