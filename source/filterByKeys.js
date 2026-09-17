"use strict";

/**
 * Создаёт новый объект, содержащий глубокую копию указанных полей исходного объекта.
 * Ключи, которых нет в исходном объекте, игнорируются. Исходный объект не мутируется.
 *
 * @param {Object} obj - Исходный объект, из которого будут извлечены поля.
 * @param {Array} keys - Список имён полей, которые нужно клонировать.
 * @returns {Object} Новый объект, содержащий глубокие копии запрошенных полей.
 *                   Если ни один ключ не найден — возвращает пустой объект `{}`.
 *
 * @example
 * // Простой пример с примитивами
 * const source = { name: 'Alice', age: 30, role: 'admin' };
 * filterByKeys(source, ['name', 'age']);
 * // => { name: 'Alice', age: 30 }
 *
 * @example
 * // Глубокое копирование вложенных объектов
 * const source = { user: { profile: { name: 'Bob' } } };
 * const result = filterByKeys(source, ['user']);
 * result.user.profile.name = 'CHANGED';
 * console.log(source.user.profile.name); // 'Bob' — оригинал не изменился
 *
 * @example
 * // Несуществующие ключи игнорируются
 * filterByKeys({ a: 1, b: 2 }, ['a', 'c']);
 * // => { a: 1 }
 */
const filterByKeys = (obj, keys) => {
  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.prototype.toString.call(obj) !== "[object Object]"
  ) {
    throw new TypeError("obj must be a plain object");
  }
  if (!Array.isArray(keys)) {
    throw new TypeError("keys must be an array");
  }
  if (!keys.every(key => ['string', 'number', 'symbol'].includes(typeof key))) {
    throw new TypeError('every key in keys must be string, number or symbol');
  }


  return Object.fromEntries(
    keys
      .filter((key) => key in obj)
      .map((key) => [key, structuredClone(obj[key])]),
  );
};
