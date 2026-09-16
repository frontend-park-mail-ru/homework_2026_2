'use strict';

/**
 * Группирует массив объектов по заданному полю
 *
 * @param {Object[]} array - Массив объектов, который необходимо сгруппировать
 * @param {string} key - Название поля, по значениям которого будет происходить группировка
 * @returns {Object.<string, Object[]>} - Объект, в котором ключи это уникальные значения указанного свойства, а значения - массивы объектов, соответствующих этому ключу
 * 
 * @example
 * const data = [
 *   { id: 1, category: 'fruit', name: 'apple' },
 *   { id: 2, category: 'vegetable', name: 'carrot' },
 *   { id: 3, category: 'fruit', name: 'banana' }
 * ];
 * 
 * const result = groupBy(data, 'category');
 * // Возвращает:
 * // {
 * //   fruit: [
 * //     { id: 1, category: 'fruit', name: 'apple' },
 * //     { id: 3, category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { id: 2, category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 */
const groupBy = (array, key) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }

    if (typeof key !== 'string') {
        throw new TypeError('Второй аргумент должен быть строкой');
    }

    return array.reduce((result, item) => {
        if (Object.prototype.toString.call(item) !== '[object Object]') {
            throw new TypeError('Все элементы массива должны быть простыми объектами');
        }
        const groupValue = item[key];
        
        if (!result[groupValue]) {
            result[groupValue] = [];
        }
        
        result[groupValue].push(item);
        
        return result;
    }, Object.create(null));
}
