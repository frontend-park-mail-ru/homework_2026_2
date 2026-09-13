/**
 * Преобразует вложенный массив в плоский
 *
 * @param {Array} array Вложенный массив
 *
 * @example
 * // returns [1, 2, 3]
 * flatten([1, [2, 3]]);
 * 
 * @returns {Array} Плоский массив без вложенных массивов
 */
const flatten = array => {
    if (!Array.isArray(array)) {
        throw new TypeError("В качестве входного параметра передан неправильный тип, ожидается массив");
    }

    return array.reduce(
        (result, item) =>
            result.concat(Array.isArray(item) ? flatten(item) : item),
        []
    );
};
