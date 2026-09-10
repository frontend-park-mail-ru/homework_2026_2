'use strict';

/**
 * Проверяет, является ли значение обычным объектом-литералом
 * @param {*} value - проверяемое значение
 * @returns {boolean}
 */
const isPlainObject = (value) => (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && Object.prototype.toString.call(value) === '[object Object]'
);

/**
 * Рекурсивно разворачивает вложенный объект
 * @param {Object} obj - текущий уровень объекта
 * @param {string} [prefix=''] - префикс ключа
 * @returns {Object}
 */
const flatten = (obj, prefix = '') => {
    const result = {};

    Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (isPlainObject(value)) {
            Object.assign(result, flatten(value, fullKey));
        } else {
            result[fullKey] = value;
        }
    });

    return result;
};

/**
 * Функция, преобразующая вложенный объект в plain-объект.
 * Собственные вложенные объекты разворачиваются в ключи с точкой (например, `b.c`).
 * Массивы, null и undefined сохраняются как значения и не разворачиваются.
 * Date, Map, Set, RegExp и другие встроенные объекты тоже сохраняются как значения:
 * у них нет собственных перечисляемых полей для Object.entries, поэтому разворачивать их нельзя.
 * Исходный объект не изменяется. Значения в результате — ссылки на те же данные
 * (массивы и другие не-объектные значения не копируются глубоко).
 * Если точка уже есть в ключе и совпадает с путём из вложенности (например, `'a.b'` и `a: { b: ... }`),
 * ключи считаются одинаковыми — побеждает последнее записанное значение.
 *
 * @param {Object} originalObject - объект с вложенными свойствами
 *
 * @example
 * // returns { a: 1, 'b.c': 2 }
 * plainify({ a: 1, b: { c: 2 } });
 *
 * @returns {Object} plain-объект или пустой объект при некорректном входе
 */
const plainify = (originalObject) => {
    if (!isPlainObject(originalObject)) {
        return {};
    }

    return flatten(originalObject);
};
