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

    QUnit.test("Работает с пустым целевым объектом", function(assert) {
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

    QUnit.test("Работает с глубокой вложенностью", function(assert) {
        const source = {
            a: {
                b: {
                    c: {
                        d: 1,
                        e: 2
                    }
                }
            }
        };

        const target = {
            a: {
                b: {
                    c: {
                        e: 3,
                        f: 4
                    }
                }
            }
        };

        const expected = {
            a: {
                b: {
                    c: {
                        d: 1,
                        e: 3,
                        f: 4
                    }
                }
            }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно рекурсивно объединять объекты на любой глубине");
    });

    QUnit.test("Перезаписывает значение возраста age из target", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
            city: "Wonderland"
        };

        const target = {
            age: 30
        };

        const expected = {
            name: "Алиса",
            age: 30,
            city: "Wonderland"
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Возраст age из target должен перезаписать значение из source");
    });

    QUnit.test("Корректно обрабатывает Map на входе", function(assert) {
        const source = new Map();

        const target = {
            a: 1
        };

        const expected = {
            a: 1
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Map в source должен трактоваться как пустой объект");
    });

    QUnit.test("Не мутирует исходные объекты и не сохраняет ссылки на вложенные объекты", function(assert) {
            const source = {
                user: {
                    name: "Alice",
                    address: {
                        city: "Wonderland"
                    }
                }
            };

            const target = {
                user: {
                    age: 30
                }
            };

            const result = deepMerge(source, target);

            result.user.name = "Bob";
            result.user.address.city = "Fantasyland";

            assert.strictEqual(source.user.name, "Alice", "source.user.name не должен меняться");
            assert.strictEqual(source.user.address.city, "Wonderland", "source.user.address.city не должен меняться");

            assert.strictEqual(target.user.age, 30, "target.user.age не должен меняться");
    });

    QUnit.test("Не сохраняет ссылку на вложенный объект, который есть только в source", function(assert) {
        const source = {
            nested: {
                value: 1,
                deeper: {
                    count: 10
                }
            }
        };

        const target = {};

        const result = deepMerge(source, target);

        result.nested.value = 999;
        result.nested.deeper.count = 888;

        assert.strictEqual(source.nested.value, 1, "source.nested.value не должен меняться");
        assert.strictEqual(source.nested.deeper.count, 10, "source.nested.deeper.count не должен меняться");
    });

    QUnit.test("Возвращает source, если target - примитив", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const result = deepMerge(source, 42);

        assert.deepEqual(result, { name: "Алиса", age: 25 }, "число в target игнорируется");
        assert.notStrictEqual(result, source, "должна возвращаться копия, а не тот же объект");
    });

    QUnit.test("Возвращает source, если target - boolean", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const result = deepMerge(source, true);

        assert.deepEqual(result, { name: "Алиса", age: 25 }, "boolean в target игнорируется");
    });

    QUnit.test("Возвращает source, если target - undefined", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const result = deepMerge(source, undefined);

        assert.deepEqual(result, { name: "Алиса", age: 25 }, "undefined в target игнорируется");
    });

    QUnit.test("Работает корректно, если source - примитив", function(assert) {
        const target = {
            name: "Алиса",
            age: 25
        };

        const expected = {
            name: "Алиса",
            age: 25
        };

        const result = deepMerge(42, target);
        assert.deepEqual(result, expected, "Число в source трактуется как пустой объект");
    });
});
