'use strict';

/**
 * Sorts an array of numbers by their frequency in descending order.
 * If two elements have the same frequency, they are sorted in ascending order.
 *
 * @param {Array<number>} arr - Array of numbers to sort.
 * @throws {TypeError} If the argument is not an array or contains non-number elements.
 * @returns {Array<number>} A new sorted array.
 *
 * @example
 * // returns [2, 2, 2, 2, 4, 4, 4, 6, 6]
 * sortByFrequency([4, 6, 2, 6, 4, 4, 2, 2, 2]);
 *
 * @example
 * // returns [1, 2, 3]
 * sortByFrequency([3, 1, 2]);
 */
const sortByFrequency = (arr) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }

    const areAllNumbers = arr.every((item) =>
        typeof item === 'number' &&
        !Number.isNaN(item)
    );
    if (!areAllNumbers) {
        throw new TypeError('All array elements must be valid numbers');
    }

    if (arr.length <= 1) {
        return [...arr];
    }

    const frequencies = arr.reduce(
        (acc, item) => acc.set(item, (acc.get(item) || 0) + 1),
        new Map()
    );

    return [...arr].sort((a, b) => {
        const freqDiff = frequencies.get(b) - frequencies.get(a);

        return freqDiff || a - b;
    });
};
