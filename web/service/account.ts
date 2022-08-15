import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const defaultError = 'Sorry, there is a problem with the service. Try again later.'

export const deleteSkill = async (token: string, id: string) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/user-skills/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` }
  })

  if (res.ok) return { id }

  throw new Error(defaultError)
}

export const deleteLanguage = async (token: string, id: string) => {
  const res: Response = await fetch(
    `${publicRuntimeConfig.apiUrl}/user-languages/${id}/`,
    {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` }
    }
  )
  if (res.ok) return { id }

  throw new Error(defaultError)
}

export const deleteSkillDevelop = async (token: string, id: string) => {
  const res: Response = await fetch(
    `${publicRuntimeConfig.apiUrl}/user-skills-develop/${id}/`,
    {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` }
    }
  )
  if (res.ok) return { id }

  throw new Error(defaultError)
}
