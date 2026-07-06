import {NextResponse} from 'next/server'

import {client} from '@/sanity/lib/client'

type AnalyticsCounter = {
  path?: string
  name?: string
  count?: number
}

type AnalyticsDailyDocument = {
  date: string
  pageViews?: number
  pages?: AnalyticsCounter[]
  events?: AnalyticsCounter[]
}

function mergeCounters(
  docs: AnalyticsDailyDocument[],
  collection: 'pages' | 'events',
  keyName: 'path' | 'name'
) {
  const totals = new Map<string, number>()

  docs.forEach((doc) => {
    doc[collection]?.forEach((item) => {
      const key = item[keyName]
      if (!key) return

      totals.set(key, (totals.get(key) ?? 0) + (item.count ?? 0))
    })
  })

  return Array.from(totals.entries())
    .map(([label, count]) => ({label, count}))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
}

export async function GET() {
  const docs = await client.withConfig({useCdn: false}).fetch<AnalyticsDailyDocument[]>(
    `*[_type == "analyticsDaily"] | order(date desc)[0...30]{
      date,
      pageViews,
      pages,
      events
    }`
  )

  const totalPageViews = docs.reduce((sum, doc) => sum + (doc.pageViews ?? 0), 0)
  const last7Days = docs.slice(0, 7)
  const last7DaysPageViews = last7Days.reduce((sum, doc) => sum + (doc.pageViews ?? 0), 0)

  return NextResponse.json({
    totalPageViews,
    last7DaysPageViews,
    todayPageViews: docs[0]?.pageViews ?? 0,
    days: docs
      .map((doc) => ({
        date: doc.date,
        pageViews: doc.pageViews ?? 0,
      }))
      .reverse(),
    topPages: mergeCounters(docs, 'pages', 'path'),
    topEvents: mergeCounters(docs, 'events', 'name'),
  })
}
