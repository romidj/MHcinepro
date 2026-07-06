type AnalyticsPayload = {
  path?: string
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return

  const path = payload.path ?? window.location.pathname

  if (path.startsWith('/studio') || path.startsWith('/api')) return

  void fetch('/api/analytics/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({event, path}),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the visitor experience.
  })
}
