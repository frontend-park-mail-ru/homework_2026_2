"use strict";

/**
 * Функция возвращает объект, у которого поля перечислены в keys.
 * Если такого поля нет, то оно игнорируется.
 * Копирование полей происходит с помощью structuredClone.
 * Если поле невозможно скопировать, сохраняется ссылка на этот объект.
 * При несоответствии типов входных данных, вернется пустой объект {}.
 * Функция не изменяет входные данные.
 * @param {Object} obj - объект
 * @param {Array<String | Number>} keys - список ключей (полей).
 * @returns {Object} объект, содержащий только поля из keys
 * 
 * @example Основное поведение
 * const obj = {
 *      key1: 1,
 *      key2: 2,
 *      key3: 3,
 *      key4: 4,
 *      key5: 5,
 *      key_string: "any_string"
 * };
 * const filteredObj = filterObjectByKeys(obj, ["key1", "key_string", "key3", "not_exists_key"]);
 *
 * // filteredObj = {"key1": 1, "key_string": "any_string", "key3": 3}
 * 
 * @example Поведение при некопируемом объекте
 * const echo = (text) => console.log(text);
 * const obj = {
 *      f: echo,
 *      key: "any" 
 * };
 * 
 * const filteredObj = filterObjectByKeys(obj, ["f"]);
 * // filteredObj = {f: echo};
 * 
 * @example Поведение, если аргументы не соответствуют типам
 * const filteredObj = filterObjectByKeys("STRING", 123456);
 * // filteredObj = {};
*/
const filterObjectByKeys = (obj, keys) => {
    if (obj === null) {
        return {};
    } else if (typeof obj !== "object") {
        return {};
    } else if (!Array.isArray(keys)) {
        return {};
    }
    // нужно ли эта "оптимизация"?
    const keysWas = new Set();
    const filteredObj = Object.create(null);
    keys.forEach((key) => {
        if (Object.hasOwn(obj, key)) {
            try {
                if (!keysWas.has(key)) {
                    filteredObj[key] = structuredClone(obj[key]);
                    keysWas.add(key);
                }
            } catch (err) {
                if (err.name !== "DataCloneError") {
                    throw err;
                }
                // Если поле не копируемо, то сохраняем ссылку
                filteredObj[key] = obj[key];
            }
        }
    });

    return filteredObj;
}
