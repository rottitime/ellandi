import {
  MeReporGrade,
  MeReporResponsibility,
  MeReportLanguages,
  MeReportSkills,
  ReportLanguagesData,
  ReportSkillsData
} from './types'
import { defaultError } from '@/service/auth'
import { createUrl } from '@/lib/url-utils'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const urls = {
  skills: '/me/reports/skills/',
  languages: '/me/reports/languages/',
  responsibility: '/me/reports/responsibility/',
  grade: '/me/reports/grade/',
  learning: '/me/reports/learning/'
}

export const fetchReportSkills = async (token: string, params) => {
  const res = await api(token, urls.skills, {}, params)
  return res.json()
  //TODO: change to fetch
  // console.log('fetch', { token, params })
  // return Promise.resolve(skillsData)
}

export const fetchReportLanguages = async (token: string) => {
  // const res = await api(token, urls.languages)
  // return res.json()
  return Promise.resolve(languagesData)
}

export const fetchReportResponsibility = async (token: string) => {
  // const res = await api(token, urls.responsibility)
  // return res.json()
  return Promise.resolve({
    data: [...Array(3).keys()].map((i) => ({
      name: `User ${i}`,
      total_label: `${i} (${i}%)`,
      total_value_total: i,
      total_value_percentage: i
    }))
  } as MeReporResponsibility)
}

export const fetchReportGrade = async (token: string) => {
  // const res = await api(token, urls.grade)
  // return res.json()
  return Promise.resolve({
    data: [...Array(20).keys()].map((i) => ({
      name: `User ${i}`,
      total_label: `${i} (${i}%)`,
      total_value_total: i,
      total_value_percentage: i
    }))
  } as MeReporGrade)
}

export const exportReportSkills = (params): string => exportFormat(urls.skills, params)
export const exportReportResponsibility = (params): string =>
  exportFormat(urls.responsibility, params)
export const exportReportLanguages = (params): string =>
  exportFormat(urls.languages, params)

const exportFormat = (path, params): string =>
  createUrl(`${publicRuntimeConfig.apiUrl}${path}`, params)

const api = async (
  token: string,
  path: RequestInfo | URL,
  init?: RequestInit,
  params?: URLSearchParams
): Promise<Response> => {
  const apiUrl = createUrl(`${publicRuntimeConfig.apiUrl}${path}`, params)
  const res: Response = await fetch(apiUrl, {
    ...init,
    headers: { ...init.headers, Authorization: `Token ${token}` }
  })
  if (res.ok) return res
  try {
    const { detail } = await res.json()
    if (detail) throw new Error(detail)
  } catch (e) {}
  throw new Error(defaultError)
}

//TODO: Delete this
const languagesData: MeReportLanguages = {
  page: 1,
  per_page: 10,
  total: 100,
  total_pages: 10,
  data: [...Array(100).keys()].map(
    (i) =>
      ({
        name: `Language ${i}`,
        basic_label: `${i} (${i}%)`,
        basic_value_total: i,
        basic_value_percentage: i,
        independent_label: `${i} (${i}%)`,
        independent_value_total: i,
        independent_value_percentage: i,
        proficient_label: `${i} (${i}%)`,
        proficient_value_total: i,
        proficient_value_percentage: i,
        native_label: `${i} (${i}%)`,
        native_value_total: i,
        native_value_percentage: i
      } as ReportLanguagesData)
  )
}
