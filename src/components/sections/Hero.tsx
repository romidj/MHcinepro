import Image from 'next/image'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,214,10,0.12),transparent_31%),radial-gradient(circle_at_24%_18%,rgba(10,68,120,0.18),transparent_30%)]" />

      <div className="section-shell relative grid min-h-[620px] items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div className="flex h-full flex-col justify-center gap-5">
          <h1 className="max-w-3xl text-3xl font-black leading-[1.08] text-white md:text-5xl">
            Votre Partenaire Audiovisuel en Algérie
          </h1>

          <p className="max-w-4xl font-bold text-sm uppercase leading-tight tracking-[0.08em] text-brand-yellow md:text-xl">
            Documentaires · Podcasts · Vidéo · Drone · Photographie
          </p>

          <p className="max-w-xl text-sm leading-6 text-white/75 md:text-lg md:leading-8">
            MH CINEPRO réalise vos projets audiovisuels . De la conception à la
            post-production, nous donnons vie à vos idées en Algérie.
          </p>
        </div>
        <div className="flex h-full items-center justify-center self-center">

          <Image
            src="/images/logo_mh_hero.png"
            alt="MH CinePro"
            width={500}
            height={500}
            priority
            className="h-auto w-full max-w-[390px] object-contain"
          />
        </div>
      </div>
    </section>
  )
}
