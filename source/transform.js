'use strict';

/**
 * Проверяет, что значение - обычный объект или массив, то есть его нужно обходить.
 * Object.prototype.toString возвращает '[object Object]' только для обычных объектов:
 * для null это '[object Null]', для Date - '[object Date]', для Map - '[object Map]'
 * @param {*} value - проверяемое значение
 *
 * @example
 * // returns true
 * isPlainObjectOrArray({ a: 1 });
 *
 * @example
 * // returns false
 * isPlainObjectOrArray(new Date());
 *
 * @returns {boolean}
 */
const isPlainObjectOrArray = (value) => Array.isArray(value)
    || Object.prototype.toString.call(value) === '[object Object]';

/**
 * Рекурсивно применяет функцию преобразования ко всем значениям объекта.
 * Ключи сохраняются, меняются только значения. Вложенные обычные объекты
 * и массивы обрабатываются рекурсивно на любую глубину. Остальные значения,
 * включая null, Date, Map, Set и RegExp, передаются в transformFn целиком.
 * Исходный объект не изменяется - возвращается новый
 *
 * @param {Object|Array} obj - обычный объект или массив
 * @param {Function} transformFn - функция, применяемая к каждому конечному значению
 *
 * @throws {TypeError} Если obj не обычный объект и не массив (например, null, число, Date, Map)
 * @throws {TypeError} Если transformFn не является функцией
 *
 * @example
 * // returns { a: 2, b: 4 }
 * transform({ a: 1, b: 2 }, value => value * 2);
 *
 * @example
 * // returns { a: 2, b: { c: 3 }, d: [2, 3] }
 * transform({ a: 1, b: { c: 2 }, d: [1, 2] }, value => value + 1);
 *
 * @example
 * // returns { when: '1970-01-01T00:00:00.000Z' }
 * transform({ when: new Date(0) }, value => value.toISOString());
 *
 * @returns {Object|Array}
 */
const transform = (obj, transformFn) => {
    if (!isPlainObjectOrArray(obj)) {
        throw new TypeError('Аргумент obj должен быть обычным объектом или массивом');
    }

    if (typeof transformFn !== 'function') {
        throw new TypeError('Аргумент transformFn должен быть функцией');
    }

    /**
     * Преобразует одно значение: вложенный обычный объект или массив обрабатывает
     * рекурсивно, остальное передаёт в transformFn
     * @param {*} value - значение из объекта или элемент массива
     * @returns {*}
     */
    const transformValue = (value) => (isPlainObjectOrArray(value)
        ? transform(value, transformFn)
        : transformFn(value));

    // map возвращает новый массив той же длины
    if (Array.isArray(obj)) {
        return obj.map(transformValue);
    }

    // Разбираем объект на пары [ключ, значение], преобразуем значения и собираем обратно
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, transformValue(value)])
    );
};
