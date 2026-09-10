'use strict';

/**
 * Генератор, возвращающий первые n чисел последовательности Фибоначчи
 * @param {Number} n - количество чисел Фибоначчи, которые нужно сгенерировать
 *
 * @throws {TypeError} если n не является числом
 *
 * @example
 * // returns [0, 1, 1, 2, 3]
 * [...fibonacciGenerator(5)];
 *
 * @returns {Generator<Number>}
 */
function* fibonacciGenerator(n) {
    if (typeof n !== 'number' || Number.isNaN(n)) {
        throw new TypeError('n должно быть числом');
    }

    let previous = 0;
    let current = 1;

    for (let i = 0; i < n; i++) {
        yield previous;
        [previous, current] = [current, previous + current];
    }
}
