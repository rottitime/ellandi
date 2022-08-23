import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const defaultError = 'Sorry, there is a problem with the service. Try again later.'

export const fetchMe = async (token: string) => {
  const res = await fetch(`${publicRuntimeConfig.apiUrl}/me/`, {
    headers: { Authorization: `Token ${token}` }
  })
  if (res.ok) return res.json()
  throw new Error(defaultError)
}
