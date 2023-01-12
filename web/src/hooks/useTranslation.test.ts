import { renderHook } from '@testing-library/react'
import useTranslation from './useTranslation'

jest.mock('@/locales/en/common', () => ({
  validEmail: 'HelloWorld'
}))

describe('Hook: useTranslation', () => {
  it('Shows default content', async () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('validEmail')).toEqual('HelloWorld')
  })
})
