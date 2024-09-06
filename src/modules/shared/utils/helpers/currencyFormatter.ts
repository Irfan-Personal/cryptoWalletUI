export function viewAmountInFiat(value: number | string) {
  const amount = truncateNumber(+value, 2).toString();

  const hasDecimal = amount.indexOf('.') !== -1;

  return amount.replace(
    hasDecimal ? /(\d)(?=(.{3})+(?=\.))/g : /(\d)(?=(\d{3})+(?=\.)?$)/g,
    '$1,'
  );
}

export function viewAmountInCrypto(value: number | string) {
  const amount = truncateNumber(+value, 5).toString();

  const hasDecimal = amount.indexOf('.') !== -1;

  return amount.replace(
    hasDecimal ? /(\d)(?=(.{3})+(?=\.))/g : /(\d)(?=(\d{3})+(?=\.)?$)/g,
    '$1,'
  );
}

export function isValidCryptoAmount(value: string | number) {
  if (!value) return false;

  return /^\d+\.?\d{0,5}$/g.test(value.toString());
}

export function isValidFiatAmount(value: string | number) {
  if (!value) return false;

  return /^\d+\.?\d{0,2}$/.test(value.toString());
}

export function truncateNumber(value: number, decimalPlaces: number = 2) {
  if (isNaN(value)) return value;

  if (value < 0) {
    return Math.ceil(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
  }

  return Math.floor(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}
