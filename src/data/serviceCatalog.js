// Pricing catalog. Values are the source of truth for every estimate.

export const DB = {
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

export const VEHICLE_TYPES = [
  { id: "Sedan", label: "Sedan / Hatchback", sub: "City car, compact, coupe" },
  { id: "SUV", label: "SUV / Pickup Truck", sub: "Crossover, 4WD, van" },
];

export const LABOR_RATES = { "10,000 KM": 650, "20,000 KM": 850, "40,000 KM": 1400, "60,000 KM": 1800 };
export const SHOP_FEE = 350;
