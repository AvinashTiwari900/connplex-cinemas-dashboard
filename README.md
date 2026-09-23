# ConnPlex Cinemas — Sales Rep Console & Investor ROI Dashboard

A production-ready, interactive financial presentation web application for **ConnPlex Cinemas** franchise sales and investor underwriting.

This application is built directly upon the financial formulas, assumptions, and benchmarks in:
- **`CONNPLEX CINEMAS - ROI Model (Investor Edition).xlsx`** (Primary Source of Truth)
- **`Web Design for Sales Prospects.zip`**

---

## 1. Quick Start

You can run this application in either of two ways:

### Option A: Instant Local File (Zero setup required)
Simply double-click **`index.html`** in this folder to open it in Chrome, Edge, Brave, or Firefox.

### Option B: Local Web Server
Double-click **`start_server.bat`** (or run `python serve.py`), then navigate to:
```
http://localhost:3000
```

---

## 2. Automated Financial Verification (36 Test Vectors)

To verify the financial calculation engine against the Excel model's exact cells:
```powershell
node test/test_calculations.js
```
Every key metric (Total Seats, Capex, Foyer Fit-Out, Capex GST, Working Capital, Ticket Gross, Net Box Office, Distributor Split, F&B Concessions, F&B GST 2.0 Stand-Alone 5%, F&B COGS, Advertising, Fixed & Dynamic OPEX, Year-1 Profit, ROI, Payback, and 3-Year Trajectory) has been verified with **0.00% formula deviation**.

---

## 3. Core Features & Modes

### Mode A: Sales Rep Console
- Collapsible assumption controls:
  1. **Location & Format**: City, State, Investor Name, Screens (1–12), Cinema Format.
  2. **Seating & Auditorium Capex**: Sofa Sliders, Recliners, Duo Couple Loungers (unit price, seat count, subtotal), Franchise Fee per screen.
  3. **Foyer, GST & Working Capital**: Foyer area (sq.ft), fit-out rate (₹/sq.ft), GST on capex (18%), pre-opening marketing buffer.
  4. **Ticket Revenue Assumptions**: Weekday (Mon–Thu) vs. Weekend (Fri–Sun) shows, days/mo, occupancy %, ATP, 18% ticket GST, 50% distributor split, 80% franchisee share.
  5. **Food & Beverage & Advertising**: Concession spend per head (₹180 default), 5% stand-alone restaurant GST, 25% COGS, 80% franchisee share; Ad spots/mo, ad rate, 30% agency commission, 80% franchisee share.
  6. **Monthly Operating Expenses (OPEX)**: Rent, CAM, Electricity & HVAC, Internet, AMC, Insurance, Admin, Projectionists, Staffing, Housekeeping, Security, and dynamic 2% Marketing fee.
  7. **Growth Assumptions**: Annual compound growth % for Years 2 and 3.
- Instant, client-side recalculation without page reload.
- Real-time validation checks for negative values, occupancy out of bounds, missing inputs, etc.

### Mode B: Investor Presentation ("Present Mode")
- Click **`▶ Present to Investor`** to immediately hide all internal sales rep controls and expand the polished investor dashboard to full width.
- Click **`✕ Exit Presentation`** to return to editing assumptions with all changes preserved.

### Scenario Management
- **Pre-loaded Scenarios**:
  - `Ahmedabad — 3 Screens (Signature Base)` (Approved Excel model baseline)
  - `Ahmedabad — 4 Screens (Flagship)`
  - `Surat — 3 Screens (Growth Market)`
- **Actions**: Create new scenarios, duplicate active scenario, rename, delete, and compare scenarios side-by-side in a comparative matrix.

### Executive Proposal Export
- Click **`📄 Download Proposal`** to generate a clean, executive memorandum formatted for printing or saving as PDF.
- Includes investor name, site specifications, initial capital breakdown, Year-1 P&L, 3-year trajectory, regional market signals, and legal disclaimer.

### Interactive Tooltips & Financial Definitions
- Hover over any metric (Total Investment, Year-1 Revenue, Year-1 Net Profit, ROI, Payback Period, Blended Occupancy) to view its underlying formula and business rationale as documented in the Excel workbook comments.

---

## 4. Code Architecture

```
Webdesign/
├── index.html                     # Main interactive application
├── serve.py                       # Python HTTP server
├── start_server.bat               # 1-click Windows batch launcher
├── README.md                      # Documentation
├── test/
│   ├── test_calculations.js       # Node/JS verification test suite
│   └── test_server.py             # Python file integrity test
└── src/
    ├── calculator/
    │   ├── engine.js              # Pure, deterministic calculation engine
    │   └── validator.js           # Validation rules
    ├── data/
    │   ├── defaults.js            # Approved defaults & baseline scenarios
    │   ├── marketData.js          # Sourced regional macroeconomic signals
    │   ├── boxOfficeBenchmarks.js # Sourced theatrical box office data
    │   └── tooltips.js            # Financial definitions & commentary
    ├── types/
    │   └── index.ts               # TypeScript data interfaces
    └── utils/
        ├── formatters.js          # Indian numbering format (₹, Cr, Lakhs, %)
        └── proposalExport.js      # Executive memorandum PDF/print generator
```
