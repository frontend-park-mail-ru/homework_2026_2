'use strict';

QUnit.module("Тестируем функцию sortByLength", function() {
    QUnit.test("Правильно сортирует строки по длине", function(assert) {
        const result = sortByLength(["apple", "banana", "kiwi", "fig", "grape"]);

        assert.deepEqual(result, ["fig", "kiwi", "apple", "grape", "banana"], "Строки должны быть отсортированы по длине.");
    });

    QUnit.test("Правильно сортирует строки с одинаковой длиной", function(assert) {
        const result = sortByLength(["cat", "bat", "ant", "dog"]);

        assert.deepEqual(result, ["ant", "bat", "cat", "dog"], "Строки с одинаковой длиной должны быть отсортированы в алфавитном порядке.");
    });

    QUnit.test("Правильно сортирует массив с одной строкой", function(assert) {
        const result = sortByLength(["hello"]);

        assert.deepEqual(result, ["hello"], "Массив с одной строкой должен вернуть ту же строку.");
    });

    QUnit.test("Правильно сортирует массив с другими данными", function(assert) {
        const result = sortByLength([1, 2, 3]);

        assert.deepEqual(result, [1, 2, 3], "Массив с одной строкой должен вернуть ту же строку.");
    });
    
    QUnit.test("Правильно сортирует строки по длине", function(assert) {
        const source = ["apple", "banana", "kiwi", "fig", "grape"];
        const result = sortByLength(["apple", "banana", "kiwi", "fig", "grape"]);

        assert.deepEqual(result, ["fig", "kiwi", "apple", "grape", "banana"], "Строки должны быть отсортированы по длине.");
        assert.deepEqual(source, ["apple", "banana", "kiwi", "fig", "grape"], "При этом исходный массив не изменился.");
    });

    QUnit.test("Правильно реагирует на типы данных, отличные от массива", function(assert) {
        const result = sortByLength("state");

        assert.deepEqual(result, "state", "Возвращает изначальное значение");
        
    });

    QUnit.test("Правильно реагирует на типы данных, отличные от массива", function(assert) {
        const result = sortByLength(undefined);

        assert.deepEqual(result, undefined, "Возвращает изначальное значение");
    });

    QUnit.test("Правильно реагирует на типы данных, отличные от массива", function(assert) {
        const result = sortByLength(true);

        assert.deepEqual(result, true, "Возвращает изначальное значение");
    });

    QUnit.test("Правильно реагирует на типы данных, отличные от массива", function(assert) {
        const result = sortByLength(null);

        assert.deepEqual(result, null, "Возвращает изначальное значение");
    });

    QUnit.test("Правильно сортирует массив с другими данными", function(assert) {
        const result = sortByLength([true, false, false]);

        assert.deepEqual(result, [true, false, false], "Массив с одной строкой должен вернуть ту же строку.");
    });

    QUnit.test("Правильно сортирует массив с другими данными", function(assert) {
        const result = sortByLength([null, 2, 3]);

        assert.deepEqual(result, [null, 2, 3], "Массив с одной строкой должен вернуть ту же строку.");
    });

     QUnit.test("Правильно сортирует массив с другими данными", function(assert) {
        const result = sortByLength(["string", 2, 3]);

        assert.deepEqual(result, ["string", 2, 3], "Массив с одной строкой должен вернуть ту же строку.");
    });
});

