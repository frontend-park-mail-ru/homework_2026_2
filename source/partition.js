'use strict';

/**
 * Функция, разделяющая массив на две части в зависимости от предиката
 * @param {Array} array - исходный массив
 * @param {Function} predicate - функция-предикат, принимающая элемент массива
 * и возвращающая true или false
 *
 * @example
 * // returns [[1, 3], [2, 4]]
 * partition([1, 2, 3, 4], (n) => n % 2 !== 0);
 *
 * @throws {TypeError} если array не является массивом
 * @throws {TypeError} если predicate не является функцией
 *
 * @returns {Array<Array>} массив из двух массивов: [подходящие, неподходящие]
 */
const partition = (array, predicate) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Первым аргументом должен быть массив');
    }

    if (typeof predicate !== 'function') {
        throw new TypeError('Вторым аргументом должна быть функция-предикат');
    }

    return array.reduce(
        (acc, item) => {
            acc[predicate(item) ? 0 : 1].push(item);
            return acc;
        },
        [[], []]
    );
};
