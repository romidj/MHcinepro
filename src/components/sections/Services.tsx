import { VideoBackground } from '@/components/sections/VideoBackground'
import type { ServicesBackground } from '@/sanity/lib/types'



export function Services({ background }: { background: ServicesBackground }) {
  const hasVideo = Boolean(background?.videos?.some((video) => video.videoFile?.asset?.url))

  return (
    <section id="services" className="relative min-h-[720px] overflow-hidden bg-brand-black py-16 md:py-20">
      {hasVideo ? (
        <VideoBackground background={background} />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96),rgba(0,0,0,0.42),rgba(0,0,0,0.78)),radial-gradient(circle_at_48%_58%,rgba(255,118,24,0.24),transparent_30%),radial-gradient(circle_at_58%_58%,rgba(40,74,83,0.42),transparent_28%)]" />
      )}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.88),rgba(0,0,0,0.18)_30%,rgba(0,0,0,0.18)_70%,rgba(0,0,0,0.9))]" />
      <div className="section-shell relative">
        <h1 className="max-w-3xl text-xl font-black leading-[1.08] text-white md:text-4xl">
          MH CINEPRO
        </h1>
        <p className="max-w-2xl font-bold text-sm uppercase leading-tight tracking-[0.08em] text-brand-yellow md:text-xl">
          Raconte des Histoires qui vous ressemblent !
        </p>
        <p className="max-w-xl text-sm leading-6 text-white/75 md:text-lg md:leading-8">
          Des instants authentiques, des émotions sincères et des images pensées pour marquer les esprits.
        </p>

      </div>
    </section>
  )
}
