'use strict';

/**
 * Функция, преобразующая вложенный массив в плоский массив
 * @param {Array} array - массив данных любого типа
 * 
 * @example
 * // returns [1, 2, 3, 4]
 * flatten([1, [2, [3, 4]]]);
 * 
 * @returns {Array}
 */
const flatten = array => {
    if (!Array.isArray(array)) {
        throw new TypeError("Параметр должен быть массивом");
    }

    const arr = [];
    array.forEach(item => {
        Array.isArray(item) ? arr.push(...flatten(item)) : arr.push(item);
    });

    return arr;
};
