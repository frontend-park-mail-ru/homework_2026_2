'use strict';

/**
 * Преобразует вложенный объект в плоский, т.е
 * ключи вложенных свойств объединяются через точку в один путь
 *
 * Рекурсивно обходятся только обычные объекты, а
 * null, undefined, функции и массивы записываются как значения
 * 
 * Если на вход передать не объект то, возвращается {}.
 *
 * @param {Object} obj - исходный объект (может содержать вложенные объекты)
 *
 * @example
 * // returns { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }
 * plainify({ a: 1, b: { c: 2, d: { e: 3 } }, f: 4 });
 *
 * @returns {Object} плоский объект
 */

const plainify = (obj) => {
    /**
     * Если на вход передать не объект то, возвращается {}
     */
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return {};
    }

    /**
     * Собирает плоский объект
     * @param {Object} current - текущий объект
     * @param {string} prefix - строка с ключами
     * @returns {Object}
     */
    const flatten = (current, prefix) => {
        const res = {};

        for (const key in current) {
            const value = current[key];
            const path = prefix ? `${prefix}.${key}` : key;
            const isNestedObject =
                typeof value === 'object' &&
                value !== null &&
                !Array.isArray(value);

            if (isNestedObject) {
                Object.assign(res, flatten(value, path));
            } else {
                res[path] = value;
            }
        }

        return res;
    };

    return flatten(obj, '');
};
