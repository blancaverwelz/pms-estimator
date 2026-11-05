import Artwork from "./Artwork.jsx";
import Brand from "./Brand.jsx";
import heroDesktop from "../assets/vehicles/hero-desktop.webp";
import heroMobile from "../assets/vehicles/hero-mobile.webp";

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-ink-950">
      {/* Overlay: brand top-left, headline vertically centered on the left */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
        <div className="pointer-events-auto px-5 pt-6 sm:px-8 lg:px-10 xl:px-14">
          <Brand />
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 pb-8 sm:px-8 lg:max-w-[44%] lg:px-10 xl:px-14">
          <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-mute sm:text-xs lg:whitespace-nowrap">
            Automotive Maintenance Estimator
            <span
              className="hidden h-px w-10 bg-accent sm:block"
              aria-hidden="true"
            />
          </p>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Know your
            <span className="block italic text-accent">next service.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-mute sm:text-lg xl:text-xl">
            Clear, itemized maintenance estimates.
          </p>
        </div>
      </div>

      {/* Full-bleed hero image */}
      <div className="w-full">
        <Artwork
          desktop={heroDesktop}
          mobile={{ src: heroMobile, width: 780, height: 506 }}
          mobileQuery="(max-width: 1023px)"
          width={1536}
          height={640}
          priority
        />
      </div>

      {/* Left gradient so type stays readable */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[48%] bg-linear-to-r from-ink-950 via-ink-950/70 to-transparent lg:block"
        aria-hidden="true"
      />

      {/* Shiny sparkles — only over the car / right side of hero */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-b from-transparent to-ink-950 sm:h-32"
        aria-hidden="true"
      >
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${48 + ((i * 11) % 48)}%`,
              top: `${12 + ((i * 17) % 70)}%`,
              animationDelay: `${(i % 7) * 0.55}s`,
              animationDuration: `${2.4 + (i % 5) * 0.45}s`,
              ["--sparkle-scale"]: 0.55 + (i % 4) * 0.2,
            }}
          />
        ))}
      </div>
    </header>
  );
}
