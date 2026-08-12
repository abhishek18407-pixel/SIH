import Loader from './Loader'

/**
 * Button — Polished, accessible, reusable button component.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {React.ReactNode} [children] - Button label content
 * @param {'button'|'submit'|'reset'} [type='button'] - HTML button type
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} [variant='primary'] - Visual style variant
 * @param {'small'|'medium'|'large'|'sm'|'md'|'lg'} [size='medium'] - Size variant
 * @param {boolean} [disabled=false] - Disabled state
 * @param {boolean} [loading=false] - Loading state (disables button and shows Loader)
 * @param {React.ReactNode} [iconLeft] - Optional icon element placed before text
 * @param {React.ReactNode} [iconRight] - Optional icon element placed after text
 * @param {string} [className=''] - Additional CSS classes
 * @param {function} [onClick] - Click handler
 */
function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null,
  className = '',
  onClick,
  ...rest
}) {
  // Normalize size names ('small'|'sm' -> 'sm', 'medium'|'md' -> 'md', 'large'|'lg' -> 'lg')
  const normalizedSize =
    size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'medium' ? 'md' : size

  // Map button size to loader size
  const loaderSize = normalizedSize === 'lg' ? 'md' : 'sm'

  const isDisabled = disabled || loading

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${normalizedSize}`,
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault()
      return
    }
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      onClick={handleClick}
      {...rest}
    >
      {loading ? (
        <span className="btn__loader-wrapper">
          <Loader size={loaderSize} />
        </span>
      ) : (
        <>
          {iconLeft && <span className="btn__icon btn__icon--left" aria-hidden="true">{iconLeft}</span>}
          {children && <span className="btn__label">{children}</span>}
          {iconRight && <span className="btn__icon btn__icon--right" aria-hidden="true">{iconRight}</span>}
        </>
      )}
    </button>
  )
}

export default Button
