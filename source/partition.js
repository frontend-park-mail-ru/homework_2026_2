/**
 * Функция разделяет массив на два подмассива с помщью предиката
 *
 * @param {Array} alpha_arr - массив произвольных элементов
 * @param {Function} pred - предикат 
 * 
 * @example
 * // returns [[1,22,25], [10,20]]
 * partition([1, 22, 10, 20, 25], n => n % 10 > 0);
 * 
 * @returns {Array<Array>} массив из двух массивов, первый массив - подошедшие элементы, второй - остальные
 * 
 */
const partition = function (alpha_arr, pred) {
  let correct = [];
  let incorrect = [];
  for (let i = 0; i < alpha_arr.length; i++) {
    (pred(alpha_arr[i]) ? correct.push(alpha_arr[i]) : incorrect.push(alpha_arr[i]));
  }
  return [correct, incorrect];
};