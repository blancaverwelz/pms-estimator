import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { intervalsFor, vehicleLabel } from "../../lib/estimate.js";

export default function MileageStep({
  headingRef,
  vehicle,
  selected,
  onSelect,
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
        Choose service interval
      </h2>
      <p className="mb-6 mt-1 text-sm text-mute sm:text-base">
        Select your current service interval for your {vehicleLabel(vehicle)}.
      </p>
      <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {intervalsFor(vehicle).map((km) => {
          const isSelected = selected === km;
          return (
            <motion.button
              key={km}
              type="button"
              aria-pressed={isSelected}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(km)}
              className={`surface flex min-h-28 flex-col items-center justify-center gap-1 rounded-2xl border-2 px-3 py-5 transition-colors ${
                isSelected
                  ? "border-accent"
                  : "border-edge hover:border-accent/70"
              }`}
            >
              <Gauge
                size={18}
                className="mb-1 text-accent"
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-white">
                {km.split(" ")[0]}
              </span>
              <span className="text-xs text-mute">KM Service</span>
            </motion.button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 rounded-lg px-1 text-sm text-mute transition-colors hover:text-white"
        >
          ← Back to vehicle
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
  );
}
