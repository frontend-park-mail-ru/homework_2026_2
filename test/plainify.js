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

    QUnit.test('Работает правильно с одним уровнем вложенности', (assert) => {
        const originalObject = {
            a: { b: 1 }
        };
        const result = plainify(originalObject);

        assert.deepEqual(result, { 'a.b': 1 }, 'Один уровень вложенности должен дать ключ через точку');
    });

    QUnit.test('Работает правильно с глубокой вложенностью', (assert) => {
        const originalObject = {
            user: {
                profile: {
                    contacts: {
                        email: 'a@vk.ru'
                    }
                }
            }
        };
        const result = plainify(originalObject);

        assert.deepEqual(
            result,
            { 'user.profile.contacts.email': 'a@vk.ru' },
            'Результат должен быть правильным'
        );
    });

    QUnit.test('Сохраняет null и undefined как значения', (assert) => {
        const originalObject = {
            a: null,
            b: {
                c: undefined
            }
        };
        const result = plainify(originalObject);

        assert.deepEqual(
            result,
            { a: null, 'b.c': undefined },
            'null и undefined не разворачиваются, а сохраняются'
        );
    });

    QUnit.test('Сохраняет функции и массивы как значения', (assert) => {
        /**
         * @returns {number}
         */
        const fn = () => 1;
        const originalObject = {
            cb: fn,
            list: [1, 2],
            nested: {
                items: [3]
            }
        };
        const result = plainify(originalObject);

        assert.strictEqual(result.cb, fn, 'функция сохраняется как значение');
        assert.deepEqual(result.list, [1, 2], 'массив на верхнем уровне сохраняется');
        assert.deepEqual(result['nested.items'], [3], 'вложенный массив сохраняется');
    });

    QUnit.test('Для некорректного входа возвращает null', (assert) => {
        assert.strictEqual(plainify('строка'), null, 'строка -> null');
        assert.strictEqual(plainify(null), null, 'null -> null');
        assert.strictEqual(plainify([1, 2]), null, 'массив -> null');
        assert.strictEqual(plainify(42), null, 'число -> null');
    });
});
