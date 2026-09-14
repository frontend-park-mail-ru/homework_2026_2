'use strict';

QUnit.module("Тестируем функцию compressObject", function () {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками", function (assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        assert.deepEqual(result, { name: "Андрей", country: "Россия" }, "Должны остаться только ключи с ненулевыми значениями.");
    });

    QUnit.test("Работает с объектом без ненулевых значений", function (assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Объект без ненулевых значений должен вернуть пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function (assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Пустой объект должен вернуть пустой объект.");
    });
    // Мои тесты
    QUnit.test("работает с объектом null", function (assert) {
        const result = compressObject(null);

        assert.deepEqual(result, null, "Объект null должен вернуть null.")
    });
    QUnit.test("Работает с объектом с вложенностью", function (assert) {
        const result = compressObject({
            a: {
                c: undefined,
                d: null,
            },
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Объект с вложенностью обрабатывается по тем же правилам");
    });
    QUnit.test("Возвращает null для не-объектов", function (assert) {
        assert.strictEqual(compressObject(undefined), undefined, "undefined возвращает undefined");
        assert.strictEqual(compressObject("строка"), "строка", "строка возвращает строку");
        assert.strictEqual(compressObject(42), 42, "число возвращает число");
        const arrObj = [1, 2, 3];
        assert.strictEqual(compressObject(arrObj), arrObj, "массив возвращает массив");
    });
    QUnit.test("Не удаляет 0, false, NaN и массивы", function (assert) {
        const result = compressObject({
            a: 0,
            b: false,
            c: NaN,
            d: [1, 2],
            e: null,
        });

        assert.strictEqual(result.a, 0, "0 остаётся");
        assert.strictEqual(result.b, false, "false остаётся");
        assert.ok(Number.isNaN(result.c), "NaN остаётся");
        assert.deepEqual(result.d, [1, 2], "массив остаётся");
        assert.strictEqual(result.e, undefined, "null удаляется");
    });
    QUnit.test("Сохраняет непустые вложенные объекты", function (assert) {
        const result = compressObject({
            user: {
                name: "Анна",
                age: null,
            },
            city: "",
        });

        assert.deepEqual(result, { user: { name: "Анна" } }, "Вложенный объект очищается и сохраняется");
    });
});
