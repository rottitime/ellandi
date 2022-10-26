module.exports = {
  trailingSlash: true,
  publicRuntimeConfig: {
    enableEmailVerify: process.env.NEXT_PUBLIC_ENABLE_EMAIL_VERIFY === 'true',
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    gitSHA: process.env.GIT_SHA || 'development',
    minutesPerDay: 444,
    urls: {
      landingSignin: '/account/',
      signin: '/signin/',
      emailConfirm: '/signin/email/confirm/'
    }
  }
}
