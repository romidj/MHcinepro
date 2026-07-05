import {NextResponse} from 'next/server'

import {client} from '@/sanity/lib/client'
import {PROJECTS_COUNT_QUERY, PROJECTS_PAGE_QUERY} from '@/sanity/lib/queries'
import type {ProjectArchiveItem, ProjectCategory} from '@/sanity/lib/types'

const CATEGORIES: ProjectCategory[] = ['all', 'mariage', 'nature', 'evenement', 'autre']
const MAX_PAGE_SIZE = 20

function isProjectCategory(value: string): value is ProjectCategory {
  return CATEGORIES.includes(value as ProjectCategory)
}

function parseIndex(value: string | null, fallback: number) {
  if (value === null) return fallback

  const parsed = Number(value)
  return Number.isInteger(parsed) ? parsed : Number.NaN
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const categoryParam = searchParams.get('category') ?? 'all'
  const start = parseIndex(searchParams.get('start'), 0)
  const end = parseIndex(searchParams.get('end'), MAX_PAGE_SIZE)

  if (!isProjectCategory(categoryParam)) {
    return NextResponse.json({message: 'Categorie invalide'}, {status: 400})
  }

  if (start < 0 || end <= start || end - start > MAX_PAGE_SIZE) {
    return NextResponse.json({message: 'Pagination invalide'}, {status: 400})
  }

  const params = {
    category: categoryParam,
    start,
    end,
  }

  const [projects, total] = await Promise.all([
    client.fetch<ProjectArchiveItem[]>(PROJECTS_PAGE_QUERY, params),
    client.fetch<number>(PROJECTS_COUNT_QUERY, params),
  ])

  return NextResponse.json({projects, total})
}
