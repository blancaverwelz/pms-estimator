import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CalendarDays, Loader2 } from "lucide-react";
import EstimateSummary from "../../components/EstimateSummary.jsx";
import {
  toLocalISODate,
  validateBooking,
} from "../../lib/bookingValidation.js";

const FIELD =
  "min-h-12 w-full rounded-xl border bg-ink-900/90 px-4 text-base text-white placeholder:text-dim";

function Field({ id, label, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function BookingStep({
  headingRef,
  draft,
  onDraftChange,
  estimate,
  onBack,
  onComplete,
  onRestart,
}) {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const timerRef = useRef(null);
  const refs = { name: useRef(null), mobile: useRef(null), date: useRef(null) };
  const reduceMotion = useReducedMotion();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const update = (key) => (e) => {
    onDraftChange({ ...draft, [key]: e.target.value });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const found = validateBooking(draft);
    setErrors(found);
    const firstInvalid = ["name", "mobile", "date"].find((k) => found[k]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }

    // Frontend-only: nothing is transmitted, logged or stored.
    submittingRef.current = true;
    setSubmitting(true);
    timerRef.current = setTimeout(onComplete, reduceMotion ? 0 : 600);
  };

  const describe = (key, hasHint) =>
    errors[key]
      ? `${key === "date" ? "date" : key}-error`
      : hasHint
        ? `${key}-hint`
        : undefined;

  const fieldClass = (key) =>
    `${FIELD} ${errors[key] ? "border-[#ff8a8a]" : "border-edge hover:border-accent/60"}`;

  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-semibold tracking-tight text-white outline-none sm:text-3xl"
      >
        Request a booking
      </h2>
      <p className="mb-6 mt-1 text-sm text-mute sm:text-base">
        Tell us who you are and when you’d like to come in.
      </p>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="surface min-w-0 flex-1 space-y-5 rounded-2xl border border-edge p-5 sm:p-7"
        >
          <Field id="name" label="Full name" error={errors.name}>
            <input
              id="name"
              ref={refs.name}
              type="text"
              autoComplete="name"
              value={draft.name}
              onChange={update("name")}
              disabled={submitting}
              placeholder="Juan Dela Cruz"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describe("name", false)}
              className={fieldClass("name")}
            />
          </Field>
          <Field id="mobile" label="Mobile number" error={errors.mobile}>
            <input
              id="mobile"
              ref={refs.mobile}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={draft.mobile}
              onChange={update("mobile")}
              disabled={submitting}
              placeholder="0917 123 4567"
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={describe("mobile", false)}
              className={fieldClass("mobile")}
            />
          </Field>
          <Field
            id="date"
            label="Preferred date"
            hint="A preferred date is a request, not a confirmed appointment."
            error={errors.date}
          >
            <input
              id="date"
              ref={refs.date}
              type="date"
              min={toLocalISODate()}
              value={draft.date}
              onChange={update("date")}
              disabled={submitting}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={describe("date", true)}
              className={fieldClass("date")}
            />
          </Field>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <button
                type="button"
                onClick={onBack}
                disabled={submitting}
                className="min-h-11 rounded-lg px-1 text-left text-sm text-mute transition-colors hover:text-white disabled:opacity-50"
              >
                ← Back to estimate
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="min-h-11 rounded-lg border border-edge/80 px-3 text-sm text-mute transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-white"
              >
                Reset from the start
              </button>
            </div>
            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-ink-950 transition-colors hover:bg-accent/85 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin motion-reduce:animate-none"
                    aria-hidden="true"
                  />{" "}
                  Submitting…
                </>
              ) : (
                <>
                  <CalendarDays size={17} aria-hidden="true" /> Submit request
                </>
              )}
            </button>
          </div>
        </form>

        <div className="w-full shrink-0 lg:sticky lg:top-6 lg:w-88">
          <EstimateSummary estimate={estimate} showItems={false} />
        </div>
      </div>
    </div>
  );
}
