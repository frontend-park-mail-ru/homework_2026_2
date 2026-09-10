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

    QUnit.test('Работает правильно с глубокой вложенностью', (assert) => {
        const originalObject = { a: { b: [1, { c: 2 }] }, d: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: { b: [2, { c: 4 }] }, d: 6 }, 'Значения должны преобразовываться на любой глубине');
    });

    QUnit.test('Работает правильно с null', (assert) => {
        const originalObject = { a: null, b: 1 };
        const transformFunction = (value) => String(value);
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 'null', b: '1' }, 'null должен попадать в функцию преобразования');
    });

    QUnit.test('Выбрасывает ошибку, если obj не объект', (assert) => {
        const transformFunction = (value) => value * 2;

        assert.throws(() => transform(undefined, transformFunction), TypeError, 'undefined');
        assert.throws(() => transform(null, transformFunction), TypeError, 'null');
        assert.throws(() => transform('Полина', transformFunction), TypeError, 'строка');
        assert.throws(() => transform(67, transformFunction), TypeError, 'число');
    });

    QUnit.test('Выбрасывает ошибку, если transformFn не функция', (assert) => {
        const originalObject = { a: 1 };

        assert.throws(() => transform(originalObject, undefined), TypeError, 'undefined');
        assert.throws(() => transform(originalObject, null), TypeError, 'null');
        assert.throws(() => transform(originalObject, 'Полина'), TypeError, 'строка');
        assert.throws(() => transform(originalObject, 67), TypeError, 'число');
    });

    QUnit.test('Выбрасывает ошибку для специальных объектов', (assert) => {
        const transformFunction = (value) => value * 2;

        assert.throws(() => transform(new Date(), transformFunction), TypeError, 'Date');
        assert.throws(() => transform(new Map(), transformFunction), TypeError, 'Map');
        assert.throws(() => transform(new Set(), transformFunction), TypeError, 'Set');
        assert.throws(() => transform(new String('Полина'), transformFunction), TypeError, 'String');
        assert.throws(() => transform(new Number(67), transformFunction), TypeError, 'Number');
    });
});
