'use strict';

QUnit.module("Тестируем функцию polishNotationEvaluator", function() {
    QUnit.test("Правильно вычисляет простое выражения", function(assert) {
        const input = "+ 3 4"; // 3 + 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 7);
    });

    QUnit.test("Правильно вычисляет выражение с несколькими операциями", function(assert) {
        const input = "* + 2 3 4"; // (2 + 3) * 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 20);
    });

    QUnit.test("Правильно вычисляет выражение с отрицательными числами", function(assert) {
        const input = "- 5 + 3 2"; // 5 - (3 + 2)
        const result = polishNotationEvaluator(input);

        assert.equal(result, 0);
    });

    QUnit.test("Правильно вычисляет пустое выражение", function(assert) {
        const input = "";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно вычисляет деление", function(assert) {
        const input = "/ * 8 2 2"; // (8 * 2) / 2
        const result = polishNotationEvaluator(input);

        assert.equal(result, 8);
    });

    QUnit.test("Возвращает Infinity при делении на ноль", function(assert) {
        const input = "/ 9 0";
        const result = polishNotationEvaluator(input);

        assert.equal(result, Infinity);
    });

    QUnit.test("Правильно вычисляет выражения с отрицательными числами", function(assert) {
        const input = "+ -2 3"; // -2 + 3
        const result = polishNotationEvaluator(input);

        assert.equal(result, 1);
    });

    QUnit.test("Правильно вычисляет выражение с лишними пробелами", function(assert) {
        const input = "   +    3     4   ";
        const result = polishNotationEvaluator(input);

        assert.equal(result, 7);
    });

    QUnit.test("Возвращает NaN, если вместо строки число", function(assert) {
        const input = 123;
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Возвращает NaN для невалидных типов входных данных", function(assert) {
        const invalidInputs = [
            123,
            null,
            undefined,
            true,
            '   ',
            'abc',
            '1,2',
            ['+ 1 2'],
        ];

        invalidInputs.forEach(function(input) {
            const result = polishNotationEvaluator(input);
            assert.equal(isNaN(result), true, 'input type: ' + typeof input);
        });
    });

    QUnit.test("Возвращает NaN для пустой строки", function(assert) {
        const input = "";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Возвращает NaN для неизвестного токена", function(assert) {
        const input = "+ 3 abc";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });
});
