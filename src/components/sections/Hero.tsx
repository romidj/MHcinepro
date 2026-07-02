import {CameraViewer} from '@/components/three/CameraViewer'

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-black pb-16 pt-10 md:min-h-[640px] md:pb-20 md:pt-14"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,214,10,0.12),transparent_31%),radial-gradient(circle_at_24%_18%,rgba(10,68,120,0.18),transparent_30%)] pointer-events-none" />
      <div className="section-shell relative grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 py-10 md:py-0 self-center">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-yellow">MH CinePro</p>
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
        <div className="relative flex min-h-[460px] items-center justify-center md:min-h-[560px]">
          <div className="relative w-full max-w-[640px] rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
            <CameraViewer />
          </div>
        </div>
      </div>
    </section>
  )
}
