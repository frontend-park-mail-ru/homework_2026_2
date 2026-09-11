'use strict';

const NOT_ALLOWED_TYPES = new Set(['symbol', 'function']);

/**
 * Возвращает глубокую копию переданного объекта.
 *
 * Внутри объекта поддерживаются следующие типы данных: number, bigint, string,
 * boolean, null, undefined, Array<*> и Plain Object. Для остальных типов данных
 * выбрасывается ошибка. Объект может быть произвольной вложенности. Не
 * поддерживаются циклические ссылки.
 *
 * @param {Object} obj -- объект для глубокого копирования
 *
 * @example
 * // returns { a: 1, b: { c: 2 } }, но b -- независимая от оригинала копия
 * deepClone({ a: 1, b: { c: 2 } });
 *
 * @throws {TypeError} Если тип obj не входит в список поддерживаемых
 *
 * @returns {Object}
 */
const deepClone = (obj) => {
    const type = obj === null ? 'null' : typeof obj;

    if (NOT_ALLOWED_TYPES.has(type)) {
        throw new TypeError(`Cloning of the following type is not supported: ${type}`);
    }

    if (type !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }
    
    if (Object.getPrototypeOf(obj) === Object.prototype) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
        );
    }

    const constructorName = obj.constructor?.name ?? 'Unknown';
    throw new TypeError(`Cloning of the following type is not supported: ${constructorName}`);
};
