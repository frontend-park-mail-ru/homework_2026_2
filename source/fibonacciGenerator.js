'use strict';

/**
 * Функция-генератор чисел Фибоначчи
 * Если n <= 0, генератор не отдаёт ни одного значения.
 * 
 * @param {number} n - количество требуемых первых чисел Фибоначчи
 * 
 * @example
 * // returns [0, 1, 1, 2, 3]
 * const numbers = [...fibonacciGenerator(5)];
 * 
 * @yields {number} очередное число последовательности Фибоначчи
 * @returns {Generator<number>}
 */
function* fibonacciGenerator(n) {
    if (n <= 0) return;

    let curr = 0;
    let next = 1;

    for (let i = 0; i < n; i++) {
        yield curr;
        [curr, next] = [next, curr + next];
    }
}
