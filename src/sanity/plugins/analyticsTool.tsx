'use client'

import {BarChartIcon} from '@sanity/icons'
import {definePlugin} from 'sanity'
import {useEffect, useState} from 'react'

type SummaryItem = {
  label: string
  count: number
}

type AnalyticsSummary = {
  todayPageViews: number
  last7DaysPageViews: number
  totalPageViews: number
  days: {
    date: string
    pageViews: number
  }[]
  topPages: SummaryItem[]
  topEvents: SummaryItem[]
}

function formatEventName(name: string) {
  return name.replace(/[_:-]/g, ' ')
}

function MetricCard({label, value}: {label: string; value: number}) {
  return (
    <div style={{border: '1px solid #2f2f2f', padding: 20, background: '#151515'}}>
      <div style={{color: '#a0a0a0', fontSize: 13, marginBottom: 8}}>{label}</div>
      <div style={{color: '#fff', fontSize: 34, fontWeight: 800}}>{value.toLocaleString('fr-FR')}</div>
    </div>
  )
}

function AnalyticsTool() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    fetch('/api/analytics/summary')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Impossible de charger les analytiques')
        }

        return response.json() as Promise<AnalyticsSummary>
      })
      .then((data) => {
        if (mounted) setSummary(data)
      })
      .catch(() => {
        if (mounted) setError('Les statistiques ne sont pas disponibles pour le moment.')
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div style={{minHeight: '100%', background: '#0f0f0f', color: '#fff', padding: 32}}>
      <div style={{maxWidth: 1100, margin: '0 auto'}}>
        <p style={{color: '#ffd60a', fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase'}}>
          MH CinePro
        </p>
        <h1 style={{fontSize: 44, lineHeight: 1, margin: '12px 0 8px'}}>Analytiques</h1>
        <p style={{color: '#b5b5b5', maxWidth: 620, lineHeight: 1.6}}>
          Vue simple des visites du site. Ces donnees sont agregees par jour et ne stockent aucune information
          personnelle.
        </p>

        {error ? (
          <div style={{border: '1px solid #593030', background: '#241515', color: '#ffb5b5', marginTop: 28, padding: 20}}>
            {error}
          </div>
        ) : null}

        {!summary && !error ? (
          <div style={{color: '#b5b5b5', marginTop: 28}}>Chargement des statistiques...</div>
        ) : null}

        {summary ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                marginTop: 28,
              }}
            >
              <MetricCard label="Pages vues aujourd'hui" value={summary.todayPageViews} />
              <MetricCard label="Pages vues sur 7 jours" value={summary.last7DaysPageViews} />
              <MetricCard label="Pages vues sur 30 jours" value={summary.totalPageViews} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20,
                marginTop: 24,
              }}
            >
              <section style={{border: '1px solid #2f2f2f', background: '#151515', padding: 20}}>
                <h2 style={{fontSize: 18, margin: '0 0 16px'}}>Pages les plus vues</h2>
                {summary.topPages.length ? (
                  summary.topPages.map((item) => (
                    <div
                      key={item.label}
                      style={{display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderTop: '1px solid #292929'}}
                    >
                      <span style={{color: '#d9d9d9'}}>{item.label}</span>
                      <strong>{item.count.toLocaleString('fr-FR')}</strong>
                    </div>
                  ))
                ) : (
                  <p style={{color: '#9b9b9b'}}>Aucune page vue pour le moment.</p>
                )}
              </section>

              <section style={{border: '1px solid #2f2f2f', background: '#151515', padding: 20}}>
                <h2 style={{fontSize: 18, margin: '0 0 16px'}}>Événements</h2>
                {summary.topEvents.length ? (
                  summary.topEvents.map((item) => (
                    <div
                      key={item.label}
                      style={{display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderTop: '1px solid #292929'}}
                    >
                      <span style={{color: '#d9d9d9', textTransform: 'capitalize'}}>{formatEventName(item.label)}</span>
                      <strong>{item.count.toLocaleString('fr-FR')}</strong>
                    </div>
                  ))
                ) : (
                  <p style={{color: '#9b9b9b'}}>Aucun événement pour le moment.</p>
                )}
              </section>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export const analyticsTool = definePlugin({
  name: 'analytics-tool',
  tools: [
    {
      name: 'analytics',
      title: 'Analytiques',
      icon: BarChartIcon,
      component: AnalyticsTool,
    },
  ],
})
