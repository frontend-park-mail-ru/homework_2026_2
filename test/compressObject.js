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

    QUnit.test("Сохраняет значения 0 и false, не считая их пустыми", function(assert) {
        const result = compressObject({
            count: 0,
            isActive: false,
            name: "Тест",
            empty: ""
        });

        assert.deepEqual(result, { count: 0, isActive: false, name: "Тест" }, "0 и false — не пустые значения, их нужно сохранить.");
    });

    QUnit.test("Работает с объектом, где все значения ненулевые", function(assert) {
        const result = compressObject({
            a: 1,
            b: "hello",
            c: true
        });

        assert.deepEqual(result, { a: 1, b: "hello", c: true }, "Если все значения ненулевые, объект должен остаться без изменений.");
    });

    QUnit.test("Не изменяет исходный объект", function(assert) {
        const original = { a: 1, b: null, c: "test" };
        compressObject(original);

        assert.deepEqual(original, { a: 1, b: null, c: "test" }, "Исходный объект не должен мутировать.");
    });

    QUnit.test("Игнорирует унаследованные свойства", function(assert) {
        const proto = { inherited: 'oops' };
        const obj = Object.create(proto);
        obj.own = 1;

        const result = compressObject(obj);

        assert.deepEqual(result, { own: 1 }, "Унаследованные свойства не должны попадать в результат.");
    });

    QUnit.test("Копирование поверхностное: вложенные объекты остаются общими с исходным", function(assert) {
        const original = { user: { name: 'Alice' }, empty: '' };
        const result = compressObject(original);
        result.user.name = 'Bob';

        assert.strictEqual(original.user.name, 'Bob', "Вложенный объект должен быть общим.");
    });

    QUnit.test("Бросает TypeError на невалидные входные данные", function(assert) {
        assert.throws(() => compressObject(null), /compressObject: ожидается обычный объект/, "null должен бросать ошибку.");
        assert.throws(() => compressObject(undefined), /compressObject: ожидается обычный объект/, "undefined должен бросать ошибку.");
        assert.throws(() => compressObject('abc'), /compressObject: ожидается обычный объект/, "Строка должна бросать ошибку.");
        assert.throws(() => compressObject(42), /compressObject: ожидается обычный объект/, "Число должно бросать ошибку.");
        assert.throws(() => compressObject([1, 2, 3]), /compressObject: ожидается обычный объект/, "Массив должен бросать ошибку.");
        assert.throws(() => compressObject(true), /compressObject: ожидается обычный объект/, "Boolean должен бросать ошибку.");
    });

    QUnit.test("Сохраняет вложенный объект как есть", function(assert) {
        const result = compressObject({
            a: 1,
            nested: { x: null, y: 'test' },
            empty: ''
        });

        assert.deepEqual(
            result,
            { a: 1, nested: { x: null, y: 'test' } },
            "Вложенный объект должен сохраниться без изменений."
        );
    });

    QUnit.test("Бросает TypeError на непростые объекты (Date, Map и т.д.)", function(assert) {
        assert.throws(() => compressObject(new Date()), TypeError, "Date должен бросать ошибку.");
        assert.throws(() => compressObject(new Map([['a', 1]])), TypeError, "Map должен бросать ошибку.");
    });

    QUnit.test("Работает с объектом без прототипа", function(assert) {
        const obj = Object.create(null);
        obj.a = 1;
        obj.b = null;

        const result = compressObject(obj);

        assert.deepEqual(result, { a: 1 }, "Object.create(null) должен обрабатываться как простой объект.");
    });

    QUnit.test("Бросает TypeError на экземпляры пользовательских классов", function(assert) {
        /**
         * Тестовый класс для проверки, что экземпляры классов не считаются простыми объектами.
         */
        class User {
            /**
             * Создаёт экземпляр User.
             */
            constructor() {
                this.name = 'Alice';
            }
        }

        assert.throws(() => compressObject(new User()), /compressObject: ожидается обычный объект/, "Экземпляр класса должен бросать ошибку.");
    });
});
