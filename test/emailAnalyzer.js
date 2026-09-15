'use strict';

QUnit.module("Тестируем функцию emailAnalyzer", function () {
    QUnit.test("Работает правильно со строкой с одним email", function (assert) {
        const input = "Мой email: user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с разными регистрами email", function (assert) {
        const input = "Контакты: User@Example.com и user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с некорректными email", function (assert) {
        const input = "Некорректные email: user@, @example.com, user@domain..com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("Пустая строка", function (assert) {
        const input = "";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("Несколько разных email, один встречается чаще", function (assert) {
        const input = "a@test.com b@test.com a@test.com c@test.com a@test.com";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 5,
            uniqueEmails: ["a@test.com", "b@test.com", "c@test.com"],
            mostFrequentEmail: "a@test.com"
        });
    });

    QUnit.test("null вместо строки", function (assert) {
        const input = null;
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("число вместо строки", function (assert) {
        const input = 123;
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("email с доменом с цифрами", function (assert) {
        const input = "Контакт: user@domain.123";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@domain.123"],
            mostFrequentEmail: "user@domain.123"
        });
    });

    QUnit.test("самый частый email встречается не первым", function (assert) {
        const input = "x@a.com y@b.com y@b.com z@c.com y@b.com";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 5,
            uniqueEmails: ["x@a.com", "y@b.com", "z@c.com"],
            mostFrequentEmail: "y@b.com"
        });
    });

    QUnit.test("два адреса встречаются одинаковое число раз", function (assert) {
        const input = "a@test.com b@test.com a@test.com b@test.com";
        const result = emailAnalyzer(input);

        assert.strictEqual(result.emailCount, 4);
        assert.deepEqual(result.uniqueEmails, ["a@test.com", "b@test.com"], "uniqueEmails");

        const allowed = ["a@test.com", "b@test.com"];
        assert.ok(
            allowed.includes(result.mostFrequentEmail),
            "mostFrequentEmail должен быть одним из самых частых: a@test.com или b@test.com"
        );
    });

    QUnit.test("Односимвольная доменная зона (c, 1) должна матчиться", function (assert) {
        const input = "user@domain.c user@domain.1";
        const result = emailAnalyzer(input);

        assert.strictEqual(result.emailCount, 2, "должно найтись 2 email");
        assert.deepEqual(
            result.uniqueEmails.sort(),
            ["user@domain.c", "user@domain.1"].sort(),
            "уникальные email"
        );
    });
});
