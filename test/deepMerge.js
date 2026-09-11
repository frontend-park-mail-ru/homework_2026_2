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
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Работает с пустым объектом-источником", function(assert) {
        const source = {};

        const target = {
            name: "Алиса",
            address: {
                city: "Wonderland"
            }
        };

        const expected = {
            name: "Алиса",
            address: {
                city: "Wonderland"
            }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать второй объект при отсутствии первого");
    });

    QUnit.test("Объединяет объекты глубокой вложенности", function(assert) {
        const source = {
            level1: {
                level2: {
                    level3: {
                        a: 1,
                        b: 2
                    },
                    keep: "источник"
                }
            }
        };

        const target = {
            level1: {
                level2: {
                    level3: {
                        b: 20,
                        c: 30
                    }
                }
            }
        };

        const expected = {
            level1: {
                level2: {
                    level3: {
                        a: 1,
                        b: 20,
                        c: 30
                    },
                    keep: "источник"
                }
            }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно объединять объекты на любом уровне вложенности");
    });

    QUnit.test("Перезаписывает значение, если хотя бы одно из них не объект", function(assert) {
        const source = {
            fromObject: {
                city: "Wonderland"
            },
            fromNumber: 25,
            array: [ 1, 2, 3 ],
            filled: {
                name: "Алиса"
            }
        };

        const target = {
            fromObject: "Wonderland",
            fromNumber: {
                age: 30
            },
            array: [ 4 ],
            filled: null
        };

        const expected = {
            fromObject: "Wonderland",
            fromNumber: {
                age: 30
            },
            array: [ 4 ],
            filled: null
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Массивы и null должны перезаписываться, а не объединяться");
    });

    QUnit.test("Не изменяет исходные объекты", function(assert) {
        const source = {
            user: {
                name: "Алиса",
                age: 25
            }
        };

        const target = {
            user: {
                age: 30
            }
        };

        const result = deepMerge(source, target);

        assert.deepEqual(source, { user: { name: "Алиса", age: 25 } }, "Первый объект не должен меняться");
        assert.deepEqual(target, { user: { age: 30 } }, "Второй объект не должен меняться");
        assert.notStrictEqual(result, source, "Должен возвращаться новый объект");
        assert.notStrictEqual(result.user, source.user, "Вложенные объединённые объекты тоже должны быть новыми");
    });
});
