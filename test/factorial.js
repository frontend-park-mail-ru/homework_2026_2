'use strict';

QUnit.module('Тестируем функцию factorial', function () {
    QUnit.test('Факториал 0 должен быть 1', (assert) => {
        assert.strictEqual(factorial(0), 1, '0! = 1');
    });

    QUnit.test('Факториал 5 должен быть 120', (assert) => {
        assert.strictEqual(factorial(5), 120, '5! = 120');
    });

    QUnit.test("Факториал для отрицательного числа должен выбрасывать ошибку", (assert) => {
        assert.strictEqual(factorial(-1), null, "Возвращает null для -1");
    });

    QUnit.test("Факториал дробного числа должен выбрасывать ошибку", (assert) => {
        assert.strictEqual(factorial(2.5), null, "Возвращает null для 2.5");
    });

    QUnit.test("Факториал строки должен выбрасывать ошибку", (assert) => {
        assert.true(Number.isNaN(factorial("строка")), "Возвращает NaN для строки");
    });

    QUnit.test("Факториал для undefined должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(undefined)), "Возвращает NaN для undefined");
    });

    QUnit.test("Факториал для {} должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial({})), "Возвращает NaN для {}");
    });

    QUnit.test("Факториал для [] должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial([])), "Возвращает NaN для []");
    });

    QUnit.test("Факториал для Date должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(new Date())), "Возвращает NaN для Date");
    });

    QUnit.test("Факториал для Map должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(new Map())), "Возвращает NaN для Map");
    });

    QUnit.test("Факториал для Set должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(new Set())), "Возвращает NaN для Set");
    });

    QUnit.test("Факториал для объекта String должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(new String("строка"))), "Возвращает NaN для объекта String");
    });

    QUnit.test("Факториал для объекта Number должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(new Number(5))), "Возвращает NaN для объекта Number");
    });

    QUnit.test("Факториал для функции должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(() => {})), "Возвращает NaN для функции");
    });

    QUnit.test("Факториал для NaN должен возвращать NaN", (assert) => {
        assert.true(Number.isNaN(factorial(NaN)), "Возвращает NaN для NaN");
    });
});
