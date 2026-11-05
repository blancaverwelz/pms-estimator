import { useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import Brand from "../../components/Brand.jsx";
import Hero from "../../components/Hero.jsx";
import SelectionBar from "../../components/SelectionBar.jsx";
import StepProgress from "../../components/StepProgress.jsx";
import { EMPTY_DRAFT } from "../../lib/bookingValidation.js";
import { buildEstimate } from "../../lib/estimate.js";
import BookingStep from "./BookingStep.jsx";
import EstimateStep from "./EstimateStep.jsx";
import MileageStep from "./MileageStep.jsx";
import ThankYouStep from "./ThankYouStep.jsx";
import VehicleStep from "./VehicleStep.jsx";

const VEHICLE = 1,
  MILEAGE = 2,
  ESTIMATE = 3,
  BOOKING = 4,
  THANKS = 5;

export default function Estimator() {
  const [step, setStep] = useState(VEHICLE);
  const [vehicle, setVehicle] = useState(null);
  const [interval, setIntervalKm] = useState(null);
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  const headingRef = useRef(null);
  const mounted = useRef(false);

  // Move focus to the new step's heading after navigation (not on first load).
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const estimate = useMemo(
    () => (vehicle && interval ? buildEstimate(vehicle, interval) : null),
    [vehicle, interval],
  );

  const restart = () => {
    setVehicle(null);
    setIntervalKm(null);
    setDraft(EMPTY_DRAFT);
    setStep(VEHICLE);
  };

  const showBar = step >= MILEAGE && step <= BOOKING;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-ink-950">
        {step === VEHICLE ? (
          <Hero />
        ) : (
          <header className="border-b border-edge bg-ink-950 px-5 py-5 sm:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-7xl">
              <Brand />
              <h1 className="sr-only">UnReal Auto Center service estimator</h1>
            </div>
          </header>
        )}

        <main className="env-bg px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[min(80%,80rem)] flex-col">
            <StepProgress current={step} />
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-8"
            >
              {showBar && (
                <SelectionBar
                  vehicle={vehicle}
                  interval={step >= ESTIMATE ? interval : null}
                  onEditVehicle={() => setStep(VEHICLE)}
                  onEditInterval={() => setStep(MILEAGE)}
                />
              )}
              {step === VEHICLE && (
                <VehicleStep
                  headingRef={headingRef}
                  selected={vehicle}
                  onSelect={(id) => {
                    setVehicle(id);
                    setStep(MILEAGE);
                  }}
                />
              )}
              {step === MILEAGE && (
                <MileageStep
                  headingRef={headingRef}
                  vehicle={vehicle}
                  selected={interval}
                  onSelect={(km) => {
                    setIntervalKm(km);
                    setStep(ESTIMATE);
                  }}
                  onBack={() => setStep(VEHICLE)}
                  onRestart={restart}
                />
              )}
              {step === ESTIMATE && estimate && (
                <EstimateStep
                  headingRef={headingRef}
                  vehicle={vehicle}
                  interval={interval}
                  estimate={estimate}
                  onBook={() => setStep(BOOKING)}
                  onBack={() => setStep(MILEAGE)}
                  onRestart={restart}
                />
              )}
              {step === BOOKING && estimate && (
                <BookingStep
                  headingRef={headingRef}
                  draft={draft}
                  onDraftChange={setDraft}
                  estimate={estimate}
                  onBack={() => setStep(ESTIMATE)}
                  onComplete={() => setStep(THANKS)}
                  onRestart={restart}
                />
              )}
              {step === THANKS && estimate && (
                <ThankYouStep
                  headingRef={headingRef}
                  vehicle={vehicle}
                  interval={interval}
                  date={draft.date}
                  estimate={estimate}
                  onRestart={restart}
                />
              )}
            </motion.div>

            <p className="mt-10 text-sm text-mute">
              Prices are estimates only. Final quote confirmed upon vehicle
              inspection.
            </p>
          </div>
        </main>
      </div>
      <footer className="mt-8 border-t border-edge/60 pt-6 text-center text-xs text-dim">
        <p>© 2026 UnReal Auto Center. All rights reserved.</p>
        <p className="mt-1">
          Designed &amp; Developed by{" "}
          <a
            href="https://blancaver-studios.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mute transition-colors hover:text-accent"
          >
            Blancaver Studios
          </a>
          .
        </p>
      </footer>
      ;
    </MotionConfig>
  );
}
