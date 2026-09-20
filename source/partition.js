'use strict';

/**
 * Функция разделяет массив на два подмассива с помощью предиката
 *
 * @param {Array} items - массив произвольных элементов
 * @param {Function} pred - предикат
 *
 * @throws {TypeError} - Если первый аргумент не массив
 * @throws {TypeError} - Если второй аргумент не функция
 *
 * @example
 * // returns [[1,22,25], [10,20]]
 * partition([1, 22, 10, 20, 25], n => n % 10 > 0);
 *
 * @returns {Array<Array>} массив из двух массивов, первый массив - подошедшие элементы, второй - остальные
 *
 */
const partition = (items, pred) => {
  if (!Array.isArray(items)) {
    throw new TypeError('partition: первый аргумент должен быть массивом');
  }
  if (typeof pred !== 'function') {
    throw new TypeError('partition: второй аргумент должен быть функцией');
  }
  return items.reduce(
    (result, item) => {
      result[pred(item) ? 0 : 1].push(item);
      return result;
    },
    [[], []]
  );
};
