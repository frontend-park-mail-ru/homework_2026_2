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

    QUnit.test("Одинаковые значения не должны повторяться", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "age": [25],
            "id": [1, 2],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "age": 25},
                'https://mailru.example.com/mailid': { "id": 2, "age": 25 },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Одинаковые значения не должны повторяться");
    });

    QUnit.test("Проверка на корректный результат при использовании ключа, совпадающего с унаследованным свойством", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];
        const expected = {
            "toString": [25, 22],
            "id": [1, 2],
        };
        
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': { "id": 1, "toString": 25},
                'https://mailru.example.com/mailid': { "id": 2, "toString": 22 },
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, expected, "Корректная работа");
    });

    QUnit.test("Ключ __proto__ сохраняется и не меняет прототип результата", async function(assert) {
        const urls = [
            'https://vk.example.com/vkid',
            'https://mailru.example.com/mailid',
        ];

        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/vkid': '{"__proto__":"value","id":1}',
                'https://mailru.example.com/mailid': '{"__proto__":"other","id":2}',
            };

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(JSON.parse(data[url])),
            });
        };

        const result = await fetchAndMergeData(urls);

        assert.deepEqual(Object.keys(result), ["__proto__", "id"], "Ключ __proto__ должен быть собственным свойством");
    });

    QUnit.test("Возвращает пустой объект при пустом массиве URL", async function(assert) {
        const urls = [];

        window.fetch = (url) => {

            return Promise.resolve({
                ok: true,
            });
        };

        const result = await fetchAndMergeData(urls);
        assert.deepEqual(result, {}, "Должно правильно обрабатывать пустой массив URL");
    });

    const createMockFetch = () => {
        const spy = (url) => {
            spy.calls.push(url);

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: 1 }),
            });
        };
        spy.calls = [];

        return spy;
    };

    QUnit.test("Возвращает пустой объект при переданном числе", async function(assert) {
        window.fetch = createMockFetch();

        const result = await fetchAndMergeData(123);
        assert.deepEqual(result, {}, "Должно правильно обрабатывать некорректные входные данные");
        assert.deepEqual(window.fetch.calls, [], "fetch не должен вызываться");
    });

    QUnit.test("Возвращает пустой объект при переданной строке", async function(assert) {
        window.fetch = createMockFetch();

        const result = await fetchAndMergeData("abc");
        assert.deepEqual(result, {}, "Должно правильно обрабатывать некорректные входные данные");
        assert.deepEqual(window.fetch.calls, [], "fetch не должен вызываться для отдельных символов строки");
    });

    QUnit.test("Возвращает пустой объект при переданном null", async function(assert) {
        window.fetch = createMockFetch();

        const result = await fetchAndMergeData(null);
        assert.deepEqual(result, {}, "Должно правильно обрабатывать некорректные входные данные");
        assert.deepEqual(window.fetch.calls, [], "fetch не должен вызываться");
    });

    QUnit.test("Возвращает пустой объект при массиве, содержащем не строку", async function(assert) {
        window.fetch = createMockFetch();

        const result = await fetchAndMergeData(['https://example.com', 123]);
        assert.deepEqual(result, {}, "Должно правильно обрабатывать некорректные входные данные");
        assert.deepEqual(window.fetch.calls, [], "fetch не должен вызываться ни для одного URL");
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

    QUnit.test("Работает правильно при некорректном ответе fetch", async function(assert) {
        const urls = [
            'https://vk.example.com/mailru',
            'https://vk.example.com/byte'
        ];

        window.fetch = (url) => {
            return Promise.resolve({
                ok: false,
                json: () => Promise.resolve({id: 123})
            });
        };

        const result = await fetchAndMergeData(urls);

        assert.deepEqual(result, {}, "Должно возвращать пустой объект при ошибке fetch");
    });

    QUnit.test("Возвращает пустой объект при смеси успешных и неуспешных запросов", async function(assert) {
        const urls = [
            'https://vk.example.com/mailru',
            'https://vk.example.com/byte',
        ];

        window.fetch = (url) => {
            if (url === urls[0]) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: 1,
                        name: "Олег",
                    }),
                });
            }

            return Promise.resolve({
                ok: false,
                json: () => Promise.resolve({
                    id: 2,
                    name: "Мария",
                }),
            });
        };

        const result = await fetchAndMergeData(urls);

        assert.deepEqual(result, {}, "Если хотя бы один запрос неуспешен, должен вернуться пустой объект");
    });
});
