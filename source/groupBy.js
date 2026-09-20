'use strict';

/**
 * Функция, группирующая массив объектов по значению указанного ключа
 * @param {Array<Object>} array - массив объектов
 * @param {string} key - ключ для группировки
 * @example
 * // returns { 'A': [{ id: 1, category: 'A' }], 'B': [{ id: 2, category: 'B' }] }
 * groupBy([{ id: 1, category: 'A' }, { id: 2, category: 'B' }], 'category');
 * @returns {Object.<string, Array<Object>>} объект с группами
 * @throws {TypeError} если аргументы имеют неправильный тип
 */
const groupBy = (array, key) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }

    if (typeof key !== 'string' || key.length === 0) {
        throw new TypeError('Второй аргумент должен быть непустой строкой');
    }

    if (array.some(item => Object.prototype.toString.call(item) !== '[object Object]')) {
        throw new TypeError('Все элементы массива должны быть объектами');
    }

    return array.reduce((groups, item) => {
        const groupKey = item[key];

        if (!Object.prototype.hasOwnProperty.call(groups, groupKey)) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(item);

        return groups;
    }, {});
};
