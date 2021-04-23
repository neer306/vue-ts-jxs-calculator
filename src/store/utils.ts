import { OPERATIONS } from '../constants/operations.constant';

export function calculateResult (digits: number[], operations: OPERATIONS[]) {
  return digits.reduce((acc, item, index) => {
    if (index === 0) {
      acc += item;
      return acc;
    }

    const operation = operations[index - 1];

    acc = operation === OPERATIONS.ADDITION ? acc + item : acc - item;

    return acc;
  }, 0);
}
