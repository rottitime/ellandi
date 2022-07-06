import getConfig from 'next/config'
import { GradeData } from './types'

const { publicRuntimeConfig } = getConfig()

export const fetchGrades = async (): Promise<GradeData[]> => {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grades/`)
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/grades/`)
  if (res.ok) return res.json()
}
