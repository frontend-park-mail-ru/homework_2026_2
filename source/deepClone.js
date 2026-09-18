'use strict';

/**
 * Создает глубокую копию переданного значения.
 *
 * Поддерживаются примитивные значения, массивы и объекты
 * с тегом [object Object]. Для объектов сохраняется исходный прототип.
 * Объекты других типов, например Date, Map, Set и RegExp,
 * считаются неподдерживаемыми.
 *
 * @param {*} value - значение, которое необходимо скопировать
 * @returns {*} глубокая копия переданного значения
 * @throws {TypeError} если передан объект неподдерживаемого типа
 */
const deepClone = (value) => {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(deepClone);
    }

    if (Object.prototype.toString.call(value) !== '[object Object]') {
        throw new TypeError('Unsupported object type');
    }

    const entries = Object.entries(value)
        .map(([key, item]) => [key, deepClone(item)]);

    return Object.assign(
        Object.create(Object.getPrototypeOf(value)),
        Object.fromEntries(entries)
    );
};
