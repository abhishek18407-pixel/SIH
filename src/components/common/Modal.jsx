import { useEffect, useRef } from 'react'

/**
 * Modal — Reusable overlay dialog component.
 *
 * Props:
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Close handler
 * @param {string} [title] - Optional modal heading
 * @param {React.ReactNode} children - Modal body content
 * @param {string} [className] - Additional CSS classes
 */
function Modal({ isOpen, onClose, title, children, className = '' }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e) => {
      e.preventDefault()
      onClose()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`.trim()}
      onClick={handleBackdropClick}
    >
      <div className="modal__content">
        <div className="modal__header">
          {title ? <h2 className="modal__title">{title}</h2> : null}
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </dialog>
  )
}

export default Modal
