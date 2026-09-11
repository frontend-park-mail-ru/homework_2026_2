'use strict';

/**
 * Функция-генератор чисел Фибоначчи
 * @param {Number} n - количество требуемых первых чисел Фибоначчи
 * 
 * @example
 * // returns [0, 1, 1, 2, 3]
 * [...fibonacciGenerator(5)]
 * 
 *
 * @returns {Generator<Number>}
 * при n <= 0 не отдает значения ([])
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