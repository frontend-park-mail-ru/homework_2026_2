'use strict';

const emptyTestObject = {};
const simpleTestObject = {
    name: "John",
    age: 18,
};
const testWithArrayObject = {
    name: "Bob",
    age: 20,
    classes: ["Math", "Physics", "PE"],
};
const testNestedObject = {
    user: {
        profile: { firstName: "Alice", lastName: "Smith" },
        settings: { theme: "dark" }
    },
    role: "admin"
};
const testRecursiveObject = {
    name: "Pete",
    age: 19,
    classes: ["Math", "Physics", "PE"],
    friends: [testWithArrayObject, simpleTestObject],
};
const testSpecialValues = {
    a: null,
    b: undefined,
    c: new Date("2026-09-12"),
    d: 42
};


QUnit.module('Тестируем функцию filterByKeys', function () {

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

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Клонирует пустой объект', function (assert) {
        assert.deepEqual(filterByKeys(emptyTestObject, ["name"]), {}, 'filterByKeys({}, ["name"]) === {}');
        assert.deepEqual(filterByKeys(emptyTestObject, []), {}, 'filterByKeys({}, []) === {}');
        assert.deepEqual(filterByKeys(emptyTestObject, ["x", "y", "z"]), {}, 'несуществующие ключи в пустом объекте');
    });

    QUnit.test('Клонирует объект с примитивными полями', function (assert) {
        assert.deepEqual(
            filterByKeys(simpleTestObject, ["name", "age"]),
            { name: "John", age: 18 },
            'фильтрация по всем существующим ключам'
        );
        assert.deepEqual(
            filterByKeys(simpleTestObject, ["name"]),
            { name: "John" },
            'фильтрация по одному ключу'
        );
        assert.deepEqual(
            filterByKeys(simpleTestObject, ["age"]),
            { age: 18 },
            'фильтрация по другому ключу'
        );
    });

    QUnit.test('Игнорирует несуществующие ключи', function (assert) {
        assert.deepEqual(
            filterByKeys(simpleTestObject, ["name", "email", "phone"]),
            { name: "John" },
            'несуществующие ключи не попадают в результат'
        );
        assert.deepEqual(
            filterByKeys(simpleTestObject, ["x", "y", "z"]),
            {},
            'все ключи несуществующие → {}'
        );
    });

    QUnit.test('Работает с пустым массивом keys', function (assert) {
        assert.deepEqual(
            filterByKeys(simpleTestObject, []),
            {},
            'пустой keys → {}'
        );
        assert.deepEqual(
            filterByKeys(testWithArrayObject, []),
            {},
            'пустой keys для сложного объекта → {}'
        );
    });

    QUnit.test('Клонирует массивы глубоко (не по ссылке)', function (assert) {
        const filtered = filterByKeys(testWithArrayObject, ["classes"]);

        assert.deepEqual(
            filtered,
            { classes: ["Math", "Physics", "PE"] },
            'массив скопирован корректно'
        );

        filtered.classes.push("Chemistry");
        assert.deepEqual(
            testWithArrayObject.classes,
            ["Math", "Physics", "PE"],
            'оригинальный массив НЕ изменился после мутации копии'
        );
    });

    QUnit.test('Клонирует вложенные объекты глубоко', function (assert) {
        const filtered = filterByKeys(testNestedObject, ["user"]);

        assert.deepEqual(
            filtered,
            {
                user: {
                    profile: { firstName: "Alice", lastName: "Smith" },
                    settings: { theme: "dark" }
                }
            },
            'вложенный объект скопирован корректно'
        );

        filtered.user.profile.firstName = "CHANGED";
        assert.strictEqual(
            testNestedObject.user.profile.firstName,
            "Alice",
            'оригинальный вложенный объект НЕ изменился'
        );
    });

    QUnit.test('Клонирует рекурсивные структуры (массив объектов)', function (assert) {
        const filtered = filterByKeys(testRecursiveObject, ["friends"]);

        assert.strictEqual(filtered.friends.length, 2, 'в friends два элемента');
        assert.strictEqual(filtered.friends[0].name, "Bob", 'первый друг — Bob');
        assert.strictEqual(filtered.friends[1].name, "John", 'второй друг — John');

        filtered.friends[0].name = "CHANGED";
        assert.strictEqual(
            testRecursiveObject.friends[0].name,
            "Bob",
            'оригинальный вложенный объект в массиве НЕ изменился'
        );
    });

    QUnit.test('Работает со специальными значениями (null, undefined, Date)', function (assert) {
        const filtered = filterByKeys(testSpecialValues, ["a", "b", "c", "d"]);

        assert.strictEqual(filtered.a, null, 'null сохранился');
        assert.strictEqual(filtered.b, undefined, 'undefined сохранился');
        assert.strictEqual(filtered.d, 42, 'число сохранилось');
        assert.ok(filtered.c instanceof Date, 'Date остался экземпляром Date');
        assert.strictEqual(
            filtered.c.toISOString(),
            testSpecialValues.c.toISOString(),
            'значение Date совпадает'
        );

        filtered.c.setFullYear(2000);
        assert.strictEqual(
            testSpecialValues.c.getFullYear(),
            2026,
            'оригинальный Date НЕ изменился'
        );
    });

    QUnit.test('Обрабатывает дубликаты ключей в keys', function (assert) {
        assert.deepEqual(
            filterByKeys(simpleTestObject, ["name", "name", "name"]),
            { name: "John" },
            'дубликаты ключей не создают проблем'
        );
    });

    QUnit.test('Выбрасывает TypeError, если obj — это null', function (assert) {
        assert.throws(
            () => filterByKeys(null, ["name"]),
            TypeError,
            'filterByKeys(null, ["name"]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если obj — это undefined', function (assert) {
        assert.throws(
            () => filterByKeys(undefined, ["name"]),
            TypeError,
            'filterByKeys(undefined, ["name"]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если obj — это строка', function (assert) {
        assert.throws(
            () => filterByKeys("string", ["name"]),
            TypeError,
            'filterByKeys("string", ["name"]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если obj — это число', function (assert) {
        assert.throws(
            () => filterByKeys(42, ["name"]),
            TypeError,
            'filterByKeys(42, ["name"]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если obj — это boolean', function (assert) {
        assert.throws(
            () => filterByKeys(true, ["name"]),
            TypeError,
            'filterByKeys(true, ["name"]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys — это строка', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, "name"),
            TypeError,
            'filterByKeys(obj, "name") выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys — это число', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, 123),
            TypeError,
            'filterByKeys(obj, 123) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys — это null', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, null),
            TypeError,
            'filterByKeys(obj, null) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys — это undefined', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, undefined),
            TypeError,
            'filterByKeys(obj, undefined) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys — это объект', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, { name: true }),
            TypeError,
            'filterByKeys(obj, {name: true}) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys — это Set', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, new Set(["name"])),
            TypeError,
            'filterByKeys(obj, Set) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys содержит объект', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, ["name", { id: 1 }]),
            TypeError,
            'filterByKeys(obj, ["name", {id:1}]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys содержит функцию', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, ["name", () => {}]),
            TypeError,
            'filterByKeys(obj, ["name", fn]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys содержит null', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, ["name", null]),
            TypeError,
            'filterByKeys(obj, ["name", null]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys содержит undefined', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, ["name", undefined]),
            TypeError,
            'filterByKeys(obj, ["name", undefined]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys содержит boolean', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, ["name", true]),
            TypeError,
            'filterByKeys(obj, ["name", true]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys содержит вложенный массив', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, ["name", ["age"]]),
            TypeError,
            'filterByKeys(obj, ["name", ["age"]]) выбрасывает TypeError'
        );
    });

    QUnit.test('Выбрасывает TypeError, если keys содержит BigInt', function (assert) {
        assert.throws(
            () => filterByKeys({ name: "John" }, ["name", 1n]),
            TypeError,
            'filterByKeys(obj, ["name", 1n]) выбрасывает TypeError'
        );
    });

    QUnit.test('Не выбрасывает ошибку, если keys содержит только допустимые типы', function (assert) {
        const sym = Symbol('test');
        const result = filterByKeys(
            { name: "John", 0: "zero", [sym]: "symbol-value" },
            ["name", 0, sym]
        );
        assert.deepEqual(result, { name: "John", 0: "zero", [sym]: "symbol-value" });
    });
});
