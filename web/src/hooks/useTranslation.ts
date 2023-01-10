import { useRouter } from 'next/router'
import en from '@/locales/en/common'

type TranslationKey = keyof typeof en

const languages = {
  en
}

const useTranslation = () => {
  const { locale } = useRouter()

  const t = (translationKey: TranslationKey) => {
    return languages[locale][translationKey]
  }

  return { t, locale }
}

export default useTranslation
