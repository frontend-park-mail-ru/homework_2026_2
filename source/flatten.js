/**
 * Преобразует вложенный массив в плоский
 *
 * @param {Array} array - вложенный массив
 * 
 *  * @example
 * // returns [1, 2, 3]
 * flatten([1, [2, 3]]);
 * 
 * @returns {Array}
 */
const flatten = array => {
    return array.reduce(
        (result, item) =>
            result.concat(Array.isArray(item) ? flatten(item) : item),
        []
    );
};