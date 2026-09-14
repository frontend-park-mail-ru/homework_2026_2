'use strict';

/**
 * Вычисляет выражение в польской префиксной записи (без рекурсии).
 * @param {string} expression - строка с выражением
 * @returns {number} Результат вычисления выражения или NaN
 *
 * @example
 * // returns 7
 * polishNotationEvaluator('+ 3 4');
 */
const polishNotationEvaluator = function (expression) {
    if (typeof expression !== 'string') {
        return NaN;
    }

    const tokens = expression.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) {
        return NaN;
    }

    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };

    const [stack, error] = tokens.reduceRight(([stack, error], token) => {
        if (error) {
            return [stack, error];
        }

        if (!Number.isNaN(Number(token))) {
            stack.push(Number(token));
            return [stack, false];
        }

        if (!(token in operators) || stack.length < 2) {
            return [stack, true];
        }

        const left = stack.pop();
        const right = stack.pop();
        const result = operators[token](left, right);

        if (Number.isNaN(result)) {
            return [stack, true];
        }

        stack.push(result);
        return [stack, false];
    }, [[], false]);

    return error || stack.length !== 1 ? NaN : stack[0];
};
