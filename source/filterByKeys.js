'use strict';

/**
 * Функция, возвращающая новый объект, содержащий только указанные ключи исходного объекта
 * @param {Object} obj - исходный объект
 * @param {Array<String|Number>} keys - массив ключей, которые нужно оставить в результирующем объекте
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
    // typeof + null не отсеивает "объекты-обёртки" вроде new Number(4) -
    // у них typeof === 'object', но Object.entries() для них вернёт пусто,
    // поэтому дополнительно проверяем, что это именно обычный объект
    if (typeof obj !== 'object' || obj === null || Object.prototype.toString.call(obj) !== '[object Object]') {
        throw new TypeError('obj должен быть объектом');
    }

    if (!Array.isArray(keys)) {
        throw new TypeError('keys должен быть массивом');
    }

    // Ключи объекта в JS всегда строки, поэтому приводим элементы keys
    // к строкам тоже - иначе числовой ключ 0 не совпадёт со строковым '0'
    const keysSet = new Set(keys.map(String));

    return Object.fromEntries(Object.entries(obj).filter(([key]) => keysSet.has(key)));
};
