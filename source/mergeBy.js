'use strict';

/**
 * Объединяет объекты из двух массивов по значению указанного ключа.
 *
 * Объекты с одинаковым значением ключа сливаются в один: недостающие
 * свойства добавляются из другого объекта, а свойства-массивы объединяются
 * без дубликатов. Объекты, у которых нет указанного ключа, пропускаются.
 *
 * @param {Array<Object>} array1 - первый массив объектов
 * @param {Array<Object>} array2 - второй массив объектов
 * @param {String} key - имя свойства, по которому выполняется объединение
 *
 * @example
 * // returns [
 * //   { id: 1, name: 'Alice', tags: ['friend', 'travel'], age: 30 },
 * //   { id: 2, name: 'Bob', tags: ['colleague'] },
 * //   { id: 3, name: 'Charlie' }
 * // ]
 * mergeBy(
 *     [{ id: 1, name: 'Alice', tags: ['friend'] }, { id: 2, name: 'Bob', tags: ['colleague'] }],
 *     [{ id: 1, age: 30, tags: ['travel'] }, { id: 3, name: 'Charlie' }],
 *     'id'
 * );
 *
 * @returns {Array<Object>} новый массив объединённых объектов
 */
const mergeBy = (array1, array2, key) => {
	if (!Array.isArray(array1) || !Array.isArray(array2) || typeof key !== "string") {
		return [];
	}

	const { result } = [...array1, ...array2].reduce((acc, obj) => {
		if (obj === null || typeof obj !== "object" || !(key in obj)) {
			return acc;
		}

		const keyValue = obj[key];

		if (!acc.indexByKey.has(keyValue)) {
			const cloned = Object.keys(obj).reduce((copy, prop) => {
				copy[prop] = Array.isArray(obj[prop]) ? [...obj[prop]] : obj[prop];
				return copy;
			}, {});

			acc.indexByKey.set(keyValue, acc.result.length);
			acc.result.push(cloned);
			return acc;
		}

		const target = acc.result[acc.indexByKey.get(keyValue)];

		Object.keys(obj).forEach((prop) => {
			const value = obj[prop];

			if (!(prop in target)) {
				target[prop] = Array.isArray(value) ? [...value] : value;
			} else if (Array.isArray(target[prop]) && Array.isArray(value)) {
				target[prop] = [...new Set([...target[prop], ...value])];
			}
		});

		return acc;
	}, { result: [], indexByKey: new Map() });

	return result;
};
