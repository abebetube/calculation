
export function pmt(principal, annualRate, years) {
  if (!principal) return 0;

  const r = annualRate / 100 / 12;
  const n = years * 12;

  if (r === 0) {
    return principal / n;
  }

  return (
    principal *
    ((r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1))
  );
}

export function calculateLoanAmount(
  propertyValue,
  equity
) {
  return Math.max(propertyValue - equity, 0);
}

export function calculateFinancingPercent(
  propertyValue,
  loanAmount
) {
  if (!propertyValue) return 0;

  return (loanAmount / propertyValue) * 100;
}

export function calculateMaxPayment(income) {
  return income * 0.35;
}

export function calculateAvailablePayment(
  maxPayment,
  existingLoans
) {
  return Math.max(
    maxPayment - existingLoans,
    0
  );
}
