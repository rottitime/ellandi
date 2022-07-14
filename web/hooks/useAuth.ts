import { SignInType } from '@/components/Form/SignInForm/SignInForm'
import { loginWithEmailAndPassword } from '@/service/user'
import { AuthUser } from '@/service/types'

const useAuth = () => {
  const login = async (data: SignInType): Promise<AuthUser> => {
    try {
      const res = await loginWithEmailAndPassword(data)
      if (res.token) {
        sessionStorage.setItem('token', res.token)
        return res
      }
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  }

  return { login }
}

export default useAuth
