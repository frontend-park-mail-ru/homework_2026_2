'use strict';

/**
 * Функция, проверяющая, является ли значение обычным объектом или массивом
 * @param {*} value - проверяемое значение
 * @returns {Boolean}
 */
const isPlainObjectOrArray = (value) => {
    const type = Object.prototype.toString.call(value);//узнать точный тип объекта 
    return type === '[object Object]' || type === '[object Array]';
};

/**
 * Функция, применяющая преобразование ко всем значениям объекта
 * @param {Object} obj - объект для преобразования
 * @param {Function} transformFn - функция преобразования
 *
 * @example
 * // returns { a: 2, b: { c: 6 } }
 * transform({ a: 1, b: { c: 3 } }, value => value * 2);
 *
 * @returns {Object}
 */
const transform = (obj, transformFn) => {
    if (!isPlainObjectOrArray(obj)) {
        throw new TypeError('obj должен быть объектом');
    }

    if (typeof transformFn !== 'function') {
        throw new TypeError('transformFn должен быть функцией');
    }

    const result = Array.isArray(obj) ? [] : {};

    for (const [key, value] of Object.entries(obj)) {
        if (isPlainObjectOrArray(value)) {
            result[key] = transform(value, transformFn);
        } else {
            result[key] = transformFn(value);
        }
    }

    return result;
};
