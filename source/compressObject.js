'use strict';

/**
 * Проверяет, является ли значение "пустым" в рамках компрессии объекта:
 * null, undefined и пустая строка.
 * @param {*} value - проверяемое значение
 * @returns {Boolean}
 */
const isEmpty = (value) => value === null || value === undefined || value === '';

/**
 * Проверяет, является ли значение простым объектом — то есть объектом-литералом
 * или объектом, созданным через Object.create, но не экземпляром класса, Date, Map и другими
 * непростыми объектами.
 * @param {*} obj - проверяемое значение
 * @returns {Boolean}
 */
const isPlainObject = (obj) =>
    Object.prototype.toString.call(obj) === '[object Object]' &&
    (Object.getPrototypeOf(obj) === null || Object.getPrototypeOf(obj).constructor === Object);

/**
 * Функция, создающая новый объект без ключей со значениями null, undefined или пустой строкой.
 * Копирование поверхностное, то есть вложенные объекты и массивы копируются по ссылке, а не клонируются полностью.
 * Изменение вложенного объекта результата повлияет на вложенный объект входного объекта.
 * Функция работает только с простыми объектами. Экземпляры Date, Map и другие
 * встроенные или пользовательские классы не поддерживаются и выдают ошибку.
 * @param {Object} obj - исходный объект
 *
 * @throws {TypeError} если передан не объект или не простой объект (Date, Map и др.)
 *
 * @example
 * // returns { a: 3, c: 'javascript' }
 * compressObject({ a: 3, b: '', c: 'javascript', d: undefined, e: null });
 *
 * @returns {Object}
 */
const compressObject = (obj) => {
    if (!isPlainObject(obj)) {
        throw new TypeError('compressObject: ожидается обычный объект');
    }

    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => !isEmpty(value))
    );
};
