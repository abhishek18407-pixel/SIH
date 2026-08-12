import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from './Button'

/**
 * ErrorState — Citizen-friendly error feedback component.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {string|React.ReactNode} [title="Something went wrong"] - Error title
 * @param {string|React.ReactNode} [description="We encountered an unexpected problem. Please try again."] - User-understandable error message
 * @param {React.ReactNode} [icon] - Custom error icon (defaults to AlertTriangle)
 * @param {function} [onRetry] - Optional retry click handler
 * @param {string} [retryText="Try Again"] - Retry button label
 * @param {React.ReactNode} [action] - Custom action button or link
 * @param {string} [className=''] - Additional CSS classes
 */
function ErrorState({
  title = 'Something went wrong',
  description = 'We encountered an unexpected problem. Please try again.',
  icon,
  onRetry,
  retryText = 'Try Again',
  action,
  className = '',
  ...rest
}) {
  const classes = ['error-state', className].filter(Boolean).join(' ')

  const IconComponent = icon || <AlertTriangle size={48} className="error-state__default-icon" />

  return (
    <div
      className={classes}
      role="alert"
      aria-live="assertive"
      {...rest}
    >
      <div className="error-state__icon" aria-hidden="true">
        {IconComponent}
      </div>
      <h3 className="error-state__title">{title}</h3>
      {description && <p className="error-state__description">{description}</p>}

      {(onRetry || action) && (
        <div className="error-state__action">
          {onRetry && (
            <Button
              variant="primary"
              size="medium"
              onClick={onRetry}
              iconLeft={<RefreshCw size={16} />}
            >
              {retryText}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  )
}

export default ErrorState
