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

    QUnit.test("Работает правильно с глубокой вложенностью", function(assert) {
        const result = flatten([1, [2, [3, [4, [5, [6]]]]]]);
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6], 'flatten([1, [2, [3, [4, [5, [6]]]]]]) === [1, 2, 3, 4, 5, 6]');
    });

    QUnit.test("Удаляет пустые вложенные массивы", function(assert) {
        assert.deepEqual(flatten([[], [[]], []]), [], 'flatten([[], [[]], []]) === []');
        assert.deepEqual(flatten([1, [], [2, []], 3]), [1, 2, 3], 'flatten([1, [], [2, []], 3]) === [1, 2, 3]');
    });

    QUnit.test("Работает правильно с элементами разных типов", function(assert) {
        const result = flatten(['a', [null, [undefined, 0]], [[false]], [{ id: 1 }]]);
        assert.deepEqual(result, ['a', null, undefined, 0, false, { id: 1 }]);
    });

    QUnit.test("Не изменяет исходный массив", function(assert) {
        const source = [1, [2, [3]]];
        const result = flatten(source);

        assert.deepEqual(source, [1, [2, [3]]], 'исходный массив остался прежним');
        assert.notStrictEqual(result, source, 'возвращается новый массив');
    });

    QUnit.test("Бросает TypeError, если аргумент не является массивом", function(assert) {
        assert.throws(() => flatten(), TypeError, 'flatten() без аргумента');
        assert.throws(() => flatten(undefined), TypeError, 'flatten(undefined)');
        assert.throws(() => flatten(null), TypeError, 'flatten(null)');
        assert.throws(() => flatten(42), TypeError, 'flatten(42)');
        assert.throws(() => flatten('123'), TypeError, 'flatten("123")');
        assert.throws(() => flatten({ 0: 1, length: 1 }), TypeError, 'flatten({ 0: 1, length: 1 })');
    });
});
