import { Component } from 'react'
import ErrorState from './ErrorState'

/**
 * ErrorBoundary — React Error Boundary component catching unexpected render crashes.
 *
 * SIH Problem Statement: SIH260011
 *
 * Displays a citizen-friendly ErrorState screen while logging technical
 * stack traces strictly to developer console.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log technical error details strictly to developer console
    console.error('CivicAI ErrorBoundary caught an unexpected error:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{ padding: 'var(--space-8) var(--space-4)', display: 'flex', justifyContent: 'center' }}>
          <ErrorState
            title="Application Error"
            description="We encountered an unexpected problem loading this section. Please refresh or try again."
            onRetry={this.handleReload}
            retryText="Reload Application"
          />
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
