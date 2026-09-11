'use strict';

/**
 * Функция, проверяющая, что значение является простым объектом,
 * который можно объединять рекурсивно (массивы и null таковыми не считаются)
 * @param {*} value - проверяемое значение
 *
 * @example
 * // returns true
 * isPlainObject({ a: 1 });
 *
 * @example
 * // returns false
 * isPlainObject([ 1, 2, 3 ]);
 *
 * @returns {Boolean}
 */
const isPlainObject = value => Object.prototype.toString.call(value) === '[object Object]';

/**
 * Функция, рекурсивно объединяющая два объекта в новый объект.
 * Значения из второго объекта перезаписывают значения из первого,
 * а если по одному и тому же ключу в обоих объектах лежат простые объекты,
 * то они объединяются рекурсивно. Исходные объекты не изменяются.
 * @param {Object} source - исходный объект
 * @param {Object} target - объект, значения которого имеют приоритет
 *
 * @example
 * // returns { a: { b: 1, c: 3 }, d: 4 }
 * deepMerge({ a: { b: 1, c: 2 } }, { a: { c: 3 }, d: 4 });
 *
 * @throws {TypeError} если хотя бы один из аргументов не является простым объектом
 *
 * @returns {Object}
 */
const deepMerge = (source, target) => {
    if (!isPlainObject(source) || !isPlainObject(target)) {
        throw new TypeError('deepMerge: оба аргумента должны быть простыми объектами');
    }

    const result = { ...source };

    Object.entries(target).forEach(([ key, value ]) => {
        result[key] = isPlainObject(value) && isPlainObject(result[key])
            ? deepMerge(result[key], value)
            : value;
    });

    return result;
};
