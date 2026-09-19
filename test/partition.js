/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию partition", function() {
    QUnit.test("Работает правильно при разделении массива на основе предиката", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([1, 2, 3, 4, 5, 6], isEven);

        assert.deepEqual(result, [
            [2, 4, 6],
            [1, 3, 5]
        ]);
    });

    QUnit.test("Работает правильно при разделении с предикатом, возвращающим true для всех элементов", function(assert) {
        const isPositive = num => num > 0;
        const result = partition([1, 2, 3, 4, 5], isPositive);

        assert.deepEqual(result, [
            [1, 2, 3, 4, 5],
            []
        ]);
    });

    QUnit.test("Правильно делит массив объектов по свойству", function(assert) {
        const isAdult = person => person.age >= 18;
        const result = partition([
            { name: "Alice", age: 17 },
            { name: "Bob", age: 20 },
            { name: "Charlie", age: 15 },
            { name: "David", age: 22 }
        ], isAdult);
        assert.deepEqual(result, [
            [
                { name: "Bob", age: 20 },
                { name: "David", age: 22 }
            ],
            [
                { name: "Alice", age: 17 },
                { name: "Charlie", age: 15 }
            ]
        ]);
    });

    QUnit.test("Возвращает два пустых массива для пустого входного массива", function(assert) {
        const result = partition([], () => true);

        assert.deepEqual(result, [[], []]);
    });

    QUnit.test("Возвращает пустой первый массив, если предикат всегда false", function(assert) {
        const isNegative = number => number < 0;
        const result = partition([1, 2, 3, 4], isNegative);

        assert.deepEqual(result, [
            [],
            [1, 2, 3, 4]
        ]);
    });

    QUnit.test("Бросает TypeError, если вместо массива передан null", function(assert) {
        assert.throws(
            () => partition(null, () => true),
            err => err instanceof TypeError && /первый аргумент должен быть массивом/.test(err.message)
        );
    });

    QUnit.test("Бросает TypeError, если предикат — null", function(assert) {
        assert.throws(
            () => partition([1, 2, 3], null),
            err => err instanceof TypeError && /второй аргумент должен быть функцией/.test(err.message)
        );
    });
});




