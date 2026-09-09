'use strict';

/**
 * Функция, создающая новый массив, отсортированный по 
 * частотности элементов (при одинаковой частотности сортировка по возрастанию)
 * @param {Array<Number>} numbers - массив чисел
 * 
 * @example
 * // returns [2, 2, 2, 2, 4, 4, 4, 6, 6]
 * sortByFrequency([4, 6, 2, 6, 4, 4, 2, 2, 2]);
 * 
 * @returns {Array<Number>}
 */
const sortByFrequency = (arr) => {
    if (!arr.length) {
        return [];
    }
    const frequency = arr.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return [...arr].sort((a, b) => frequency[b] - frequency[a] || a - b);
};
