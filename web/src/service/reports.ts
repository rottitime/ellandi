import { api as utilApi, convertFilters, ParamsType } from '@/lib/data-utils'

const urls = {
  skills: '/me/reports/skills/',
  languages: '/me/reports/languages/',
  responsibility: '/me/reports/responsibilities/',
  grade: '/me/reports/grades/',
  learning: '/me/reports/learning/',
  responsibilityExport: '/me/reports/staff-overview/'
}

export const fetchReportSkills = async (token: string, params) => {
  const res = await api(token, urls.skills, params)
  return res.json()
}

export const fetchReportLanguages = async (token: string, params) => {
  const res = await api(token, urls.languages, params)
  return res.json()
}

export const fetchReportResponsibility = async (token: string) => {
  const res = await api(token, urls.responsibility)
  return res.json()
}

export const fetchReportGrade = async (token: string) => {
  const res = await api(token, urls.grade)
  return res.json()
}

export const fetchReportLearning = async (token: string, params) => {
  const res = await api(token, urls.learning, params)
  return res.json()
}

export const exportReportSkills = async (token, params) => {
  const res = await api(token, urls.skills, { ...params, format: 'csv' })
  return res.text()
}

export const exportReportLanguages = async (token, params) => {
  const res = await api(token, urls.languages, { ...params, format: 'csv' })
  return res.text()
}

export const exportReportResponsibility = async (token, params) => {
  const res = await api(token, urls.responsibilityExport, { ...params })
  return res.text()
}

export const exportReportLearning = async (token, params) => {
  const res = await api(token, urls.learning, { ...params, format: 'csv' })
  return res.text()
}

const api = (token: string, url: string, params?: ParamsType) =>
  utilApi(token, url, undefined, convertFilters(params))
