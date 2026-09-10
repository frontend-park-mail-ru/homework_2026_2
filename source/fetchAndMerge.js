'use strict';

/**
 * Загружает данные по списку ссылок и объединяет их в один объект.
 * Для каждого ключа результат - массив уникальных значений,
 * встретившихся в загруженных объектах. Ошибки отдельных
 * запросов игнорируются, такие ссылки просто пропускаются
 *
 * @async
 * @param {Array<string>} urls список адресов для загрузки
 * @throws {TypeError} если urls не является массивом строк
 * @returns {Promise<Object>} объект с объединенными данными
 *
 * @example
 * // returns { id: [1, 2], name: ['Олег', 'Мария'] }
 * fetchAndMergeData(['url1', 'url2']);
 */
async function fetchAndMergeData(urls) {
    if (!Array.isArray(urls) || !urls.every((url) => typeof url === 'string')) {
        throw new TypeError('urls must be an array of strings');
    }

    const settled = await Promise.allSettled(
        urls.map((url) =>
            fetch(url).then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed: ${url}`);
                }
                return response.json();
            })
        )
    );

    return settled.reduce((result, item) => {
        if (item.status !== 'fulfilled') {
            return result;
        }
        for (const [key, value] of Object.entries(item.value)) {
            if (!result[key]) {
                result[key] = [];
            }
            if (!result[key].includes(value)) {
                result[key].push(value);
            }
        }
        return result;
    }, {});
}
