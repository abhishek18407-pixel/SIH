/**
 * config.js
 * Centralized access to frontend environment configuration.
 *
 * Only non-secret application settings are exposed here.
 * API keys should NOT be imported through this utility —
 * they will be consumed directly by their respective service modules
 * when those features are implemented.
 *
 * All variables are read from Vite's import.meta.env at build time.
 * See: https://vite.dev/guide/env-and-mode
 */

const config = Object.freeze({
  /** Application display name */
  appName: import.meta.env.VITE_APP_NAME || 'CivicAI',

  /** Current environment: 'development' | 'staging' | 'production' */
  environment: import.meta.env.VITE_APP_ENV || 'development',

  /** Base URL for backend API calls */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',

  /** Whether the app is running in development mode */
  isDev: import.meta.env.VITE_APP_ENV === 'development',

  /** Whether the app is running in production mode */
  isProd: import.meta.env.VITE_APP_ENV === 'production',
})

export default config
