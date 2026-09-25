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

    QUnit.test("Сортирует по возрастанию при одинаковой частоте элементов", function(assert) {
        assert.deepEqual(sortByFrequency([3, 1, 2]), [1, 2, 3], "При равной частоте элементы сортируются по возрастанию.");
    });

    QUnit.test("Работает правильно с отрицательными числами", function(assert) {
        const result = sortByFrequency([-10, 5, -10, 0, 5, -10]);
        assert.deepEqual(result, [-10, -10, -10, 5, 5, 0], "Отрицательные числа корректно сортируются по частоте.");
    });

    QUnit.test("Не мутирует исходный массив", function(assert) {
        const original = [4, 6, 2, 6, 4];
        const copy = [...original];

        sortByFrequency(original);

        assert.deepEqual(original, copy, "Исходный массив не должен измениться после вызова функции.");
    });

    QUnit.test("Выбрасывает TypeError с правильным сообщением при аргументе, не являющемся массивом", function(assert) {
        const expectedError = /Argument must be an array/;

        assert.throws(() => sortByFrequency(null), expectedError, "Выбрасывает ошибку при null.");
        assert.throws(() => sortByFrequency(undefined), expectedError, "Выбрасывает ошибку при undefined.");
        assert.throws(() => sortByFrequency("1, 2, 3"), expectedError, "Выбрасывает ошибку при строке.");
        assert.throws(() => sortByFrequency(123), expectedError, "Выбрасывает ошибку при числе.");
        assert.throws(() => sortByFrequency({}), expectedError, "Выбрасывает ошибку при объекте.");
    });

    QUnit.test("Выбрасывает TypeError с правильным сообщением, если элементы массива не являются числами", function(assert) {
        const expectedError = /All array elements must be valid numbers/;

        assert.throws(() => sortByFrequency([1, "2", 3]), expectedError, "Выбрасывает ошибку при наличии строк в массиве.");
        assert.throws(() => sortByFrequency([1, NaN, 3]), expectedError, "Выбрасывает ошибку при наличии NaN в массиве.");
        assert.throws(() => sortByFrequency([1, null, 3]), expectedError, "Выбрасывает ошибку при наличии null в массиве.");
    });
});
