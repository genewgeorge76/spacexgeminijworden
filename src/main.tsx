import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { AuthProvider } from './lib/auth-context'
import { initSentry, Sentry } from './lib/sentry'
import { initWebVitals } from './lib/webVitals'
import './index.css'

// Bootstrap error reporting before anything else renders so we capture
// failures inside React mount, the router, and the auth provider.
initSentry()
// Real-user performance metrics (LCP, INP, CLS, FCP, TTFB).
initWebVitals()

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Sentry.ErrorBoundary fallback={<div style={{ padding: 24 }}>Something went wrong. Please refresh.</div>}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Sentry.ErrorBoundary>
    </StrictMode>,
  )
}
