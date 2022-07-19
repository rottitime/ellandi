import { AuthUser } from '@/service/types'
import { renderHook, waitFor } from '@testing-library/react'
import useTranslation from './useTranslation'
import { useRouter } from 'next/router'

jest.mock('@/locales/en/common', () => ({
  validEmail: 'HelloWorld'
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ locale: 'en' }))
}))

describe('Hook: useTranslation', () => {
  it('Shows default content', async () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('validEmail')).toEqual('HelloWorld')
  })

  it.skip('Shows anotherlangiage content', async () => {
    useRouter.mockImplementation(() => ({
      locale: 'de'
    }))

    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('validEmail')).toEqual('HelloWorld')
  })
})
