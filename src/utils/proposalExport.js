import { formatINR, formatPercent, formatYears, formatNumber } from './formatters.js';
import { BOX_OFFICE_BENCHMARKS, BOX_OFFICE_SOURCES } from '../data/boxOfficeBenchmarks.js';
import { MARKET_STATISTICS } from '../data/marketData.js';

/**
 * Generates an executive printable Investor Proposal document
 */
export function printInvestorProposal(inputs, dashboardResults) {
  const { investment, ticket, fnb, ad, opex, profit, roi, payback, projections, streams, allocation } = dashboardResults;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download/print the Investor Proposal.');
    return;
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CONNPLEX CINEMAS — Franchise Investor Proposal (${inputs.city})</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 18mm 15mm;
    }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #1a202c;
      background: #ffffff;
      line-height: 1.45;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .page-header {
      border-bottom: 2px solid #b38e44;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand-title {
      font-size: 20pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #0c1828;
      text-transform: uppercase;
      margin: 0;
    }
    .brand-subtitle {
      font-size: 9pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #926d27;
      font-weight: 700;
      margin-top: 4px;
    }
    .doc-meta {
      text-align: right;
      font-size: 9pt;
      color: #4a5568;
    }
    .prospect-banner {
      background: #0c1828;
      color: #ffffff;
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .prospect-banner h2 {
      margin: 0;
      font-size: 14pt;
      color: #f0d59b;
    }
    .prospect-banner p {
      margin: 4px 0 0 0;
      font-size: 9.5pt;
      color: #cbd5e1;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      margin-bottom: 24px;
    }
    .kpi-card {
      border: 1px solid #e2e8f0;
      border-top: 3px solid #b38e44;
      padding: 10px 12px;
      border-radius: 6px;
      background: #f8fafc;
      text-align: center;
    }
    .kpi-label {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748b;
      margin-bottom: 4px;
    }
    .kpi-val {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
    }
    .kpi-val.highlight {
      color: #926d27;
    }
    .section-title {
      font-size: 12pt;
      font-weight: 700;
      color: #0c1828;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 9.5pt;
    }
    th {
      background: #f1f5f9;
      color: #334155;
      text-align: left;
      padding: 7px 10px;
      font-weight: 700;
      border-bottom: 1.5px solid #cbd5e1;
      text-transform: uppercase;
      font-size: 8pt;
      letter-spacing: 0.04em;
    }
    td {
      padding: 7px 10px;
      border-bottom: 1px solid #e2e8f0;
    }
    td.num, th.num {
      text-align: right;
    }
    tr.highlight-row {
      background: #fefce8;
      font-weight: 700;
    }
    tr.total-row {
      background: #e2e8f0;
      font-weight: 800;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 16px;
    }
    .bullet-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px 14px;
      font-size: 9pt;
      line-height: 1.5;
    }
    .bullet-box p {
      margin: 0 0 8px 0;
    }
    .bullet-box p:last-child {
      margin-bottom: 0;
    }
    .source-tag {
      color: #64748b;
      font-style: italic;
      font-size: 8pt;
    }
    .disclaimer {
      font-size: 8pt;
      color: #64748b;
      line-height: 1.45;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      margin-top: 24px;
      page-break-inside: avoid;
    }
    .print-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #0c1828;
      color: #f0d59b;
      border: 1px solid #b38e44;
      padding: 10px 18px;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      font-size: 11pt;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    @media print {
      .print-btn {
        display: none;
      }
    }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>

  <div class="page-header">
    <div>
      <h1 class="brand-title">CONNPLEX CINEMAS</h1>
      <div class="brand-subtitle">Luxury Recliner Multiplex • FOFO Franchise Investment Model</div>
    </div>
    <div class="doc-meta">
      <strong>Date:</strong> ${currentDate}<br>
      <strong>Location:</strong> ${inputs.city}, ${inputs.state}
    </div>
  </div>

  <div class="prospect-banner">
    <div>
      <h2>Prepared for: ${inputs.prospectName || 'Prospective Franchise Partner'}</h2>
      <p>Site Specification: ${inputs.screens} Screens · ${investment.totalSeats} Luxury Recliner Seats · ${inputs.cinemaFormat || 'Signature Format'}</p>
    </div>
    <div style="text-align: right;">
      <span style="font-size: 10pt; color: #93a4b8;">Brand Inception</span><br>
      <strong style="color: #f0d59b; font-size: 11pt;">Founded Gujarat, 2019</strong>
    </div>
  </div>

  <!-- Key Executive Metrics -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-label">Total Investment</div>
      <div class="kpi-val highlight">${formatINR(investment.totalInvestment, { short: true })}</div>
      <div style="font-size: 7.5pt; color: #64748b; margin-top: 3px;">₹${formatNumber(investment.totalInvestmentPerSeat || Math.round(investment.totalInvestment / (investment.totalSeats || 1)))}/seat</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Year-1 Revenue</div>
      <div class="kpi-val">${formatINR(dashboardResults.totalIncomeA, { short: true })}</div>
      <div style="font-size: 7.5pt; color: #64748b; margin-top: 3px;">${formatINR(dashboardResults.totalIncomeM, { short: true })}/mo</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Year-1 Net Profit</div>
      <div class="kpi-val highlight">${formatINR(profit.netProfitY1, { short: true })}</div>
      <div style="font-size: 7.5pt; color: #64748b; margin-top: 3px;">${formatINR(profit.netProfitM, { short: true })}/mo</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Return on Investment</div>
      <div class="kpi-val">${formatPercent(roi * 100, 2)}</div>
      <div style="font-size: 7.5pt; color: #64748b; margin-top: 3px;">Annual Cash Yield</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Payback Period</div>
      <div class="kpi-val">${formatYears(payback, 2)}</div>
      <div style="font-size: 7.5pt; color: #64748b; margin-top: 3px;">Capital Recovery</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Blended Occupancy</div>
      <div class="kpi-val highlight">${formatPercent(ticket.blendedOccupancy * 100, 2)}</div>
      <div style="font-size: 7.5pt; color: #64748b; margin-top: 3px;">${formatNumber(ticket.totalTickets)} admissions/mo</div>
    </div>
  </div>

  <!-- Investment Breakdown Table -->
  <div class="section-title">1. Capital Investment Summary</div>
  <table>
    <thead>
      <tr>
        <th>Investment Component</th>
        <th>Specification</th>
        <th class="num">Amount (₹)</th>
        <th class="num">% Share</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Sofa Slider Seating</strong></td>
        <td>${investment.sofaQty} seats @ ₹${formatNumber(investment.sofaPrice)}/seat</td>
        <td class="num">${formatINR(investment.sofaTotal)}</td>
        <td class="num">${formatPercent((investment.sofaTotal / investment.totalInvestment) * 100)}</td>
      </tr>
      <tr>
        <td><strong>Full Motorized Recliners</strong></td>
        <td>${investment.reclinerQty} seats @ ₹${formatNumber(investment.reclinerPrice)}/seat</td>
        <td class="num">${formatINR(investment.reclinerTotal)}</td>
        <td class="num">${formatPercent((investment.reclinerTotal / investment.totalInvestment) * 100)}</td>
      </tr>
      <tr>
        <td><strong>Duo Couple Loungers</strong></td>
        <td>${investment.duoQty} seats @ ₹${formatNumber(investment.duoPrice)}/seat</td>
        <td class="num">${formatINR(investment.duoTotal)}</td>
        <td class="num">${formatPercent((investment.duoTotal / investment.totalInvestment) * 100)}</td>
      </tr>
      <tr>
        <td><strong>Franchise Fee</strong></td>
        <td>${inputs.screens} screens @ ₹${formatNumber(investment.franchiseFeePerScreen)}/screen</td>
        <td class="num">${formatINR(investment.franchiseFeeTotal)}</td>
        <td class="num">${formatPercent((investment.franchiseFeeTotal / investment.totalInvestment) * 100)}</td>
      </tr>
      <tr>
        <td><strong>Foyer / Lobby Fit-Out</strong></td>
        <td>${investment.foyerSqft} sq.ft @ ₹${formatNumber(investment.foyerRate)}/sq.ft</td>
        <td class="num">${formatINR(investment.foyerFitoutTotal)}</td>
        <td class="num">${formatPercent((investment.foyerFitoutTotal / investment.totalInvestment) * 100)}</td>
      </tr>
      <tr>
        <td><strong>GST on Capex @ 18%</strong></td>
        <td>Equipment, furniture & interior fit-out goods</td>
        <td class="num">${formatINR(investment.gstCapex)}</td>
        <td class="num">${formatPercent((investment.gstCapex / investment.totalInvestment) * 100)}</td>
      </tr>
      <tr>
        <td><strong>Pre-Opening & Working Capital Reserve</strong></td>
        <td>Launch marketing, staff training, initial working capital</td>
        <td class="num">${formatINR(investment.preOpeningWC)}</td>
        <td class="num">${formatPercent((investment.preOpeningWC / investment.totalInvestment) * 100)}</td>
      </tr>
      <tr class="total-row">
        <td colspan="2"><strong>TOTAL INITIAL CAPITAL INVESTMENT</strong></td>
        <td class="num">${formatINR(investment.totalInvestment)}</td>
        <td class="num">100.0%</td>
      </tr>
    </tbody>
  </table>

  <!-- Revenue & Profit Summary -->
  <div class="section-title">2. Franchisee Profit & Loss Statement (Year 1)</div>
  <table>
    <thead>
      <tr>
        <th>Particular</th>
        <th class="num">Monthly (₹)</th>
        <th class="num">Annual (₹)</th>
        <th class="num">% of Total Income</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ticket Income (Net of GST, Distributor & Royalty)</td>
        <td class="num">${formatINR(ticket.franchiseeTicketM)}</td>
        <td class="num">${formatINR(ticket.franchiseeTicketA)}</td>
        <td class="num">${formatPercent((ticket.franchiseeTicketM / dashboardResults.totalIncomeM) * 100)}</td>
      </tr>
      <tr>
        <td>Food & Beverage Income (Net of 5% GST, 25% COGS & Royalty)</td>
        <td class="num">${formatINR(fnb.franchiseeFnbM)}</td>
        <td class="num">${formatINR(fnb.franchiseeFnbA)}</td>
        <td class="num">${formatPercent((fnb.franchiseeFnbM / dashboardResults.totalIncomeM) * 100)}</td>
      </tr>
      <tr>
        <td>Advertisement Income (Net of Agency Commission & Royalty)</td>
        <td class="num">${formatINR(ad.franchiseeAdM)}</td>
        <td class="num">${formatINR(ad.franchiseeAdA)}</td>
        <td class="num">${formatPercent((ad.franchiseeAdM / dashboardResults.totalIncomeM) * 100)}</td>
      </tr>
      <tr class="highlight-row">
        <td><strong>TOTAL FRANCHISEE COMMERCIAL INCOME</strong></td>
        <td class="num"><strong>${formatINR(dashboardResults.totalIncomeM)}</strong></td>
        <td class="num"><strong>${formatINR(dashboardResults.totalIncomeA)}</strong></td>
        <td class="num"><strong>100.0%</strong></td>
      </tr>
      <tr>
        <td>Property Lease & Mall CAM Charges</td>
        <td class="num">${formatINR(opex.rent + opex.cam)}</td>
        <td class="num">${formatINR((opex.rent + opex.cam) * 12)}</td>
        <td class="num">${formatPercent(((opex.rent + opex.cam) / dashboardResults.totalIncomeM) * 100)}</td>
      </tr>
      <tr>
        <td>Utilities, Power & Facility Operations</td>
        <td class="num">${formatINR(opex.electricity + opex.internet + opex.amc + opex.insurance + opex.admin)}</td>
        <td class="num">${formatINR((opex.electricity + opex.internet + opex.amc + opex.insurance + opex.admin) * 12)}</td>
        <td class="num">${formatPercent(((opex.electricity + opex.internet + opex.amc + opex.insurance + opex.admin) / dashboardResults.totalIncomeM) * 100)}</td>
      </tr>
      <tr>
        <td>Staffing (Projectionists, Box Office, Housekeeping, Security)</td>
        <td class="num">${formatINR(opex.operators + opex.fnbStaff + opex.housekeeping + opex.security)}</td>
        <td class="num">${formatINR((opex.operators + opex.fnbStaff + opex.housekeeping + opex.security) * 12)}</td>
        <td class="num">${formatPercent(((opex.operators + opex.fnbStaff + opex.housekeeping + opex.security) / dashboardResults.totalIncomeM) * 100)}</td>
      </tr>
      <tr>
        <td>Marketing & Promotion (${opex.marketingPct}% auto-scaled)</td>
        <td class="num">${formatINR(opex.marketingM)}</td>
        <td class="num">${formatINR(opex.marketingA)}</td>
        <td class="num">${formatPercent((opex.marketingM / dashboardResults.totalIncomeM) * 100)}</td>
      </tr>
      <tr class="highlight-row">
        <td><strong>TOTAL OPERATING EXPENSES (OPEX)</strong></td>
        <td class="num"><strong>${formatINR(opex.totalOpexM)}</strong></td>
        <td class="num"><strong>${formatINR(opex.totalOpexA)}</strong></td>
        <td class="num"><strong>${formatPercent((opex.totalOpexM / dashboardResults.totalIncomeM) * 100)}</strong></td>
      </tr>
      <tr class="total-row">
        <td><strong style="color: #926d27;">NET OPERATING PROFIT (FRANCHISEE)</strong></td>
        <td class="num"><strong style="color: #926d27;">${formatINR(profit.netProfitM)}</strong></td>
        <td class="num"><strong style="color: #926d27;">${formatINR(profit.netProfitY1)}</strong></td>
        <td class="num"><strong>${formatPercent((profit.netProfitM / dashboardResults.totalIncomeM) * 100)}</strong></td>
      </tr>
    </tbody>
  </table>

  <!-- 3-Year Projection -->
  <div class="section-title">3. Three-Year Financial Trajectory (${inputs.growthPct}% p.a. Growth)</div>
  <table>
    <thead>
      <tr>
        <th>Timeline</th>
        <th class="num">Gross Franchisee Revenue</th>
        <th class="num">Operating Expenses</th>
        <th class="num">Net Profit (Franchisee)</th>
        <th class="num">Cumulative Net Cash Flow</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Year 1 (Base Year)</strong></td>
        <td class="num">${formatINR(projections[0].revenue)}</td>
        <td class="num">${formatINR(projections[0].opex)}</td>
        <td class="num" style="font-weight: 700;">${formatINR(projections[0].netProfit)}</td>
        <td class="num">${formatINR(projections[0].netProfit)}</td>
      </tr>
      <tr>
        <td><strong>Year 2 (+${inputs.growthPct}%)</strong></td>
        <td class="num">${formatINR(projections[1].revenue)}</td>
        <td class="num">${formatINR(projections[1].opex)}</td>
        <td class="num" style="font-weight: 700;">${formatINR(projections[1].netProfit)}</td>
        <td class="num">${formatINR(projections[0].netProfit + projections[1].netProfit)}</td>
      </tr>
      <tr>
        <td><strong>Year 3 (+${inputs.growthPct}%)</strong></td>
        <td class="num">${formatINR(projections[2].revenue)}</td>
        <td class="num">${formatINR(projections[2].opex)}</td>
        <td class="num" style="font-weight: 700;">${formatINR(projections[2].netProfit)}</td>
        <td class="num">${formatINR(projections[0].netProfit + projections[1].netProfit + projections[2].netProfit)}</td>
      </tr>
    </tbody>
  </table>

  <!-- Market Opportunity & Box Office Proof -->
  <div class="two-col">
    <div>
      <div class="section-title">Why ${inputs.state}, Why Now</div>
      <div class="bullet-box">
        ${MARKET_STATISTICS.slice(0, 4)
          .map(
            (m) =>
              `<p>• <strong>${m.metric}:</strong> ${m.value}. ${m.detail} <span class="source-tag">(Source: ${m.source}, ${m.sourceDate})</span></p>`
          )
          .join('')}
      </div>
    </div>
    <div>
      <div class="section-title">Box Office slate & patron demand</div>
      <table>
        <thead>
          <tr>
            <th>Film (Year)</th>
            <th>Opening</th>
            <th>Gross</th>
          </tr>
        </thead>
        <tbody>
          ${BOX_OFFICE_BENCHMARKS.map(
            (b) => `
            <tr>
              <td><strong>${b.film}</strong> (${b.year})<br><small style="color:#64748b">${b.genre}</small></td>
              <td>${b.openingWeekend}</td>
              <td><strong>${b.worldwideGross}</strong></td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
      <div style="font-size: 7.5pt; color: #64748b;">Source: ${BOX_OFFICE_SOURCES}</div>
    </div>
  </div>

  <div class="disclaimer">
    <strong>Important Financial Disclaimer:</strong> All projections are based on the assumptions entered into this model and are intended for discussion and planning purposes only. Actual performance may vary based on location, occupancy, ticket pricing, film performance, operating costs, taxes, commercial terms and other market conditions. This document does not constitute a legal guarantee or representation of returns.
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
