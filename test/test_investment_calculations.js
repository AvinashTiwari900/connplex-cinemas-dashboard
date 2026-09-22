import { calculateInvestment } from '../src/calculator/engine.js';

console.log("Running CONNPLEX CINEMAS – INVESTMENT CALCULATION Verification Suite...\n");

function assertEqual(name, actual, expected) {
  if (actual !== expected) {
    console.error(`FAIL: ${name} — expected ${expected}, got ${actual}`);
    process.exit(1);
  } else {
    console.log(`PASS: ${name} = ${actual}`);
  }
}

// TEST CASE 1: Without Foyer Area (foyerSqft = 0)
console.log("--- TEST CASE 1: Default State (Foyer Area = 0) ---");
const testCase1 = calculateInvestment({
  sofaPrice: 85000,
  sofaQty: 200,
  reclinerPrice: 150000,
  reclinerQty: 50,
  duoPrice: 125000,
  duoQty: 20,
  franchiseFeePerScreen: 500000,
  screens: 3,
  foyerRate: 3500,
  foyerSqft: 0,
  gstCapexPct: 18,
  preOpeningWC: 0
});

assertEqual("Sofa Total (85,000 * 200)", testCase1.sofaTotal, 17000000);
assertEqual("Recliners Total (150,000 * 50)", testCase1.reclinerTotal, 7500000);
assertEqual("Duo Loungers Total (125,000 * 20)", testCase1.duoTotal, 2500000);
assertEqual("Franchise Fee Total (500,000 * 3)", testCase1.franchiseFeeTotal, 1500000);
assertEqual("Seating & Franchise Subtotal", testCase1.seatingAndFranchiseSubtotal, 28500000);
assertEqual("Foyer Investment (3500 * 0)", testCase1.foyerFitoutTotal, 0);
assertEqual("Auditorium + Foyer Total", testCase1.auditoriumAndFoyerTotal, 28500000);
assertEqual("GST @ 18%", testCase1.gstCapex, 5130000);
assertEqual("Grand Total (3,36,30,000)", testCase1.totalInvestment, 33630000);

// TEST CASE 2: With Foyer Area = 2,000 Sq.Ft.
console.log("\n--- TEST CASE 2: With Foyer Area = 2,000 Sq.Ft. ---");
const testCase2 = calculateInvestment({
  sofaPrice: 85000,
  sofaQty: 200,
  reclinerPrice: 150000,
  reclinerQty: 50,
  duoPrice: 125000,
  duoQty: 20,
  franchiseFeePerScreen: 500000,
  screens: 3,
  foyerRate: 3500,
  foyerSqft: 2000,
  gstCapexPct: 18,
  preOpeningWC: 0
});

assertEqual("Foyer Investment (3500 * 2000)", testCase2.foyerFitoutTotal, 7000000);
assertEqual("Auditorium + Foyer Total (2,85,00,000 + 70,00,000)", testCase2.auditoriumAndFoyerTotal, 35500000);
assertEqual("GST @ 18% (3,55,00,000 * 18%)", testCase2.gstCapex, 6390000);
assertEqual("Grand Total (3,55,00,000 + 63,90,000)", testCase2.totalInvestment, 41890000);

console.log("\nALL CONNPLEX INVESTMENT CALCULATION TESTS PASSED ACCURATELY!");
