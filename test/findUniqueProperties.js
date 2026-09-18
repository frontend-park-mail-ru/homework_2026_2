'use strict';

QUnit.module('Тестируем функцию findUniqueProperties', function() {
    QUnit.test('Работает правильно для объектов с уникальными свойствами', function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { b: 2, c: 4, d: 5 }
        );

        assert.deepEqual(result, { a: 1, d: 5 }, 'Должны быть уникальные свойства из обоих объектов.');
    });

    QUnit.test('Работает правильно для объекты с отсутствующими свойствами', function(assert) {
        const result = findUniqueProperties(
            { x: 10, y: 20 },
            { y: 20, z: 30 }
        );

        assert.deepEqual(result, { x: 10, z: 30 }, 'Должны быть уникальные свойства x и z.');
    });

    QUnit.test('Работает правильно для идентичных объектов', function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            { a: 1, b: 2 }
        );

        assert.deepEqual(result, {}, 'Идентичные объекты должны вернуть пустой объект.');
    });

    QUnit.test('Работает правильно для двух пустых объектов', function(assert) {
        const result = findUniqueProperties({}, {});

        assert.deepEqual(result, {}, 'Для двух пустых объектов должен возвращаться пустой объект.');
    });

    QUnit.test('Работает правильно в случае, когда один из объектов пустой', function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            {}
        );

        assert.deepEqual(result, { a: 1, b: 2 }, 'Должны вернуться все свойства непустого объекта.');
    });

    QUnit.test('Работает правильно в случае, если у объектов нет общих ключей', function(assert) {
        const result = findUniqueProperties(
            { a: 2, b: 1 },
            { c: 10, d: 20 }
        );

        assert.deepEqual(result, { a: 2, b: 1, c: 10, d: 20 }, 'Два объекта без общих ключей возвращают совокупность своих свойств.');
    });

    QUnit.test('Работает правильно c объектами без прототипа', function(assert) {
        const firstObject = Object.setPrototypeOf({ a: 1, b: 2 }, null);
        const secondObject = Object.setPrototypeOf({ b: 20, c: 3 }, null);

        const result = findUniqueProperties(firstObject, secondObject);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Два объекта без прототипа не меняют ожидаемое поведение функции.');
    });

    QUnit.test('Не выполняет копирование свойств-объектов по ссылке, а делает поверхностное копирование', function(assert) {
        const originalPropertyObject = { username: "daniil", password: "123" };

        const result = findUniqueProperties(
            { 101:  originalPropertyObject},
            { 102: { score: 100, total: 75 } }
        );

        assert.notStrictEqual(
            result[101],
            originalPropertyObject,
            'Свойство-объект результата не должен совпадать по ссылке с исходным'
        );

        result[101].username = "unknown";

        assert.deepEqual(originalPropertyObject, { username: "daniil", password: "123" }, '.');
    });

    QUnit.test('Не выполняет копирование свойства-массива по ссылке, а делает поверхностное копирование', function(assert) {
        const originalArray = [10, 20, 30];

        const result = findUniqueProperties(
            { 101: originalArray },
            { 102: [15, 25, 35] }
        );

        assert.notStrictEqual(
            result[101],
            originalArray,
            'Свойство-массив результата не должно совпадать по ссылке с исходным'
        );

        result[101].push(1231);

        assert.deepEqual(originalArray, [10, 20, 30], 'Исходный массив не изменился после изменения скопированного массива');
    });

    QUnit.test('Выполняет копирование по значению / ссылке для свойств-функции/Symbol', function(assert) {
        const originalSymbol = Symbol('original');
        // eslint-disable-next-line require-jsdoc
        const originalFunction = () => 10;

        const result = findUniqueProperties(
            { 101: originalFunction, 104: originalSymbol },
            { 102: () => 100 }
        );

        assert.strictEqual(
            result[101],
            originalFunction,
            'Свойство-функция передано по ссылке'
        );

        assert.strictEqual(
            result[104],
            originalSymbol,
            'Symbol передан по значению'
        );
    });

    QUnit.test('Выбрасывает исключение, если вместо валидного объекта передан Set', function(assert) {
        assert.throws(
            () => findUniqueProperties(new Set([1, 5, 2]), { a: -7}),
            TypeError,
            'Передача Set в параметры выбрасывает TypeError');
    });

    QUnit.test('Выбрасывает исключение, если вместо валидного объекта передан массив', function(assert) {
        assert.throws(
            () => findUniqueProperties({ a: -7}, [1, 5, 2]),
            TypeError,
            'Передача массива в параметры выбрасывает TypeError');
    });

    QUnit.test('Выбрасывает исключение, если вместо валидного объекта передана строка', function(assert) {
        assert.throws(
            () => findUniqueProperties({ a: -7}, 'объект'),
            TypeError,
            'Передача string в параметры выбрасывает TypeError');
    });

    QUnit.test('Выбрасывает исключение, если вместо валидного объекта передано число', function(assert) {
        assert.throws(
            () => findUniqueProperties(123131, { a: -7}),
            TypeError,
            'Передача number в параметры выбрасывает TypeError');
    });

    QUnit.test('Выбрасывает исключение, если в параметры передан undefined', function(assert) {
        assert.throws(
            () => findUniqueProperties({ a: -7}, undefined),
            TypeError,
            'Передача undefined в параметры выбрасывает TypeError');
    });

    QUnit.test('Выбрасывает исключение, если в параметры передан boolean', function(assert) {
        assert.throws(
            () => findUniqueProperties({ a: -7}, false),
            TypeError,
            'Передача false в параметры выбрасывает TypeError');
    });

    QUnit.test('Выбрасывает исключение, если в параметры передан Map', function(assert) {
        assert.throws(
            () => findUniqueProperties({ a: -7}, new Map()),
            TypeError,
            'Передача false в параметры выбрасывает TypeError');
    });
});
