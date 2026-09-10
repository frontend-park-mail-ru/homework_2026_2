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

    QUnit.test("Не дублирует одинаковые значения", async function(assert){
        window.fetch = (url) => {
            const data = {
                'https://vk.example.com/mailru': {"city": "Москва"},
                'https://vk.example.com/byte':  {"city": "Москва"},
            };
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(data[url]),
            });
        };

        const result = await fetchAndMergeData(['https://vk.example.com/mailru', 'https://vk.example.com/byte']);
        assert.deepEqual(result, {city: ["Москва"]}, "Значение не должно повторяться в массиве");
    });

    QUnit.test("Пустой массив urls возвращает пустой объект", async function(assert) {
        const result = await fetchAndMergeData([]);
        assert.deepEqual(result, {}, "При пустом urls результат - пустой объект");
    });

    QUnit.test("Бросает ошибку, если urls не массив", async function(assert) {
        const isValidationError = (error) =>
            error instanceof TypeError && error.message === 'urls must be an array of strings';

        await assert.rejects(fetchAndMergeData(null), isValidationError, "null должен приводить к TypeError");
        await assert.rejects(fetchAndMergeData("abc"), isValidationError, "строка должна приводить к TypeError");
        await assert.rejects(fetchAndMergeData(undefined), isValidationError, "undefined должен приводить к TypeError");
        await assert.rejects(fetchAndMergeData(42), isValidationError, "число должно приводить к TypeError");
    });

    QUnit.test("Бросает ошибку, если в urls передали не массив строк", async function(assert) {
        const isValidationError = (error) =>
            error instanceof TypeError && error.message === 'urls must be an array of strings';

        await assert.rejects(fetchAndMergeData([1, 2, 3]), isValidationError, "бросаем нашу ошибку, если наш объект - массив чисел");
        await assert.rejects(fetchAndMergeData(['url1', null]), isValidationError, "бросаем нашу ошибку, если передаем массив разных типов");
        await assert.rejects(fetchAndMergeData([{}, {}]), isValidationError, "бросаем нашу ошибку, если передаем массив пустых объектов");
    });

    QUnit.test("Запросы выполняются параллельно", async function(assert) {
        const urls = ['url1', 'url2', 'url3', 'url4'];
        let activeCalls = 0;
        let maxActiveCalls = 0;

        window.fetch = (url) => {
            activeCalls++;
            maxActiveCalls = Math.max(maxActiveCalls, activeCalls);

            return new Promise((resolve) => {
                setTimeout(() => {
                    activeCalls--;
                    resolve({
                        ok: true,
                        json: () => Promise.resolve({ id: url }),
                    });
                }, 50);
            });
        };

        await fetchAndMergeData(urls);

        assert.strictEqual(maxActiveCalls, urls.length, "Все запросы должны стартовать одновременно, а не по очереди");
    });

    QUnit.test("Часть запросов упала, часть отработала", async function(assert) {
        window.fetch = (url) => {
            if (url === 'https://vk.example.com/broken') {
                return Promise.reject(new Error("Network error"));
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ city: "Москва" }),
            });
        };

        const result = await fetchAndMergeData(['https://vk.example.com/broken', 'https://vk.example.com/ok']);
        assert.deepEqual(result, { city: ["Москва"] }, "Данные с рабочей ссылки должны попасть в результат, сломанная — пропущена");
    });

    QUnit.test("Пропускает ответ с ok: false", async function(assert) {
        window.fetch = () => {
            return Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: "Not found" }),
            });
        };

        const result = await fetchAndMergeData(['https://vk.example.com/notfound']);
        assert.deepEqual(result, {}, "Ответ с ok: false не должен попадать в результат");
    });
});

