import { FRANCHISE_DEFAULTS } from '../src/data/defaults.js';
import { calculateDashboard } from '../src/calculator/engine.js';

console.log("Running Financial Engine Verification against Excel Source of Truth...");

const res = calculateDashboard(FRANCHISE_DEFAULTS);

function assertClose(name, actual, expected, tol = 1) {
  const diff = Math.abs(actual - expected);
  if (diff > tol) {
    console.error(`FAIL: ${name}: expected ${expected}, got ${actual} (diff: ${diff})`);
    process.exit(1);
  } else {
    console.log(`PASS: ${name} = ${actual} (expected ~${expected})`);
  }
}

// 1. Seats & Capex Investment (Sheet 3 'Investment')
assertClose("Total Seats", res.investment.totalSeats, 200, 0.01);
assertClose("Seating Subtotal", res.investment.seatingTotal, 23050000, 1);
assertClose("Franchise Fee Total", res.investment.franchiseFeeTotal, 1500000, 1);
assertClose("Seating + Franchise Fee", res.investment.seatingAndFranchiseSubtotal, 24550000, 1);
assertClose("Foyer / Lobby Fit-Out", res.investment.foyerFitoutTotal, 6600000, 1);
assertClose("Auditorium + Foyer Total", res.investment.auditoriumAndFoyerTotal, 31150000, 1);
assertClose("GST on Capex (18%)", res.investment.gstCapex, 5607000, 1);
assertClose("Total Investment", res.investment.totalInvestment, 38257000, 1);

// 2. Ticket Revenue (Sheet 2 'ROI Calculation')
assertClose("Weekday Seat Shows", res.ticket.wdSeatShows, 18000, 1);
assertClose("Weekday Tickets Sold", res.ticket.wdTickets, 3600, 1);
assertClose("Weekday Gross Revenue", res.ticket.wdGross, 792000, 1);
assertClose("Weekend Seat Shows", res.ticket.weSeatShows, 12000, 1);
assertClose("Weekend Tickets Sold", res.ticket.weTickets, 6600, 1);
assertClose("Weekend Gross Revenue", res.ticket.weGross, 2112000, 1);
assertClose("Total Monthly Tickets Sold", res.ticket.totalTickets, 10200, 1);
assertClose("Gross Monthly Ticket Collection", res.ticket.grossTicketM, 2904000, 1);
assertClose("Blended Occupancy %", res.ticket.blendedOccupancy * 100, 34.0, 0.01);
assertClose("Blended ATP", res.ticket.blendedAtp, 284.70588, 0.01);
assertClose("Ticket GST @ 18%", res.ticket.gstTicketM, 522720, 1);
assertClose("Net Box Office (Monthly)", res.ticket.netBoxOfficeM, 2381280, 1);
assertClose("Distributor Share @ 50%", res.ticket.distributorM, 1190640, 1);
assertClose("Exhibitor Net Share", res.ticket.exhibitorNetM, 1190640, 1);
assertClose("Franchisee Ticket Income (Monthly)", res.ticket.franchiseeTicketM, 952512, 1);
assertClose("Franchisee Ticket Income (Annual)", res.ticket.franchiseeTicketA, 11430144, 1);

// 3. F&B Revenue
assertClose("Gross F&B Income (Monthly)", res.fnb.grossFnbM, 1836000, 1);
assertClose("F&B GST @ 5% (inclusive)", res.fnb.fnbGstM, 87428.57, 1);
assertClose("F&B COGS @ 25%", res.fnb.fnbCogsM, 459000, 1);
assertClose("Net F&B Revenue", res.fnb.netFnbM, 1289571.43, 1);
assertClose("Franchisee Net F&B Income (Monthly)", res.fnb.franchiseeFnbM, 1031657.14, 1);
assertClose("Franchisee Net F&B Income (Annual)", res.fnb.franchiseeFnbA, 12379885.71, 1);

// 4. Advertising Revenue
assertClose("Gross Ad Revenue", res.ad.grossAdM, 400000, 1);
assertClose("Ad Agency Commission @ 30%", res.ad.agencyCommissionM, 120000, 1);
assertClose("Net Ad Revenue", res.ad.netAdM, 280000, 1);
assertClose("Franchisee Ad Income (Monthly)", res.ad.franchiseeAdM, 224000, 1);
assertClose("Franchisee Ad Income (Annual)", res.ad.franchiseeAdA, 2688000, 1);

// 5. Operating Expenses
assertClose("Fixed Monthly OPEX", res.opex.fixedOpexM, 1190000, 1);
assertClose("Marketing & Promotion (2%)", res.opex.marketingM, 39683.38, 1);
assertClose("Total Monthly OPEX", res.opex.totalOpexM, 1229683.38, 1);
assertClose("Total Annual OPEX", res.opex.totalOpexA, 14756200.59, 1);

// 6. Net Profit, ROI, Payback
assertClose("Total Monthly Income", res.totalIncomeM, 2208169.14, 1);
assertClose("Total Annual Income", res.totalIncomeA, 26498029.71, 1);
assertClose("Net Profit / Month (Yr 1)", res.profit.netProfitM, 978485.76, 1);
assertClose("Net Profit / Year (Yr 1)", res.profit.netProfitY1, 11741829.12, 1);
assertClose("Year 2 Net Profit (+8%)", res.projections[1].netProfit, 12681175.45, 1);
assertClose("Year 3 Net Profit (+8%)", res.projections[2].netProfit, 13695669.49, 1);
assertClose("Return on Investment (ROI)", res.roi * 100, 30.691975, 0.01);
assertClose("Payback Period (Years)", res.payback, 3.25818, 0.01);

console.log("\nALL 36 FINANCIAL TEST VECTORS PASSED PERFECTLY!");
