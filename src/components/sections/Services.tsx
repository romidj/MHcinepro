import type {ServicesBackground} from '@/sanity/lib/types'

const services = [
  {
    title: 'تصوير مناسبات',
    copy: 'Donnez une nouvelle dimension à votre projet. Nous réalisons vos moments avec une image élégante et précise.',
    className: 'md:col-start-3 md:row-start-1 md:text-right',
  },
  {
    title: 'رواية بصرية',
    copy: 'Donnez une nouvelle dimension à vos projets grâce à nos prises de vues aériennes 4K par drone.',
    className: 'md:col-start-3 md:row-start-2 md:text-right',
  },
  {
    title: 'تحرير مقابلات، قصص حقيقية',
    copy: 'Interviews, reportages et captations sur le terrain pour raconter des histoires vraies avec authenticité, émotion et impact.',
    className: 'md:col-start-1 md:row-start-3',
  },
  {
    title: 'تحريك احترافي',
    copy: 'Transformer une simple captation en véritable expérience cinématographique.',
    className: 'md:col-start-3 md:row-start-3 md:text-right',
  },
]

export function Services({background}: {background: ServicesBackground}) {
  const videoUrl = background?.videos?.[0]?.videoFile?.asset?.url

  return (
    <section id="services" className="relative min-h-[720px] overflow-hidden bg-brand-black py-16 md:py-20">
      {videoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96),rgba(0,0,0,0.42),rgba(0,0,0,0.78)),radial-gradient(circle_at_48%_58%,rgba(255,118,24,0.24),transparent_30%),radial-gradient(circle_at_58%_58%,rgba(40,74,83,0.42),transparent_28%)]" />
      )}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.88),rgba(0,0,0,0.18)_30%,rgba(0,0,0,0.18)_70%,rgba(0,0,0,0.9))]" />
      <div className="section-shell relative">
        <h2 className="cinema-heading text-5xl text-white md:text-6xl">Nos services</h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:grid-rows-3 md:gap-x-12 md:gap-y-14">
          {services.map((service) => (
            <article key={service.title} className={service.className}>
              <h3 className="text-2xl font-black leading-tight text-white md:text-3xl">{service.title}</h3>
              <p className="mt-3 max-w-[320px] text-sm leading-6 text-white/86 md:ml-auto">{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
