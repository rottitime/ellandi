module.exports = {
  trailingSlash: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    gitSHA: process.env.GIT_SHA || 'development',
    urls: {
      landingSignin: '/account/',
      signin: '/signin/',
      emailVerify: '/signin/email/confirm/'
    }
  }
}
