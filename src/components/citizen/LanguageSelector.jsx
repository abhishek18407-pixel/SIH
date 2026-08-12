import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../../constants/languages'
import './LanguageSelector.css'

/**
 * LanguageSelector — Accessible, responsive language selector component for CivicAI.
 *
 * SIH Problem Statement: SIH260011
 *
 * Displays current language with native script names and opens an accessible
 * options menu without flag icons.
 *
 * @param {string} [selectedLanguageCode='en'] - ISO code of currently selected language
 * @param {function} onSelectLanguage - Callback function receiving selected language object
 * @param {string} [className=''] - Additional CSS classes
 */
function LanguageSelector({
  selectedLanguageCode = 'en',
  onSelectLanguage,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const currentLanguage = getLanguageByCode(selectedLanguageCode)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSelect = (language) => {
    if (onSelectLanguage) {
      onSelectLanguage(language)
    }
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation handler (Escape closes dropdown)
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`language-selector ${className}`.trim()}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className="language-selector__trigger"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Choose your language"
      >
        <span className="language-selector__trigger-info">
          <Globe size={18} aria-hidden="true" />
          <span>Choose your language:</span>
        </span>

        <span className="language-selector__current-badge">
          <span className="language-selector__current-native">{currentLanguage.nativeName}</span>
          {currentLanguage.code !== 'en' && (
            <span className="language-selector__current-english">({currentLanguage.name})</span>
          )}
          <ChevronDown
            size={16}
            className={`language-selector__chevron ${isOpen ? 'language-selector__chevron--open' : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>

      {/* Options Dropdown Menu */}
      {isOpen && (
        <div
          className="language-selector__dropdown"
          role="listbox"
          aria-label="Available languages"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === selectedLanguageCode
            return (
              <div
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className={`language-selector__option ${isSelected ? 'language-selector__option--selected' : ''}`}
                onClick={() => handleSelect(lang)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelect(lang)
                  }
                }}
              >
                <div className="language-selector__option-text">
                  <span className="language-selector__native-name">{lang.nativeName}</span>
                  <span className="language-selector__english-name">{lang.name}</span>
                </div>
                {isSelected && <Check size={18} className="language-selector__check-icon" aria-hidden="true" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
