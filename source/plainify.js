'use strict';

/**
 * Проверяет, является ли значение plain-объектом.
 * Отличает {} и Object.create(null) от Date, массивов, примитивов и прочего
 *
 * @param {*} potentialObj — любое значение
 * @returns {boolean} true, если значение — plain-объект
 */
function isPlainObject(potentialObj) {
	return Object.prototype.toString.call(potentialObj) === '[object Object]';
}

/**
 * Возвращает поверхностную копию значения, чтобы результат plainify не ссылался на исходный объект.
 *
 * @param {*} value — любое значение
 * @returns {*} копия значения (для объектов) или само значение (для примитивов)
 */
function clone(value) {
	if (value === null || typeof value !== 'object') return value;
	if (typeof structuredClone === 'function') return structuredClone(value);

	return value;
}

/**
 * Внутренняя рекурсивная реализация {@link plainify}.
 *
 * @param {Object} obj — текущий объект на данном уровне рекурсии
 * @param {string} [prefix=''] — накопленный путь до текущего объекта
 * @returns {Object} плоский объект для поддерева `obj`
 *
 * @example
 * utilPlanify({ c: 2, d: { e: 3 } }, 'b')
 * // returns { 'b.c': 2, 'b.d.e': 3 }
 */
function utilPlanify(obj, prefix = '') {
	const result = {};

	for (const [key, value] of Object.entries(obj)) {
		const path = prefix ? `${prefix}.${key}` : key;

		if (isPlainObject(value)) {
			if (Object.keys(value).length === 0) {
				result[path] = {};
			} else {
				Object.assign(result, utilPlanify(value, path));
			}
		} else {
			result[path] = clone(value);
		}
	}

	return result;
}

/**
 * Преобразует объект с вложенными свойствами в «плоский» объект.
 *
 * Правила преобразования:
 * - Составной ключ собирается через точку: путь до вложенного свойства
 *   становится ключом верхнего уровня. Пример: { b: { d: { e: 3 } } } даёт ключ 'b.d.e'.
 * - Пустой вложенный объект сохраняется как значение по текущему пути: { y: {} } → { y: {} }.
 * - Массив считается значением и не разворачивается по индексам: { arr: [1, 2] } → { arr: [1, 2] }.
 * - Прочие non-plain значения (напр. Date) сохраняются как есть и клонируются.
 * - Исходный объект не мутируется.
 *
 * @param {Object} obj — plain-объект с произвольной вложенностью
 * @returns {Object} новый плоский объект
 * @throws {TypeError} если obj не является plain-объектом (null, число, строка, Date, и т.п.)
 *
 * @example
 * plainify({
 *   a: 1,
 *   b: {
 *     c: 2,
 *     d: { e: 3 }
 *   },
 *   f: 4
 * })
 * // returns { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }
 *
 * @example
 * plainify({ x: 'a', y: {}, z: [1, 2] })
 * // returns { x: 'a', y: {}, z: [1, 2] }
 *
 * @example
 * plainify(null) returns TypeError: Error! Wrong value
 */
function plainify(obj) {
	if (!isPlainObject(obj)) {
		throw new TypeError('Error! Wrong value');
	}

	return utilPlanify(obj);
}
