import { useMutation, useQuery } from 'react-query'
import useAuth from './useAuth'
import { fetchMe } from '../service/me'
import { Query, RegisterUserResponse } from '../service/api'
import { updateUser } from '@/service/auth'

export const useProfile = <T>({ callback }: { callback?: () => void }) => {
  const { authFetch } = useAuth()

  const {
    data: userProfile,
    isLoading,
    isSuccess
  } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))

  const { mutate } = useMutation<RegisterUserResponse, Error, T>(
    async (data: T) => await authFetch(updateUser, data),
    {
      onSettled: async () => {
        callback && callback()
      }
    }
  )

  return {
    mutate,
    isLoading,
    isSuccess,
    userProfile
  }
}
