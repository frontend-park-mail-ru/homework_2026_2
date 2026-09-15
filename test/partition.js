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
    QUnit.test("Работает правильно при предикате, возвращающем false для всех элементов", function(assert) {
        const isNegative = num => num < 0;
        const result = partition([1, 2, 3], isNegative);

        assert.deepEqual(result, [
            [],
            [1, 2, 3]
        ]);
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = partition([], num => num > 0);

        assert.deepEqual(result, [
            [],
            []
        ]);
    });
    QUnit.test("Выбрасывает ошибку для невалидного массива", function(assert) {
        assert.throws(
            () => partition("not an array", x => x > 0),
            TypeError
        );
    });

    QUnit.test("Выбрасывает ошибку для невалидного предиката", function(assert) {
        assert.throws(
            () => partition([1, 2, 3], "not a function"),
            TypeError
        );
    });
    QUnit.test("Не изменяет исходный массив", function(assert) {
        const array = [1, 2, 3, 4];
        const original = [...array];

        partition(array, x => x % 2 === 0);

        assert.deepEqual(array, original);
    });
    QUnit.test("Выбрасывает ошибку для null и undefined вместо массива", function(assert) {
        assert.throws(
            () => partition(null, x => x > 0),
            TypeError
        );

        assert.throws(
            () => partition(undefined, x => x > 0),
            TypeError
        );
    });
    QUnit.test("Выбрасывает ошибку для не-функции вместо предиката", function(assert) {
        assert.throws(
            () => partition([1, 2, 3], null),
            TypeError
        );

        assert.throws(
            () => partition([1, 2, 3], undefined),
            TypeError
        );
    });
});
