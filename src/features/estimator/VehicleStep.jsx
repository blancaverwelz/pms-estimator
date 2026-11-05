import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import Artwork from "../../components/Artwork.jsx";
import { VEHICLE_TYPES } from "../../data/serviceCatalog.js";
import sedanDesktop from "../../assets/vehicles/sedan-desktop.webp";
import sedanMobile from "../../assets/vehicles/sedan-mobile.webp";
import suvDesktop from "../../assets/vehicles/suv-desktop.webp";
import suvMobile from "../../assets/vehicles/suv-mobile.webp";

const ART = {
  Sedan: {
    desktop: sedanDesktop,
    mobile: { src: sedanMobile, width: 640, height: 400 },
    width: 940,
    height: 588,
  },
  SUV: {
    desktop: suvDesktop,
    mobile: { src: suvMobile, width: 640, height: 398 },
    width: 940,
    height: 584,
  },
};

export default function VehicleStep({ headingRef, selected, onSelect }) {
  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-semibold tracking-tight text-white outline-none sm:text-3xl"
      >
        Select your vehicle
      </h2>
      <p className="mb-6 mt-1 text-sm text-mute sm:text-base">
        Choose a category to get started.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {VEHICLE_TYPES.map(({ id, label, sub }) => {
          const isSelected = selected === id;
          return (
            <motion.button
              key={id}
              type="button"
              aria-pressed={isSelected}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(id)}
              className={`group relative block cursor-pointer overflow-hidden rounded-2xl border-2 bg-ink-900 text-left transition-[border-color,box-shadow] duration-200 ${
                isSelected
                  ? "border-accent shadow-[0_0_28px_-8px_rgba(0,217,232,0.7)]"
                  : "border-edge hover:shadow-[0_0_32px_-6px_rgba(0,217,232,0.55)]"
              }`}
            >
              <Artwork {...ART[id]} alt="" />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950 via-ink-950/70 to-transparent"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <span>
                  <span className="block text-lg font-semibold text-white sm:text-xl">
                    {label}
                  </span>
                  <span className="block text-sm text-mute">{sub}</span>
                </span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-accent bg-accent text-ink-950" : "border-white/30 bg-ink-950/60 text-white group-hover:border-accent group-hover:text-accent"}`}
                >
                  {isSelected ? (
                    <Check size={18} aria-hidden="true" />
                  ) : (
                    <ChevronRight size={18} aria-hidden="true" />
                  )}
                </span>
              </span>
              {isSelected && <span className="sr-only">Selected</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
