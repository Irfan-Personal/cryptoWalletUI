import { isEmpty } from '../index';

const emptyCases = [null, undefined, [], {}, ''];
const negativeCases = [[1], { key: 'value' }, 'text', 100];

describe('isEmpty function', () => {
  test('should return true for an empty test cases', () => {
    emptyCases.forEach((item) => {
      expect(isEmpty(item)).toBe(true);
    });
  });

  test('should return false for an not empty test cases', () => {
    negativeCases.forEach((item) => {
      expect(isEmpty(item)).toBe(false);
    });
  });
});
