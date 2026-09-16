'use strict';

/**
 * Объединяет два массива объектов по указанному ключу.
 *
 * Если в обоих массивах есть объекты с одинаковым значением ключа,
 * они сливаются в один объект. При совпадении свойств-массивов
 * они объединяются в один массив без дубликатов.
 *
 * Элементы массивов, не являющиеся объектами (null, undefined, числа,
 * строки), а также объекты без указанного ключа — пропускаются.
 *
 * @param {Array<Object>} arr1 - первый массив объектов
 * @param {Array<Object>} arr2 - второй массив объектов
 * @param {string} key - имя ключа, по которому идёт объединение
 *
 * @throws {TypeError} если arr1 или arr2 не массивы
 * @throws {TypeError} если key не является непустой строкой
 *
 * @example
 * const users = [{ id: 1, name: 'Alice' }];
 * const details = [{ id: 1, age: 25 }];
 * mergeBy(users, details, 'id');
 * // [{ id: 1, name: 'Alice', age: 25 }]
 *
 * @example
 * const arr1 = [{ id: 1, tags: ['js', 'react'] }];
 * const arr2 = [{ id: 1, tags: ['react', 'node'] }];
 * mergeBy(arr1, arr2, 'id');
 * // [{ id: 1, tags: ['js', 'react', 'node'] }]
 *
 * @returns {Array<Object>} массив объединённых объектов
 */
const mergeBy = (arr1, arr2, key) => {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new TypeError('mergeBy: arr1 и arr2 должны быть массивами');
    }

    if (typeof key !== 'string' || key.trim().length === 0) {
        throw new TypeError('mergeBy: key должен быть непустой строкой');
    }

    /**
     * Проверяет, является ли значение «простым» объектом:
     * не null, не массив, тип — object.
     *
     * @param {*} value - проверяемое значение
     * @returns {boolean} true, если value — объект (не null и не массив)
     */
    const isPlainObject = value =>
        value !== null && typeof value === 'object' && !Array.isArray(value);

    const resultMap = arr1.reduce((acc, obj) => {
        if (!isPlainObject(obj)) return acc;

        const keyValue = obj[key];
        if (keyValue === undefined) return acc;

        acc[keyValue] = { ...obj };
        return acc;
    }, {});

    arr2.reduce((acc, obj) => {
        if (!isPlainObject(obj)) return acc;

        const keyValue = obj[key];
        if (keyValue === undefined) return acc;

        if (!acc[keyValue]) {
            acc[keyValue] = { ...obj };
            return acc;
        }

        const existing = acc[keyValue];

        Object.entries(obj).forEach(([prop, value]) => {
            if (prop === key) return;

            if (Array.isArray(existing[prop]) && Array.isArray(value)) {
                existing[prop] = [...new Set([...existing[prop], ...value])];
            } else {
                existing[prop] = value;
            }
        });

        return acc;
    }, resultMap);

    return Object.values(resultMap);
};