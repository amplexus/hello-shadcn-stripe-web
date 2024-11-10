export const formatCurrency = (amount = 0, currency = 'AUD') =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumIntegerDigits: 1,
  }).format(amount);


export const roundCurrency = (amount = 0, decimalPlaces = 2) =>
  Math.round(amount * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
