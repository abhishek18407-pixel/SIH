import { useState } from 'react'
import { MapPin, Camera, Info, ArrowRight, CheckCircle2, RotateCcw, Edit3 } from 'lucide-react'
import { Card, Button } from '../../components/common'
import {
  ComplaintTextInput,
  LanguageSelector,
  VoiceInput,
  InputModeSelector,
  ComplaintReview,
} from '../../components/citizen'
import './ReportComplaint.css'

/**
 * ReportComplaint — Citizen Complaint Page with 3-Step Review & Preview Workflow
 *
 * SIH Problem Statement: SIH260011
 *
 * Step 1: Describe (Text or Voice)
 * Step 2: Review (Preview summary & edit actions)
 * Step 3: Process (Placeholder for future AI processing)
 */
function ReportComplaint() {
  // Step Workflow State: 'describe' | 'review' | 'processed'
  const [step, setStep] = useState('describe')

  // Unified Complaint Input State Model
  const [complaintState, setComplaintState] = useState({
    mode: 'text', // 'text' | 'voice'
    text: '',
    audioBlob: null,
    audioUrl: null,
    language: 'en',
  })

  // Mode-based Validation Rules
  const isTextValid = complaintState.text.trim().length >= 10
  const isVoiceValid = Boolean(complaintState.audioBlob)
  const isFormValid = complaintState.mode === 'text' ? isTextValid : isVoiceValid

  // State handlers
  const handleModeChange = (newMode) => {
    setComplaintState((prev) => ({ ...prev, mode: newMode }))
  }

  const handleLanguageChange = (lang) => {
    setComplaintState((prev) => ({ ...prev, language: lang.code }))
  }

  const handleTextChange = (newText) => {
    setComplaintState((prev) => ({ ...prev, text: newText }))
  }

  const handleAudioRecorded = (blob, url) => {
    setComplaintState((prev) => ({
      ...prev,
      audioBlob: blob,
      audioUrl: url,
    }))
  }

  const handleReviewClick = (e) => {
    e.preventDefault()
    if (isFormValid) {
      setStep('review')
    }
  }

  const handleResetAll = () => {
    if (complaintState.audioUrl) {
      URL.revokeObjectURL(complaintState.audioUrl)
    }
    setComplaintState({
      mode: 'text',
      text: '',
      audioBlob: null,
      audioUrl: null,
      language: 'en',
    })
    setStep('describe')
  }

  return (
    <div className="report-page stack-lg">
      {/* Page Header */}
      <header className="report-page__header">
        <h1 className="report-page__title">Report a Civic Problem</h1>
        <p className="report-page__subtitle">
          Type your problem or speak it using your microphone. Tell us what is happening in your area.
        </p>
      </header>

      {/* 3-Step Process Indicator */}
      <nav className="report-page__steps" aria-label="Complaint reporting steps">
        <div
          className={`report-page__step ${
            step === 'describe'
              ? 'report-page__step--active'
              : 'report-page__step--complete'
          }`}
        >
          <span className="report-page__step-num">1</span>
          <span>1. Describe</span>
        </div>

        <div
          className={`report-page__step ${
            step === 'review'
              ? 'report-page__step--active'
              : step === 'processed'
              ? 'report-page__step--complete'
              : ''
          }`}
        >
          <span className="report-page__step-num">2</span>
          <span>2. Review</span>
        </div>

        <div
          className={`report-page__step ${
            step === 'processed' ? 'report-page__step--active' : ''
          }`}
        >
          <span className="report-page__step-num">3</span>
          <span>3. Process</span>
        </div>
      </nav>

      {/* STEP 1: Describe Input View */}
      {step === 'describe' && (
        <>
          {/* Section B: Language Selection */}
          <section aria-label="Language selection">
            <LanguageSelector
              selectedLanguageCode={complaintState.language}
              onSelectLanguage={handleLanguageChange}
            />
          </section>

          {/* Section C: Input Mode Selector */}
          <section aria-label="Input mode selection">
            <InputModeSelector
              mode={complaintState.mode}
              onModeChange={handleModeChange}
            />
          </section>

          {/* Section D: Input Area */}
          <main aria-label="Complaint description input">
            {complaintState.mode === 'text' ? (
              <Card variant="default">
                <ComplaintTextInput
                  value={complaintState.text}
                  onChange={handleTextChange}
                  id="complaint-description"
                  label="What is the problem?"
                  placeholder="Describe the civic problem in your own words..."
                  maxLength={1000}
                  minLength={10}
                />
              </Card>
            ) : (
              <VoiceInput
                selectedLanguageCode={complaintState.language}
                onAudioRecorded={handleAudioRecorded}
              />
            )}
          </main>

          {/* Section E: Additional Information */}
          <Card variant="outlined" title="Additional Information">
            <div className="stack-sm">
              <div className="report-page__feature-item">
                <MapPin size={20} className="report-page__feature-icon" aria-hidden="true" />
                <div>
                  <p className="report-page__feature-title">Location Detection</p>
                  <p className="report-page__feature-desc">
                    Automatic GPS location detection and interactive map selection will be available.
                  </p>
                </div>
              </div>

              <div className="report-page__feature-item">
                <Camera size={20} className="report-page__feature-icon" aria-hidden="true" />
                <div>
                  <p className="report-page__feature-title">Photo Evidence</p>
                  <p className="report-page__feature-desc">
                    Upload photos of potholes, garbage piles, or broken infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Footer */}
          <footer className="report-page__action-footer">
            <Button
              variant="primary"
              size="large"
              disabled={!isFormValid}
              onClick={handleReviewClick}
              iconRight={<ArrowRight size={20} />}
              style={{ minWidth: '220px' }}
            >
              Review Complaint
            </Button>
            <p className="report-page__action-hint flex items-center justify-center gap-1">
              <Info size={14} aria-hidden="true" />
              <span>
                {complaintState.mode === 'text'
                  ? 'Enter at least 10 characters to enable complaint review.'
                  : 'Record your voice to enable complaint review.'}
              </span>
            </p>
          </footer>
        </>
      )}

      {/* STEP 2: Review Preview View */}
      {step === 'review' && (
        <ComplaintReview
          complaintState={complaintState}
          onEdit={() => setStep('describe')}
          onContinue={() => setStep('processed')}
        />
      )}

      {/* STEP 3: Processed Placeholder View */}
      {step === 'processed' && (
        <Card variant="default">
          <div className="stack-md text-center py-4" style={{ alignItems: 'center' }}>
            <div className="flex items-center justify-center" style={{ color: 'var(--color-success)' }}>
              <CheckCircle2 size={48} aria-hidden="true" />
            </div>
            <h2 className="text-h2" style={{ color: 'var(--color-primary)' }}>
              Ready for AI Processing
            </h2>
            <p className="text-body" style={{ maxWidth: '520px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
              Your complaint details have been reviewed and prepared for AI categorization.
              In the next development steps, CivicAI will transcribe, categorize, and route your issue.
            </p>
            <div className="flex items-center justify-center gap-3 pt-4 flex-wrap">
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setStep('describe')}
                iconLeft={<Edit3 size={18} />}
              >
                Edit Complaint
              </Button>
              <Button
                variant="outline"
                size="medium"
                onClick={handleResetAll}
                iconLeft={<RotateCcw size={18} />}
              >
                Start New Complaint
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ReportComplaint
