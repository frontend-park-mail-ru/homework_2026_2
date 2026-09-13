'use strict';

/**
 * Функция, создающая новый массив, отсортированный по 
 * частотности элементов (при одинаковой частотности сортировка по возрастанию)
 * @param {Array<number>} arr - массив чисел
 * 
 * @example
 * // returns [2, 2, 2, 2, 4, 4, 4, 6, 6]
 * sortByFrequency([4, 6, 2, 6, 4, 4, 2, 2, 2]);
 * @returns {Array<number>}
 * @throws {TypeError} - если входной параметр не является массивом или содержит нечисловые элементы
 */
const sortByFrequency = (arr) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    if (arr.some((elem) => typeof elem !== 'number')) {
        throw new TypeError('All elements in the array must be numbers');
    }

    if (!arr.length) {
        return [];
    }
    const frequency = arr.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return [...arr].sort((a, b) => (frequency[b] - frequency[a]) || (a - b));
};
