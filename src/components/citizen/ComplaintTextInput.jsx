import { useState } from 'react'
import './ComplaintTextInput.css'

/**
 * ComplaintTextInput — Accessible, validated text area component for civic complaints.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {string} value - Controlled input value
 * @param {function} onChange - Callback function receiving updated text string
 * @param {number} [maxLength=1000] - Maximum allowed characters
 * @param {number} [minLength=10] - Minimum valid characters
 * @param {string} [id='complaint-description'] - Textarea HTML ID
 * @param {string} [label='What is the problem?'] - Input label text
 * @param {string} [placeholder='Describe the civic problem in your own words...'] - Placeholder text
 * @param {string} [className=''] - Additional CSS classes
 */
function ComplaintTextInput({
  value = '',
  onChange,
  maxLength = 1000,
  minLength = 10,
  id = 'complaint-description',
  label = 'What is the problem?',
  placeholder = 'Describe the civic problem in your own words...',
  className = '',
  ...rest
}) {
  const [isTouched, setIsTouched] = useState(false)

  const trimmedText = value.trim()
  const charCount = value.length
  const isEmpty = trimmedText.length === 0
  const isTooShort = !isEmpty && trimmedText.length < minLength
  const isAtLimit = charCount >= maxLength

  // Determine error message for display
  let errorMessage = ''
  if (isTouched) {
    if (isEmpty) {
      errorMessage = 'Please describe the problem.'
    } else if (isTooShort) {
      errorMessage = 'Please provide a little more detail about the problem.'
    }
  }

  const handleChange = (e) => {
    if (!isTouched) setIsTouched(true)
    const newText = e.target.value
    if (newText.length <= maxLength) {
      onChange(newText)
    }
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  return (
    <div className={`complaint-input-group ${errorMessage ? 'complaint-input-group--error' : ''} ${className}`.trim()}>
      <div className="complaint-input-group__header">
        <label htmlFor={id} className="complaint-input-group__label text-h3">
          {label}
          <span className="complaint-input-group__required" aria-hidden="true"> *</span>
        </label>
        <span
          id={`${id}-count`}
          className={`complaint-input-group__counter ${isAtLimit ? 'complaint-input-group__counter--limit' : ''}`}
          aria-live="polite"
        >
          {charCount} / {maxLength}
        </span>
      </div>

      <textarea
        id={id}
        name="complaintText"
        rows={6}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className="complaint-input-group__textarea"
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={`${id}-count ${errorMessage ? `${id}-error` : `${id}-hint`}`}
        {...rest}
      />

      <div className="complaint-input-group__footer">
        {errorMessage ? (
          <p id={`${id}-error`} className="complaint-input-group__error" role="alert">
            {errorMessage}
          </p>
        ) : (
          <p id={`${id}-hint`} className="complaint-input-group__hint">
            Minimum {minLength} characters. Supports English and Indian regional languages (Hindi, Kannada, Tamil, etc.).
          </p>
        )}
        {isAtLimit && !errorMessage && (
          <p className="complaint-input-group__limit-warning" role="status">
            Maximum character limit reached ({maxLength} characters).
          </p>
        )}
      </div>
    </div>
  )
}

export default ComplaintTextInput
