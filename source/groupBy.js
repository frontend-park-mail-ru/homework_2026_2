'use strict';

/**
 * Группирует массив объектов по значению указанного свойства
 * @param {Array<Object>} array - массив объектов
 * @param {string} key - имя свойства для группировки
 * @returns {Object.<string, Array<Object>>} объект с группами
 * @example
 * const data = [
 *   { id: 1, category: 'fruit', name: 'apple' },
 *   { id: 2, category: 'fruit', name: 'banana' },
 *   { id: 3, category: 'vegetable', name: 'carrot' }
 * ];
 * groupBy(data, 'category');
 * // Результат:
 * // {
 * //   fruit: [
 * //     { id: 1, category: 'fruit', name: 'apple' },
 * //     { id: 2, category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { id: 3, category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 */
const groupBy = (array, key) => {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }
    if (typeof key !== 'string' || key.trim() === '') {
        throw new TypeError("Второй аргумент должен быть непустой строкой");
    }
    if (!array.length) {
        return {};
    }
    const result = array.reduce((acc, item) => {
        if (item === null || typeof item !== "object") {
            throw new TypeError("Все элементы массива должны являться объектами");
        } 
        if (!Object.hasOwn(item, key)) {
            throw new TypeError(`У объекта отсутствует поле "${key}"`);
        }
        if (item[key] == null || item[key] === '') {
            throw new TypeError(`Значение поля "${key}" не должно быть пустым`);
        }
        const groupKey = item[key];
        if (Object.hasOwn(acc, groupKey)) {
            acc[groupKey].push(item);
        } else {
            acc[groupKey] = [item];
        }
        return acc;
    }, {});    
    return result;
}
