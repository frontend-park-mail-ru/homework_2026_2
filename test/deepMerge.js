'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно работать правильно с вложенными объектами"
        );
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {
            age: 30,
            isInWonderland: true
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно правильно перезаписывать ключи"
        );
    });

    // Из-за неоднозначности формулировки условия предполагается,
    // что если только одно из значений является объектом,
    // значение из target перезаписывает значение из source.
    QUnit.test("Заменяет исходный объект примитивом из target", function(assert) {
        const source = {
            value: {
                a: 1
            }
        };

        const target = {
            value: 52
        };

        const expected = {
            value: 52
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно заменять исходный объект примитивом из target"
        );
    });

    QUnit.test("Заменяет исходный примитив объектом из target", function(assert) {
        const source = {
            value: 1
        };

        const target = {
            value: {
                a: 52
            }
        };

        const expected = {
            value: {
                a: 52
            }
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно заменять исходный примитив объектом из target"
        );
    });

    QUnit.test("Работает правильно с null в target", function(assert) {
        const source = {
            value: {
                a: 1
            }
        };

        const target = {
            value: null
        };

        const expected = {
            value: null
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно заменять исходный объект значением null из target"
        );
    });

    QUnit.test("Работает с пустым target", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно возвращать исходный объект при отсутствии второго"
        );
    });

    QUnit.test("Объединение с пустым первым объектом", function(assert) {
        const source = {};

        const target = {
            name: "Alice",
            age: 25
        };

        const expected = {
            name: "Alice",
            age: 25
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно вернуть свойства второго объекта"
        );
    });

    QUnit.test("Работает правильно с двумя пустыми объектами", function(assert) {
        const result = deepMerge({}, {});

        assert.deepEqual(
            result,
            {},
            "Должно возвращать пустой объект при отсутствии обоих объектов"
        );
    });

    QUnit.test("Заменяет исходный массив массивом из target", function(assert) {
        const source = {
            value: [1, 2, 3]
        };

        const target = {
            value: [4, 5]
        };

        const expected = {
            value: [4, 5]
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно заменять исходный массив массивом из target"
        );
    });

    QUnit.test("Пустой массив из target заменяет непустой массив source", function(assert) {
        const source = {
            value: [1, 2, 3]
        };

        const target = {
            value: []
        };

        const expected = {
            value: []
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно заменять исходный массив пустым массивом из target"
        );
    });

    QUnit.test("Непустой массив из target заменяет пустой массив source", function(assert) {
        const source = {
            value: []
        };

        const target = {
            value: [1, 2, 3]
        };

        const expected = {
            value: [1, 2, 3]
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно заменять пустой исходный массив массивом из target"
        );
    });

    QUnit.test("Вложенность объектов больше 2 уровней", function(assert) {
        const source = {
            level1: {
                level2: {
                    level3: {
                        a: 1
                    }
                }
            }
        };

        const target = {
            level1: {
                level2: {
                    level3: {
                        b: 2
                    }
                }
            }
        };

        const expected = {
            level1: {
                level2: {
                    level3: {
                        a: 1,
                        b: 2
                    }
                }
            }
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно корректно работать с объектами, вложенными более чем на 2 уровня"
        );
    });

    QUnit.test("Выбрасывает ошибку, если первый аргумент является строкой", function(assert) {
        assert.throws(
            function() {
                deepMerge("abc", {});
            },
            TypeError,
            "Должно выбрасывать TypeError для строки вместо объекта"
        );
    });

    QUnit.test("Выбрасывает ошибку, если второй аргумент является строкой", function(assert) {
        assert.throws(
            function() {
                deepMerge({}, "abc");
            },
            TypeError,
            "Должно выбрасывать TypeError для строки вместо объекта"
        );
    });

    QUnit.test("Выбрасывает ошибку, если аргумент является числом", function(assert) {
        assert.throws(
            function() {
                deepMerge({}, 52);
            },
            TypeError,
            "Должно выбрасывать TypeError для числа вместо объекта"
        );
    });

    QUnit.test("Выбрасывает ошибку, если аргумент равен null", function(assert) {
        assert.throws(
            function() {
                deepMerge({}, null);
            },
            TypeError,
            "Должно выбрасывать TypeError для null вместо объекта"
        );
    });

    QUnit.test("Выбрасывает ошибку, если аргумент является undefined", function(assert) {
        assert.throws(
            function() {
                deepMerge({}, undefined);
            },
            TypeError,
            "Должно выбрасывать TypeError для undefined вместо объекта"
        );
    });

    QUnit.test("Выбрасывает ошибку, если аргумент является массивом", function(assert) {
        assert.throws(
            function() {
                deepMerge({}, [1, 2, 3]);
            },
            TypeError,
            "Должно выбрасывать TypeError для массива вместо объекта"
        );
    });

    QUnit.test("Не добавляет унаследованные свойства из target", function(assert) {
        const source = {
            value: 1
        };

        const target = Object.create({
            inherited: 2
        });

        target.own = 3;

        const expected = {
            value: 1,
            own: 3
        };

        const result = deepMerge(source, target);

        assert.deepEqual(
            result,
            expected,
            "Должно объединять только собственные свойства target"
        );
    });

    QUnit.test("Не изменяет исходные объекты", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25
            }
        };

        const target = {
            user: {
                age: 30
            },
            active: true
        };

        const sourceBefore = structuredClone(source);
        const targetBefore = structuredClone(target);

        deepMerge(source, target);

        assert.deepEqual(
            source,
            sourceBefore,
            "Первый аргумент не должен изменяться"
        );

        assert.deepEqual(
            target,
            targetBefore,
            "Второй аргумент не должен изменяться"
        );
    });
});
