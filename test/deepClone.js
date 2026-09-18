'use strict';

QUnit.module('Тестируем функцию deepClone', () => {
    QUnit.test('Работает правильного для простого объекта', (assert) => {
        const original = { a: 1, b: 2 };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned, original, 'Копия должна быть независимой от оригинала');
    });

    QUnit.test('Работает правильно для вложенного объекта', (assert) => {
        const original = { a: 1, b: { c: 2 } };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned.b, original.b, 'Вложенный объект должен быть независимым');
    });

    QUnit.test('Работает правильно для массива', (assert) => {
        const original = [1, 2, { a: 3 }];
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия массива должна быть равна оригиналу');
        assert.notStrictEqual(cloned[2], original[2], 'Вложенный объект в массиве должен быть независимым');
    });

    QUnit.test('Работает правильно для глубоко вложенного объекта', (assert) => {
        const original = {
            a: {
                b: {
                    c: 42
                }
            }
        };

        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Объекты содержат одинаковые данные');
        assert.notStrictEqual(cloned.a.b, original.a.b, 'Глубоко вложенный объект скопирован');
    });

    QUnit.test('Работает правильно для объекта с вложенным массивом', (assert) => {
        const original = {
            numbers: [1, 2, 3],
            data: [{ value: 10 }]
        };

        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Структуры содержат одинаковые данные');
        assert.notStrictEqual(cloned.numbers, original.numbers, 'Массив скопирован');
        assert.notStrictEqual(cloned.data[0], original.data[0], 'Объект внутри массива скопирован');
    });

    QUnit.test('Возвращает примитивные значения без изменений', (assert) => {
        assert.strictEqual(deepClone(null), null, 'Корректно обрабатывает null');
        assert.strictEqual(deepClone(undefined), undefined, 'Корректно обрабатывает undefined');
        assert.strictEqual(deepClone('abc'), 'abc', 'Корректно обрабатывает строку');
        assert.strictEqual(deepClone(42), 42, 'Корректно обрабатывает число');
    });

    QUnit.test('Работает правильно для пустых объектов и массивов', (assert) => {
        const originalObject = {};
        const originalArray = [];

        const clonedObject = deepClone(originalObject);
        const clonedArray = deepClone(originalArray);

        assert.deepEqual(clonedObject, originalObject, 'Пустой объект скопирован');
        assert.notStrictEqual(clonedObject, originalObject, 'Создан новый пустой объект');

        assert.deepEqual(clonedArray, originalArray, 'Пустой массив скопирован');
        assert.notStrictEqual(clonedArray, originalArray, 'Создан новый пустой массив');
    });

    QUnit.test('Выбрасывает TypeError для Date', (assert) => {
        assert.throws(
            () => deepClone(new Date('2020-01-02')),
            TypeError,
            'Date считается неподдерживаемым типом'
        );
    });

    QUnit.test('Выбрасывает TypeError для Map', (assert) => {
        assert.throws(
            () => deepClone(new Map([['a', 1]])),
            TypeError,
            'Map считается неподдерживаемым типом'
        );
    });

    QUnit.test('Выбрасывает TypeError для Set', (assert) => {
        assert.throws(
            () => deepClone(new Set([1, 2, 3])),
            TypeError,
            'Set считается неподдерживаемым типом'
        );
    });

    QUnit.test('Выбрасывает TypeError для RegExp', (assert) => {
        assert.throws(
            () => deepClone(/ab+c/g),
            TypeError,
            'RegExp считается неподдерживаемым типом'
        );
    });

    QUnit.test('Выбрасывает TypeError для объектной обёртки String', (assert) => {
        assert.throws(
            () => deepClone(new String('abc')),
            TypeError,
            'Объектная обёртка String считается неподдерживаемым типом'
        );
    });

    QUnit.test('Сохраняет отсутствие прототипа у Object.create(null)', (assert) => {
        const original = Object.create(null);

        original.a = {
            value: 1
        };

        const cloned = deepClone(original);

        assert.strictEqual(
            Object.getPrototypeOf(cloned),
            null,
            'Прототип объекта сохранен'
        );
        assert.strictEqual(cloned.a.value, 1, 'Данные объекта скопированы');
        assert.notStrictEqual(
            cloned.a,
            original.a,
            'Вложенный объект скопирован независимо'
        );
        assert.strictEqual(
            cloned.hasOwnProperty,
            undefined,
            'Object.prototype не был добавлен'
        );
    });

    QUnit.test('Изменение копии не изменяет оригинал', (assert) => {
        const original = {
            nested: {
                value: 1
            },
            items: [{
                id: 1
            }]
        };

        const cloned = deepClone(original);

        cloned.nested.value = 100;
        cloned.items[0].id = 200;

        assert.strictEqual(
            original.nested.value,
            1,
            'Изменение вложенного объекта копии не изменило оригинал'
        );
        assert.strictEqual(
            original.items[0].id,
            1,
            'Изменение объекта внутри массива копии не изменило оригинал'
        );
    });
});
