'use strict';

QUnit.module('Тестируем функцию filterObjectByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });
    QUnit.test("Проверка, если поля имеют значение false", (assert) => {
        const origin = {a: false, b: true, c:0};
        const keys = ["a", "b", "c"];

        const result = filterObjectByKeys(origin, keys);
        assert.deepEqual(result, origin, "Ключи, которые имеют значение false должны присутствовать");
    });
    QUnit.test("Проверка, что происходит глубокое копирование", (assert) => {
        const origin = {stat: 200, data: {msg: "hello", value: 125}};
        const keys = ["data"];

        const result = filterObjectByKeys(origin, keys);
        origin.data.value = 52;

        assert.deepEqual(result, {data: {msg: "hello", value: 125}}, "Все ключи копируются полно");
    });
    QUnit.test("Проверка, если массив keys пуст, то вернётся объект без значений", (assert) => {
        const origin = {a: 1, b: 2, c: 3};
        const keys = [];

        const result = filterObjectByKeys(origin, keys);
        assert.deepEqual(result, {}, "Объект не должен содержать ключей");
    });
    QUnit.test("Проверка, что массив keys может иметь значения не только String", (assert) => {
        const origin = {1: 'a', 2: 'b', a: 1293};
        const keys = [1, 2, "a"];

        const result = filterObjectByKeys(origin, keys);
        assert.deepEqual(result, origin, "Объект должен содержать все ключи");
    });
    QUnit.test("Проверка, что исходный объект пустой, то результат будет пустым", (assert) => {
        const origin = {};
        const keys = ["a", "b", "c"];

        const result = filterObjectByKeys(origin, keys);
        assert.deepEqual(result, {}, "Из пустого объекта должен быть пустой");
    });
    QUnit.test("Проверка на не соответствие типов аргументов", (assert) => {
        const origin = {a: 1, b: 2, c: 3};
        const keys = ["a", "b", "c"];

        let result = filterObjectByKeys(origin, null);
        assert.deepEqual(result, {}, "Из не массива не понятно, какие должны быть поля");
        
        result = filterObjectByKeys("its_string", keys);
        assert.deepEqual(result, {}, "Из не объекта невозможно получить объект");

        result = filterObjectByKeys(null, keys);
        assert.deepEqual(result, {}, "Из null невозможно получить объект");
    });
    QUnit.test("Проверка на Object.create(null)", (assert) => {
        const origin = Object.create(null);
        const keys = ["a", "k"];

        const result = filterObjectByKeys(origin, keys);

        assert.deepEqual(result, {}, "Object.create(null) не содержит полей");
    });
    QUnit.test("Проверка, если объект содержит hasOwnProperty/hasOwn", (assert) => {
        const origin = {hasOwnProperty: 1, a: 5, hasOwn: "STR"};

        let result = filterObjectByKeys(origin, ["a"]);
        assert.deepEqual(result, {a: 5}, "hasOwnProperty поле не функция");

        result = filterObjectByKeys(origin, ["hasOwnProperty"]);
        assert.deepEqual(result, {hasOwnProperty: 1}, "hasOwnProperty должен копироваться, даже если он переопределен");

        result = filterObjectByKeys(origin, ["hasOwn"]);
        assert.deepEqual(result, {hasOwn: "STR"}, "hasOwn должен копироваться, даже если он переопределен");
    });
    QUnit.test("Проверка, если объект содержит некопируемый structuredClone объект", (assert) => {
        /**
         * Вывод в текст "It's function!" в консоль.
         * @returns {void}
        */
        const funct = () => console.log("It's function!");
        const weakSet = new WeakSet([funct, funct, funct]);
        const origin = {f: funct, a: 2, w: weakSet};

        let result = filterObjectByKeys(origin, ["f"]);
        assert.deepEqual(result, {f: funct}, "Поле-функция должна копироваться по ссылке");

        result = filterObjectByKeys(origin, ["f", "w"]);
        assert.deepEqual(result, {f: funct, w: weakSet}, "Не только функции должны копироваться по ссылке");
    });
    QUnit.test("Проверка, что функция не изменяет аргументы", (assert) => {
        const origin = {1: 5, a: 7, c: null};
        const keys = ["a", 1];

        filterObjectByKeys(origin, keys);

        assert.deepEqual(origin, {1: 5, a: 7, c: null}, "Первый аргумент не должен изменяться");
        assert.deepEqual(keys, ["a", 1], "Второй аргумент не должен изменяться");
    });
    QUnit.test("Проверка, что __proto__ тоже копируется как поле", (assert) => {
        const origin = JSON.parse('{"__proto__":{"a":1}}');
        const keys = ["__proto__"];

        const result = filterObjectByKeys(origin, keys);
        const answer = JSON.parse('{"__proto__":{"a":1}}');
        assert.deepEqual(result, answer, "__proto__ тоже нужно копировать");
        assert.deepEqual(
            Object.getPrototypeOf(result), null,
            "У JSON.parse('{\"__proto__\":{\"a\":1}}') должен быть прототип null"
        );
    });
    QUnit.test("Проверка на копировании множество тяжелых объектов за нормальное время", (assert) => {
        const origin = {els: Array.from(
            { length: 100 },
            (v, index) => ({
                id: index,
                value: Array.from(
                    {length: 100},
                    (v, index) => ({
                        id: index
                    }))
            })
        )};
        const keys = Array.from({length: 100_000}, (v, index) => "els");

        const result = filterObjectByKeys(origin, keys);
        assert.deepEqual(result, origin, "Должен отметать одинаковые ключи и при этом выполняться относительно быстро");
    });
    QUnit.test("Проверка, что поля прототипа не попадают в результат работы", (assert) => {
        const origin = Object.create({a: 1});
        const keys = ["a"];

        const result = filterObjectByKeys(origin, keys);

        assert.deepEqual(result, {}, "Поля прототипа не должны попадать в результат");
    });
});
