import { Landmark, Sparkles } from 'lucide-react'
import './Brand.css'

/**
 * Brand — Reusable CivicAI Logo & Visual Identity Mark
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {'full'|'compact'} [variant='full'] - Brand display style
 * @param {boolean} [showTagline=false] - Whether to display the primary tagline
 * @param {'sm'|'md'|'lg'} [size='md'] - Brand size scale
 * @param {string} [className=''] - Additional CSS classes
 * @param {string} [href] - Optional link destination
 */
function Brand({
  variant = 'full',
  showTagline = false,
  size = 'md',
  className = '',
  href,
  ...rest
}) {
  const Tag = href ? 'a' : 'div'
  const isCompact = variant === 'compact'

  const classes = [
    'brand',
    `brand--${size}`,
    `brand--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={classes}
      {...(href ? { href } : {})}
      aria-label="CivicAI Logo"
      {...rest}
    >
      <div className="brand__header">
        <div className="brand__icon-wrapper" aria-hidden="true">
          <Landmark className="brand__main-icon" />
          <span className="brand__sparkle-badge">
            <Sparkles className="brand__sparkle-icon" />
          </span>
        </div>

        <span className="brand__title">
          <span className="brand__name-civic">Civic</span>
          <span className="brand__name-ai">AI</span>
          {!isCompact && <span className="brand__badge">GovTech</span>}
        </span>
      </div>

      {showTagline && (
        <p className="brand__tagline">Report civic problems in your language.</p>
      )}
    </Tag>
  )
}

export default Brand
