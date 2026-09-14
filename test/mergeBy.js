'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Правильно работает с дубликатами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong"] }
        ];
        const array2 = [
            { id: 1, name: "Alice", age: 30, tags: ["travel", "well", "good", "bad", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "travel", "friend", "work", "family"] }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete", "travel", "well", "good", "bad"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong", "travel", "work"] }
        ]);
    });

    QUnit.test("Работает правильно по другому ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 5, name: "Charlie" }
        ];
        const array2 = [
            { id: 67, name: "Alice", age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie", tags: ["travel"] },
            { id: 4, name: "Diana", age: 25, tags: ["travel"] }
        ];
        const result = mergeBy(array1, array2, "name");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 5, name: "Charlie", tags: ["travel"] },
            { id: 4, name: "Diana", age: 25, tags: ["travel"] }
        ]);
    });

    QUnit.test("Работает правильно с пустыми массивами", function(assert) {
        const array1 = [];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, []);
    });

    QUnit.test("Работает правильно с 1 пустым массивом", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong"] }
        ];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong"] }
        ]);
    });

    QUnit.test("Не падает если первый аргумент не массив", function(assert) {
        const array1 = null;
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, []);
    });

    QUnit.test("Не падает если второй аргумент не массив", function(assert) {
        const array1 = [];
        const array2 = null;
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, []);
    });

    QUnit.test("Пропускает элементы которые не объекты", function(assert) {
        const array1 = [1, 2, 3];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, []);
    });

    QUnit.test("Пропускает некорректные элементы и оставляет объекты", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            2
        ];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" }
        ]);
    });

    QUnit.test("Не падает если ключ отсутствует", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" }
        ];
        const array2 = [];
        const result = mergeBy(array1, array2);

        assert.deepEqual(result, []);
    });

    QUnit.test("Сливает два объекта с одинаковым ключом внутри одного массива", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 1, age: 30, tags: ["travel", "friend"] },
            { id: 2, name: "Bob" }
        ];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob"},
        ]);
    });

    QUnit.test("Сливает два объекта с пустым ключом", function(assert) {
        const array1 = [{ '': 'x', a: 1 }];
        const array2 = [{ '': 'x', b: 2 }];
        const result = mergeBy(array1, array2, '');

        assert.deepEqual(result, [{ '': 'x', a: 1, b: 2 }]);
    });

    QUnit.test("Не падает и корректно сливает объекты с undefined в значении ключа", function(assert) {
        const array1 = [{ id: undefined, a: 1 }];
        const array2 = [{ id: undefined, b: 2 }];
    
        const result = mergeBy(array1, array2, "id");
    
        assert.deepEqual(result, [{ id: undefined, a: 1, b: 2 }]);
    });
    
    QUnit.test("Пропускает объекты, у которых ключ отсутствует, даже если в других он undefined", function(assert) {
        const array1 = [{ a: 1 }];
        const array2 = [{ id: undefined, b: 2 }];
    
        const result = mergeBy(array1, array2, "id");
    
        assert.deepEqual(result, [{ id: undefined, b: 2 }]);
    });
});

