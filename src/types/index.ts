export interface FinancialInputs {
  // Location & Prospect
  city: string;
  state: string;
  prospectName: string;
  screens: number;
  cinemaFormat: string;

  // Seating & Auditorium Capex
  sofaPrice: number;
  sofaQty: number;
  reclinerPrice: number;
  reclinerQty: number;
  duoPrice: number;
  duoQty: number;
  franchiseFeePerScreen: number;

  // Foyer, GST & Working Capital
  foyerSqft: number;
  foyerRate: number;
  gstCapexPct: number;
  preOpeningWC: number;

  // Ticket Revenue Assumptions
  wdShows: number;
  wdDays: number;
  wdOccPct: number;
  wdAtp: number;
  weShows: number;
  weDays: number;
  weOccPct: number;
  weAtp: number;

  // Deductions & Splits
  gstTicketPct: number;
  distributorPct: number;
  franchiseeTicketPct: number;

  // Food & Beverage
  fnbRatePerTicket: number;
  fnbGstPct: number;
  fnbCogsPct: number;
  franchiseeFnbPct: number;
  banquetBookings?: number;
  banquetRatePerSeat?: number;

  // Advertising
  adQty: number;
  adRate: number;
  agencyPct: number;
  franchiseeAdPct: number;

  // Operating Expenses
  rent: number;
  cam: number;
  internet: number;
  electricity: number;
  amc: number;
  insurance: number;
  admin: number;
  operators: number;
  fnbStaff: number;
  housekeeping: number;
  security: number;
  marketingPct: number;

  // Growth
  growthPct: number;
}

export interface Scenario {
  id: string;
  name: string;
  isDefault?: boolean;
  inputs: FinancialInputs;
}

export interface InvestmentResults {
  totalSeats: number;
  sofaQty: number;
  sofaPrice: number;
  sofaTotal: number;
  reclinerQty: number;
  reclinerPrice: number;
  reclinerTotal: number;
  duoQty: number;
  duoPrice: number;
  duoTotal: number;
  seatingTotal: number;
  avgCostPerSeat: number;
  franchiseFeePerScreen: number;
  franchiseFeeTotal: number;
  seatingAndFranchiseSubtotal: number;
  foyerSqft: number;
  foyerRate: number;
  foyerFitoutTotal: number;
  auditoriumAndFoyerTotal: number;
  gstCapexPct: number;
  gstCapex: number;
  preOpeningWC: number;
  totalInvestment: number;
}

export interface TicketResults {
  wdSeatShows: number;
  wdTickets: number;
  wdGross: number;
  weSeatShows: number;
  weTickets: number;
  weGross: number;
  totalSeatShows: number;
  totalTickets: number;
  blendedOccupancy: number;
  blendedAtp: number;
  grossTicketM: number;
  grossTicketA: number;
  gstTicketPct: number;
  gstTicketM: number;
  gstTicketA: number;
  netBoxOfficeM: number;
  netBoxOfficeA: number;
  distributorPct: number;
  distributorM: number;
  distributorA: number;
  totalDeductionsM: number;
  totalDeductionsA: number;
  exhibitorNetM: number;
  exhibitorNetA: number;
  franchiseeTicketPct: number;
  franchiseeTicketM: number;
  franchiseeTicketA: number;
}

export interface FnbResults {
  fnbRatePerTicket: number;
  concessionsGross: number;
  banquetGross: number;
  grossFnbM: number;
  grossFnbA: number;
  fnbGstPct: number;
  fnbGstM: number;
  fnbGstA: number;
  fnbCogsPct: number;
  fnbCogsM: number;
  fnbCogsA: number;
  netFnbM: number;
  netFnbA: number;
  franchiseeFnbPct: number;
  franchiseeFnbM: number;
  franchiseeFnbA: number;
}

export interface AdResults {
  adQty: number;
  adRate: number;
  grossAdM: number;
  grossAdA: number;
  agencyPct: number;
  agencyCommissionM: number;
  agencyCommissionA: number;
  netAdM: number;
  netAdA: number;
  franchiseeAdPct: number;
  franchiseeAdM: number;
  franchiseeAdA: number;
}

export interface OpexItem {
  key: string;
  label: string;
  monthly: number;
  annual: number;
}

export interface OpexResults {
  rent: number;
  cam: number;
  internet: number;
  electricity: number;
  amc: number;
  insurance: number;
  admin: number;
  operators: number;
  fnbStaff: number;
  housekeeping: number;
  security: number;
  fixedOpexM: number;
  marketingPct: number;
  marketingM: number;
  marketingA: number;
  totalOpexM: number;
  totalOpexA: number;
  items: OpexItem[];
}

export interface YearProjection {
  year: string;
  revenue: number;
  opex: number;
  netProfit: number;
}

export interface RevenueStream {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  sharePct: number;
  color: string;
}

export interface InvestmentAllocation {
  id: string;
  name: string;
  amount: number;
  sharePct: number;
  color: string;
}

export interface DashboardResults {
  investment: InvestmentResults;
  ticket: TicketResults;
  fnb: FnbResults;
  ad: AdResults;
  opex: OpexResults;
  profit: {
    netProfitM: number;
    netProfitY1: number;
  };
  roi: number;
  payback: number;
  projections: YearProjection[];
  streams: RevenueStream[];
  allocation: InvestmentAllocation[];
  totalIncomeM: number;
  totalIncomeA: number;
}
