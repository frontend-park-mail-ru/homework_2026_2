'use strict';

/**
 * Проверяет, является ли значение обычным объектом (не null, не массивом, не датой и т.д.)
 *
 * @param {*} obj - значение для проверки
 * @returns {boolean} true если значение является обычным объектом, иначе false
 *
 * @example
 * isObject({}); // true
 * isObject([]); // false
 * isObject(null); // false
 */
const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Применяет transformFn ко всем значениям объекта obj.
 * Вложенные объекты обрабатывает рекурсивно, массивы - поэлементно.
 *
 * @param {Object} obj - объект для преобразования
 * @param {Function} transformFn - функция преобразования значения
 * @returns {Object} новый объект с преобразованными значениями
 *
 * @example
 * // Вернёт {a: 3, b: [3, 6, 9]}
 * transform({a: 1, b: [1, 2, 3]}, (v) => v * 3);
 *
 * @throws {TypeError} Если первый аргумент не является объектом
 * @throws {TypeError} Если второй аргумент не является функцией
 */
const transform = (obj, transformFn) => {
    if (!isObject(obj)) {
        throw new TypeError('Первый аргумент должен быть объектом (не null, не массивом, не датой и тд)!');
    }
    if (typeof transformFn !== 'function') {
        throw new TypeError('Второй аргумент должен быть функцией!');
    }

    /**
     * Рекурсивно преобразует значение:
     * - массивы обрабатываются поэлементно
     * - объекты обрабатываются рекурсивно
     * - примитивные значения преобразуются через transformFn
     *
     * @param {*} value - значение для преобразования
     * @returns {*} преобразованное значение
     */
    const transformVal = (value) =>
        Array.isArray(value)
            ? value.map(transformVal)
            : isObject(value)
                ? transform(value, transformFn)
                : transformFn(value);

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, transformVal(value)])
    );
}
