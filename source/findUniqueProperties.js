'use strict';

/**
 * Проверяет, является ли значение валидным объектом
 * @param {*} value - проверяемое значение
 * @returns {boolean}
 */
const isValidObject = (value) => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Делает поверхностное копирование, если передан объект или массив,
 * но для примитивов и функций ничего не происходит
 * @param {*} value - копируемое значение
 * @returns {*} - поверхностная копия или исходное значение
 */
const shallowCopy = (value) => {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  return Array.isArray(value) ? [...value] : { ...value };
}

/**
 * Функция, которая принимает два объекта и возвращает новый объект,
 * содержащий только те свойства, которые уникальны для каждого из объектов
 *
 * @param {Object} firstObject - первый объект для сравнения
 * @param {Object} secondObject - второй объект для сравнения
 *
 * @example
 * * // returns {cat: 2, hamster: 4}
 * const pets1 = {cat: 2, dog: 1, parrot: 3};
 * const pets2 = {dog: 1, parrot: 3, hamster: 4};
 * findUniqueProperties(pets1, pets2);
 *
 * @returns {Object} новый объект, содержащий только уникальные свойства
 * @throws {TypeError} ошибка, если хотя бы один из аргументов не является валидным объектом
 */
const findUniqueProperties = (firstObject, secondObject) => {
  if (!isValidObject(firstObject) || !isValidObject(secondObject)) {
    throw new TypeError(
      'Оба аргумента функции findUniqueProperties должны быть валидными объектами.',
    );
  }

  const allKeys = [...Object.keys(firstObject), ...Object.keys(secondObject)];

  return allKeys.reduce((resultObject, key) => {
    const inFirst = Object.hasOwn(firstObject, key);
    const inSecond = Object.hasOwn(secondObject, key);

    if (inFirst !== inSecond) {
      resultObject[key] = shallowCopy(inFirst ? firstObject[key] : secondObject[key]);
    }

    return resultObject;
  }, {});
};
