'use strict';

/**
 * Проверяет, является ли значение объектом, пригодным для рекурсивного объединения.
 *
 * `null` и массивы объектами для целей deepMerge не считаются.
 *
 * @param {*} value - Проверяемое значение.
 * @returns {boolean} `true`, если значение является объектом и не является `null` или массивом.
 *
 * @example
 * isObject({ a: 1 }); // true
 * isObject([1, 2, 3]); // false
 * isObject(null); // false
 * isObject(42); // false
 */
const isObject = (value) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Рекурсивно объединяет два объекта.
 *
 * Если в обоих объектах значения по одинаковому ключу являются объектами,
 * они объединяются рекурсивно.
 *
 * Если хотя бы одно из значений не является объектом, значение из второго
 * объекта перезаписывает значение из первого.
 *
 * Массивы и `null` внутри объектов не объединяются рекурсивно и
 * перезаписываются значением из второго объекта.
 *
 * Аргументы функции должны быть объектами. Если строка, число, `null`,
 * `undefined` или массив переданы вместо объекта, функция выбрасывает TypeError.
 *
 * @param {Object} object1 - Исходный объект.
 * @param {Object} object2 - Объект, значения которого имеют приоритет.
 * @returns {Object} Объединённый объект.
 * @throws {TypeError} Если один из аргументов не является объектом.
 *
 * @example
 * const source = {
 *     user: {
 *         name: 'Alice',
 *         age: 25
 *     },
 *     hobbies: ['reading']
 * };
 *
 * const target = {
 *     user: {
 *         age: 30
 *     },
 *     hobbies: ['traveling']
 * };
 *
 * const result = deepMerge(source, target);
 */
const deepMerge = (object1, object2) => {
    if (!isObject(object1) || !isObject(object2)) {
        throw new TypeError('deepMerge expects two objects');
    }

    const result = { ...object1 };

    for (const [key, value2] of Object.entries(object2)) {
        const value1 = result[key];
        if (isObject(value1) && isObject(value2)) {
            result[key] = deepMerge(value1, value2);
        } else {
            result[key] = value2;
        }
    }

    return result;
};
