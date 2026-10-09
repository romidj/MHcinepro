import Image from 'next/image'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,214,10,0.12),transparent_31%),radial-gradient(circle_at_24%_18%,rgba(10,68,120,0.18),transparent_30%)]" />

      <div className="section-shell relative grid min-h-[620px] items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div className="flex h-full flex-col justify-center gap-5">
          <h1 className="max-w-2xl text-4xl font-black leading-[1.05] text-white md:text-6xl">
            Production Audiovisuelle &amp; Cinématographique en Algérie
          </h1>

          <p className="max-w-2xl font-display text-xl uppercase leading-tight tracking-[0.08em] text-brand-yellow md:text-2xl">
            Films Documentaires · Podcasts · Vidéo · Drone · Photographie
          </p>

          <p className="max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
            MH CINEPRO réalise vos projets audiovisuels : films documentaires,
            podcasts, vidéos professionnelles, reportages, captation d’événements,
            photographie et prises de vue aériennes par drone. De la conception à la
            post-production, nous donnons vie à vos idées en Algérie.
          </p>
        </div>

        <div className="flex h-full items-center justify-center">
          <Image
            src="/images/logo_mh.png"
            alt="MH CinePro"
            width={640}
            height={640}
            priority
            className="h-auto w-full max-w-[520px] object-contain"
          />
        </div>
      </div>
    </section>
  )
}
