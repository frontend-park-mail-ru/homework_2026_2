'use strict';

QUnit.module('Тестируем функцию mergeBy', function () {

    QUnit.test('Работает правильно с одинаковыми значениями по ключу', function (assert) {
        const array1 = [
            { id: 1, name: 'Alice', tags: ['friend'] },
            { id: 2, name: 'Bob', tags: ['colleague'] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ['travel'] },
            { id: 3, name: 'Charlie' }
        ];
        const result = mergeBy(array1, array2, 'id');

        assert.deepEqual(result, [
            { id: 1, name: 'Alice', tags: ['friend', 'travel'], age: 30 },
            { id: 2, name: 'Bob', tags: ['colleague'] },
            { id: 3, name: 'Charlie' }
        ]);
    });

    QUnit.test('Работает правильно с отсутствующими ключами', function (assert) {
        const array1 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, 'id');

        assert.deepEqual(result, [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob', age: 25 }
        ]);
    });

    QUnit.test('Объединяет объекты с одинаковым ключом', function (assert) {
        const first = [
            { id: 1, name: 'Аня' },
            { id: 2, name: 'Боря' }
        ];
        const second = [
            { id: 1, age: 20 },
            { id: 3, name: 'Вера' }
        ];
        const result = mergeBy(first, second, 'id');

        assert.deepEqual(
            result,
            [
                { id: 1, name: 'Аня', age: 20 },
                { id: 2, name: 'Боря' },
                { id: 3, name: 'Вера' }
            ],
            'Объекты с id=1 объединены, остальные добавлены'
        );
    });

    QUnit.test('Объединяет массивы без дубликатов', function (assert) {
        const first = [
            { id: 1, tags: ['js', 'react'] }
        ];
        const second = [
            { id: 1, tags: ['react', 'node'] }
        ];
        const result = mergeBy(first, second, 'id');

        assert.deepEqual(
            result,
            [{ id: 1, tags: ['js', 'react', 'node'] }],
            'Массивы склеены, дубликат "react" убран'
        );
    });

    QUnit.test('Бросает TypeError при некорректных аргументах', function (assert) {
        assert.throws(
            function () { mergeBy(null, [], 'id'); },
            TypeError,
            'null в первом аргументе → TypeError'
        );
        assert.throws(
            function () { mergeBy([], null, 'id'); },
            TypeError,
            'null во втором аргументе → TypeError'
        );
        assert.throws(
            function () { mergeBy(undefined, [], 'id'); },
            TypeError,
            'undefined в первом аргументе → TypeError'
        );
        assert.throws(
            function () { mergeBy([], 'not an array', 'id'); },
            TypeError,
            'строка вместо массива → TypeError'
        );
        assert.throws(
            function () { mergeBy([], [], null); },
            TypeError,
            'null вместо ключа → TypeError'
        );
        assert.throws(
            function () { mergeBy([], [], ''); },
            TypeError,
            'пустая строка вместо ключа → TypeError'
        );
    });

    QUnit.test('Не мутирует исходные массивы', function (assert) {
        const first = [{ id: 1, name: 'Аня' }];
        const second = [{ id: 1, age: 20 }];

        mergeBy(first, second, 'id');

        assert.deepEqual(
            first,
            [{ id: 1, name: 'Аня' }],
            'Первый массив не изменён'
        );
        assert.deepEqual(
            second,
            [{ id: 1, age: 20 }],
            'Второй массив не изменён'
        );
    });

    QUnit.test('Работает с пустыми массивами', function (assert) {
        assert.deepEqual(
            mergeBy([], [], 'id'),
            [],
            'Два пустых массива → пустой массив'
        );
        assert.deepEqual(
            mergeBy([{ id: 1 }], [], 'id'),
            [{ id: 1 }],
            'Второй пустой → остаётся содержимое первого'
        );
        assert.deepEqual(
            mergeBy([], [{ id: 2 }], 'id'),
            [{ id: 2 }],
            'Первый пустой → остаётся содержимое второго'
        );
    });

    QUnit.test('Пропускает объекты без указанного ключа', function (assert) {
        const first = [
            { id: 1, name: 'Аня' },
            { name: 'Без id' }
        ];
        const second = [
            { id: 1, age: 20 }
        ];
        const result = mergeBy(first, second, 'id');

        assert.deepEqual(
            result,
            [{ id: 1, name: 'Аня', age: 20 }],
            'Объект без ключа id пропущен'
        );
    });

    QUnit.test('Бросает TypeError при key из одних пробелов', function (assert) {
        assert.throws(
            function () { mergeBy([], [], '   '); },
            TypeError,
            'key = "   " → TypeError'
        );
        assert.throws(
            function () { mergeBy([], [], '\t'); },
            TypeError,
            'key = "\\t" → TypeError'
        );
    });

    QUnit.test('Пропускает null, undefined и не-объекты в массивах', function (assert) {
        const first = [
            { id: 1, name: 'Аня' },
            null,
            undefined,
            42,
            'строка',
            { id: 2, name: 'Боря' }
        ];
        const second = [
            null,
            { id: 1, age: 20 }
        ];
        const result = mergeBy(first, second, 'id');

        assert.deepEqual(
            result,
            [
                { id: 1, name: 'Аня', age: 20 },
                { id: 2, name: 'Боря' }
            ],
            'null, undefined и примитивы пропущены'
        );
    });

    QUnit.test('reduce-версия корректно объединяет массивы', function (assert) {
        const first = [{ id: 1, tags: ['js', 'react'], skills: ['html'] }];
        const second = [{ id: 1, tags: ['react', 'node'], skills: ['css'] }];
        const result = mergeBy(first, second, 'id');

        assert.deepEqual(
            result,
            [{ id: 1, tags: ['js', 'react', 'node'], skills: ['html', 'css'] }],
            'Несколько массивов объединены без дубликатов'
        );
    });

});