import { simpleCalculator, Action } from './index';

enum Message {
  Add = 'should add two numbers',
  Subtract = 'should subtract two numbers',
  Divide = 'should divide two numbers',
  Multiply = 'should multiply two numbers',
  Exponentiate = 'should exponentiate two numbers',
  InvalidAction = 'should return null for invalid action',
  InvalidArgs = 'should return null for invalid arguments',
}

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5, message: Message.Add },
  {
    a: 5,
    b: 3,
    action: Action.Subtract,
    expected: 2,
    message: Message.Subtract,
  },
  {
    a: 5,
    b: 3,
    action: Action.Multiply,
    expected: 15,
    message: Message.Multiply,
  },
  { a: 4, b: 2, action: Action.Divide, expected: 2, message: Message.Divide },
  {
    a: 3,
    b: 4,
    action: Action.Exponentiate,
    expected: 81,
    message: Message.Exponentiate,
  },
  { a: 4, b: 2, action: '%', expected: null, message: Message.InvalidAction },
  {
    a: '2',
    b: '2',
    action: Action.Add,
    expected: null,
    message: Message.InvalidArgs,
  },
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    const { a, b, action, expected, message } = testCase;
    test(message, () => {
      const result = simpleCalculator({ a, b, action });
      expected ? expect(result).toBe(expected) : expect(result).toBeNull();
    });
  });
});
