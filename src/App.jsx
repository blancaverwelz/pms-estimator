import { useState } from "react";
import {
  Car, Truck, ChevronRight, ChevronLeft, Droplets, Wrench,
  ShieldCheck, Zap, Wind, CheckCircle2, AlertCircle,
  ReceiptText, CalendarCheck, Copy, Check
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const DB = {
  Sedan: {
    "10,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-30)", category: "Fluids", type: "Replace", cost: 1850 },
      { name: "Oil Filter", category: "Parts", type: "Replace", cost: 320 },
      { name: "Air Filter Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Tire Pressure & Rotation Check", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Battery Health Test", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Brake System Visual Check", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
    "20,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-30)", category: "Fluids", type: "Replace", cost: 1850 },
      { name: "Oil Filter", category: "Parts", type: "Replace", cost: 320 },
      { name: "Air Filter", category: "Parts", type: "Replace", cost: 680 },
      { name: "Cabin Air Filter", category: "Parts", type: "Replace", cost: 550 },
      { name: "Windshield Washer Fluid Top-Up", category: "Fluids", type: "Replace", cost: 150 },
      { name: "Brake Pad Thickness Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Suspension & Steering Check", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
    "40,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-30)", category: "Fluids", type: "Replace", cost: 1850 },
      { name: "Oil Filter", category: "Parts", type: "Replace", cost: 320 },
      { name: "Air Filter", category: "Parts", type: "Replace", cost: 680 },
      { name: "Cabin Air Filter", category: "Parts", type: "Replace", cost: 550 },
      { name: "Spark Plugs (Iridium Set of 4)", category: "Parts", type: "Replace", cost: 2800 },
      { name: "Brake Fluid Flush (DOT 4)", category: "Fluids", type: "Replace", cost: 1200 },
      { name: "Coolant Top-Up / Flush", category: "Fluids", type: "Replace", cost: 950 },
      { name: "Drive Belt Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Full Brake System Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
    "60,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-30)", category: "Fluids", type: "Replace", cost: 1850 },
      { name: "Oil Filter", category: "Parts", type: "Replace", cost: 320 },
      { name: "Air Filter", category: "Parts", type: "Replace", cost: 680 },
      { name: "Cabin Air Filter", category: "Parts", type: "Replace", cost: 550 },
      { name: "Spark Plugs (Iridium Set of 4)", category: "Parts", type: "Replace", cost: 2800 },
      { name: "Transmission Fluid Flush", category: "Fluids", type: "Replace", cost: 2400 },
      { name: "Brake Fluid Flush (DOT 4)", category: "Fluids", type: "Replace", cost: 1200 },
      { name: "Power Steering Fluid Check", category: "Fluids", type: "Inspect", cost: 0 },
      { name: "Timing Belt / Chain Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Wheel Alignment & Balancing", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
  },
  SUV: {
    "10,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-40)", category: "Fluids", type: "Replace", cost: 2400 },
      { name: "Oil Filter (Heavy Duty)", category: "Parts", type: "Replace", cost: 450 },
      { name: "Air Filter Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "4WD System Check", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Tire Rotation & Pressure Check", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
    "20,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-40)", category: "Fluids", type: "Replace", cost: 2400 },
      { name: "Oil Filter (Heavy Duty)", category: "Parts", type: "Replace", cost: 450 },
      { name: "Air Filter", category: "Parts", type: "Replace", cost: 950 },
      { name: "Cabin Air Filter", category: "Parts", type: "Replace", cost: 700 },
      { name: "Coolant Level Check", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Differential Fluid Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
    "40,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-40)", category: "Fluids", type: "Replace", cost: 2400 },
      { name: "Oil Filter (Heavy Duty)", category: "Parts", type: "Replace", cost: 450 },
      { name: "Air Filter", category: "Parts", type: "Replace", cost: 950 },
      { name: "Spark Plugs (Iridium Set of 6)", category: "Parts", type: "Replace", cost: 4200 },
      { name: "Brake Fluid Flush (DOT 4)", category: "Fluids", type: "Replace", cost: 1500 },
      { name: "Coolant Flush & Refill", category: "Fluids", type: "Replace", cost: 1350 },
      { name: "Transfer Case Fluid", category: "Fluids", type: "Replace", cost: 1800 },
      { name: "Suspension Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Full Brake Inspection", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
    "60,000 KM": [
      { name: "Fully Synthetic Engine Oil (5W-40)", category: "Fluids", type: "Replace", cost: 2400 },
      { name: "Oil Filter (Heavy Duty)", category: "Parts", type: "Replace", cost: 450 },
      { name: "Air Filter", category: "Parts", type: "Replace", cost: 950 },
      { name: "Spark Plugs (Iridium Set of 6)", category: "Parts", type: "Replace", cost: 4200 },
      { name: "Transmission Fluid Flush (Auto)", category: "Fluids", type: "Replace", cost: 3200 },
      { name: "Differential Fluid (Front + Rear)", category: "Fluids", type: "Replace", cost: 2600 },
      { name: "Brake Fluid Flush (DOT 4)", category: "Fluids", type: "Replace", cost: 1500 },
      { name: "Timing Belt / Chain Service", category: "Safety Inspection", type: "Inspect", cost: 0 },
      { name: "Wheel Alignment & 4-Wheel Balance", category: "Safety Inspection", type: "Inspect", cost: 0 },
    ],
  },
};

const VEHICLE_TYPES = [
  { id: "Sedan", label: "Sedan / Hatchback", sub: "City car, compact, coupe", Icon: Car },
  { id: "SUV", label: "SUV / Pickup Truck", sub: "Crossover, 4WD, van", Icon: Truck },
];

const CATEGORY_ICON = {
  Fluids: Droplets,
  Parts: Wrench,
  "Safety Inspection": ShieldCheck,
};

const LABOR_RATES = { "10,000 KM": 650, "20,000 KM": 850, "40,000 KM": 1400, "60,000 KM": 1800 };
const SHOP_FEE = 350;

const fmt = (n) => n.toLocaleString("en-PH", { minimumFractionDigits: 2 });
const quoteId = () => `RAP-${Math.floor(100000 + Math.random() * 900000)}`;

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────
function Steps({ current }) {
  const steps = ["Vehicle", "Mileage", "Review", "Confirm"];
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => {
        const idx = i + 1;
        const done = current > idx;
        const active = current === idx;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center gap-2 ${active ? "text-emerald-400" : done ? "text-slate-400" : "text-slate-600"}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${active ? "border-emerald-400 bg-emerald-400/10 text-emerald-400" : done ? "border-slate-500 bg-slate-700 text-slate-400" : "border-slate-700 text-slate-600"}`}>
                {done ? <Check size={12} /> : idx}
              </span>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-emerald-400" : done ? "text-slate-400" : "text-slate-600"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${done ? "bg-slate-500" : "bg-slate-700"}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── STEP 1 ───────────────────────────────────────────────────────────────────
function Step1({ onSelect }) {
  return (
    <div>
      <p className="text-slate-400 text-sm mb-6">Select your vehicle category to get started.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VEHICLE_TYPES.map(({ id, label, sub, Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="group flex flex-col items-start gap-4 p-6 rounded-2xl border border-slate-700 bg-slate-800/60 hover:border-emerald-500 hover:bg-slate-800 transition-all duration-200 text-left"
          >
            <span className="p-3 rounded-xl bg-slate-700 group-hover:bg-emerald-500/15 group-hover:text-emerald-400 text-slate-300 transition-all">
              <Icon size={28} />
            </span>
            <div>
              <p className="font-semibold text-white text-base">{label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
            </div>
            <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 mt-auto self-end transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── STEP 2 ───────────────────────────────────────────────────────────────────
function Step2({ vehicle, onSelect, onBack }) {
  const milestones = Object.keys(DB[vehicle]);
  return (
    <div>
      <p className="text-slate-400 text-sm mb-6">Choose your current service interval for your <span className="text-white font-medium">{vehicle}</span>.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {milestones.map((km) => (
          <button
            key={km}
            onClick={() => onSelect(km)}
            className="group flex flex-col items-center justify-center gap-1 py-5 px-3 rounded-2xl border border-slate-700 bg-slate-800/60 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-200"
          >
            <Zap size={16} className="text-slate-500 group-hover:text-emerald-400 mb-1 transition-colors" />
            <span className="text-white font-bold text-lg">{km.split(" ")[0]}</span>
            <span className="text-slate-500 text-xs">KM Service</span>
          </button>
        ))}
      </div>
      <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors">
        <ChevronLeft size={14} /> Back
      </button>
    </div>
  );
}

// ─── STEP 3 ───────────────────────────────────────────────────────────────────
function Step3({ vehicle, mileage, onBook, onBack }) {
  const items = DB[vehicle][mileage];
  const partsTotal = items.reduce((s, i) => s + i.cost, 0);
  const labor = LABOR_RATES[mileage];
  const total = partsTotal + labor + SHOP_FEE;

  const grouped = items.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Checklist */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-4 font-medium">Service Checklist — {vehicle} @ {mileage}</p>
        <div className="space-y-5">
          {Object.entries(grouped).map(([cat, catItems]) => {
            const CatIcon = CATEGORY_ICON[cat] || Wind;
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-2">
                  <CatIcon size={14} className="text-slate-500" />
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{cat}</span>
                </div>
                <div className="space-y-2">
                  {catItems.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                      {item.type === "Replace"
                        ? <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                        : <AlertCircle size={16} className="text-amber-400 shrink-0" />
                      }
                      <span className="text-slate-200 text-sm flex-1">{item.name}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${item.type === "Replace" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"}`}>
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors mt-6">
          <ChevronLeft size={14} /> Change Mileage
        </button>
      </div>

      {/* RIGHT: Invoice */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="rounded-2xl border border-slate-700 bg-slate-800/80 overflow-hidden sticky top-6">
          <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
            <ReceiptText size={15} className="text-emerald-400" />
            <span className="text-white text-sm font-semibold">Estimated Invoice</span>
          </div>
          <div className="px-5 py-4 space-y-2.5">
            {items.filter(i => i.cost > 0).map((item) => (
              <div key={item.name} className="flex items-start justify-between gap-2">
                <span className="text-slate-400 text-xs leading-relaxed">{item.name}</span>
                <span className="text-slate-300 text-xs font-mono whitespace-nowrap">₱{fmt(item.cost)}</span>
              </div>
            ))}
            <div className="border-t border-slate-700 pt-2.5 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Parts & Fluids Subtotal</span>
                <span className="text-slate-300 text-xs font-mono">₱{fmt(partsTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Expert Mechanical Labor</span>
                <span className="text-slate-300 text-xs font-mono">₱{fmt(labor)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Shop Supplies & Disposal</span>
                <span className="text-slate-300 text-xs font-mono">₱{fmt(SHOP_FEE)}</span>
              </div>
            </div>
          </div>
          <div className="mx-5 mb-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20 px-4 py-3">
            <p className="text-slate-400 text-xs mb-1">Total Estimate</p>
            <p className="text-emerald-400 font-mono font-bold text-2xl tracking-tight">₱{fmt(total)}</p>
            <p className="text-slate-600 text-xs mt-0.5">Inclusive of all parts & labor</p>
          </div>
          <div className="px-5 pb-5">
            <button
              onClick={onBook}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <CalendarCheck size={16} /> Proceed to Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 4 ───────────────────────────────────────────────────────────────────
function Step4({ vehicle, mileage, quoteID, onRestart }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(quoteID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
        <CalendarCheck size={28} className="text-emerald-400" />
      </div>
      <h2 className="text-white text-xl font-bold mb-1">Booking Request Confirmed</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-xs">Our service advisor will contact you within 2 business hours to confirm your appointment.</p>

      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800/70 p-5 mb-6 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Vehicle Type</span>
          <span className="text-white font-medium">{vehicle}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Service Interval</span>
          <span className="text-white font-medium">{mileage}</span>
        </div>
        <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
          <span className="text-slate-500 text-sm">Quote ID</span>
          <button onClick={copy} className="flex items-center gap-1.5 text-emerald-400 font-mono text-sm font-bold hover:text-emerald-300 transition-colors">
            {quoteID} {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      <button onClick={onRestart} className="text-slate-500 hover:text-slate-300 text-sm transition-colors underline underline-offset-2">
        Start a new estimate
      </button>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function PMSEstimator() {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState(null);
  const [mileage, setMileage] = useState(null);
  const [quoteID] = useState(() => quoteId());
  const [currentQuote, setCurrentQuote] = useState(null);

  const TITLES = ["Select Your Vehicle", "Choose Service Interval", "Review & Estimate", "Booking Summary"];

  const handleRestart = () => {
    setStep(1);
    setVehicle(null);
    setMileage(null);
    setCurrentQuote(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Wrench size={14} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">UnReal Auto Center</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Preventive Maintenance</h1>
          <p className="text-slate-500 text-sm">Service estimator & instant quote generator</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur p-6 sm:p-8">
          <Steps current={step} />
          <h2 className="text-white text-lg font-semibold mb-1">{TITLES[step - 1]}</h2>

          {step === 1 && (
            <Step1 onSelect={(v) => { setVehicle(v); setStep(2); }} />
          )}
          {step === 2 && (
            <Step2
              vehicle={vehicle}
              onSelect={(km) => { setMileage(km); setStep(3); }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3
              vehicle={vehicle}
              mileage={mileage}
              onBook={() => { setCurrentQuote(quoteID); setStep(4); }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4
              vehicle={vehicle}
              mileage={mileage}
              quoteID={currentQuote}
              onRestart={handleRestart}
            />
          )}
        </div>

        <p className="text-center text-slate-700 text-xs mt-6">
          Prices are estimates only. Final quote confirmed upon vehicle inspection.
        </p>
      </div>
    </div>
  );
}
