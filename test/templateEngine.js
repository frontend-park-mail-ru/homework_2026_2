'use strict';

QUnit.module("Тестируем функцию templateEngine", function() {
    QUnit.test("Работает правильно с простым шаблоном с одной переменной", function(assert) {
        const template = "Привет, {{name}}!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк!");
    });

    QUnit.test("Работает правильно с шаблоном с отсутствующими переменными", function(assert) {
        const template = "Привет, {{name}}! Тебе {{age}} лет.";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк! Тебе  лет."); // Возраст не найден, заменён на пустую строку
    });

    QUnit.test("Работает правильно с шаблоном с вложенными переменными", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская");
    });

    QUnit.test("Заменяет несколько одинаковых и разных переменных в одной строке", function(assert) {
        const template = "{{name}}, {{name}}! Как погода в городе {{city}}?";
        const data = { name: "Валентин", city: "Москва" };
        const result = templateEngine(template, data);

        assert.equal(result, "Валентин, Валентин! Как погода в городе Москва?");
    });

    QUnit.test("Игнорирует пробелы внутри фигурных скобок", function(assert) {
        const template = "Привет, {{ name }}! Твой ID: {{  id  }}";
        const data = { name: "Студент", id: 42 };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Студент! Твой ID: 42");
    });

    QUnit.test("Работает правильно с глубокой вложенностью", function(assert) {
        const template = "Значение: {{a.b.c.d}}";
        const data = { a: { b: { c: { d: "Успех" } } } };
        const result = templateEngine(template, data);

        assert.equal(result, "Значение: Успех");
    });

    QUnit.test("Возвращает пустую строку, если передан пустой объект данных", function(assert) {
        const template = "Тут ничего нет: {{missing.value}}";
        const data = {};
        const result = templateEngine(template, data);

        assert.equal(result, "Тут ничего нет: ");
    });

    QUnit.test("Возвращает пустую строку, если шаблон не является строкой", function(assert) {
        assert.equal(templateEngine(null, { name: "Test" }), "");
        assert.equal(templateEngine(42, { name: "Test" }), "");
        assert.equal(templateEngine(undefined, { name: "Test" }), "");
    });

    QUnit.test("Удаляет переменные, если data имеет некорректный тип (null, строка, массив)", function(assert) {
        const template = "Привет, {{name}}!";

        assert.equal(templateEngine(template, null), "Привет, !");
        assert.equal(templateEngine(template, "not an object"), "Привет, !");
        assert.equal(templateEngine(template, [1, 2, 3]), "Привет, !");
    });

    QUnit.test("Игнорирует свойства прототипа (защита от унаследованных свойств)", function(assert) {
        const template = "Значение: {{toString}} и {{__proto__}}";
        const data = {};
        const result = templateEngine(template, data);

        assert.equal(result, "Значение:  и ");
    });

    QUnit.test("Корректно обрабатывает falsy-значения, которые должны выводиться (0, false, пустая строка)", function(assert) {
        const template = "Счет: {{score}}, Активен: {{isActive}}, Текст: {{text}}";
        const data = { score: 0, isActive: false, text: "" };
        const result = templateEngine(template, data);

        assert.equal(result, "Счет: 0, Активен: false, Текст: ");
    });

    QUnit.test("Заменяет null и объекты на пустую строку", function(assert) {
        const template = "Null: {{empty}}, Obj: {{obj}}, Arr: {{arr}}";
        const data = { empty: null, obj: { a: 1 }, arr: [1, 2] };
        const result = templateEngine(template, data);

        assert.equal(result, "Null: , Obj: , Arr: ");
    });

    QUnit.test("Корректно работает с пустой строкой шаблона", function(assert) {
        assert.equal(templateEngine("", { name: "Test" }), "");
    });

    QUnit.test("Бросает ошибку, если в качестве data приходят объекты Date, Map или Set", function(assert) {
        const template = "Значение: {{a}}";

        assert.throws(() => templateEngine(template, new Date()), /объект с переменными невалиден/i, "Бросает ошибку для Date");
        assert.throws(() => templateEngine(template, new Map()), /объект с переменными невалиден/i, "Бросает ошибку для Map");
        assert.throws(() => templateEngine(template, new Set()), /объект с переменными невалиден/i, "Бросает ошибку для Set");
    });

    QUnit.test("Корректно работает со строками, созданными как объекты", function(assert) {
        const template = Object("Привет, {{name}}!");
        const data = { name: "ВК" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, ВК!");
    });
});
