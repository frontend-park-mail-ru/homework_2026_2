'use strict';

/**
 * Кэш вычисленных значений факториала
 * Индекс - число, значение - его факториал
 * @type {number[]}
*/
let factorialCache = [1];

/**
 * Вычисляет факториал неотрицательного целого числа
 * @param {number} num - неотрицательное целое число <= 170
 * @returns {number} - факториал числа num
 * 
 * @example
 * // returns 120
 * factorial(5);
 * 
 * @example
 * // throw Error
 * factorial(-1); 
 */
const factorial = function(num) {

    if (num < 0) {
        throw new Error('Факториал не определен для отрицательных чисел');   
    }
    if (!Number.isInteger(num)) {
        throw new Error(`Факториал не определен для ${num}, тип данных - ${typeof num}`);
    }
    // Проверка на слишком большое число 
    // (из-за 64 битных чисел в JS num > 170 дает ответ Infinity)
    if (num > 170) {
        throw new Error('Число слишком большое');
    }

    // Если такой факториал уже считался берем его
    if (factorialCache[num]) {
        return factorialCache[num];
    }

    // Берем последний вычисленный факториал
    let result = factorialCache[factorialCache.length - 1];
    for (let i = factorialCache.length; i <= num; i++) {
        result *= i;
        // Записываем в кэш вычисленное значение
        factorialCache[i] = result;
    }    
    
    return result;
};
