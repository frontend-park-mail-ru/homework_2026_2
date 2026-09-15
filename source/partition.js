'use strict';

/**
 * Разделяет массив на два подмассива по предикату.
 * @param {Array<any>} array - исходный массив.
 * @param {function(any): boolean} predicate - функция-предикат.
 * @returns {Array<Array<any>>} два подмассива: подходящие и неподходящие элементы.
 * @throws {TypeError} если array не является массивом или predicate не является функцией.
 * @example
 * partition([1, 2, 3, 4], x => x % 2 === 0);
 * // [[2, 4], [1, 3]]
 */
const partition = (array, predicate) => {
    if (!Array.isArray(array)) {
        throw new TypeError('array должен быть массивом');
    }

    if (typeof predicate !== 'function') {
        throw new TypeError('predicate должен быть функцией');
    }

    return array.reduce(
        (result, element) => {
            result[predicate(element) ? 0 : 1].push(element);
            return result;
        },
        [[], []]
    );
};
