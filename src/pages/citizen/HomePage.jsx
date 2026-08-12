import { Card, Loader, EmptyState, ErrorState, SuccessState } from '../../components/common'

/**
 * HomePage — Placeholder component for Home route (/) demonstrating core UI foundation.
 */
function HomePage() {
  return (
    <div className="stack-lg">
      <Card variant="elevated" title="CivicAI — System Ready">
        <p>CivicAI frontend design foundation & state components successfully initialized.</p>
      </Card>

      <div className="grid-2">
        <Loader size="md" text="Loading civic services..." />
        <EmptyState
          title="No complaints reported"
          description="You haven't submitted any civic complaints yet."
          actionText="File a Complaint"
          onAction={() => {}}
        />
      </div>

      <div className="grid-2">
        <SuccessState
          title="Verification Complete"
          description="Your identity has been verified successfully."
          actionText="Continue"
          onAction={() => {}}
        />
        <ErrorState
          title="Connection Error"
          description="Unable to connect to the server. Please check your internet connection."
          retryText="Try Again"
          onRetry={() => {}}
        />
      </div>
    </div>
  )
}

export default HomePage
