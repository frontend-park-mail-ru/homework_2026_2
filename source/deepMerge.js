'use strict';

/**
 * Проверяет, является ли значение объектом, который подходит для рекурсивного 
 * объединения (не null и не примитив и не встроенный тип/пользовательский класс).
 *
 * @param {*} value - проверяемое значение
 * @returns {boolean} `true`, если value - объект
 *
 * @example
 * // returns true
 * isValueObject({});    
 *    
 * @example 
 * // returns false
 * isValueObject(null);
 * 
 * @example
 * // returns false
 * isValueObject(42);
 * 
 * @example 
 *  // returns false
 * isValueObject(new Map())        
 */
const isValueObject = (value) => {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
};

/**
 * Глубоко копирует значение: примитивы возвращаются как есть, массивы копируются
 * поэлементно, объекты рекурсивно.
 *
 * @param {*} value - копируемое значение
 * @returns {*} новая структура без общих ссылок с оригиналом
 * 
 * @example
 * // returns [1, 2, 3] (новый массив)
 * cloneValue([1, 2, 3]);
 * 
 * @example
 * // returns { a: { b: 1 } } (новый объект)
 * cloneValue({ a: { b: 1 } });
 */
const cloneValue = (value) => {
    if (Array.isArray(value)) {
        return value.map(cloneValue);
    }

    if (isValueObject(value)) {
        const copy = {};
        for (const key of Object.keys(value)) {
            copy[key] = cloneValue(value[key]);
        }
        return copy;
    }

    return value;
};

/**
 * Функция, которая глубоко объединяется два объекта в один.
 * 
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам 
 * являются объектами, то они должны быть объединены рекурсивно. Если 
 * значения не являются объектами, то значение из второго объекта должно 
 * перезаписывать значение из первого.
 * 
 * @param {*} source - исходный объект; некорректные значения заменяются на {}
 * @param {*} target - целевой объект, значения которого имеют приоритет; некорректные значения игнорируются
 * 
 * @example
 * // returns { a: 1, b: { c: 3, d: 4 } }
 * deepMerge({ a: 1, b: { c: 3 } }, { b: { d: 4 } });
 * 
 * @example
 * // returns { a: 2, b: 3 }
 * deepMerge({ a: 1, b: 3 }, { a: 2 });
 * 
 * @returns {Object} - новый объект, содержащий объединенные свойства
 */
const deepMerge = (source, target) => {
    const safeSource = isValueObject(source) ? source : {};
    const safeTarget = isValueObject(target) ? target : {};

    const merged = cloneValue(safeSource);

    return Object.entries(safeTarget).reduce((merged, [key, targetValue]) => {
            const sourceValue = safeSource[key];

            merged[key] = isValueObject(sourceValue) && isValueObject(targetValue) 
                ? deepMerge(sourceValue, targetValue) 
                : cloneValue(targetValue);

            return merged;
        }, merged);
}
