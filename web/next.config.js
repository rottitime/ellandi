module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    urls: {
      landingSignin: '/account/skills',
      signin: '/signin'
    }
  },
  async redirects() {
    return [
      {
        source: '/account',
        destination: '/account/skills',
        permanent: true
      }
    ]
  }
}
