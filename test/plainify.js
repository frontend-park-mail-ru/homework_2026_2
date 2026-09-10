'use strict';

QUnit.module('Тестируем функцию plainify', () => {
    QUnit.test('Работает правильно с вложенным объектом', (assert) => {
        const originalObject = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            },
            f: 4
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }, 'Объект должен быть преобразован в plain');
    });

    QUnit.test('Работает правильно с пустым объектом', (assert) => {
        const originalObject = {};
        const result = plainify(originalObject);

        assert.deepEqual(result, {}, 'Пустой объект должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно с объектом, содержащим примитивы', (assert) => {
        const originalObject = {
            x: 'hello',
            y: 42,
            z: { a: 1, b: 2 }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { x: 'hello', y: 42, 'z.a': 1, 'z.b': 2 }, 'Примитивы и вложенные объекты должны быть правильно преобразованы');
    });

    QUnit.test('Работает правильно с объектом без вложенности', (assert) => {
        const originalObject = { a: 1, b: 'test', c: true };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: 1, b: 'test', c: true }, 'Объект без вложенности должен остаться без изменений');
    });

    QUnit.test('Работает правильно с несколькими ветками вложенности', (assert) => {
        const originalObject = {
            a: { b: 1 },
            c: { d: { e: 2 } },
            f: 3
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { 'a.b': 1, 'c.d.e': 2, f: 3 }, 'Несколько веток вложенности должны быть правильно преобразованы');
    });

    QUnit.test('Сохраняет null на верхнем уровне', (assert) => {
        const originalObject = { a: null, b: 1 };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: null, b: 1 }, 'null должен сохраняться как значение');
    });

    QUnit.test('Сохраняет null во вложенных свойствах', (assert) => {
        const originalObject = { a: { b: null, c: 2 } };
        const result = plainify(originalObject);

        assert.deepEqual(result, { 'a.b': null, 'a.c': 2 }, 'null во вложенности должен сохраняться');
    });

    QUnit.test('Сохраняет undefined', (assert) => {
        const originalObject = { a: undefined, b: { c: undefined } };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: undefined, 'b.c': undefined }, 'undefined должен сохраняться как значение');
    });

    QUnit.test('Не разворачивает массивы', (assert) => {
        const originalObject = {
            a: [1, 2, 3],
            b: { c: ['x', 'y'] }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: [1, 2, 3], 'b.c': ['x', 'y'] }, 'Массивы должны оставаться значениями');
    });

    QUnit.test('Не разворачивает Date Map Set RegExp', (assert) => {
        const created = new Date('2020-01-01');
        const tags = new Set(['js']);
        const meta = new Map([['version', 1]]);
        const pattern = /test/u;
        const originalObject = {
            id: 1,
            created,
            nested: { tags, meta, pattern }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, {
            id: 1,
            created,
            'nested.tags': tags,
            'nested.meta': meta,
            'nested.pattern': pattern
        }, 'Встроенные объекты должны сохраняться как значения');
    });

    QUnit.test('Работает с falsy-примитивами', (assert) => {
        const originalObject = { a: 0, b: false, c: '', d: { e: 0 } };
        const result = plainify(originalObject);

        assert.deepEqual(result, { a: 0, b: false, c: '', 'd.e': 0 }, 'Falsy-примитивы должны сохраняться');
    });

    QUnit.test('Пустой вложенный объект не добавляет ключей', (assert) => {
        const originalObject = { a: {}, b: 1 };
        const result = plainify(originalObject);

        assert.deepEqual(result, { b: 1 }, 'Пустой вложенный объект не даёт ключей');
    });

    QUnit.test('Не изменяет исходный объект', (assert) => {
        const originalObject = { a: { b: 1 }, c: undefined };
        const snapshot = structuredClone(originalObject);

        plainify(originalObject);

        assert.deepEqual(originalObject, snapshot, 'Исходный объект не должен изменяться');
    });

    QUnit.test('Не копирует массивы глубоко — значения остаются общими', (assert) => {
        const items = [1, 2];
        const originalObject = { a: { b: items } };
        const result = plainify(originalObject);

        result['a.b'].push(3);

        assert.deepEqual(items, [1, 2, 3], 'Изменение массива в результате отражается в исходном объекте');
    });

    QUnit.test('Игнорирует унаследованные свойства', (assert) => {
        const proto = { inherited: 'oops' };
        const originalObject = Object.create(proto);
        originalObject.own = { nested: 1 };

        const result = plainify(originalObject);

        assert.deepEqual(result, { 'own.nested': 1 }, 'Унаследованные свойства не должны попадать в результат');
    });

    QUnit.test('Возвращает пустой объект для null', (assert) => {
        assert.deepEqual(plainify(null), {}, 'null на входе должен давать {}');
    });

    QUnit.test('Возвращает пустой объект для undefined', (assert) => {
        assert.deepEqual(plainify(undefined), {}, 'undefined на входе должен давать {}');
    });

    QUnit.test('Возвращает пустой объект для строки', (assert) => {
        assert.deepEqual(plainify('abc'), {}, 'строка на входе должна давать {}');
    });

    QUnit.test('Возвращает пустой объект для числа', (assert) => {
        assert.deepEqual(plainify(42), {}, 'число на входе должно давать {}');
    });

    QUnit.test('Возвращает пустой объект для массива на верхнем уровне', (assert) => {
        assert.deepEqual(plainify([1, 2, 3]), {}, 'массив на входе должен давать {}');
    });

    QUnit.test('При коллизии ключей с точкой побеждает последнее значение', (assert) => {
        const originalObject = { 'a.b': 1, a: { b: 2 } };
        const result = plainify(originalObject);

        assert.deepEqual(result, { 'a.b': 2 }, 'Ключ из вложенности перезаписывает ключ с точкой в имени');
    });
});
