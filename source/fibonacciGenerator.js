'use strict';

/**
 * Функция-генератор чисел Фибоначчи.
 * Если n <= 0, генератор не отдаёт ни одного значения.
 *
 * @param {number} n - количество требуемых первых чисел Фибоначчи
 *
 * @example
 * // returns [0, 1, 1, 2, 3]
 * const numbers = [...fibonacciGenerator(5)];
 *
 * @throws {TypeError} если n не является числом
 * @throws {RangeError} если n не является целым числом
 *
 * @yields {number} очередное число последовательности Фибоначчи
 * @returns {Generator<number>}
 */
function* fibonacciGenerator(n) {
    if (typeof n !== 'number' || Number.isNaN(n)) {
        throw new TypeError('n должно быть числом');
    }

    if (!Number.isInteger(n)) {
        throw new RangeError('n должно быть целым числом');
    }

    let curr = 0;
    let next = 1;

    for (let i = 0; i < n; i++) {
        yield curr;
        [curr, next] = [next, curr + next];
    }
}
