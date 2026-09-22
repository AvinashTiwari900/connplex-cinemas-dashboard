/**
 * Pure Financial Calculation Engine for ConnPlex Cinemas
 * Primary Source of Truth: 'ConnPlex Signature - ROI Model (Investor Edition).xlsx'
 */

export function calculateInvestment(inputs) {
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

  return {
    totalSeats,
    sofaQty,
    sofaPrice,
    sofaTotal,
    reclinerQty,
    reclinerPrice,
    reclinerTotal,
    duoQty,
    duoPrice,
    duoTotal,
    seatingTotal,
    avgCostPerSeat,
    totalInvestmentPerSeat,
    franchiseFeePerScreen,
    franchiseFeeTotal,
    seatingAndFranchiseSubtotal,
    foyerSqft,
    foyerRate,
    foyerFitoutTotal,
    auditoriumAndFoyerTotal,
    auditoriumFoyerTotal: auditoriumAndFoyerTotal,
    gstCapexPct,
    gstCapex,
    gstAmount: gstCapex,
    preOpeningWC,
    grandTotal: auditoriumAndFoyerTotal + gstCapex,
    seatingSubtotal: seatingAndFranchiseSubtotal,
    totalInvestment,
  };
}

export function calculateTicketRevenue(inputs, totalSeats) {
  const wdShows = Number(inputs.wdShows) || 0;
  const wdDays = Number(inputs.wdDays) || 0;
  const wdOccPct = Number(inputs.wdOccPct) || 0;
  const wdAtp = Number(inputs.wdAtp) || 0;

  const weShows = Number(inputs.weShows) || 0;
  const weDays = Number(inputs.weDays) || 0;
  const weOccPct = Number(inputs.weOccPct) || 0;
  const weAtp = Number(inputs.weAtp) || 0;

  // Weekdays (Mon-Thu)
  const wdSeatShows = totalSeats * wdShows * wdDays;
  const wdTickets = wdSeatShows * (wdOccPct / 100);
  const wdGross = wdTickets * wdAtp;

  // Weekends (Fri-Sun)
  const weSeatShows = totalSeats * weShows * weDays;
  const weTickets = weSeatShows * (weOccPct / 100);
  const weGross = weTickets * weAtp;

  // Blended totals
  const totalSeatShows = wdSeatShows + weSeatShows;
  const totalTickets = wdTickets + weTickets;
  const blendedOccupancy = totalSeatShows > 0 ? totalTickets / totalSeatShows : 0;
  const grossTicketM = wdGross + weGross;
  const grossTicketA = grossTicketM * 12;
  const blendedAtp = totalTickets > 0 ? grossTicketM / totalTickets : 0;

  // Deductions
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

  return {
    wdSeatShows,
    wdTickets,
    wdGross,
    weSeatShows,
    weTickets,
    weGross,
    totalSeatShows,
    totalTickets,
    blendedOccupancy,
    blendedAtp,
    grossTicketM,
    grossTicketA,
    gstTicketPct,
    gstTicketM,
    gstTicketA,
    netBoxOfficeM,
    netBoxOfficeA,
    distributorPct,
    distributorM,
    distributorA,
    totalDeductionsM,
    totalDeductionsA,
    exhibitorNetM,
    exhibitorNetA,
    franchiseeTicketPct,
    franchiseeTicketM,
    franchiseeTicketA,
  };
}

export function calculateFnbRevenue(inputs, totalTickets, totalSeats = 0) {
  const fnbRatePerTicket = Number(inputs.fnbRatePerTicket) || 0;
  const banquetBookings = Number(inputs.banquetBookings) || 0;
  const banquetRatePerSeat = Number(inputs.banquetRatePerSeat) || 99;

  // In Excel: Rate per private screening = totalSeats * ₹99 (e.g. 200 * 99 = ₹19,800/slot)
  const banquetSlotRate = (totalSeats || 0) * banquetRatePerSeat;
  const banquetGross = banquetBookings * banquetSlotRate;
  const concessionsGross = totalTickets * fnbRatePerTicket;
  const grossFnbM = concessionsGross + banquetGross;
  const grossFnbA = grossFnbM * 12;

  // Stand-alone F&B restaurant GST rate (5% tax-inclusive deduction formula: gross * rate / (1 + rate))
  const fnbGstPct = Number(inputs.fnbGstPct) || 0;
  const gstRateFraction = fnbGstPct / 100;
  const fnbGstM = grossFnbM * (gstRateFraction / (1 + gstRateFraction));
  const fnbGstA = fnbGstM * 12;

  // COGS
  const fnbCogsPct = Number(inputs.fnbCogsPct) || 0;
  const fnbCogsM = grossFnbM * (fnbCogsPct / 100);
  const fnbCogsA = fnbCogsM * 12;

  const netFnbM = grossFnbM - fnbGstM - fnbCogsM;
  const netFnbA = netFnbM * 12;

  const franchiseeFnbPct = Number(inputs.franchiseeFnbPct) || 0;
  const franchiseeFnbM = netFnbM * (franchiseeFnbPct / 100);
  const franchiseeFnbA = franchiseeFnbM * 12;

  return {
    fnbRatePerTicket,
    concessionsGross,
    banquetGross,
    grossFnbM,
    grossFnbA,
    fnbGstPct,
    fnbGstM,
    fnbGstA,
    fnbCogsPct,
    fnbCogsM,
    fnbCogsA,
    netFnbM,
    netFnbA,
    franchiseeFnbPct,
    franchiseeFnbM,
    franchiseeFnbA,
  };
}

export function calculateAdvertisingRevenue(inputs) {
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

  return {
    adQty,
    adRate,
    grossAdM,
    grossAdA,
    agencyPct,
    agencyCommissionM,
    agencyCommissionA,
    netAdM,
    netAdA,
    franchiseeAdPct,
    franchiseeAdM,
    franchiseeAdA,
  };
}

export function calculateOperatingExpenses(inputs, franchiseeTicketM, franchiseeFnbM) {
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

  const fixedOpexM =
    rent + cam + internet + electricity + amc + insurance + admin + operators + fnbStaff + housekeeping + security;

  // Dynamic marketing fee (default 2% of Ticket + F&B franchisee income)
  const marketingPct = Number(inputs.marketingPct) || 0;
  const marketingM = (franchiseeTicketM + franchiseeFnbM) * (marketingPct / 100);
  const marketingA = marketingM * 12;

  const totalOpexM = fixedOpexM + marketingM;
  const totalOpexA = totalOpexM * 12;

  return {
    rent,
    cam,
    internet,
    electricity,
    amc,
    insurance,
    admin,
    operators,
    fnbStaff,
    housekeeping,
    security,
    fixedOpexM,
    marketingPct,
    marketingM,
    marketingA,
    totalOpexM,
    totalOpexA,
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
    ],
  };
}

export function calculateNetProfit(totalIncomeM, totalOpexM) {
  const netProfitM = totalIncomeM - totalOpexM;
  const netProfitY1 = netProfitM * 12;
  return {
    netProfitM,
    netProfitY1,
  };
}

export function calculateROI(netProfitY1, totalInvestment) {
  if (totalInvestment <= 0) return 0;
  return netProfitY1 / totalInvestment;
}

export function calculatePayback(totalInvestment, netProfitY1) {
  if (netProfitY1 <= 0) return 0;
  return totalInvestment / netProfitY1;
}

export function calculateProjections(inputs, totalIncomeA, totalOpexA, netProfitY1) {
  const growthPct = Number(inputs.growthPct) || 0;
  const growthFactor = 1 + growthPct / 100;

  // Year 1
  const y1 = {
    year: 'Year 1',
    revenue: totalIncomeA,
    opex: totalOpexA,
    netProfit: netProfitY1,
  };

  // Year 2 & 3 with assumed annual growth
  const y2Net = netProfitY1 * growthFactor;
  const y2Rev = totalIncomeA * growthFactor;
  const y2Opex = y2Rev - y2Net;
  const y2 = {
    year: 'Year 2',
    revenue: y2Rev,
    opex: y2Opex,
    netProfit: y2Net,
  };

  const y3Net = y2Net * growthFactor;
  const y3Rev = y2Rev * growthFactor;
  const y3Opex = y3Rev - y3Net;
  const y3 = {
    year: 'Year 3',
    revenue: y3Rev,
    opex: y3Opex,
    netProfit: y3Net,
  };

  return [y1, y2, y3];
}

/**
 * Master calculation coordinator:
 * Computes all dependent financial models from inputs
 */
export function calculateDashboard(inputs) {
  const investment = calculateInvestment(inputs);
  const ticket = calculateTicketRevenue(inputs, investment.totalSeats);
  const fnb = calculateFnbRevenue(inputs, ticket.totalTickets, investment.totalSeats);
  const ad = calculateAdvertisingRevenue(inputs);

  const totalFranchiseeIncomeM = ticket.franchiseeTicketM + fnb.franchiseeFnbM + ad.franchiseeAdM;
  const totalFranchiseeIncomeA = totalFranchiseeIncomeM * 12;

  const opex = calculateOperatingExpenses(inputs, ticket.franchiseeTicketM, fnb.franchiseeFnbM);

  const profit = calculateNetProfit(totalFranchiseeIncomeM, opex.totalOpexM);
  const roi = calculateROI(profit.netProfitY1, investment.totalInvestment);
  const payback = calculatePayback(investment.totalInvestment, profit.netProfitY1);

  const projections = calculateProjections(
    inputs,
    totalFranchiseeIncomeA,
    opex.totalOpexA,
    profit.netProfitY1
  );

  // Revenue Streams Mix
  const streams = [
    {
      id: 'tickets',
      name: 'Ticket Income',
      monthly: ticket.franchiseeTicketM,
      annual: ticket.franchiseeTicketA,
      sharePct: totalFranchiseeIncomeM > 0 ? (ticket.franchiseeTicketM / totalFranchiseeIncomeM) * 100 : 0,
      color: '#d9b56d', // Gold
    },
    {
      id: 'fnb',
      name: 'Food & Beverage',
      monthly: fnb.franchiseeFnbM,
      annual: fnb.franchiseeFnbA,
      sharePct: totalFranchiseeIncomeM > 0 ? (fnb.franchiseeFnbM / totalFranchiseeIncomeM) * 100 : 0,
      color: '#4fc3a1', // Emerald
    },
    {
      id: 'advertising',
      name: 'Advertisement',
      monthly: ad.franchiseeAdM,
      annual: ad.franchiseeAdA,
      sharePct: totalFranchiseeIncomeM > 0 ? (ad.franchiseeAdM / totalFranchiseeIncomeM) * 100 : 0,
      color: '#64748b', // Slate
    },
  ];

  // Investment Allocation Breakdown
  const allocation = [
    {
      id: 'seating',
      name: 'Seating + Franchise Fee',
      amount: investment.seatingAndFranchiseSubtotal,
      sharePct: investment.totalInvestment > 0 ? (investment.seatingAndFranchiseSubtotal / investment.totalInvestment) * 100 : 0,
      color: '#d9b56d',
    },
    {
      id: 'fitout',
      name: 'Foyer / Lobby Fit-Out',
      amount: investment.foyerFitoutTotal,
      sharePct: investment.totalInvestment > 0 ? (investment.foyerFitoutTotal / investment.totalInvestment) * 100 : 0,
      color: '#f0d59b',
    },
    {
      id: 'gst',
      name: 'GST @ 18% on Capex',
      amount: investment.gstCapex,
      sharePct: investment.totalInvestment > 0 ? (investment.gstCapex / investment.totalInvestment) * 100 : 0,
      color: '#94a3b8',
    },
    {
      id: 'wc',
      name: 'Pre-Opening & Working Capital',
      amount: investment.preOpeningWC,
      sharePct: investment.totalInvestment > 0 ? (investment.preOpeningWC / investment.totalInvestment) * 100 : 0,
      color: '#38bdf8',
    },
  ];

  return {
    investment,
    ticket,
    fnb,
    ad,
    opex,
    profit,
    roi,
    payback,
    projections,
    streams,
    allocation,
    totalIncomeM: totalFranchiseeIncomeM,
    totalIncomeA: totalFranchiseeIncomeA,
  };
}
