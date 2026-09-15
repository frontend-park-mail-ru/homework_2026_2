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

    QUnit.test('Возвращает два пустых массива для пустого входного массива', function (assert) {
        assert.deepEqual(partition([], (n) => n > 0), [[], []], 'partition([], predicate) === [[], []]');
    });

    QUnit.test('Работает правильно, когда предикат возвращает false для всех элементов', function (assert) {
        assert.deepEqual(partition([1, 2, 3], () => false), [[], [1, 2, 3]], 'все элементы попадают во второй массив');
    });

    QUnit.test('Выбрасывает ошибку, если первый аргумент не массив', function (assert) {
        assert.throws(
            () => partition(null, (n) => n > 0),
            TypeError,
            'partition(null, predicate) выбрасывает TypeError'
        );

        assert.throws(
            () => partition(undefined, (n) => n > 0),
            TypeError,
            'partition(undefined, predicate) выбрасывает TypeError'
        );

        assert.throws(
            () => partition('строка', (n) => n > 0),
            TypeError,
            'partition("строка", predicate) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает ошибку, если второй аргумент не функция', function (assert) {
        assert.throws(
            () => partition([1, 2, 3], null),
            TypeError,
            'partition(array, null) выбрасывает TypeError'
        );

        assert.throws(
            () => partition([1, 2, 3], 'не функция'),
            TypeError,
            'partition(array, "строка") выбрасывает TypeError'
        );
    });
});
