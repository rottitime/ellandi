module.exports = {
  trailingSlash: true,
  publicRuntimeConfig: {
    title: 'Cabinet Office Skills and Learning',
    enableEmailVerify: process.env.NEXT_PUBLIC_ENABLE_EMAIL_VERIFY === 'true',
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    gitSHA: process.env.GIT_SHA || 'development',
    urls: {
      landingSignin: '/account/',
      signin: '/signin/',
      emailConfirm: '/signin/email/confirm/'
    }
  }
}
