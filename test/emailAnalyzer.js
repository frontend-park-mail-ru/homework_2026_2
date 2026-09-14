'use strict';

QUnit.module("Тестируем функцию emailAnalyzer", function() {
    QUnit.test("Работает правильно со строкой с одним email", function(assert) {
        const input = "Мой email: user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с разными регистрами email", function(assert) {
        const input = "Контакты: User@Example.com и user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с некорректными email", function(assert) {
        const input = "Некорректные email: user@, @example.com, user@domain..com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("Самый частый email не первый по порядку", function(assert) {
        const input = "Писать на first@mail.ru, main@mail.ru, main@mail.ru, last@mail.ru и снова main@mail.ru.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 5,
            uniqueEmails: ["first@mail.ru", "main@mail.ru", "last@mail.ru"],
            mostFrequentEmail: "main@mail.ru"
        });
    });

    QUnit.test("При одинаковой частоте возвращает первый встреченный", function(assert) {
        const input = "one@mail.ru, two@mail.ru, one@mail.ru, two@mail.ru, three@mail.ru.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 5,
            uniqueEmails: ["one@mail.ru", "two@mail.ru", "three@mail.ru"],
            mostFrequentEmail: "one@mail.ru"
        });
    });

    QUnit.test("TypeError, если аргумент не строка", function(assert) {
        [null, undefined, 42, {}, [], true].forEach(function(value) {
            assert.throws(function() {
                emailAnalyzer(value);
            }, TypeError);
        });
    });
});

    QUnit.test("Работает с пустой строкой", function(assert) {
        const result = emailAnalyzer("");

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });
