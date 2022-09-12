import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { defaultError } from '@/service/auth'

export const fetchMe = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) {
    const data = await res.json()
    return {
      ...data,
      fullname: data?.first_name ? `${data?.first_name} ${data?.last_name}` : ''
    }
  }
  throw new Error(defaultError)
}

export const fetchMeSuggestedSkills = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/skills-suggested/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)

  // return [
  //   'Accessibility',
  //   'Agile and Lean practices',
  //   'Agile working',
  //   'Agile working (content design)',
  //   'Analysis',
  //   'Analysis and synthesis',
  //   'Analytical and problem-solving',
  //   'Asset and configuration management',
  //   'Availability and capacity management',
  //   'Bridging the gap between the technical and non-technical',
  //   'Business analysis',
  //   'Business analysis (IT operations)',
  //   'Business improvement process',
  //   'Business modelling',
  //   'Business process testing',
  //   'Change management',
  //   'Coding and scripting',
  //   'Commercial management',
  //   'Communicating analysis and insight',
  //   'Communicating information',
  //   'Communication skills',
  //   'Communication skills (data)',
  //   'Communication skills (security architect)',
  //   'Community collaboration',
  //   'Content concepts and prototyping',
  //   'Continual service improvement',
  //   'Continuity management',
  //   'Customer service management',
  //   'Cyber/security',
  //   'Data analysis and synthesis',
  //   'Data communication',
  //   'Data development process',
  //   'Data governance'
  // ]
}
