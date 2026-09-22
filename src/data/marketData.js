/**
 * Market Opportunity Data & Regional Signals
 * Primary Source: 'ConnPlex Signature - ROI Model (Investor Edition).xlsx' (Sheet 1 & Sheet 4)
 */

export const MARKET_STATISTICS = [
  {
    id: 'connplex-gujarat',
    state: 'Gujarat',
    city: 'Ahmedabad',
    geography: 'State-wide (Gujarat)',
    metric: 'ConnPlex Expansion Footprint',
    value: '33+ Screens Operational, 250+ Planned',
    detail: 'ConnPlex is a Gujarat-founded (2019) cinema franchise, already operating 33+ screens across the state with 250 more planned — brand states Gujarat can support 300 additional screens.',
    source: 'bilkulonline.com',
    sourceDate: 'Dec 2024',
  },
  {
    id: 'ahmedabad-theatres',
    state: 'Gujarat',
    city: 'Ahmedabad',
    geography: 'Ahmedabad Metro',
    metric: 'Existing Cinema Supply & Growth',
    value: '130 Theatres (+10% Growth since 2023)',
    detail: 'Ahmedabad had 130 movie theatres as of Oct 2025, up 10% since 2023 — including PVR INOX’s 9-screen flagship IMAX/LUXE launch at Phoenix Palladium validating high-end appetite.',
    source: 'rentechdigital.com; newsonprojects.com',
    sourceDate: 'Oct 2025',
  },
  {
    id: 'india-density',
    state: 'All',
    city: 'All',
    geography: 'National (India vs USA)',
    metric: 'Cinema Screen Penetration Density',
    value: '1 screen per ~147,000 people (vs 1:8,000 US)',
    detail: 'India has ~9,500 screens for 1.43bn people vs the US (1 per 8,000) — trade analysts identify an immediate structural deficit with room for 25,000+ more Indian screens.',
    source: 'ConnPlex Franchise Disclosure, franchiseavs.com',
    sourceDate: '2025-26',
  },
  {
    id: 'gujarati-box-office',
    state: 'Gujarat',
    city: 'Ahmedabad',
    geography: 'Gujarat Regional Industry',
    metric: 'Regional Language Box Office Growth',
    value: '₹46 Cr (2015) → ₹104+ Cr (Oct 2025)',
    detail: 'Gujarati-language box office alone grew from ₹46 cr in 2015 to ₹104+ cr by Oct 2025 — achieving over 100%+ expansion in a decade, bolstering regional multiplex programming.',
    source: 'articles.uvnetware.com',
    sourceDate: 'Jan 2026',
  },
  {
    id: 'national-benchmarks',
    state: 'All',
    city: 'All',
    geography: 'National Multiplex Sector',
    metric: 'ATP & Concession Spend-Per-Head Trends',
    value: 'ATP: ₹259–262 | Record SPH: ₹148',
    detail: 'National multiplex ATP stood at ₹259-262; F&B spend-per-head hit a record ₹148 in Q1 FY26 (up from ₹134 FY25 average) — demonstrating growing discretionary spend per patron.',
    source: 'PVR INOX Investor Disclosures / ICICI Direct',
    sourceDate: 'Aug 2025 – Feb 2026',
  },
];

export const CITY_STATE_METADATA = {
  Ahmedabad: {
    state: 'Gujarat',
    population: '8.6+ Million (Catchment)',
    screenSupply: '130+ Theatres across urban agglomeration',
    pvrInoxScreens: '36 screens / 6 properties (incl. 9-screen IMAX/LUXE)',
    rentalBenchmark: '₹65–70 / sq.ft for mall anchors (vs ₹120–300 high street)',
    powerTariff: '₹7.50 / kWh (Gujarat Commercial HT/LT slab)',
  },
  Surat: {
    state: 'Gujarat',
    population: '7.8+ Million',
    screenSupply: '85+ Screens (Diamond & Textile hub)',
    pvrInoxScreens: '18 screens across major commercial hubs',
    rentalBenchmark: '₹55–65 / sq.ft mall anchors',
    powerTariff: '₹7.50 / kWh (Gujarat Commercial slab)',
  },
  Vadodara: {
    state: 'Gujarat',
    population: '2.3+ Million',
    screenSupply: '45+ Screens (Cultural capital of Gujarat)',
    pvrInoxScreens: '14 screens',
    rentalBenchmark: '₹50–60 / sq.ft',
    powerTariff: '₹7.50 / kWh',
  },
  Rajkot: {
    state: 'Gujarat',
    population: '1.9+ Million',
    screenSupply: '35+ Screens (Saurashtra industrial hub)',
    pvrInoxScreens: '10 screens',
    rentalBenchmark: '₹45–55 / sq.ft',
    powerTariff: '₹7.50 / kWh',
  },
};
