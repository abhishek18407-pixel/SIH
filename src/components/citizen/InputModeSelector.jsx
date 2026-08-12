import { FileText, Mic } from 'lucide-react'
import './InputModeSelector.css'

/**
 * InputModeSelector — Segmented control allowing citizens to toggle between Text and Voice reporting modes.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {'text'|'voice'} [mode='text'] - Currently selected input mode
 * @param {function} onModeChange - Callback receiving selected mode string ('text' | 'voice')
 * @param {string} [className=''] - Additional CSS classes
 */
function InputModeSelector({
  mode = 'text',
  onModeChange,
  className = '',
}) {
  const handleSelect = (newMode) => {
    if (onModeChange && newMode !== mode) {
      onModeChange(newMode)
    }
  }

  return (
    <div
      className={`input-mode-selector ${className}`.trim()}
      role="group"
      aria-label="Complaint input mode selector"
    >
      <button
        type="button"
        className={`input-mode-selector__btn ${mode === 'text' ? 'input-mode-selector__btn--active' : ''}`}
        aria-pressed={mode === 'text'}
        onClick={() => handleSelect('text')}
      >
        <FileText size={20} className="input-mode-selector__icon" aria-hidden="true" />
        <span>Type Text</span>
      </button>

      <button
        type="button"
        className={`input-mode-selector__btn ${mode === 'voice' ? 'input-mode-selector__btn--active' : ''}`}
        aria-pressed={mode === 'voice'}
        onClick={() => handleSelect('voice')}
      >
        <Mic size={20} className="input-mode-selector__icon" aria-hidden="true" />
        <span>Speak Audio</span>
      </button>
    </div>
  )
}

export default InputModeSelector
