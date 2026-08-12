/**
 * Card — Flexible, accessible container component for grouping related content.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {'default'|'elevated'|'outlined'|'interactive'} [variant='default'] - Card visual style variant
 * @param {React.ReactNode} [title] - Heading title content
 * @param {React.ReactNode} [description] - Subtitle / description content
 * @param {React.ReactNode} [header] - Optional custom header node
 * @param {React.ReactNode} [children] - Main body content
 * @param {React.ReactNode} [footer] - Optional footer content
 * @param {string} [className=''] - Additional CSS classes
 * @param {function} [onClick] - Optional click handler for interactive card
 */
function Card({
  variant = 'default',
  title,
  description,
  header,
  children,
  footer,
  className = '',
  onClick,
  ...rest
}) {
  const isInteractive = variant === 'interactive' || Boolean(onClick)

  const classes = [
    'card',
    `card--${variant}`,
    isInteractive ? 'card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleKeyDown = (e) => {
    if (!onClick) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(e)
    }
  }

  const Tag = isInteractive ? 'div' : 'div'

  return (
    <Tag
      className={classes}
      {...(isInteractive
        ? {
            role: 'button',
            tabIndex: 0,
            onClick: onClick,
            onKeyDown: handleKeyDown,
          }
        : {})}
      {...rest}
    >
      {(header || title || description) && (
        <div className="card__header">
          {header}
          {title && <h3 className="card__title">{title}</h3>}
          {description && <p className="card__description">{description}</p>}
        </div>
      )}

      {children && <div className="card__body">{children}</div>}

      {footer && <div className="card__footer">{footer}</div>}
    </Tag>
  )
}

export default Card
