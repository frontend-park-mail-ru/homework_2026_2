'use strict';

/**
 * Функция, выполняющая арифметическую операцию над двумя операндами по заданному оператору.
 * @param {String} operator - один из операторов: '+', '-', '*', '/'
 * @param {Number} a - первый операнд
 * @param {Number} b - второй операнд
 *
 * @returns {Number} результат операции
 */
function applyOperator(operator, a, b) {
    const operations = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
    };

    return operations[operator](a, b);
}
