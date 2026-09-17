'use strict';

QUnit.module("Тестируем функцию compressObject", function() {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками", function(assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        assert.deepEqual(result, { name: "Андрей", country: "Россия" }, "Должны остаться только ключи с ненулевыми значениями.");
    });

    QUnit.test("Работает с объектом без ненулевых значений", function(assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Объект без ненулевых значений должен вернуть пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Пустой объект должен вернуть пустой объект.");
    });

    QUnit.test("Работает с значением NaN, 0, false", function(assert) {
        const result = compressObject({
            name: NaN,
            age: 0,
            male: false
        });

        assert.deepEqual(result, { name: NaN, age: 0, male: false }, "Ключи с значениями NaN, 0, false должны остаться.");
    });

    QUnit.test("Работает с строками 'null', 'undefined'", function(assert) {
        const result = compressObject({
            firstString: "null",
            secondString: "undefined",
        });

        assert.deepEqual(result, { firstString: "null", secondString: "undefined" }, "Ключи с строками 'null' и 'undefined' должны остаться.");
    });

    QUnit.test("Работает с ключом - пустой строкой", function(assert) {
        const result = compressObject({ "": 0 });

        assert.deepEqual(result, { "": 0 }, "Свойство с ключом - пустой строкой должно остаться.");
    });

    QUnit.test("Бросает TypeError при невалидных входных данных", function(assert) {
        assert.throws(() => compressObject(null), /compressObject принимает только объект/, "null должен бросать TypeError с заданным сообщением.");
        assert.throws(() => compressObject(undefined), TypeError, "undefined должен бросать TypeError.");
        assert.throws(() => compressObject("abc"), TypeError, "Строка должна бросать TypeError.");
        assert.throws(() => compressObject(123), TypeError, "Число должно бросать TypeError.");
        assert.throws(() => compressObject([1, 2, 3]), TypeError, "Массив должен бросать TypeError.");
        assert.throws(() => compressObject(new Date()), TypeError, "Date должен бросать TypeError.");
        assert.throws(() => compressObject(new Map([['a', 1]])), TypeError, "Map должен бросать TypeError.");
        assert.throws(() => compressObject(new String('abc')), TypeError, "Обертка String должна бросать TypeError.");
        assert.throws(() => compressObject(new Set([1, 2, 3])), TypeError, "Set должен бросать TypeError.");
    });
});
