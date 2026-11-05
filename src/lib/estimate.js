import { DB, LABOR_RATES, SHOP_FEE, VEHICLE_TYPES } from "../data/serviceCatalog.js";

export const fmt = (n) => n.toLocaleString("en-PH", { minimumFractionDigits: 2 });

export const peso = (n) => `₱${fmt(n)}`;

export const intervalsFor = (vehicleId) => Object.keys(DB[vehicleId]);

export const vehicleLabel = (vehicleId) =>
  VEHICLE_TYPES.find((v) => v.id === vehicleId)?.label ?? vehicleId;

export function buildEstimate(vehicleId, interval) {
  const items = DB[vehicleId][interval];
  const partsTotal = items.reduce((sum, item) => sum + item.cost, 0);
  const labor = LABOR_RATES[interval];
  const total = partsTotal + labor + SHOP_FEE;

  const groups = [];
  for (const item of items) {
    let group = groups.find((g) => g.category === item.category);
    if (!group) {
      group = { category: item.category, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }

  return {
    items,
    groups,
    pricedItems: items.filter((item) => item.cost > 0),
    partsTotal,
    labor,
    shopFee: SHOP_FEE,
    total,
  };
}
