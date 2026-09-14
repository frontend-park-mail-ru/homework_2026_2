'use strict';

/**
 * Разделяет массив на два подмассива по предикату
 * @param {Array} array - исходный массив
 * @param {Function} predicate - функция-предикат
 * @returns {Array<Array>} два подмассива: подходящие и неподходящие элементы
 */
const partition = (array, predicate) => {
    const yes = [];
    const no = [];

    array.forEach(element => {
        if (predicate(element)) {
            yes.push(element);
        } else {
            no.push(element);
        }
    });

    return [yes, no];
};