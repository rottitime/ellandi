import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const defaultError = 'Sorry, there is a problem with the service. Try again later.'

export const deleteSkill = async (id: string) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/skills/${id}/`, {
    method: 'DELETE'
  })

  if (res.ok) return { ...res.json(), id }

  throw new Error(defaultError)
}

export const deleteLanguage = async (id: string) => {
  const res: Response = await fetch(`${publicRuntimeConfig.apiUrl}/me/languages/${id}/`, {
    method: 'DELETE'
  })
  if (res.ok) return res.json()

  throw new Error(defaultError)
}

export const deleteSkillDevelop = async (id: string) => {
  const res: Response = await fetch(
    `${publicRuntimeConfig.apiUrl}/me/skills_develop/${id}/`,
    {
      method: 'DELETE'
    }
  )
  if (res.ok) return res.json()

  throw new Error(defaultError)
}
