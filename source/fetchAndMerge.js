'use strict';

/**
 * Загружает данные по URL и объединяет значения одинаковых ключей.
 *
 * @param {Array<string>} urls - массив URL-адресов
 * @returns {Promise<Object>} объект с объединёнными данными
 */
const fetchAndMergeData = async (urls) => {
        //Проверка строк на url
        if (!Array.isArray(urls) || !urls.every((url) => {
            if (typeof url !== 'string') {
                return false;
            }

            try {
                new URL(url);
                return true;
            } catch (error) {
                return false;
            }
        })) {
            return {};
        }
        const result = {};

    try {
        // Загружаем данные со всех URL параллельно
        const data = await Promise.all(
            urls.map(async (url) => {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Request failed');
                }

                return response.json();
            })
        );

         // Объединяем значения по одинаковым ключам
        data.forEach((item) => {
            Object.entries(item).forEach(([key, value]) => {
                if (result[key] === undefined) {
                    result[key] = [];
                }

                // Добавляем только уникальные значения
                if (!result[key].includes(value)) {
                    result[key].push(value);
                }
            });
        });

        return result;
    } catch (error) {
        // Обрабатываем ошибки сети и загрузки данных
        return {};
    }
};
