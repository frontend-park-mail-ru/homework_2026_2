'use strict';

/**
 * Функция, разворачивающая вложенный массив любой глубины в плоский массив
 * @param {Array} array - массив, который может содержать другие массивы
 *
 * @example
 * // returns [1, 2, 3, 4, 5, 6]
 * flatten([1, [2, [3, 4], 5], 6]);
 *
 * @throws {TypeError} если аргумент не является массивом
 *
 * @returns {Array}
 */
const flatten = array => {
    if (!Array.isArray(array)) {
        throw new TypeError('flatten: ожидается массив');
    }

    return array.reduce((result, item) => {
        if (Array.isArray(item)) {
            result.push(...flatten(item));
        } else {
            result.push(item);
        }

        return result;
    }, []);
};
