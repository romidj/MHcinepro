import 'server-only'

import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

const token = process.env.SANITY_ANALYTICS_WRITE_TOKEN

export const analyticsWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

export function assertAnalyticsWriteToken() {
  if (!token) {
    throw new Error('Missing environment variable: SANITY_ANALYTICS_WRITE_TOKEN')
  }
}
