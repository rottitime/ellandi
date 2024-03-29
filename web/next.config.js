// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs')
const sentryHasToken = !!process.env.SENTRY_AUTH_TOKEN

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  publicRuntimeConfig: {
    enableEmailVerify: process.env.NEXT_PUBLIC_ENABLE_EMAIL_VERIFY === 'true',
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    environment: process.env.ENVIRONMENT || 'local',
    sentryDsn:
      process.env.SENTRY_DSN ||
      process.env.NEXT_PUBLIC_SENTRY_DSN ||
      'https://0b98cc1dadb34e01b9b9be43f3c32c24@o1366404.ingest.sentry.io/6690747',
    sentryHasToken,
    gitSHA: process.env.GIT_SHA || 'development',
    minutesPerDay: 444,
    urls: {
      landingSignin: '/account/',
      signin: '/signin/',
      emailConfirm: '/signin/email/confirm/'
    }
  }
}

const moduleExports = {
  ...nextConfig,
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    transpileClientSDK: true,
    hideSourceMaps: true
  }
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  dryRun: !sentryHasToken,
  // debug: true,
  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

module.exports =
  sentryHasToken && typeof withSentryConfig === 'function'
    ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
    : nextConfig
