import {Footer} from '@/components/layout/footer'
import {Navbar} from '@/components/layout/navbar'
import {Contact} from '@/components/sections/Contact'
import {Gallery} from '@/components/sections/Gallery'
import {Hero} from '@/components/sections/Hero'
import {Projects} from '@/components/sections/Projects'
import {Services} from '@/components/sections/Services'
import {client} from '@/sanity/lib/client'
import {
  LATEST_GALLERY_IMAGES_QUERY,
  LATEST_PROJECTS_QUERY,
  SERVICES_BACKGROUND_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries'
import type {GalleryPreview, ProjectPreview, ServicesBackground, SiteSettings} from '@/sanity/lib/types'

export const revalidate = 60

export default async function Home() {
  const [projects, galleryImages, siteSettings, serviceBackground] = await Promise.all([
    client.fetch<ProjectPreview[]>(LATEST_PROJECTS_QUERY),
    client.fetch<GalleryPreview[]>(LATEST_GALLERY_IMAGES_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
    client.fetch<ServicesBackground>(SERVICES_BACKGROUND_QUERY),
  ])

  return (
    <div className="min-h-screen bg-brand-black text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services background={serviceBackground} />
        <Projects projects={projects} />
        <Gallery images={galleryImages} />
        <Contact settings={siteSettings} />
      </main>
      <Footer settings={siteSettings} />
    </div>
  )
}
