import { Car, Gauge, Pencil } from "lucide-react";
import { vehicleLabel } from "../lib/estimate.js";

function Chip({ Icon, text, onEdit, editLabel }) {
  return (
    <div className="flex min-h-11 items-center gap-2 rounded-xl border border-edge bg-ink-800/80 pl-3 pr-1">
      <Icon size={16} className="shrink-0 text-accent" aria-hidden="true" />
      <span className="text-sm font-medium text-white">{text}</span>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={editLabel}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-mute transition-colors hover:text-accent"
        >
          <Pencil size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default function SelectionBar({ vehicle, interval, onEditVehicle, onEditInterval }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2.5">
      {vehicle && <Chip Icon={Car} text={vehicleLabel(vehicle)} onEdit={onEditVehicle} editLabel="Change vehicle" />}
      {interval && <Chip Icon={Gauge} text={`${interval} service`} onEdit={onEditInterval} editLabel="Change service interval" />}
    </div>
  );
}
