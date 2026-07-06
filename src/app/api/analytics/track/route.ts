import {NextResponse} from 'next/server'

import {analyticsWriteClient, assertAnalyticsWriteToken} from '@/sanity/lib/writeClient'

type AnalyticsCounter = {
  _key?: string
  path?: string
  name?: string
  count?: number
}

type AnalyticsDailyDocument = {
  _id: string
  _type: 'analyticsDaily'
  date: string
  pageViews?: number
  pages?: AnalyticsCounter[]
  events?: AnalyticsCounter[]
}

const EVENT_NAME_PATTERN = /^[a-z0-9_:-]{1,64}$/
const MAX_PATH_LENGTH = 160

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function safePath(value: unknown) {
  if (typeof value !== 'string') return '/'
  if (!value.startsWith('/')) return '/'

  return value.slice(0, MAX_PATH_LENGTH)
}

function safeEvent(value: unknown) {
  if (typeof value !== 'string') return null
  if (!EVENT_NAME_PATTERN.test(value)) return null

  return value
}

function incrementCounter(
  counters: AnalyticsCounter[] | undefined,
  keyName: 'path' | 'name',
  keyValue: string
) {
  const nextCounters = [...(counters ?? [])]
  const counter = nextCounters.find((item) => item[keyName] === keyValue)

  if (counter) {
    counter.count = (counter.count ?? 0) + 1
    return nextCounters
  }

  nextCounters.push({
    _key: `${keyName}-${keyValue.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`.slice(0, 80),
    [keyName]: keyValue,
    count: 1,
  })

  return nextCounters
}

export async function POST(request: Request) {
  try {
    assertAnalyticsWriteToken()

    const body = (await request.json()) as {event?: unknown; path?: unknown}
    const event = safeEvent(body.event)
    const path = safePath(body.path)

    if (!event) {
      return NextResponse.json({message: 'Evenement invalide'}, {status: 400})
    }

    if (path.startsWith('/studio') || path.startsWith('/api')) {
      return NextResponse.json({ok: true, skipped: true})
    }

    const date = todayKey()
    const documentId = `analyticsDaily-${date}`
    const existing = await analyticsWriteClient.fetch<AnalyticsDailyDocument | null>(
      `*[_id == $documentId][0]{
        _id,
        _type,
        date,
        pageViews,
        pages,
        events
      }`,
      {documentId}
    )

    const nextDocument: AnalyticsDailyDocument = {
      _id: documentId,
      _type: 'analyticsDaily',
      date,
      pageViews: (existing?.pageViews ?? 0) + (event === 'page_view' ? 1 : 0),
      pages:
        event === 'page_view'
          ? incrementCounter(existing?.pages, 'path', path)
          : (existing?.pages ?? []),
      events: incrementCounter(existing?.events, 'name', event),
    }

    await analyticsWriteClient.createOrReplace(nextDocument)

    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('Analytics tracking failed', error)
    return NextResponse.json({message: 'Erreur analytics'}, {status: 500})
  }
}
