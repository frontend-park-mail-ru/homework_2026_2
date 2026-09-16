/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    QUnit.test('Работает правильно со строками', (assert) => {
        const originalObject = { name: 'аня', city: 'москва' };
        const transformFunction = (value) => value.toUpperCase();
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { name: 'АНЯ', city: 'МОСКВА' }, 'Строки должны быть в верхнем регистре');
    });

    QUnit.test('Работает правильно с null внутри объекта', (assert) => {
        const originalObject = { a: null, b: 1 };
        const transformFunction = (value) => String(value);
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 'null', b: '1' }, 'null должен попасть в функцию преобразования');
    });

    QUnit.test('Не изменяет исходный объект', (assert) => {
        const originalObject = { a: 1, b: { c: 2 } };
        const transformFunction = (value) => value * 2;
        transform(originalObject, transformFunction);

        assert.deepEqual(originalObject, { a: 1, b: { c: 2 } }, 'Исходный объект и вложенный объект не должны измениться');
    });

    QUnit.test('Не копирует унаследованные свойства', (assert) => {
        const proto = { inherited: 'oops' };
        const originalObject = Object.create(proto);
        originalObject.own = 1;
        const result = transform(originalObject, (value) => value);

        assert.deepEqual(result, { own: 1 }, 'В результате должны быть только собственные свойства');
    });

    QUnit.test('Передаёт вложенные Date и Map в функцию преобразования целиком', (assert) => {
        const originalObject = { when: new Date(), data: new Map([['a', 1]]) };
        const transformFunction = (value) => value.constructor.name;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { when: 'Date', data: 'Map' }, 'Date и Map должны попасть в функцию преобразования');
    });

    QUnit.test('Возвращает пустой объект и пустой массив для пустого входа', (assert) => {
        const transformFunction = (value) => value * 2;

        assert.deepEqual(transform({}, transformFunction), {}, 'Пустой объект');
        assert.deepEqual(transform([], transformFunction), [], 'Пустой массив');
    });

    QUnit.test('Бросает TypeError, если вместо объекта пришёл null, undefined, строка или число', (assert) => {
        const transformFunction = (value) => value * 2;
        const expectedError = new TypeError('Аргумент obj должен быть обычным объектом или массивом');

        assert.throws(() => transform(null, transformFunction), expectedError, 'null - не объект');
        assert.throws(() => transform(undefined, transformFunction), expectedError, 'undefined - не объект');
        assert.throws(() => transform('abc', transformFunction), expectedError, 'Строка - не объект');
        assert.throws(() => transform(42, transformFunction), expectedError, 'Число - не объект');
    });

    QUnit.test('Бросает TypeError, если вместо объекта пришёл Date, Map или Set', (assert) => {
        const transformFunction = (value) => value * 2;
        const expectedError = new TypeError('Аргумент obj должен быть обычным объектом или массивом');

        assert.throws(() => transform(new Date(), transformFunction), expectedError, 'Date - не обычный объект');
        assert.throws(() => transform(new Map([['a', 1]]), transformFunction), expectedError, 'Map - не обычный объект');
        assert.throws(() => transform(new Set([1]), transformFunction), expectedError, 'Set - не обычный объект');
    });

    QUnit.test('Бросает TypeError, если transformFn не функция', (assert) => {
        const expectedError = new TypeError('Аргумент transformFn должен быть функцией');

        assert.throws(() => transform({ a: 1 }), expectedError, 'Функция не передана');
        assert.throws(() => transform({ a: 1 }, 'не функция'), expectedError, 'Вместо функции передана строка');
    });
});
