import { useRouter } from 'next/router'
import en from '@/locales/en/common'

const languages = {
  en
}

const useTranslation = () => {
  const { locale } = useRouter()

  const t = (translationKey: keyof typeof en) => {
    return languages[locale][translationKey]
  }

  return { t, locale }
}

export default useTranslation
