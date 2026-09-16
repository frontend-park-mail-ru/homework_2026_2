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
    QUnit.test('Работает с объектами, у которых отсутствует ключ группировки', (assert) => {
        const data = [
            { id: 1, name: 'apple', category: 'fruit' },
            { id: 2, name: 'water' },
            { id: 3, name: 'banana', category: 'fruit' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, name: 'apple', category: 'fruit' },
                { id: 3, name: 'banana', category: 'fruit' }
            ],
            undefined: [
                { id: 2, name: 'water' }
            ]
        }, 'Объекты без указанного ключа должны попадать в группу "undefined"');
    });

    QUnit.test('Корректно группирует по булевым значениям (true/false)', (assert) => {
        const data = [
            { id: 1, name: 'User 1', isActive: true },
            { id: 2, name: 'User 2', isActive: false },
            { id: 3, name: 'User 3', isActive: true }
        ];
        const result = groupBy(data, 'isActive');

        assert.deepEqual(result, {
            true: [
                { id: 1, name: 'User 1', isActive: true },
                { id: 3, name: 'User 3', isActive: true }
            ],
            false: [
                { id: 2, name: 'User 2', isActive: false }
            ]
        }, 'Должен правильно группировать по логическим типам данных');
    });

    QUnit.test('Корректно обрабатывает falsy значения ключа: 0, null, пустая строка', (assert) => {
        const data = [
            { id: 1, groupCode: 0 },
            { id: 2, groupCode: null },
            { id: 3, groupCode: '' },
            { id: 4, groupCode: 0 }
        ];
        const result = groupBy(data, 'groupCode');

        assert.deepEqual(result, {
            0: [
                { id: 1, groupCode: 0 },
                { id: 4, groupCode: 0 }
            ],
            null: [
                { id: 2, groupCode: null }
            ],
            '': [
                { id: 3, groupCode: '' }
            ]
        }, 'Значения 0, null и пустая строка не должны перезаписывать друг друга');
    });

    QUnit.test('Выбрасывает TypeError при некорректном аргументе array', (assert) => {
        const invalidArrays = [null, undefined, 42, 'not-an-array', {}, true];

        invalidArrays.forEach((invalidValue) => {
            assert.throws(
                () => groupBy(invalidValue, 'category'),
                TypeError,
                `Должен выбросить TypeError, если array передан как ${String(invalidValue)}`
            );
        });
    });

    QUnit.test('Выбрасывает TypeError при некорректном аргументе key', (assert) => {
        const validArray = [{ id: 1, category: 'fruit' }];
        const invalidKeys = [null, undefined, 123, {}, [], true, Symbol('key')];

        invalidKeys.forEach((invalidKey) => {
            assert.throws(
                () => groupBy(validArray, invalidKey),
                TypeError,
                `Должен выбросить TypeError, если key передан как ${String(invalidKey)}`
            );
        });
    });
    QUnit.test('Корректно группирует, когда значение поля совпадает со свойством прототипа (toString)', (assert) => {
    const data = [{ category: 'toString' }];
    const result = groupBy(data, 'category');

    assert.deepEqual(result, {
        toString: [
            { category: 'toString' }
        ]
    }, 'Элемент со значением "toString" должен успешно группироваться в массив без ошибок обращения к прототипу');
});
    QUnit.test('Выбрасывает TypeError, если элементы массива не являются объектами', (assert) => {
        const invalidItemsData = [
            [{ id: 1 }, null],
            [{ id: 1 }, undefined],
            [{ id: 1 }, 'string-item'],
            [{ id: 1 }, 42]
        ];

        invalidItemsData.forEach((invalidArray) => {
            assert.throws(
                () => groupBy(invalidArray, 'id'),
                TypeError,
                `Должен выбросить TypeError при наличии недопустимого элемента в массиве`
            );
        });
    });
    QUnit.test('Выбрасывает TypeError, если в массиве переданы специальные объекты (Map, Set, Date и др.)', (assert) => {
    const exoticItems = [
        new Date(),
        new Map(),
        new Set(),
        new RegExp('abc'),
        new Error('fail'),
        Promise.resolve()
    ];

    exoticItems.forEach((exoticItem) => {
        assert.throws(
            () => groupBy([{ id: 1 }, exoticItem], 'id'),
            TypeError,
            `Должен выбросить TypeError, если элемент массива - ${exoticItem.constructor.name}`
        );
    });
});
});

