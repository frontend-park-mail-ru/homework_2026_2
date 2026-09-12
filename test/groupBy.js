'use strict';

QUnit.module('Тестируем функцию groupBy', () => {
    QUnit.test('Работает правильно с группировкой по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 4, category: 'fruit', name: 'orange' }
            ],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'lettuce' }
            ]
        }, 'Объекты должны быть сгруппированы по категории');
    });

    QUnit.test('Работает правильно с пустым массивом', (assert) => {
        const emptyData = [];
        const result = groupBy(emptyData, 'category');

        assert.deepEqual(result, {}, 'Пустой массив должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно, когда все объекты имеют одно значение по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 3, category: 'fruit', name: 'orange' }
            ]
        }, 'Все объекты должны быть сгруппированы под одним значением');
    });

    // Два моих теста
    QUnit.test('Работает правильно, когда имеется только один объект', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' }
            ]
        }, 'Должен вернуться тот же самый объект');
    });

    QUnit.test('Работает правильно с группировкой по полю name', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'apple' },  
            { id: 4, category: 'vegetable', name: 'carrot' },
            { id: 5, category: 'vegetable', name: 'carrot' }
        ];
        const result = groupBy(data, 'name');

        assert.deepEqual(result, {
            apple: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 3, category: 'fruit', name: 'apple' }
            ],
            banana: [
                { id: 2, category: 'fruit', name: 'banana' }
            ],
            carrot: [
                { id: 4, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'carrot' }
            ]
        }, 'Объекты должны быть сгруппированы по имени');
    });

    // Два теста на валидацию
    QUnit.test('Выбрасывает TypeError, если первый аргумент не массив', (assert) => {
        assert.throws(
            () => groupBy('not an array', 'category'),
            new TypeError('Первый аргумент должен быть массивом'),
            'Первый аргумент должен быть массивом'
        );
    });

    QUnit.test('Выбрасывает TypeError, если второй аргумент не строка', (assert) => {
        const data = [{ id: 1, category: 'fruit' }];
        assert.throws(
            () => groupBy(data, 123),
            new TypeError('Второй аргумент должен быть непустой строкой'),
            'Второй аргумент должен быть строкой'
        );
    });

    // Еще 4 дополнительных теста
    QUnit.test('Выбрасывает TypeError, если второй аргумент — пустая строка', (assert) => {
        const data = [{ id: 1, category: 'fruit' }];
        assert.throws(
            () => groupBy(data, ''),
            new TypeError('Второй аргумент должен быть непустой строкой'),
            'Пустая строка недопустима'
        );
    });

    QUnit.test('Выбрасывает TypeError, если в массиве лежат примитивы', (assert) => {
        const data = ['lol', 'kek', 'cheburek', 228];
        assert.throws(
            () => groupBy(data, 'category'),
            new TypeError('Все элементы массива должны являться объектами'),
            'Элементы массива должны быть объектами'
        );
    });

    QUnit.test('Выбрасывает TypeError, если у одного из объектов нет ключевого поля', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', hisNameIsJohnCena: 'banana' },
            { id: 3, category: 'fruit', name: 'apple' }
        ];
        assert.throws(
            () => groupBy(data, 'name'),
            new TypeError('У объекта отсутствует поле "name"'),
            'У одного из объектов отсутствует ключевое поле'
        );
    });

    QUnit.test('Выбрасывает TypeError, если у объекта пустое ключевое поле', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: '' },
            { id: 3, category: 'fruit', name: 'apple' }
        ];
        assert.throws(
            () => groupBy(data, 'name'),
            new TypeError('Значение поля "name" не должно быть пустым'),
            'У одного из объектов пустое ключевое поле'
        );
    });
});
