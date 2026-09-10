'use strict';

QUnit.module('Тестируем функцию filterByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно с отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Возвращает пустой объект, если массив ключей пуст', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = [];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'При пустом массиве ключей результат должен быть пустым объектом');
    });

    QUnit.test('Возвращает пустой объект, если ни один ключ не найден', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['x', 'y', 'z'];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'Если ни один ключ не найден, результат должен быть пустым объектом');
    });

    QUnit.test('Работает правильно с числовыми ключами', (assert) => {
        const originalObject = { 0: 2, c: 3 };
        const keysToFilter = [0, 1];
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { 0: 2 }, 'Числовой ключ должен совпадать со строковым ключом объекта');
    });

    QUnit.test('Бросает ошибку, если obj не является объектом', (assert) => {
        const keysToFilter = ['a'];

        assert.throws(() => filterByKeys(null, keysToFilter), TypeError, 'null должен бросать TypeError');
        assert.throws(() => filterByKeys(undefined, keysToFilter), TypeError, 'undefined должен бросать TypeError');
        assert.throws(() => filterByKeys(42, keysToFilter), TypeError, 'number должен бросать TypeError');
        assert.throws(() => filterByKeys('строка', keysToFilter), TypeError, 'string должен бросать TypeError');
        assert.throws(() => filterByKeys(true, keysToFilter), TypeError, 'boolean должен бросать TypeError');
        assert.throws(() => filterByKeys([1, 2, 3], keysToFilter), TypeError, 'массив должен бросать TypeError');
        assert.throws(() => filterByKeys(new Number(4), keysToFilter), TypeError, 'объект-обёртка должен бросать TypeError');
    });

    QUnit.test('Бросает ошибку, если keys не является массивом', (assert) => {
        const originalObject = { a: 1 };

        assert.throws(() => filterByKeys(originalObject, null), TypeError, 'null должен бросать TypeError');
        assert.throws(() => filterByKeys(originalObject, undefined), TypeError, 'undefined должен бросать TypeError');
        assert.throws(() => filterByKeys(originalObject, 42), TypeError, 'number должен бросать TypeError');
        assert.throws(() => filterByKeys(originalObject, 'строка'), TypeError, 'string должен бросать TypeError');
        assert.throws(() => filterByKeys(originalObject, {}), TypeError, 'object должен бросать TypeError');
    });
});
