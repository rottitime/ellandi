module.exports = {
  trailingSlash: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    urls: {
      landingSignin: '/account/skills',
      signin: '/signin'
    }
  }
}
