import { shortenText } from '../address';

describe('shortenText', () => {
  test('should return the full text if it is shorter than the sum of frontLength and backLength', () => {
    const text = '1234567';
    expect(shortenText(text)).toBe(text);
  });

  test('should return the text shortened to the front and back length with ellipsis in the middle', () => {
    const text = '1234567890';
    expect(shortenText(text)).toBe('1234...7890');
  });

  test('should return the text shortened to custom front and back lengths', () => {
    const text = '1234567890abcdef';
    const frontLength = 6;
    const backLength = 4;
    expect(shortenText(text, frontLength, backLength)).toBe('123456...cdef');
  });

  test('should handle texts exactly equal to the sum of front and back lengths without shortening', () => {
    const text = '12345678';
    expect(shortenText(text)).toBe(text);
  });

  test('should handle empty strings correctly', () => {
    const text = '';
    expect(shortenText(text)).toBe('');
  });

  test('should handle cases where frontLength or backLength are zero', () => {
    const text = '1234567890';
    expect(shortenText(text, 0, 10)).toBe('1234567890');
    expect(shortenText(text, 10, 0)).toBe('1234567890');
    expect(shortenText(text, 0, 5)).toBe('...67890');
    expect(shortenText(text, 5, 0)).toBe('12345...');
  });

  test('should return the full text if the sum of frontLength and backLength is greater than the text length', () => {
    const text = '12345';
    expect(shortenText(text, 10, 10)).toBe(text);
  });
});
