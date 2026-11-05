import { ReceiptText } from "lucide-react";
import { peso } from "../lib/estimate.js";

function Row({ label, value, strong }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className={strong ? "text-sm font-medium text-white" : "text-xs leading-relaxed text-mute"}>{label}</dt>
      <dd className={`whitespace-nowrap font-mono ${strong ? "text-sm text-white" : "text-xs text-white/90"}`}>{value}</dd>
    </div>
  );
}

export default function EstimateSummary({ estimate, showItems = true, children }) {
  return (
    <section aria-label="Estimated invoice" className="surface overflow-hidden rounded-2xl border border-edge">
      <h3 className="flex items-center gap-2 border-b border-edge px-5 py-4 text-sm font-semibold text-white">
        <ReceiptText size={16} className="text-accent" aria-hidden="true" />
        Estimated Invoice
      </h3>
      <dl className="space-y-2.5 px-5 py-4">
        {showItems && estimate.pricedItems.map((item) => (
          <Row key={item.name} label={item.name} value={peso(item.cost)} />
        ))}
        <div className={`space-y-2.5 ${showItems ? "border-t border-edge pt-3" : ""}`}>
          <Row label="Parts & Fluids Subtotal" value={peso(estimate.partsTotal)} strong />
          <Row label="Expert Mechanical Labor" value={peso(estimate.labor)} strong />
          <Row label="Shop Supplies & Disposal" value={peso(estimate.shopFee)} strong />
        </div>
      </dl>
      <div className="mx-5 mb-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3.5">
        <p className="text-xs text-mute">Total Estimate</p>
        <p className="font-mono text-2xl font-bold tracking-tight text-accent sm:text-[28px]" aria-label={`Total estimate ${peso(estimate.total)}`}>
          {peso(estimate.total)}
        </p>
        <p className="mt-0.5 text-xs text-mute">Inclusive of all parts &amp; labor</p>
      </div>
      <p className="mx-5 mb-4 text-xs leading-relaxed text-mute">
        Prices are estimates only. Final quote confirmed upon vehicle inspection.
      </p>
      {children && <div className="px-5 pb-5">{children}</div>}
    </section>
  );
}
