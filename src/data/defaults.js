// CONNPLEX CINEMAS Approved Financial Defaults (from Excel Model Source of Truth)
export const FRANCHISE_DEFAULTS = {
  // Location & Prospect
  city: 'Ahmedabad',
  state: 'Gujarat',
  prospectName: 'ABC Investments',
  screens: 3,
  cinemaFormat: 'Signature',

  // Seating & Auditorium Investment
  sofaPrice: 85000,
  sofaQty: 200,
  reclinerPrice: 150000,
  reclinerQty: 50,
  duoPrice: 125000,
  duoQty: 20,
  franchiseFeePerScreen: 500000,

  // Foyer, GST & Working Capital
  foyerSqft: 0,
  foyerRate: 3500,
  gstCapexPct: 18,
  preOpeningWC: 0,

  // Ticket Revenue Assumptions (Weekdays: Mon-Thu)
  wdShows: 5,
  wdDays: 18,
  wdOccPct: 20,
  wdAtp: 220,

  // Ticket Revenue Assumptions (Weekends: Fri-Sun)
  weShows: 5,
  weDays: 12,
  weOccPct: 55,
  weAtp: 320,

  // Deductions & Splits
  gstTicketPct: 18,
  distributorPct: 50,
  franchiseeTicketPct: 80, // 20% brand royalty

  // Food & Beverage
  fnbRatePerTicket: 180, // Spend-per-head
  fnbGstPct: 5, // Stand-alone restaurant GST 2.0 rate
  fnbCogsPct: 25,
  franchiseeFnbPct: 80, // 20% brand royalty
  banquetBookings: 0,
  banquetRatePerSeat: 99,

  // Advertising Revenue
  adQty: 40,
  adRate: 10000,
  agencyPct: 30,
  franchiseeAdPct: 80, // 20% brand royalty

  // Operating Expenses (Monthly)
  rent: 500000,
  cam: 80000,
  internet: 15000,
  electricity: 180000,
  amc: 40000,
  insurance: 15000,
  admin: 50000,
  operators: 50000,
  fnbStaff: 150000,
  housekeeping: 60000,
  security: 50000,
  marketingPct: 2, // 2% of (Ticket + F&B net income)

  // Growth Assumptions
  growthPct: 8, // Assumed annual net profit growth Yr 2+
};

export const INITIAL_SCENARIOS = [
  {
    id: 'sc-1',
    name: 'Ahmedabad — 3 Screens (Signature Base)',
    isDefault: true,
    inputs: { ...FRANCHISE_DEFAULTS },
  },
  {
    id: 'sc-2',
    name: 'Ahmedabad — 4 Screens (Flagship)',
    isDefault: false,
    inputs: {
      ...FRANCHISE_DEFAULTS,
      screens: 4,
      sofaQty: 110,
      reclinerQty: 70,
      duoQty: 90,
      foyerSqft: 2800,
      foyerRate: 3000,
      preOpeningWC: 2000000,
      rent: 650000,
      cam: 105000,
      electricity: 235000,
      fnbStaff: 190000,
      adQty: 52,
    },
  },
  {
    id: 'sc-3',
    name: 'Surat — 3 Screens (Growth Market)',
    isDefault: false,
    inputs: {
      ...FRANCHISE_DEFAULTS,
      city: 'Surat',
      wdAtp: 210,
      weAtp: 300,
      wdOccPct: 22,
      weOccPct: 58,
      fnbRatePerTicket: 170,
      rent: 420000,
      electricity: 165000,
    },
  },
];
