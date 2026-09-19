'use strict';

function utilPlanify(obj, prefix = '') {
	const result = {};

	for (const key in obj) {
		if (!obj.hasOwnProperty(key)) continue;

		const value = obj[key];
		const path = prefix ? `${prefix}.${key}` : key;

		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			if (Object.keys(value).length === 0) {
				result[path] = {};
			} else {
				Object.assign(result, utilPlanify(value, path));
			}
		} else {
			result[path] = value;
		}
	}

	return result;
}

/**
 * Функция, преобразующая объект с вложенными свойствами в плоский объект
 * @param {Object} obj – объект
 * @param {string} prefix – префикс пути
 *
 * @example
 * // returns {
 *      a: 1,
 *      b.c: 2,
 *      b.d.e: 3,
 *      f: 4
 * }
 * plainify({
 *      a: 1,
 *      b: {
 *          c: 2,
 *          d: {
 *              e: 3
 *          }
 *      },
 *      f: 4
 * })
 *
 * @returns {Object}
 */
function plainify(obj) {
	return utilPlanify(obj);
}
