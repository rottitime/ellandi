const ID_KEY = 'userId'

const useRegisterUser = () => {
  const setUserId = (id: string): void => sessionStorage.setItem(ID_KEY, id)
  const getUserId = (): string | null => sessionStorage.getItem(ID_KEY) || null
  const deleteUserId = (): void => sessionStorage.removeItem(ID_KEY)

  return { getUserId, deleteUserId, setUserId }
}

export default useRegisterUser
