'use strict';

QUnit.module("Тестируем функцию flatten", function() {
    QUnit.test("Работает правильно с плоским массивом", function(assert) {
        const result = flatten([1, 2, 3]);

        assert.deepEqual(result, [1, 2, 3]);
    });

    QUnit.test("Работает правильно с вложенным массивом с несколькими уровнями", function(assert) {
        const result = flatten([1, [2, [3, 4], 5], 6]);
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = flatten([]);
        assert.deepEqual(result, []);
    });

    QUnit.test("Работает правильно с отрицательными числами", function(assert) {
        const result = flatten([[19, -2], [367, -76], [55, 6]]);
        assert.deepEqual(result, [19, -2, 367, -76, 55, 6]);
    });

    QUnit.test("Работает правильно с пустым вложенным массивом", function(assert) {
        const result = flatten([[1, -2], [[], []], [5, 6]]);
        assert.deepEqual(result, [1, -2, 5, 6]);
    });

    QUnit.test("Работает правильно с разными типами данных", function(assert) {
        const result = flatten([1, ["hello", [true, [null]]]]);
        assert.deepEqual(result, [1, "hello", true, null]);
    });

    QUnit.test("Выбрасывает ошибку, если передан null", function(assert) {
        assert.throws(() => flatten(null), TypeError, "передан null");
    });

    QUnit.test("Выбрасывает ошибку, если передан объект", function(assert) {
        assert.throws(() => flatten({ length: 10 }), TypeError, "передан объект-подобие массива");
    });

    QUnit.test("Выбрасывает ошибку, если передан undefined", function(assert) {
        assert.throws(() => flatten(undefined), TypeError, "передан undefined");
    });
});
