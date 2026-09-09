'use strict';

/**
 * Функция, возвращающая новый объект, содержащий только указанные ключи исходного объекта
 * @param {Object} obj - исходный объект
 * @param {Array<String>} keys - массив ключей, которые нужно оставить в результирующем объекте
 *
 * @example
 * // returns { a: 1, c: 3 }
 * filterByKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']);
 *
 * @returns {Object}
 */
const filterByKeys = (obj, keys) =>
    Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
