'use strict';

/**
 * Загружает данные по URL и объединяет значения одинаковых ключей.
 *
 * @param {Array<string>} urls - массив URL-адресов
 * @returns {Promise<Object>} объект с объединёнными данными
 */
const fetchAndMergeData = async (urls) => {
    const result = {};

    try {
        // Загружаем данные по каждому URL
        for (const url of urls) {
            const response = await fetch(url);

            // При ошибочном ответе возвращаем пустой объект
            if (!response.ok) {
                return {};
            }

            const data = await response.json();

            // Объединяем значения по одинаковым ключам
            for (const key in data) {
                if (!result[key]) {
                    result[key] = [];
                }

                // Добавляем только уникальные значения
                if (!result[key].includes(data[key])) {
                    result[key].push(data[key]);
                }
            }
        }

        return result;
    } catch (error) {
        // Обрабатываем ошибки сети и загрузки данных
        return {};
    }
};