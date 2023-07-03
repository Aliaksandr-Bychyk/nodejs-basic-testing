import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList<number>([1, 1, 1, 1]);
    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 1,
        next: {
          value: 1,
          next: {
            value: 1,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList<number>([2, 2, 2, 2]);
    expect(result).toMatchSnapshot();
  });
});
