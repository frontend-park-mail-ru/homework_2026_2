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
 * @throws {TypeError} если obj не является объектом или keys не является массивом
 *
 * @returns {Object}
 */
const filterByKeys = (obj, keys) => {
    if (obj === null || obj === undefined || Object.getPrototypeOf(obj) !== Object.prototype) {
        throw new TypeError('obj должен быть объектом');
    }

    if (!Array.isArray(keys)) {
        throw new TypeError('keys должен быть массивом');
    }

    const keysSet = new Set(keys.map(String));

    return Object.fromEntries(Object.entries(obj).filter(([key]) => keysSet.has(key)));
};
