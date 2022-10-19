import { SignInType } from '@/components/Form/SignInForm/types'
import {
  createUser,
  loginWithEmailAndPassword,
  logoutUser,
  sendVerificationEmail
} from '@/service/auth'
import { AuthUser, RegisterUser } from '@/service/types'
import { defaultError } from '@/service/auth'

const TOKEN_KEY = 'token'

const useAuth = () => {
  const hasToken = (): boolean => !!sessionStorage.getItem(TOKEN_KEY)
  const setToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token)
  const sendEmailVerification = async () => await authFetch(sendVerificationEmail)
  const authFetch = async (callback, data = {}) =>
    await callback(sessionStorage.getItem(TOKEN_KEY), data)

  const login = async (data: SignInType): Promise<AuthUser> => {
    try {
      const res = await loginWithEmailAndPassword(data)
      if (res.token) {
        setToken(res.token)
        return res
      }
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        return Promise.reject(new Error(defaultError))
      }

      return Promise.reject(new Error(err))
    }
  }

  const createAndLogin = async (data: RegisterUser): Promise<AuthUser> => {
    await createUser(data)
    const userData = await login(data)
    sendEmailVerification()
    return userData
  }

  const invalidate = () => {
    sessionStorage.removeItem(TOKEN_KEY)
  }

  const logout = async (): Promise<boolean> => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    invalidate()
    if (token) logoutUser(token)
    return true
  }

  return {
    login,
    logout,
    createAndLogin,
    authFetch,
    hasToken,
    invalidate,
    sendEmailVerification,
    setToken
  }
}

export default useAuth
