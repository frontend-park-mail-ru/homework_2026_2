'use strict';

const OPERATORS = ['+', '-', '*', '/'];

/**
 * Проверяет, является ли токен строковым представлением целого числа.
 * @param {String} token - проверяемый токен
 *
 * @returns {Boolean} true, если токен — целое число (возможно, со знаком)
 */
function isInteger(token) {
    return /^[-+]?\d+$/.test(token);
}

/**
 * Функция, вычисляющая результат выражения, записанного в польской нотации.
 * Поддерживает операторы +, -, *, / и целочисленные операнды.
 * @param {String} input - строка с выражением в префиксной нотации, токены разделены пробелами
 *
 * @throws {TypeError} если input не является строкой
 * @throws {Error} если строка содержит некорректный токен, оператору не хватает операндов,
 * либо операнд имеет некорректный тип
 *
 * @returns {Number} результат вычисления выражения
 *
 * @example
 * polishNotationEvaluator('+ 1 9');
 * // returns 10
 *
 * @example
 * polishNotationEvaluator('* + 2 4 5');
 * // returns 30
 */
function polishNotationEvaluator(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    const tokens = input.trim().split(/\s+/);
    const stack = [];

    tokens.toReversed().forEach((token) => {
        if (OPERATORS.includes(token)) {
            const a = stack.pop();
            const b = stack.pop();

            if (a === undefined || b === undefined) {
                throw new Error(`Not enough operands for operator "${token}"`);
            }

            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error(`Invalid operand type for operator "${token}"`);
            }

            stack.push(applyOperator(token, a, b));
        } else if (isInteger(token)) {
            stack.push(+token);
        } else {
            throw new Error(`Invalid token: "${token}"`);
        }
    });

    return stack.pop();
}
