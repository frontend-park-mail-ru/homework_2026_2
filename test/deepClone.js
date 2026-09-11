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

    QUnit.test('Изменение копии не влияет на оригинал', (assert) => {
        const original = { a: 1, b: { c: [1, 2] } };
        const cloned = deepClone(original);

        cloned.a = 42;
        cloned.b.c.push(3);

        assert.strictEqual(original.a, 1, 'Поле оригинала не должно измениться');
        assert.deepEqual(original.b.c, [1, 2], 'Вложенный массив оригинала не должен измениться');
    });

    QUnit.test('Работает правильно для глубокой вложенности', (assert) => {
        const original = { a: [{ b: { c: [{ d: 1 }] } }] };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned.a[0].b.c[0], original.a[0].b.c[0],
            'Объект на четвёртом уровне вложенности должен быть независимым');
    });

    QUnit.test('Возвращает примитивы и null без изменений', (assert) => {
        assert.strictEqual(deepClone(1), 1, 'deepClone(1) === 1');
        assert.strictEqual(deepClone('str'), 'str', 'deepClone(\'str\') === \'str\'');
        assert.strictEqual(deepClone(null), null, 'deepClone(null) === null');
        assert.strictEqual(deepClone(undefined), undefined, 'deepClone(undefined) === undefined');
    });

    QUnit.test('Работает правильно для пустых объекта и массива', (assert) => {
        const original = { a: {}, b: [] };
        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Копия должна быть равна оригиналу');
        assert.notStrictEqual(cloned.a, original.a, 'Пустой объект должен быть независимым');
        assert.notStrictEqual(cloned.b, original.b, 'Пустой массив должен быть независимым');
    });

    QUnit.test('Копирует только собственные свойства объекта', (assert) => {
        const proto = { inherited: 'oops' };
        const original = Object.create(proto);
        original.own = 1;

        const cloned = deepClone(original);

        assert.deepEqual(cloned, { own: 1 }, 'Унаследованные свойства не должны попадать в копию');
    });

    QUnit.test('Копирует значение типа Date', (assert) => {
        const original = { created: new Date('2020-01-01') };
        const cloned = deepClone(original);

        assert.ok(cloned.created instanceof Date, 'Копия должна остаться датой, а не стать пустым объектом');
        assert.strictEqual(cloned.created.getTime(), original.created.getTime(),
            'Момент времени должен совпадать с оригиналом');
        assert.notStrictEqual(cloned.created, original.created, 'Дата должна быть независимым объектом');
    });

    QUnit.test('Копирует значения объекта без прототипа, но не сам прототип', (assert) => {
        const original = Object.create(null);
        original.x = 1;

        const cloned = deepClone(original);

        assert.strictEqual(cloned.x, 1, 'Собственные значения должны скопироваться');
        assert.strictEqual(Object.getPrototypeOf(cloned), Object.prototype,
            'Прототип не сохраняется: копия является обычным объектом, как и у structuredClone');
    });

    QUnit.test('Map и Set не входят в область применения функции', (assert) => {
        const original = { map: new Map([['a', 1]]), set: new Set([1, 2]) };
        const cloned = deepClone(original);

        assert.deepEqual(cloned.map, {}, 'Содержимое Map лежит во внутренних слотах и не копируется');
        assert.deepEqual(cloned.set, {}, 'Содержимое Set лежит во внутренних слотах и не копируется');
    });

    QUnit.test('Объект-обёртка String не входит в область применения функции', (assert) => {
        const cloned = deepClone(new String('abc'));

        assert.notOk(cloned instanceof String, 'Копия перестаёт быть обёрткой и становится обычным объектом');
        assert.deepEqual(cloned, { 0: 'a', 1: 'b', 2: 'c' },
            'Индексы символов являются собственными свойствами, поэтому в копию попадают только они');
    });

    QUnit.test('Объект-обёртка Number не входит в область применения функции', (assert) => {
        const cloned = deepClone(new Number(123));

        assert.notOk(cloned instanceof Number, 'Копия перестаёт быть обёрткой и становится обычным объектом');
        assert.deepEqual(cloned, {}, 'Само число лежит во внутреннем слоте и не копируется');
    });
});
