'use strict';

/**
 * Проверяет, является ли значение обычным объектом:
 * прототип должен быть Object.prototype.
 *
 * @param {*} value - проверяемое значение.
 * @returns {boolean} true, если значение — обычный объект.
 */
const isPlainObject = (value) =>
    value !== null &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype;

/**
 * Делает поверхностную копию значения, если это объект или массив.
 * Примитивы, функции и Symbol возвращает как есть.
 *
 * @param {*} value - копируемое значение.
 * @returns {*} поверхностная копия объекта/массива или исходное значение.
 */
const shallowCopy = (value) => {
    if (Array.isArray(value)) {
        return value.slice();
    }
    if (value !== null && typeof value === 'object') {
        return { ...value };
    }
    return value;
};

/**
 * Возвращает новый объект, содержащий только те свойства,
 * которые присутствуют в одном из двух объектов, но отсутствуют в другом.
 *
 * Значения свойств-объектов и массивов поверхностно копируются,
 * чтобы результат не делил ссылки с исходными аргументами.
 * Глубокое копирование остаётся на ответственности вызывающего кода.
 *
 * @param {Object} firstObject - первый объект для сравнения.
 * @param {Object} secondObject - второй объект для сравнения.
 * @returns {Object} новый объект с уникальными свойствами.
 * @throws {TypeError} если хотя бы один из аргументов не является обычным объектом.
 *
 * @example
 * // returns { a: 1, d: 5 }
 * findUniqueProperties({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5 });
 */
const findUniqueProperties = (firstObject, secondObject) => {
    if (!isPlainObject(firstObject) || !isPlainObject(secondObject)) {
        throw new TypeError('Оба аргумента должны быть обычными объектами');
    }

    const result = {};

    Object.keys(firstObject).forEach((key) => {
        if (!Object.hasOwn(secondObject, key)) {
            result[key] = shallowCopy(firstObject[key]);
        }
    });

    Object.keys(secondObject).forEach((key) => {
        if (!Object.hasOwn(firstObject, key)) {
            result[key] = shallowCopy(secondObject[key]);
        }
    });

    return result;
};
