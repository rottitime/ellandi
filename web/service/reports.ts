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

const urls = {
  skills: '/me/reports/skills/',
  languages: '/me/reports/languages/',
  responsibility: '/me/reports/responsibility/',
  grade: '/me/reports/grade/'
}

export const fetchReportSkills = async (token: string, params) => {
  // const res = await api(token, urls.skills, {}, params)
  // return res.json()
  //TODO: change to fetch
  console.log('fetch', { token, params })
  return Promise.resolve(skillsData)
}

export const exportReportSkills = (params): string => createUrl(urls.skills, params)

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

export const exportReportLanguages = (params): string => createUrl(urls.languages, params)

const api = async (
  token: string,
  url: RequestInfo | URL,
  init?: RequestInit,
  params?: URLSearchParams
): Promise<Response> => {
  const apiUrl = createUrl(url, params)
  const res: Response = await fetch(createUrl(apiUrl, params), {
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
const skillsData: MeReportSkills = {
  page: 1,
  per_page: 10,
  total: 100,
  total_pages: 10,
  data: [...Array(100).keys()].map(
    (i) =>
      ({
        name: `Skill ${i}`,
        skill_label: `${i} (${i}%)`,
        skill_value_total: i,
        skill_value_percentage: i,
        skills_develop_label: `${i} (${i}%)`,
        skills_develop_value_total: i,
        skills_develop_value_percentage: i,
        beginner_label: `${i} (${i}%)`,
        advanced_beginner_label: `${i} (${i}%)`,
        competent_label: `${i} (${i}%)`,
        proficient_label: `${i} (${i}%)`,
        expert_label: `${i} (${i}%)`,
        beginner_value_percentage: i,
        advanced_beginner_value_percentage: i,
        competent_value_percentage: i,
        proficient_value_percentage: i,
        expert_value_percentage: i
      } as ReportSkillsData)
  )
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
