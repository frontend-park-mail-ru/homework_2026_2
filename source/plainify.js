'use strict';

/**
 * Функция, 'раскрывающая' объект
 * @param {Object} obj - объект
 * 
 * @example
 * // returns { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }
 * plainify({ a: 1, b: { c: 2, d: { e: 3 } }, f: 4 });
 * 
 * @returns {Object}
 */
const plainify = (obj, str = '') => {
    const res = {};

    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(res, plainify(obj[key], `${str}${key}.`));
        } else {
            res[`${str}${key}`] = obj[key];
        }
    }

    return res;
};