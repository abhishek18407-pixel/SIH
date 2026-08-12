import { CheckCircle2 } from 'lucide-react'
import Button from './Button'

/**
 * SuccessState — Positive feedback component for successful user actions.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {string|React.ReactNode} title - Success heading
 * @param {string|React.ReactNode} [description] - Explanatory confirmation subtext
 * @param {React.ReactNode} [icon] - Custom icon (defaults to CheckCircle2)
 * @param {function} [onAction] - Optional action callback
 * @param {string} [actionText="Continue"] - Action button label
 * @param {React.ReactNode} [action] - Custom action element
 * @param {string} [className=''] - Additional CSS classes
 */
function SuccessState({
  title,
  description,
  icon,
  onAction,
  actionText = 'Continue',
  action,
  className = '',
  ...rest
}) {
  const classes = ['success-state', className].filter(Boolean).join(' ')

  const IconComponent = icon || <CheckCircle2 size={48} className="success-state__default-icon" />

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      {...rest}
    >
      <div className="success-state__icon" aria-hidden="true">
        {IconComponent}
      </div>
      <h3 className="success-state__title">{title}</h3>
      {description && <p className="success-state__description">{description}</p>}

      {(onAction || action) && (
        <div className="success-state__action">
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

export default SuccessState
