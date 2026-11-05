import test from "node:test";
import assert from "node:assert/strict";
import { DB, LABOR_RATES, SHOP_FEE } from "../src/data/serviceCatalog.js";
import { buildEstimate, fmt } from "../src/lib/estimate.js";

// Expected values captured from the original App.jsx before extraction.
const EXPECTED = {
  "Sedan|10,000 KM": { items: 6, parts: 2170, labor: 650, total: 3170 },
  "Sedan|20,000 KM": { items: 7, parts: 3550, labor: 850, total: 4750 },
  "Sedan|40,000 KM": { items: 9, parts: 8350, labor: 1400, total: 10100 },
  "Sedan|60,000 KM": { items: 10, parts: 9800, labor: 1800, total: 11950 },
  "SUV|10,000 KM": { items: 5, parts: 2850, labor: 650, total: 3850 },
  "SUV|20,000 KM": { items: 6, parts: 4500, labor: 850, total: 5700 },
  "SUV|40,000 KM": { items: 9, parts: 12650, labor: 1400, total: 14400 },
  "SUV|60,000 KM": { items: 9, parts: 15300, labor: 1800, total: 17450 },
};

test("all eight vehicle/interval estimates match the original", () => {
  assert.equal(SHOP_FEE, 350);
  assert.deepEqual(LABOR_RATES, { "10,000 KM": 650, "20,000 KM": 850, "40,000 KM": 1400, "60,000 KM": 1800 });
  let count = 0;
  for (const vehicle of Object.keys(DB)) {
    for (const interval of Object.keys(DB[vehicle])) {
      const e = buildEstimate(vehicle, interval);
      const want = EXPECTED[`${vehicle}|${interval}`];
      assert.ok(want, `unexpected combination ${vehicle}|${interval}`);
      assert.equal(e.items.length, want.items);
      assert.equal(e.partsTotal, want.parts);
      assert.equal(e.labor, want.labor);
      assert.equal(e.shopFee, 350);
      assert.equal(e.total, want.total);
      count++;
    }
  }
  assert.equal(count, 8);
});

test("grouping keeps every item and peso formatting is preserved", () => {
  const e = buildEstimate("Sedan", "60,000 KM");
  assert.equal(e.groups.reduce((n, g) => n + g.items.length, 0), e.items.length);
  assert.deepEqual(e.groups.map((g) => g.category), ["Fluids", "Parts", "Safety Inspection"]);
  assert.equal(fmt(11950), "11,950.00");
  assert.equal(fmt(1850), "1,850.00");
});
