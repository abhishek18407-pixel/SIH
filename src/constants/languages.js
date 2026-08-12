/**
 * Supported Languages Configuration for CivicAI Prototype
 * SIH Problem Statement: SIH260011
 *
 * Each language contains:
 * - code: ISO 639-1 language code
 * - name: English name
 * - nativeName: Native language script name for immediate recognition by citizens
 */

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
  },
]

export const DEFAULT_LANGUAGE_CODE = 'en'

/**
 * Helper utility to find a language object by its ISO code.
 * @param {string} code - ISO language code
 * @returns {object} Language object or default English language object
 */
export function getLanguageByCode(code) {
  return (
    SUPPORTED_LANGUAGES.find((lang) => lang.code === code) ||
    SUPPORTED_LANGUAGES[0]
  )
}
