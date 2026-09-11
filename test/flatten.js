'use strict';

QUnit.module("Тестируем функцию flatten", function() {
    QUnit.test("Работает правильно с плоским массивом", function(assert) {
        const result = flatten([1, 2, 3]);

        assert.deepEqual(result, [1, 2, 3]);
    });

    QUnit.test("Работает правильно с вложенным массивом с несколькими уровнями", function(assert) {
        const result = flatten([1, [2, [3, 4], 5], 6]);
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = flatten([]);
        assert.deepEqual(result, []);
    });


    QUnit.test("Работает правильно с отрицательными числами", function(assert) {
        const result = flatten([-1, [-2, [-3, 5]], -5]);
        assert.deepEqual(result, [-1, -2, -3, 5, -5]);
    });

    QUnit.test("Работает правильно со строками", function(assert) {
        const result = flatten(["pomidorka", ["ogurechek", ["luchok", "goroshek"]], "kompotik"]);
        assert.deepEqual(result, ["pomidorka", "ogurechek", "luchok", "goroshek", "kompotik"]);
    });

    QUnit.test("Работает правильно с пустыми вложенными массивами", function(assert) {
        const result = flatten([1, [], [2, [], [3]], []]);
        assert.deepEqual(result, [1, 2, 3]);
    });
    
});


