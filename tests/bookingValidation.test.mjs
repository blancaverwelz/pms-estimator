import test from "node:test";
import assert from "node:assert/strict";
import { validateBooking, toLocalISODate, formatRequestedDate } from "../src/lib/bookingValidation.js";

const TODAY = "2026-11-04";
const ok = { name: "  Juan Dela Cruz ", mobile: "0917 123 4567", date: "2026-11-10" };

test("valid draft passes, including common phone formats", () => {
  assert.deepEqual(validateBooking(ok, TODAY), {});
  for (const mobile of ["+63 917 123 4567", "(02) 8123-4567", "09171234567"]) {
    assert.equal(validateBooking({ ...ok, mobile }, TODAY).mobile, undefined, mobile);
  }
});

test("empty and invalid fields are rejected", () => {
  const e = validateBooking({ name: "   ", mobile: "", date: "" }, TODAY);
  assert.ok(e.name && e.mobile && e.date);
  for (const mobile of ["abc", "12345", "0917-ABC-4567", "1".repeat(16)]) {
    assert.ok(validateBooking({ ...ok, mobile }, TODAY).mobile, mobile);
  }
  assert.ok(validateBooking({ ...ok, date: "2026-02-31" }, TODAY).date);
});

test("past dates are rejected; today is accepted", () => {
  assert.ok(validateBooking({ ...ok, date: "2026-11-03" }, TODAY).date);
  assert.equal(validateBooking({ ...ok, date: TODAY }, TODAY).date, undefined);
});

test("local date helpers use the local calendar", () => {
  assert.equal(toLocalISODate(new Date(2026, 0, 5, 23, 59)), "2026-01-05");
  assert.match(formatRequestedDate("2026-11-10"), /November/);
  assert.equal(formatRequestedDate("bad"), "");
});
