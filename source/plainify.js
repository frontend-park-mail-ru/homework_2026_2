'use strict';

/**
 * Проверяет, является ли значение обычным объектом
 * т.е не null, не массив и не Date, Map, Set
 * @param {*} value - проверяемое значение
 * @returns {boolean}
 */
const isPlainObject = (value) =>
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof Map) &&
    !(value instanceof Set) &&
    !(value instanceof String) &&
    !(value instanceof Number);

/**
 * Собирает плоский объект
 * @param {Object} current - текущий объект
 * @param {string} prefix - строка с ключами
 * @returns {Object}
 */
const flatten = (current, prefix) => {
    const res = {};

    for (const key in current) {
        const value = current[key];
        const path = prefix ? `${prefix}.${key}` : key;

        if (isPlainObject(value)) {
            Object.assign(res, flatten(value, path));
        } else {
            res[path] = value;
        }
    }

    return res;
};

/**
 * Преобразует вложенный объект в плоский, т.е
 * ключи вложенных свойств объединяются через точку в один путь
 *
 * Рекурсивно обходятся только обычные объекты, а
 * null, undefined, функции, массивы и спецобъекты
 * (Date, Map, Set и т.п.) записываются как значения
 *
 * Если на вход передать не обычный объект, выбрасывается TypeError.
 *
 * @param {Object} obj - исходный объект (может содержать вложенные объекты)
 *
 * @example
 * // returns { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }
 * plainify({ a: 1, b: { c: 2, d: { e: 3 } }, f: 4 });
 *
 * @returns {Object} - плоский объект
 * @throws {TypeError} - если на вход передан не обычный объект
 */
const plainify = (obj) => {
    if (!isPlainObject(obj)) {
        throw new TypeError('Expected a plain object');
    }

    return flatten(obj, '');
};
