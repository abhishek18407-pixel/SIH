import { Loader2 } from 'lucide-react'

/**
 * Loader — Accessible loading indicator component supporting multiple sizes, optional text, and full-screen layout.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {'sm'|'md'|'lg'|'small'|'medium'|'large'} [size='md'] - Spinner size
 * @param {string} [text] - Optional accessible loading text message
 * @param {boolean} [fullScreen=false] - Centered layout overlay for full-page loading
 * @param {string} [className=''] - Additional CSS classes
 */
function Loader({
  size = 'md',
  text,
  fullScreen = false,
  className = '',
  ...rest
}) {
  const normalizedSize =
    size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'medium' ? 'md' : size

  const iconSizes = {
    sm: 18,
    md: 32,
    lg: 48,
  }

  const classes = [
    'loader',
    `loader--${normalizedSize}`,
    fullScreen ? 'loader--fullscreen' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-busy="true"
      {...rest}
    >
      <Loader2
        className="loader__spinner"
        size={iconSizes[normalizedSize] || 32}
        aria-hidden="true"
      />
      {text ? <p className="loader__text">{text}</p> : null}
      <span className="sr-only">{text || 'Loading, please wait...'}</span>
    </div>
  )
}

export default Loader
