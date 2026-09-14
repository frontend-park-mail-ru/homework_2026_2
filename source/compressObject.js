'use strict';

/**
 * Проверяет, является ли значение «простым» объектом (plain object).
 * В отличие от typeof, различает объекты, созданные через new
 * (Map, Set, Date, String, Number и т.д.), по внутренней метке типа:
 * только plain-объект даёт '[object Object]'.
 *
 * @param {*} value - проверяемое значение
 * @returns {Boolean} true, если значение — plain-объект
 */
const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

/**
 * Функция, создающая новый объект без ключей,
 * значения которых равны null, undefined или пустой строке.
 * Вложенные plain-объекты обрабатываются рекурсивно по тем же правилам,
 * объекты, ставшие пустыми после сжатия, удаляются.
 * Если аргумент не является plain-объектом, он возвращается без изменений.
 *
 * @param {Object} [obj] - исходный объект для сжатия
 *
 * @example
 * // returns { name: "Андрей", country: "Россия" }
 * compressObject({
 *     name: "Андрей",
 *     age: null,
 *     city: "",
 *     country: "Россия",
 *     occupation: undefined
 * });
 *
 * @example
 * // returns {}
 * compressObject({ a: { c: undefined, d: null }, b: undefined, c: "" });
 *
 * @returns {Object} новый объект, содержащий только ключи с ненулевыми значениями
 */
const compressObject = (obj) => {
  if (!isPlainObject(obj)) {
    return obj;
  }

  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newValue = isPlainObject(value) ? compressObject(value) : value;

    const isEmpty = newValue === null || newValue === undefined || newValue === '';
    const isEmptyObject = isPlainObject(newValue) && Object.keys(newValue).length === 0;

    if (!isEmpty && !isEmptyObject) {
      result[key] = newValue;
    }
  }

  return result;
};