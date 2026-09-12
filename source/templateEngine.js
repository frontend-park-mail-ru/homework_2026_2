'use strict';

/**
 * Регулярное выражение для поиска переменных шаблона.
 * Вынесено из функции, чтобы не создаваться заново при каждом вызове.
 * @type {RegExp}
 */
const TEMPLATE_VARIABLE_REGEX = /\{\{(.*?)\}\}/g;

/**
 * Заменяет переменные в строке шаблона на значения из объекта данных.
 *
 * @param {string|String} template - Строка шаблона с переменными (примитив или объект String).
 * @param {object} data - Объект с данными для подстановки.
 *
 * @description
 * Внимание: функция использует символ точки ('.') для определения вложенности.
 * Если значение в объекте данных является объектом (Object, Array) или null, оно будет заменено на пустую строку,
 * чтобы избежать вывода "[object Object]" или "null".
 * Логические значения (true/false) и числа (включая 0) приводятся к строке и сохраняются.
 *
 * @throws {Error} Бросает ошибку, если data является экземпляром Date, Map или Set.
 *
 * @returns {string} Результирующая строка. При некорректном шаблоне возвращает пустую строку.
 */
const templateEngine = (template, data) => {
    if (typeof template !== 'string' && !(template instanceof String)) {
        return '';
    }

    // Валидация объекта данных
    const isDataValid = typeof data === 'object' && data !== null && !Array.isArray(data);

    if (isDataValid && Object.prototype.toString.call(data) !== '[object Object]') {
        throw new Error('Объект с переменными невалиден');
    }

    return template.replace(TEMPLATE_VARIABLE_REGEX, (match, path) => {
        if (!isDataValid) return '';

        const keys = path.trim().split('.');

        const value = keys.reduce((acc, key) => {
            // Проверяем, что acc валиден и свойство принадлежит именно ему, а не прототипу
            if (acc !== undefined && acc !== null && Object.hasOwn(acc, key)) {
                return acc[key];
            }
            return undefined;
        }, data);

        // Блокируем вывод [object Object], массивов и null
        if (value === null || typeof value === 'object') {
            return '';
        }

        return value !== undefined ? value : '';
    });
};
