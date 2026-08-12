import { FolderOpen } from 'lucide-react'
import Button from './Button'

/**
 * EmptyState — Accessible placeholder component for zero-data states.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {string|React.ReactNode} title - Heading text for empty state
 * @param {string|React.ReactNode} [description] - Explanatory subtitle
 * @param {React.ReactNode} [icon] - Custom icon (defaults to FolderOpen icon)
 * @param {React.ReactNode} [action] - Custom action button element
 * @param {function} [onAction] - Action button click handler
 * @param {string} [actionText] - Action button text if onAction callback provided
 * @param {string} [className=''] - Additional CSS classes
 */
function EmptyState({
  title,
  description,
  icon,
  action,
  onAction,
  actionText = 'Get Started',
  className = '',
  ...rest
}) {
  const classes = ['empty-state', className].filter(Boolean).join(' ')

  const IconComponent = icon || <FolderOpen size={48} className="empty-state__default-icon" />

  return (
    <div className={classes} role="region" aria-label={typeof title === 'string' ? title : 'Empty state'} {...rest}>
      <div className="empty-state__icon" aria-hidden="true">
        {IconComponent}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}

      {(action || onAction) && (
        <div className="empty-state__action">
          {action ? (
            action
          ) : (
            <Button variant="primary" size="medium" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default EmptyState
