/**
 * Validation rules for ConnPlex Financial Inputs
 */

export function validateInputs(inputs) {
  const errors = [];
  const warnings = [];

  // 1. Prospect / Location
  if (!inputs.city || !inputs.city.trim()) {
    warnings.push({ field: 'city', message: 'City is required for localized presentation.' });
  }
  if (!inputs.state || !inputs.state.trim()) {
    warnings.push({ field: 'state', message: 'State is required for regional benchmarks.' });
  }
  if (!inputs.prospectName || !inputs.prospectName.trim()) {
    warnings.push({ field: 'prospectName', message: 'Prospect/Investor name is empty.' });
  }

  // 2. Screens
  const screens = Number(inputs.screens);
  if (!screens || screens <= 0) {
    errors.push({ field: 'screens', message: 'Screen count must be at least 1.' });
  } else if (!Number.isInteger(screens)) {
    errors.push({ field: 'screens', message: 'Screen count must be a whole number.' });
  }

  // 3. Seating
  const totalSeats = (Number(inputs.sofaQty) || 0) + (Number(inputs.reclinerQty) || 0) + (Number(inputs.duoQty) || 0);
  if (totalSeats <= 0) {
    errors.push({ field: 'seating', message: 'At least one seating category must have seats > 0.' });
  }
  if (Number(inputs.sofaPrice) < 0 || Number(inputs.reclinerPrice) < 0 || Number(inputs.duoPrice) < 0) {
    errors.push({ field: 'seatPrices', message: 'Seat prices cannot be negative.' });
  }

  // 4. Capex
  if (Number(inputs.franchiseFeePerScreen) < 0) {
    errors.push({ field: 'franchiseFee', message: 'Franchise fee cannot be negative.' });
  }
  if (Number(inputs.foyerSqft) < 0 || Number(inputs.foyerRate) < 0) {
    errors.push({ field: 'foyer', message: 'Foyer area and fit-out rate cannot be negative.' });
  }
  if (Number(inputs.preOpeningWC) < 0) {
    errors.push({ field: 'preOpeningWC', message: 'Working capital reserve cannot be negative.' });
  }

  // 5. Occupancy
  const wdOcc = Number(inputs.wdOccPct);
  const weOcc = Number(inputs.weOccPct);
  if (wdOcc < 0 || wdOcc > 100) {
    errors.push({ field: 'wdOccPct', message: 'Weekday occupancy must be between 0% and 100%.' });
  }
  if (weOcc < 0 || weOcc > 100) {
    errors.push({ field: 'weOccPct', message: 'Weekend occupancy must be between 0% and 100%.' });
  }
  if (weOcc > 85) {
    warnings.push({ field: 'weOccPct', message: 'Weekend occupancy above 85% may exceed realistic sustainable peaks.' });
  }

  // 6. Pricing & F&B
  if (Number(inputs.wdAtp) <= 0) {
    errors.push({ field: 'wdAtp', message: 'Weekday ATP must be greater than ₹0.' });
  }
  if (Number(inputs.weAtp) <= 0) {
    errors.push({ field: 'weAtp', message: 'Weekend ATP must be greater than ₹0.' });
  }
  if (Number(inputs.fnbRatePerTicket) < 0) {
    errors.push({ field: 'fnbRatePerTicket', message: 'F&B spend per head cannot be negative.' });
  }

  // 7. Deductions & Splits
  if (Number(inputs.distributorPct) < 0 || Number(inputs.distributorPct) > 100) {
    errors.push({ field: 'distributorPct', message: 'Distributor share must be between 0% and 100%.' });
  }
  if (Number(inputs.franchiseeTicketPct) < 0 || Number(inputs.franchiseeTicketPct) > 100) {
    errors.push({ field: 'franchiseeTicketPct', message: 'Franchisee ticket share must be between 0% and 100%.' });
  }

  // 8. OPEX
  const opexKeys = ['rent', 'cam', 'internet', 'electricity', 'amc', 'insurance', 'admin', 'operators', 'fnbStaff', 'housekeeping', 'security'];
  for (const k of opexKeys) {
    if (Number(inputs[k]) < 0) {
      errors.push({ field: k, message: `Operating expense (${k}) cannot be negative.` });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
