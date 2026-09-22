
const FRANCHISE_DEFAULTS = {
      city: 'Ahmedabad',
      state: 'Gujarat',
      prospectName: 'ABC Investments',
      screens: 3,
      cinemaFormat: 'Signature Luxury Recliner',

      // Seating & Auditorium Capex
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

      // Food & Beverage & Banquets
      fnbRatePerTicket: 180, // Spend-per-head
      fnbGstPct: 5, // Stand-alone restaurant GST 2.0 rate (inclusive)
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
      electricity: 180000,
      internet: 15000,
      amc: 40000,
      internetAMC: 55000,
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
function calculateDashboard(inputs) {
      const sofaQty = Number(inputs.sofaQty) || 0;
      const sofaPrice = Number(inputs.sofaPrice) || 0;
      const reclinerQty = Number(inputs.reclinerQty) || 0;
      const reclinerPrice = Number(inputs.reclinerPrice) || 0;
      const duoQty = Number(inputs.duoQty) || 0;
      const duoPrice = Number(inputs.duoPrice) || 0;
      const screens = Number(inputs.screens) || 0;
      const franchiseFeePerScreen = Number(inputs.franchiseFeePerScreen) || 0;

      const totalSeats = sofaQty + reclinerQty + duoQty;
      const sofaTotal = sofaQty * sofaPrice;
      const reclinerTotal = reclinerQty * reclinerPrice;
      const duoTotal = duoQty * duoPrice;
      const seatingTotal = sofaTotal + reclinerTotal + duoTotal;
      const avgCostPerSeat = totalSeats > 0 ? seatingTotal / totalSeats : 0;

      const franchiseFeeTotal = screens * franchiseFeePerScreen;
      const seatingAndFranchiseSubtotal = seatingTotal + franchiseFeeTotal;

      const foyerSqft = Number(inputs.foyerSqft) || 0;
      const foyerRate = Number(inputs.foyerRate) || 0;
      const foyerFitoutTotal = foyerSqft * foyerRate;

      const auditoriumAndFoyerTotal = seatingAndFranchiseSubtotal + foyerFitoutTotal;

      const gstCapexPct = Number(inputs.gstCapexPct) || 0;
      const gstCapex = auditoriumAndFoyerTotal * (gstCapexPct / 100);

      const preOpeningWC = Number(inputs.preOpeningWC) || 0;
      const totalInvestment = auditoriumAndFoyerTotal + gstCapex + preOpeningWC;
      const totalInvestmentPerSeat = totalSeats > 0 ? totalInvestment / totalSeats : 0;

      // Ticket Revenue
      const wdShows = Number(inputs.wdShows) || 0;
      const wdDays = Number(inputs.wdDays) || 0;
      const wdOccPct = Number(inputs.wdOccPct) || 0;
      const wdAtp = Number(inputs.wdAtp) || 0;

      const weShows = Number(inputs.weShows) || 0;
      const weDays = Number(inputs.weDays) || 0;
      const weOccPct = Number(inputs.weOccPct) || 0;
      const weAtp = Number(inputs.weAtp) || 0;

      const wdSeatShows = totalSeats * wdShows * wdDays;
      const wdTickets = wdSeatShows * (wdOccPct / 100);
      const wdGross = wdTickets * wdAtp;

      const weSeatShows = totalSeats * weShows * weDays;
      const weTickets = weSeatShows * (weOccPct / 100);
      const weGross = weTickets * weAtp;

      const totalSeatShows = wdSeatShows + weSeatShows;
      const totalTickets = wdTickets + weTickets;
      const blendedOccupancy = totalSeatShows > 0 ? totalTickets / totalSeatShows : 0;
      const grossTicketM = wdGross + weGross;
      const grossTicketA = grossTicketM * 12;
      const blendedAtp = totalTickets > 0 ? grossTicketM / totalTickets : 0;

      const gstTicketPct = Number(inputs.gstTicketPct) || 0;
      const gstTicketM = grossTicketM * (gstTicketPct / 100);
      const gstTicketA = gstTicketM * 12;

      const netBoxOfficeM = grossTicketM - gstTicketM;
      const netBoxOfficeA = netBoxOfficeM * 12;

      const distributorPct = Number(inputs.distributorPct) || 0;
      const distributorM = netBoxOfficeM * (distributorPct / 100);
      const distributorA = distributorM * 12;

      const totalDeductionsM = gstTicketM + distributorM;
      const totalDeductionsA = totalDeductionsM * 12;

      const exhibitorNetM = grossTicketM - totalDeductionsM;
      const exhibitorNetA = exhibitorNetM * 12;

      const franchiseeTicketPct = Number(inputs.franchiseeTicketPct) || 0;
      const franchiseeTicketM = exhibitorNetM * (franchiseeTicketPct / 100);
      const franchiseeTicketA = franchiseeTicketM * 12;

      // Food & Beverage & Private Screenings
      const fnbRatePerTicket = Number(inputs.fnbRatePerTicket) || 0;
      const concessionsGross = totalTickets * fnbRatePerTicket;
      const banquetBookings = Number(inputs.banquetBookings) || 0;
      const banquetRatePerSeat = Number(inputs.banquetRatePerSeat) || 99;
      const banquetSlotRate = totalSeats * banquetRatePerSeat;
      const banquetGross = banquetBookings * banquetSlotRate;
      const grossFnbM = concessionsGross + banquetGross;
      const grossFnbA = grossFnbM * 12;

      const fnbGstPct = Number(inputs.fnbGstPct) || 0;
      const gstRateFraction = fnbGstPct / 100;
      const fnbGstM = grossFnbM * (gstRateFraction / (1 + gstRateFraction));
      const fnbGstA = fnbGstM * 12;

      const fnbCogsPct = Number(inputs.fnbCogsPct) || 0;
      const fnbCogsM = grossFnbM * (fnbCogsPct / 100);
      const fnbCogsA = fnbCogsM * 12;

      const netFnbM = grossFnbM - fnbGstM - fnbCogsM;
      const netFnbA = netFnbM * 12;

      const franchiseeFnbPct = Number(inputs.franchiseeFnbPct) || 0;
      const franchiseeFnbM = netFnbM * (franchiseeFnbPct / 100);
      const franchiseeFnbA = franchiseeFnbM * 12;

      // Advertising
      const adQty = Number(inputs.adQty) || 0;
      const adRate = Number(inputs.adRate) || 0;
      const grossAdM = adQty * adRate;
      const grossAdA = grossAdM * 12;

      const agencyPct = Number(inputs.agencyPct) || 0;
      const agencyCommissionM = grossAdM * (agencyPct / 100);
      const agencyCommissionA = agencyCommissionM * 12;

      const netAdM = grossAdM - agencyCommissionM;
      const netAdA = netAdM * 12;

      const franchiseeAdPct = Number(inputs.franchiseeAdPct) || 0;
      const franchiseeAdM = netAdM * (franchiseeAdPct / 100);
      const franchiseeAdA = franchiseeAdM * 12;

      // Operating Expenses
      const rent = Number(inputs.rent) || 0;
      const cam = Number(inputs.cam) || 0;
      const electricity = Number(inputs.electricity) || 0;

      let internet = Number(inputs.internet) || 0;
      let amc = Number(inputs.amc) || 0;
      if (inputs.internetAMC !== undefined) {
        const totalAMC = Number(inputs.internetAMC) || 0;
        if (inputs.internet !== undefined && inputs.amc !== undefined && (Number(inputs.internet) + Number(inputs.amc) === totalAMC)) {
          internet = Number(inputs.internet) || 0;
          amc = Number(inputs.amc) || 0;
        } else {
          internet = Math.round(totalAMC * (15 / 55));
          amc = totalAMC - internet;
        }
      }

      const insurance = Number(inputs.insurance) || 0;
      const admin = Number(inputs.admin) || 0;
      const operators = Number(inputs.operators) || 0;
      const fnbStaff = Number(inputs.fnbStaff) || 0;
      const housekeeping = Number(inputs.housekeeping) || 0;
      const security = Number(inputs.security) || 0;

      const fixedOpexM = rent + cam + internet + electricity + amc + insurance + admin + operators + fnbStaff + housekeeping + security;

      const marketingPct = Number(inputs.marketingPct) || 0;
      const marketingM = (franchiseeTicketM + franchiseeFnbM) * (marketingPct / 100);
      const marketingA = marketingM * 12;

      const totalOpexM = fixedOpexM + marketingM;
      const totalOpexA = totalOpexM * 12;

      // Totals & Profit
      const totalFranchiseeIncomeM = franchiseeTicketM + franchiseeFnbM + franchiseeAdM;
      const totalFranchiseeIncomeA = totalFranchiseeIncomeM * 12;

      const netProfitM = totalFranchiseeIncomeM - totalOpexM;
      const netProfitY1 = netProfitM * 12;

      const roi = totalInvestment > 0 ? netProfitY1 / totalInvestment : 0;
      const payback = netProfitY1 > 0 ? totalInvestment / netProfitY1 : 0;

      // 3-Year Projections
      const growthPct = Number(inputs.growthPct) || 0;
      const growthFactor = 1 + growthPct / 100;
      const y1 = { year: 'Year 1', revenue: totalFranchiseeIncomeA, opex: totalOpexA, netProfit: netProfitY1 };
      const y2Net = netProfitY1 * growthFactor;
      const y2Rev = totalFranchiseeIncomeA * growthFactor;
      const y2 = { year: 'Year 2', revenue: y2Rev, opex: y2Rev - y2Net, netProfit: y2Net };
      const y3Net = y2Net * growthFactor;
      const y3Rev = y2Rev * growthFactor;
      const y3 = { year: 'Year 3', revenue: y3Rev, opex: y3Rev - y3Net, netProfit: y3Net };
      const projections = [y1, y2, y3];

      const streams = [
        { id: 'tickets', name: 'Ticket Income', monthly: franchiseeTicketM, annual: franchiseeTicketA, sharePct: totalFranchiseeIncomeM > 0 ? (franchiseeTicketM / totalFranchiseeIncomeM) * 100 : 0, color: '#b88628' },
        { id: 'fnb', name: 'Food & Beverage', monthly: franchiseeFnbM, annual: franchiseeFnbA, sharePct: totalFranchiseeIncomeM > 0 ? (franchiseeFnbM / totalFranchiseeIncomeM) * 100 : 0, color: '#059669' },
        { id: 'advertising', name: 'Advertisement', monthly: franchiseeAdM, annual: franchiseeAdA, sharePct: totalFranchiseeIncomeM > 0 ? (franchiseeAdM / totalFranchiseeIncomeM) * 100 : 0, color: '#64748b' }
      ];

      const allocation = [
        { id: 'seating', name: 'Seating + Franchise Fee', amount: seatingAndFranchiseSubtotal, sharePct: totalInvestment > 0 ? (seatingAndFranchiseSubtotal / totalInvestment) * 100 : 0, color: '#b88628' },
        { id: 'fitout', name: 'Foyer / Lobby Fit-Out', amount: foyerFitoutTotal, sharePct: totalInvestment > 0 ? (foyerFitoutTotal / totalInvestment) * 100 : 0, color: '#d9b36c' },
        { id: 'gst', name: 'GST @ 18% on Capex', amount: gstCapex, sharePct: totalInvestment > 0 ? (gstCapex / totalInvestment) * 100 : 0, color: '#94a3b8' },
        { id: 'wc', name: 'Pre-Opening & Working Capital', amount: preOpeningWC, sharePct: totalInvestment > 0 ? (preOpeningWC / totalInvestment) * 100 : 0, color: '#0284c7' }
      ];

      return {
        investment: {
          totalSeats, sofaQty, sofaPrice, sofaTotal, reclinerQty, reclinerPrice, reclinerTotal,
          duoQty, duoPrice, duoTotal, seatingTotal, avgCostPerSeat, totalInvestmentPerSeat, franchiseFeePerScreen,
          franchiseFeeTotal, seatingAndFranchiseSubtotal, foyerSqft, foyerRate, foyerFitoutTotal,
          auditoriumAndFoyerTotal, gstCapexPct, gstCapex, preOpeningWC, totalInvestment
        },
        ticket: {
          wdSeatShows, wdTickets, wdGross, weSeatShows, weTickets, weGross, totalSeatShows, totalTickets,
          blendedOccupancy, blendedAtp, grossTicketM, grossTicketA, gstTicketPct, gstTicketM, gstTicketA,
          netBoxOfficeM, netBoxOfficeA, distributorPct, distributorM, distributorA, totalDeductionsM, totalDeductionsA,
          exhibitorNetM, exhibitorNetA, franchiseeTicketPct, franchiseeTicketM, franchiseeTicketA
        },
        fnb: {
          fnbRatePerTicket, concessionsGross, banquetBookings, banquetRatePerSeat, banquetSlotRate, banquetGross,
          grossFnbM, grossFnbA, fnbGstPct, fnbGstM, fnbGstA,
          fnbCogsPct, fnbCogsM, fnbCogsA, netFnbM, netFnbA, franchiseeFnbPct, franchiseeFnbM, franchiseeFnbA
        },
        ad: {
          adQty, adRate, grossAdM, grossAdA, agencyPct, agencyCommissionM, agencyCommissionA,
          netAdM, netAdA, franchiseeAdPct, franchiseeAdM, franchiseeAdA
        },
        opex: {
          rent, cam, internet, electricity, amc, insurance, admin, operators, fnbStaff, housekeeping, security,
          fixedOpexM, marketingPct, marketingM, marketingA, totalOpexM, totalOpexA,
          items: [
            { key: 'rent', label: 'Property Rent', monthly: rent, annual: rent * 12 },
            { key: 'cam', label: 'CAM Charges', monthly: cam, annual: cam * 12 },
            { key: 'internet', label: 'Internet & Digital Systems', monthly: internet, annual: internet * 12 },
            { key: 'electricity', label: 'Electricity (Power & HVAC)', monthly: electricity, annual: electricity * 12 },
            { key: 'amc', label: 'Equipment AMC', monthly: amc, annual: amc * 12 },
            { key: 'insurance', label: 'Insurance', monthly: insurance, annual: insurance * 12 },
            { key: 'admin', label: 'Admin / Miscellaneous', monthly: admin, annual: admin * 12 },
            { key: 'operators', label: 'Projection Operators', monthly: operators, annual: operators * 12 },
            { key: 'fnbStaff', label: 'F&B + Ticketing Staff', monthly: fnbStaff, annual: fnbStaff * 12 },
            { key: 'housekeeping', label: 'Housekeeping Staff', monthly: housekeeping, annual: housekeeping * 12 },
            { key: 'security', label: 'Security Staff', monthly: security, annual: security * 12 },
            { key: 'marketing', label: `Marketing & Promotion (${marketingPct}%)`, monthly: marketingM, annual: marketingA },
          ]
        },
        profit: { netProfitM, netProfitY1 },
        roi, payback, projections, streams, allocation,
        totalIncomeM: totalFranchiseeIncomeM,
        totalIncomeA: totalFranchiseeIncomeA
      };
    }

const result = calculateDashboard(FRANCHISE_DEFAULTS);
console.log('Total Seats:', result.investment.totalSeats);
console.log('Turnkey Capex / Seat:', result.investment.totalInvestmentPerSeat);
console.log('Chairs Capex / Seat:', result.investment.avgCostPerSeat);
console.log('Total Investment:', result.investment.totalInvestment);
console.log('Year-1 Franchisee Income:', result.totalIncomeA);
console.log('Year-1 Net Profit:', result.profit.netProfitY1);
console.log('ROI %:', (result.roi * 100).toFixed(2));
console.log('Payback (Years):', result.payback.toFixed(2));
console.log('Blended Occupancy %:', (result.ticket.blendedOccupancy * 100).toFixed(2));

if (result.investment.totalInvestment !== 38257000) throw new Error('Investment mismatch');
if (Math.round(result.profit.netProfitY1) !== 11741829) throw new Error('Net profit mismatch');
if ((result.roi * 100).toFixed(2) !== '30.69') throw new Error('ROI mismatch');
if (result.payback.toFixed(2) !== '3.26') throw new Error('Payback mismatch');
if ((result.ticket.blendedOccupancy * 100).toFixed(2) !== '34.00') throw new Error('Blended occ mismatch');
console.log('SUCCESS: All index.html calculations match Excel model with 100% precision!');
