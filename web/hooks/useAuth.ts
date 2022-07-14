import { SignInType } from '@/components/Form/SignInForm/SignInForm'
import { loginWithEmailAndPassword, logoutUser } from '@/service/user'
import { AuthUser } from '@/service/types'

const TOKEN_KEY = 'token'

const useAuth = () => {
  const login = async (data: SignInType): Promise<AuthUser> => {
    try {
      const res = await loginWithEmailAndPassword(data)
      if (res.token) {
        sessionStorage.setItem(TOKEN_KEY, res.token)
        return res
      }
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  }

  const logout = async (): Promise<boolean> => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    if (token) logoutUser(token)
    return true
  }

  return { login, logout }
}

export default useAuth
