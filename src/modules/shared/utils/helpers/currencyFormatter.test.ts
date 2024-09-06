import {
  isValidCryptoAmount,
  isValidFiatAmount,
  truncateNumber,
  viewAmountInCrypto,
  viewAmountInFiat,
} from './currencyFormatter';

describe('CurrencyFormatter', () => {
  describe('viewAmountInFiat', () => {
    const fuzzyData = [
      { value: 2000000, expected: '2,000,000' },
      { value: 2000000.22333, expected: '2,000,000.22' },
      { value: 2000000.22, expected: '2,000,000.22' },
      { value: -2000000.22, expected: '-2,000,000.22' },
      { value: -2000000.22333, expected: '-2,000,000.22' },
      { value: -2000000, expected: '-2,000,000' },

      { value: 0.12, expected: '0.12' },
      { value: 0.22333, expected: '0.22' },
      { value: 0, expected: '0' },
      { value: 200.22333, expected: '200.22' },
      { value: 200, expected: '200' },
      { value: -0.12, expected: '-0.12' },
      { value: -0.22333, expected: '-0.22' },
      { value: -200.22333, expected: '-200.22' },
      { value: -200, expected: '-200' },
    ];

    test.each(fuzzyData)(
      '($value) should be formatted to a fiat value as $expected',
      ({ value, expected }) => {
        expect(viewAmountInFiat(value)).toBe(expected);
      }
    );
  });

  describe('viewAmountInCrypto', () => {
    const fuzzyData = [
      { value: 2000000, expected: '2,000,000' },
      { value: 2000000.22333, expected: '2,000,000.22333' },
      { value: 2000000.22, expected: '2,000,000.22' },
      { value: 2000000.2233333, expected: '2,000,000.22333' },
      { value: -2000000, expected: '-2,000,000' },
      { value: -2000000.22333, expected: '-2,000,000.22333' },
      { value: -2000000.22, expected: '-2,000,000.22' },
      { value: -2000000.2233333, expected: '-2,000,000.22333' },

      { value: 0.12, expected: '0.12' },
      { value: 0.22333, expected: '0.22333' },
      { value: 0.22333111, expected: '0.22333' },
      { value: 200.22333, expected: '200.22333' },
      { value: 0, expected: '0' },
      { value: 200.22333, expected: '200.22333' },
      { value: 200.223332222, expected: '200.22333' },
      { value: 200, expected: '200' },
      { value: -0.12, expected: '-0.12' },
      { value: -0.22333, expected: '-0.22333' },
      { value: -0.22333111, expected: '-0.22333' },
      { value: -200.22333, expected: '-200.22333' },
      { value: -200.22333, expected: '-200.22333' },
      { value: -200.223332222, expected: '-200.22333' },
      { value: -200, expected: '-200' },
    ];

    test.each(fuzzyData)(
      '($value) should be formatted to a crypto value as $expected',
      ({ value, expected }) => {
        expect(viewAmountInCrypto(value)).toBe(expected);
      }
    );
  });

  describe('isValidCryptoAmount', () => {
    const fuzzyData = [
      { value: 2000000.23232333, expected: false },
      { value: 0.00000000000001, expected: false },
      { value: 0, expected: false },

      { value: 2000000, expected: true },
      { value: 0.11, expected: true },
      { value: 0.0001, expected: true },
      { value: 10.11, expected: true },
      { value: 10.00001, expected: true },
    ];

    test.each(fuzzyData)(
      'Crypto amount validity of ($value) should be $expected',
      ({ value, expected }) => {
        if (!expected) return expect(isValidFiatAmount(value)).toBeFalsy();
        expect(isValidCryptoAmount(value)).toBeTruthy();
      }
    );
  });

  describe('isValidFiatAmount', () => {
    const fuzzyData = [
      { value: 2000000.2323233322, expected: false },
      { value: 0.001, expected: false },
      { value: 0, expected: false },

      { value: 2000000, expected: true },
      { value: 0.11, expected: true },
      { value: 1000000000.11, expected: true },
    ];

    test.each(fuzzyData)(
      'fiat amount validity of ($value) should be $expected',
      ({ value, expected }) => {
        if (!expected) return expect(isValidFiatAmount(value)).toBeFalsy();
        expect(isValidFiatAmount(value)).toBeTruthy();
      }
    );
  });

  describe('truncateNumber', () => {
    const fuzzyData = [
      { value: 2000000, expected: 2000000 },
      { value: 2000000.222, expected: 2000000.22 },
      { value: 2000000.22, expected: 2000000.22 },
      { value: 0.22, expected: 0.22 },
      { value: 2000000.22, expected: 2000000.22, precision: 4 },
      { value: 2000000.2222, expected: 2000000.2222, precision: 4 },
      { value: 2000000.22222, expected: 2000000.2222, precision: 4 },
      { value: 2000000.2, expected: 2000000, precision: 0 },
      { value: 2000000.2, expected: 2000000, precision: -1 },
    ];

    test.each(fuzzyData)(
      '($value) should be correctly truncated.',
      ({ value, expected, precision }) => {
        expect(truncateNumber(value, precision)).toBe(expected);
      }
    );
  });
});
