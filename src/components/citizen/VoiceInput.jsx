import { useState, useRef, useEffect } from 'react'
import { Mic, Square, RotateCcw, Volume2, AlertCircle } from 'lucide-react'
import { Button, Loader } from '../common'
import { getLanguageByCode } from '../../constants/languages'
import './VoiceInput.css'

/**
 * VoiceInput — Accessible local voice reporting component for CivicAI.
 *
 * SIH Problem Statement: SIH260011
 *
 * Supports idle, recording (with 60s auto-stop timer), processing, completed,
 * and error states using native browser MediaRecorder API without external network calls.
 *
 * @param {string} [selectedLanguageCode='en'] - ISO code of selected language
 * @param {function} [onAudioRecorded] - Optional callback receiving (blob, url)
 * @param {string} [className=''] - Additional CSS classes
 */
function VoiceInput({
  selectedLanguageCode = 'en',
  onAudioRecorded,
  className = '',
}) {
  // State: 'idle' | 'recording' | 'processing' | 'completed' | 'error'
  const [voiceState, setVoiceState] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [audioUrl, setAudioUrl] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)

  const mediaRecorderRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerIntervalRef = useRef(null)

  const language = getLanguageByCode(selectedLanguageCode)
  const MAX_DURATION_SECONDS = 60

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Clean up interval and media streams on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  // Automatically stop recording when reaching 60 seconds
  useEffect(() => {
    if (voiceState === 'recording' && recordingSeconds >= MAX_DURATION_SECONDS) {
      stopRecording()
    }
  }, [recordingSeconds, voiceState])

  // Start microphone recording
  const startRecording = async () => {
    setErrorMessage('')
    audioChunksRef.current = []

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('UNSUPPORTED')
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        setVoiceState('processing')
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioUrl(url)

        if (onAudioRecorded) {
          onAudioRecorded(blob, url)
        }

        setTimeout(() => {
          setVoiceState('completed')
        }, 400)
      }

      recorder.start(200)
      setVoiceState('recording')
      setRecordingSeconds(0)

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.warn('VoiceInput media error:', err)
      setVoiceState('error')

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage(
          'Microphone access was denied. Please allow microphone permissions in your browser to record audio.'
        )
      } else if (err.name === 'NotFoundError' || err.message === 'UNSUPPORTED') {
        setErrorMessage(
          'No microphone found or audio recording is not supported on this browser.'
        )
      } else {
        setErrorMessage(
          'Unable to record audio at this time. Please check your microphone and try again.'
        )
      }
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }
  }

  // Reset to record again
  const handleReset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setAudioBlob(null)
    setRecordingSeconds(0)
    setErrorMessage('')
    setVoiceState('idle')
  }

  return (
    <div
      className={`voice-input voice-input--${voiceState} ${className}`.trim()}
      role="region"
      aria-label="Voice complaint recorder"
    >
      <div className="voice-input__content">
        {/* State A: Idle */}
        {voiceState === 'idle' && (
          <>
            <div className="voice-input__mic-btn-wrapper">
              <button
                type="button"
                className="voice-input__mic-btn"
                onClick={startRecording}
                aria-label="Start voice recording"
              >
                <Mic size={32} aria-hidden="true" />
              </button>
            </div>
            <div>
              <h3 className="voice-input__title">Speak your complaint</h3>
              <p className="voice-input__subtitle">
                Tap the microphone button and describe your problem clearly in your own words.
              </p>
            </div>
            <span className="voice-input__language-tag">
              Language: <strong>{language.name} ({language.nativeName})</strong>
            </span>
          </>
        )}

        {/* State B: Recording */}
        {voiceState === 'recording' && (
          <>
            <div className="voice-input__mic-btn-wrapper">
              <button
                type="button"
                className="voice-input__mic-btn voice-input__mic-btn--recording"
                onClick={stopRecording}
                aria-label="Stop recording"
              >
                <Square size={28} aria-hidden="true" />
              </button>
            </div>
            <div>
              <h3 className="voice-input__title" style={{ color: 'var(--color-error)' }}>
                Listening...
              </h3>
              <p className="voice-input__timer" role="timer" aria-live="off">
                <span>●</span> {formatTime(recordingSeconds)} / {formatTime(MAX_DURATION_SECONDS)}
              </p>
            </div>
            <Button variant="danger" size="medium" onClick={stopRecording}>
              Stop Recording
            </Button>
          </>
        )}

        {/* State C: Processing */}
        {voiceState === 'processing' && (
          <Loader size="md" text="Processing your voice recording..." />
        )}

        {/* State D: Completed */}
        {voiceState === 'completed' && (
          <>
            <div className="flex items-center gap-2" style={{ color: 'var(--color-success)' }}>
              <Volume2 size={28} aria-hidden="true" />
              <h3 className="voice-input__title" style={{ color: '#166534' }}>
                Voice Recorded ({formatTime(recordingSeconds)})
              </h3>
            </div>
            <p className="voice-input__subtitle">
              Your audio recording is ready. You can listen to the preview or record again.
            </p>

            {audioUrl && (
              <div className="voice-input__audio-preview">
                <audio src={audioUrl} controls className="voice-input__audio-element">
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}

            <div className="voice-input__actions">
              <Button
                variant="secondary"
                size="medium"
                onClick={handleReset}
                iconLeft={<RotateCcw size={18} />}
              >
                Record Again
              </Button>
            </div>
          </>
        )}

        {/* State E: Error */}
        {voiceState === 'error' && (
          <>
            <div className="flex items-center gap-2" style={{ color: 'var(--color-error)' }}>
              <AlertCircle size={28} aria-hidden="true" />
              <h3 className="voice-input__title" style={{ color: '#991b1b' }}>
                Unable to Record Audio
              </h3>
            </div>
            <p className="voice-input__subtitle" style={{ color: '#7f1d1d' }}>
              {errorMessage || 'Unable to record audio. Please check microphone permissions and try again.'}
            </p>
            <Button
              variant="primary"
              size="medium"
              onClick={handleReset}
              iconLeft={<RotateCcw size={18} />}
            >
              Try Again
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default VoiceInput
