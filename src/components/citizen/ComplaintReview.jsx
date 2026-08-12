import { Globe, FileText, Mic, Edit3, ArrowRight, Sparkles, Volume2 } from 'lucide-react'
import { Card, Button } from '../common'
import { getLanguageByCode } from '../../constants/languages'
import './ComplaintReview.css'

/**
 * ComplaintReview — Citizen Complaint Summary & Review Preview Component
 *
 * SIH Problem Statement: SIH260011
 *
 * Displays a clean summary of entered complaint details (language, input method, text/audio content)
 * with Edit and Continue actions before any future processing step.
 *
 * @param {object} complaintState - Complaint state { mode, text, audioBlob, audioUrl, language }
 * @param {function} onEdit - Callback to edit complaint details
 * @param {function} onContinue - Callback to proceed to next step
 * @param {string} [className=''] - Additional CSS classes
 */
function ComplaintReview({
  complaintState,
  onEdit,
  onContinue,
  className = '',
}) {
  const language = getLanguageByCode(complaintState?.language || 'en')
  const isTextMode = complaintState?.mode === 'text'

  return (
    <div className={`complaint-review ${className}`.trim()} role="region" aria-label="Complaint summary review">
      <header className="complaint-review__header">
        <h2 className="complaint-review__title">Review Your Complaint</h2>
        <p className="complaint-review__subtitle">
          Please check the information below before proceeding.
        </p>
      </header>

      {/* Metadata Section: Language & Input Method */}
      <div className="complaint-review__meta-grid">
        <div className="complaint-review__meta-item">
          <span className="complaint-review__meta-label">Selected Language</span>
          <span className="complaint-review__meta-value">
            <Globe size={18} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
            <span>{language.name} — {language.nativeName}</span>
          </span>
        </div>

        <div className="complaint-review__meta-item">
          <span className="complaint-review__meta-label">Input Method</span>
          <span className="complaint-review__meta-value">
            {isTextMode ? (
              <>
                <FileText size={18} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
                <span>Text Description</span>
              </>
            ) : (
              <>
                <Mic size={18} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
                <span>Voice Recording</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Content Preview Box */}
      <div className="complaint-review__content-box">
        <h3 className="complaint-review__content-label">
          {isTextMode ? (
            <>
              <FileText size={18} aria-hidden="true" />
              <span>Complaint Text</span>
            </>
          ) : (
            <>
              <Volume2 size={18} aria-hidden="true" />
              <span>Voice Recording Attached</span>
            </>
          )}
        </h3>

        {isTextMode ? (
          <p className="complaint-review__text-content">
            {complaintState?.text || 'No text provided.'}
          </p>
        ) : (
          <div className="complaint-review__voice-content">
            <p className="text-body-sm">
              Voice recording attached successfully. You can play back your audio below:
            </p>
            {complaintState?.audioUrl ? (
              <audio
                src={complaintState.audioUrl}
                controls
                className="complaint-review__audio-element"
              >
                Your browser does not support audio playback.
              </audio>
            ) : (
              <p className="text-caption" style={{ color: 'var(--color-error)' }}>
                Audio recording preview unavailable.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Informational Banner: Future AI Processing Notice */}
      <div className="complaint-review__ai-banner">
        <Sparkles size={20} className="complaint-review__ai-icon" aria-hidden="true" />
        <p className="complaint-review__ai-text">
          After you continue, CivicAI will analyze your complaint and identify the appropriate department.
        </p>
      </div>

      {/* Footer Action Buttons */}
      <footer className="complaint-review__actions">
        <Button
          variant="secondary"
          size="medium"
          onClick={onEdit}
          iconLeft={<Edit3 size={18} />}
        >
          Edit Complaint
        </Button>

        <Button
          variant="primary"
          size="large"
          onClick={onContinue}
          iconRight={<ArrowRight size={20} />}
        >
          Continue
        </Button>
      </footer>
    </div>
  )
}

export default ComplaintReview
