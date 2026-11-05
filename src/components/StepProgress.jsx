import { Car, Gauge, ReceiptText, CalendarDays, Check } from "lucide-react";

const STEPS = [
  { label: "Vehicle", Icon: Car },
  { label: "Mileage", Icon: Gauge },
  { label: "Estimate", Icon: ReceiptText },
  { label: "Booking", Icon: CalendarDays },
];

export default function StepProgress({ current }) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-start">
        {STEPS.map(({ label, Icon }, i) => {
          const idx = i + 1;
          const done = current > idx;
          const active = current === idx;
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className="flex flex-1 items-start last:flex-none"
            >
              <div className="flex w-16 shrink-0 flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12 ${
                    active
                      ? "border-accent bg-accent/10 text-accent shadow-[0_0_18px_-4px_rgba(0,217,232,0.6)]"
                      : done
                        ? "border-accent/60 bg-accent/10 text-accent"
                        : "border-edge text-dim"
                  }`}
                >
                  {done ? <Check size={18} aria-hidden="true" /> : <Icon size={18} aria-hidden="true" />}
                </span>
                <span className={`text-center text-[11px] leading-tight sm:text-left sm:text-sm ${active ? "text-accent" : done ? "text-white" : "text-dim"}`}>
                  <span className="block font-semibold tabular-nums sm:inline sm:pr-2">{String(idx).padStart(2, "0")}</span>
                  <span className="block font-medium sm:inline">{label}</span>
                  <span className="sr-only">{done ? " (completed)" : active ? " (current step)" : ""}</span>
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-1 mt-5 h-px flex-1 sm:mx-4 sm:mt-6 ${done ? "bg-accent/70" : "bg-edge"}`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
