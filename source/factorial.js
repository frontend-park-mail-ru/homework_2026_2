'use strict';

/** Наибольшее n, для которого n! ещё помещается в Number: 171! уже больше Number.MAX_VALUE */
const MAX_N = 170;

/** Уже вычисленные факториалы: в ячейке с индексом k хранится k! */
const factorials = [1];

/**
 * Функция, вычисляющая факториал неотрицательного целого числа.
 * Уже вычисленные значения запоминаются и при повторных вызовах не пересчитываются
 * @param {Number} n - неотрицательное целое число
 *
 * @example
 * // returns 120
 * factorial(5);
 *
 * @throws {TypeError} если n не является целым числом
 * @throws {RangeError} если n отрицательное
 *
 * @returns {Number} факториал числа n (Infinity, если он больше Number.MAX_VALUE)
 */
const factorial = (n) => {
    if (!Number.isInteger(n)) {
        throw new TypeError('Факториал определен только для целых чисел');
    }

    if (n < 0) {
        throw new RangeError('Факториал не определен для отрицательных чисел');
    }

    if (n > MAX_N) {
        return Infinity;
    }

    // Досчитываем недостающие значения, начиная с последнего известного
    for (let i = factorials.length; i <= n; i++) {
        factorials.push(factorials[i - 1] * i);
    }

    return factorials[n];
};
