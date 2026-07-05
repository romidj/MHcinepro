import { CameraViewer } from '@/components/three/CameraViewer'

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-black"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_78%_45%,rgba(255,214,10,0.12),transparent_31%),radial-gradient(circle_at_24%_18%,rgba(10,68,120,0.18),transparent_30%)]" />

      <div className="section-shell relative grid min-h-[620px] items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">

        {/* LEFT */}
        <div className="flex h-full flex-col justify-center gap-4">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-yellow">
            MH CinePro
          </p>

          <p className="text-3xl font-black leading-none text-white md:text-4xl">
            نُجَدِّد لَحظاتِكُم
          </p>

          <h1 className="text-[clamp(3.5rem,5.5vw,6rem)] leading-[0.92] text-white">
            MH CINEPRO
          </h1>

          <p className="max-w-xl text-lg leading-8 text-white/75 md:text-xl">
            بأبعاد سينمائية
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex h-full items-center justify-center">

          <div className="relative w-full max-w-[680px]">
            <CameraViewer />
          </div>

        </div>

      </div>
    </section>
  )
}