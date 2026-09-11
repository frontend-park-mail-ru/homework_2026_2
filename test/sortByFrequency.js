'use strict';

QUnit.module("Тестируем функцию sortByFrequency", function() {
    QUnit.test("Работает правильно с сортировкой по частоте появления", function(assert) {
        const result = sortByFrequency([4, 6, 2, 6, 4, 4, 2, 2, 2]);

        assert.deepEqual(result, [2, 2, 2, 2, 4, 4, 4, 6, 6], "Массив должен быть отсортирован по частоте.");
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = sortByFrequency([]);

        assert.deepEqual(result, [], "Пустой массив должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с массивом с одним элементом", function(assert) {
        const result = sortByFrequency([5]);

        assert.deepEqual(result, [5], "Массив с одним элементом должен вернуть тот же элемент.");
    });

    QUnit.test("Работает правильно с массивом с совпадающими частотами", function(assert) {
        const result = sortByFrequency([5, 5, 3, 3, 2, 2, 1, 1]);

        assert.deepEqual(result, [ 1, 1, 2, 2, 3, 3, 5, 5], "Числа с совпадающими частотами должны быть отсортированы по возрастанию.");
    });

    QUnit.test("Работает правильно с массивом из уникальных элементов", function(assert) {
        const result = sortByFrequency([5, 3, 2, 1]);

        assert.deepEqual(result, [1, 2, 3, 5], "Сортирует массив по возрастанию, если все элементы уникальны.");
    });

    QUnit.test("Работает правильно с массивом с отрицательными элементами", function(assert) {
        const result = sortByFrequency([-5, -5, -3, -2, -1, -1, -1, 5, 5, 5]);

        assert.deepEqual(result, [-1, -1, -1, 5, 5, 5, -5, -5, -3, -2], "Сортирует массив по возрастанию, если все элементы уникальны.");
    });

    QUnit.test('Выбрасывает TypeError при передаче не массива', (assert) => {
        assert.expect(3)

        assert.throws(() => sortByFrequency(null), TypeError, 'Должна выбросить TypeError, если передан null');
        assert.throws(() => sortByFrequency(undefined), TypeError, 'Должна выбросить TypeError, если передан undefined');
        assert.throws(() => sortByFrequency(123), TypeError, 'Должна выбросить TypeError, если передан не массив');
    });

    QUnit.test('Выбрасывает TypeError при передаче массива с нечисловыми элементами', (assert) => {
        assert.throws(
            () => {
                sortByFrequency([1, 2, '3']);
            },
            TypeError,
            'Должна выбросить TypeError, если массив содержит нечисловые элементы'
        );
    });
});

