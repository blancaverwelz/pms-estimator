import { motion } from "framer-motion";
import {
  CalendarDays,
  Droplets,
  Wrench,
  ShieldCheck,
  Wind,
  Check,
  Search,
} from "lucide-react";
import EstimateSummary from "../../components/EstimateSummary.jsx";
import { vehicleLabel } from "../../lib/estimate.js";

const CATEGORY_ICON = {
  Fluids: Droplets,
  Parts: Wrench,
  "Safety Inspection": ShieldCheck,
};

export default function EstimateStep({
  headingRef,
  vehicle,
  interval,
  estimate,
  onBook,
  onBack,
  onRestart,
}) {
  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-semibold tracking-tight text-white outline-none sm:text-3xl"
      >
        Review &amp; estimate
      </h2>
      <p className="mb-6 mt-1 text-sm text-mute sm:text-base">
        {vehicleLabel(vehicle)} · {interval} service
      </p>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="min-w-0 flex-1 space-y-6 max-lg:order-2">
          {estimate.groups.map(({ category, items }) => {
            const CatIcon = CATEGORY_ICON[category] || Wind;
            return (
              <section key={category} aria-label={category}>
                <h3 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mute">
                  <CatIcon size={14} aria-hidden="true" /> {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: Math.min(i, 6) * 0.03,
                      }}
                      className="surface flex items-center gap-3 rounded-xl border border-edge p-3.5"
                    >
                      {item.type === "Replace" ? (
                        <Check
                          size={16}
                          className="shrink-0 text-accent"
                          aria-hidden="true"
                        />
                      ) : (
                        <Search
                          size={16}
                          className="shrink-0 text-mute"
                          aria-hidden="true"
                        />
                      )}
                      <span className="flex-1 text-sm leading-relaxed text-white">
                        {item.name}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.type === "Replace" ? "bg-accent/15 text-accent" : "bg-white/10 text-mute"}`}
                      >
                        {item.type}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            );
          })}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={onBack}
              className="min-h-11 rounded-lg px-1 text-sm text-mute transition-colors hover:text-white"
            >
              ← Change service interval
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="min-h-11 rounded-lg border border-edge/80 px-3 text-sm text-mute transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-white"
            >
              Reset from the start
            </button>
          </div>
        </div>

        <div className="w-full shrink-0 max-lg:order-1 lg:sticky lg:top-6 lg:w-88">
          <EstimateSummary estimate={estimate}>
            <button
              type="button"
              onClick={onBook}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold text-ink-950 transition-colors hover:bg-accent/85"
            >
              <CalendarDays size={17} aria-hidden="true" /> Continue to booking
            </button>
          </EstimateSummary>
        </div>
      </div>
    </div>
  );
}
