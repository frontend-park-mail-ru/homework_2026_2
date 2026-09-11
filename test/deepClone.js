'use strict';

QUnit.module('Тестируем функцию deepClone', () => {
    QUnit.test('Работает правильно для простого объекта', (assert) => {
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

    QUnit.test('Работает правильно для значений разрешённых примитивных типов данных', (assert) => {
        const allowedTypes = {
            'number': [
                123,
                123.45,
                -Infinity,
                Infinity,
                NaN,
            ],
            'bigint': [
                9007199254740991n,
            ],
            'string': [
                'Hello, World!',
                "Hello, JavaScript!",
                `Hello, NodeJS!`,
            ],
            'boolean': [
                false,
                true,
            ],
            'null': [
                null,
            ],
            'undefined': [
                undefined,
            ],
        };

        Object.entries(allowedTypes).forEach(([type, values]) => {
            values.forEach((original) => {
                const cloned = deepClone(original);

                assert.deepEqual(cloned, original, `Копия значения ${type}:${original} должна быть равна оригиналу`);
            });
        });
    });

    QUnit.test('Не работает для значений запрещённых типов данных', (assert) => {
        const forbiddenTypes = {
            'symbol': [
                Symbol('id')
            ],
            'function': [
                function fib(n) {
                    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
                }
            ],
        };

        Object.entries(forbiddenTypes).forEach(([type, values]) => {
            values.forEach((original) => {
                const stringifiedValue = typeof original === 'symbol' ? original.toString() : original;

                assert.throws(
                    () => deepClone(original),
                    TypeError,
                    `Попытка скопировать значение ${type}:${stringifiedValue} запрещённого типа данных приводит к выбросу ошибки`
                );
            });
        });
    });

    QUnit.test('Работает правильно для значений разрешённых объектных типов данных', (assert) => {
        const allowedTypes = {
            'array': [
                [1, 2, 3],
            ],
            'pojo': [
                { a: 1, b: 2, c: 3 },
            ],
        };

        Object.entries(allowedTypes).forEach(([type, values]) => {
            values.forEach((original) => {
                const cloned = deepClone(original);

                assert.deepEqual(cloned, original, `Копия значения ${type}:${original} должна быть равна оригиналу`);
            });
        });
    });

    QUnit.test('Работает правильно для объектов любой вложенности', (assert) => {
        const depth = 100;
        const original = { depth: 0 };

        let current = original;
        for (let i = 1; i < depth; i++) {
            current.child = { depth: i };
            current = current.child;
        }

        const cloned = deepClone(original);

        assert.deepEqual(cloned, original, 'Структура глубокого объекта должна полностью совпадать');

        let currentOriginal = original;
        let currentCloned = cloned;
        let currentDepth = 0;
        while (currentOriginal && currentCloned) {
            assert.notStrictEqual(
                currentCloned,
                currentOriginal,
                `Объект на глубине ${currentDepth} должен быть независимым`
            );

            currentOriginal = currentOriginal.child;
            currentCloned = currentCloned.child;
            currentDepth++;
        }
    });

    QUnit.test('Не работает для объектов с циклическими ссылками', (assert) => {
        const original = {};
        original.self = original;

        assert.throws(() => deepClone(original), RangeError, 'Использование циклической ссылки приводит к выбросу ошибки, а не к тихому багу');
    });
});
