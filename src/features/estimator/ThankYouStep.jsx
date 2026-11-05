import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { formatRequestedDate } from "../../lib/bookingValidation.js";
import { peso, vehicleLabel } from "../../lib/estimate.js";

function Row({ label, value, accent }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <dt className="text-mute">{label}</dt>
      <dd className={`text-right ${accent ? "font-mono text-lg font-bold text-accent" : "font-medium text-white"}`}>{value}</dd>
    </div>
  );
}

export default function ThankYouStep({ headingRef, vehicle, interval, date, estimate, onRestart }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10"
      >
        <CheckCircle2 size={30} className="text-accent" aria-hidden="true" />
      </motion.div>
      <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-bold tracking-tight text-white outline-none sm:text-4xl">Thank you!</h2>
      <p className="mb-7 mt-2 text-base text-mute">Your service estimate is ready.</p>

      <dl className="surface mb-7 w-full space-y-3 rounded-2xl border border-edge p-5 text-left sm:p-6">
        <Row label="Vehicle" value={vehicleLabel(vehicle)} />
        <Row label="Service interval" value={`${interval} service`} />
        <Row label="Requested date" value={formatRequestedDate(date)} />
        <div className="border-t border-edge pt-3">
          <Row label="Total estimate" value={peso(estimate.total)} accent />
        </div>
      </dl>

      <button
        type="button"
        onClick={onRestart}
        className="min-h-12 rounded-xl border border-accent/60 px-6 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
      >
        Start a new estimate
      </button>
    </div>
  );
}
