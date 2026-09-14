/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию fetchAndMerge", function() {
    QUnit.test("Возвращает объект при полученных данных", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [25, 22],
            "id": [1, 2],
            "name": ["Олег", "Мария"],
            "surname": ["Петров", "Иванова"],
            "status": ["Дуров, верни стену!"],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "name": "Олег", "surname": "Петров", "age": 25, "status": "Дуров, верни стену!" },
                'https://mailru.example.com/mailid': { "id": 2, "name": "Мария", "surname": "Иванова", "age": 22 },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Должно правильно объединять данные с разных URL");
    });

    QUnit.test("Работает правильно при ошибках fetch", async function(assert) {
        const urls = [
            'https://vk.example.com/mailru',
            'https://vk.example.com/byte'
        ];

        window.fetch = () => Promise.reject(new Error("Network error"));

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, {}, "Должно возвращать пустой объект при ошибке fetch");
    });

    QUnit.test("Работает с одним URL", async function(assert) {
    const urls = [
        'https://example.com/user',
    ];
    const expected = {
        "id": [1],
        "name": ["Олег"],
    };

    window.fetch = () => {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "id": 1,
                "name": "Олег",
            }),
        });
    };

    const result = await fetchAndMergeData(urls);
    assert.deepEqual(result, expected, "Должно правильно обрабатывать один URL");
});

QUnit.test("Не добавляет одинаковые значения повторно", async function(assert) {
    const urls = [
        'https://example.com/first',
        'https://example.com/second',
    ];
    const expected = {
        "city": ["Москва"],
    };

    window.fetch = () => {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "city": "Москва",
            }),
        });
    };

    const result = await fetchAndMergeData(urls);
    assert.deepEqual(result, expected, "Одинаковые значения не должны повторяться");
});

});

