'use strict';

/**
 * Функция, создающая глубокую копию значения:
 * вложенные объекты и массивы копируются, а не переиспользуются по ссылке
 *
 * Поддерживаются примитивы, обычные объекты, массивы и Date.
 *
 * Ограничения области применения:
 * - прототип не сохраняется: копия объекта пользовательского класса
 *   является обычным объектом
 * - Map, Set, RegExp, а также объекты-обёртки new String и new Number
 *   не поддерживаются: их содержимое лежит во внутренних слотах,
 *   а не в собственных свойствах, поэтому копия окажется пустым объектом
 *   (у new String в копию попадут только индексы символов)
 * - циклические ссылки приводят к переполнению стека
 *
 * @param {*} value - значение любого типа
 *
 * @example
 * // returns { a: 1, b: { c: 2 } }
 * deepClone({ a: 1, b: { c: 2 } });
 *
 * @returns {*}
 */
const deepClone = (value) => {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    if (Array.isArray(value)) {
        return value.map(deepClone);
    }

    return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, deepClone(item)])
    );
};
