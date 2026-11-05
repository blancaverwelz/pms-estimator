import { Wrench } from "lucide-react";

export default function Brand({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Wrench size={22} className="text-accent" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white sm:text-sm">
        UnReal Auto Center
      </span>
    </div>
  );
}
