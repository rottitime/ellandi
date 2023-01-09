// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { sentryHasToken, environment, sentryDsn }
} = getConfig()

Sentry.init({
  environment,
  dsn: sentryDsn,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  enabled: sentryHasToken

  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
