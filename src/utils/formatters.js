/**
 * Financial Formatting Utilities (Indian Rupee / Lakhs / Crores)
 */

export function formatINR(val, options = {}) {
  const num = Number(val);
  if (isNaN(num) || !isFinite(num)) return '₹0';

  const sign = num < 0 ? '-' : '';
  const abs = Math.abs(num);

  if (options.short) {
    if (abs >= 10000000) {
      return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
    }
    if (abs >= 100000) {
      return `${sign}₹${(abs / 100000).toFixed(2)} L`;
    }
    return `${sign}₹${Math.round(abs).toLocaleString('en-IN')}`;
  }

  return `${sign}₹${Math.round(abs).toLocaleString('en-IN')}`;
}

export function formatNumber(val, decimals = 0) {
  const num = Number(val);
  if (isNaN(num) || !isFinite(num)) return '0';
  if (decimals === 0) {
    return Math.round(num).toLocaleString('en-IN');
  }
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(val, decimals = 1) {
  const num = Number(val);
  if (isNaN(num) || !isFinite(num)) return '0.0%';
  return `${num.toFixed(decimals)}%`;
}

export function formatYears(val, decimals = 2) {
  const num = Number(val);
  if (isNaN(num) || !isFinite(num) || num <= 0) return '—';
  return `${num.toFixed(decimals)} yrs`;
}

