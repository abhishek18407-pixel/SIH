/**
 * Input — Reusable form input component with label and error support.
 *
 * Props:
 * @param {string} id - Unique input ID (required for label association)
 * @param {string} label - Visible label text
 * @param {string} [type='text'] - HTML input type
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [value] - Controlled input value
 * @param {function} [onChange] - Change handler
 * @param {string} [error] - Error message to display
 * @param {boolean} [disabled=false] - Disabled state
 * @param {boolean} [required=false] - Required field
 * @param {string} [className] - Additional CSS classes
 */
function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  ...rest
}) {
  const classes = ['input-group', error ? 'input-group--error' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <label htmlFor={id} className="input-group__label">
        {label}
        {required ? <span className="input-group__required" aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        className="input-group__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="input-group__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default Input
