'use strict';

/**
 * Функция сортировки, сортирующая элементы в соответствии с заданной функцией сравнения
 * @param {Array<Var>, function} - массив элементов и функция сравнения
 * 
 * @example
 * // returns [1, 2, 3]
 * [2, 1, 3];
 * 
 * @example
 * // returns ["fig", "kiwi", "apple", "grape", "banana"]
 * ["apple", "banana", "kiwi", "fig", "grape"];
 * 
 * @returns {Array<Var>}
 */
const mysort = function (vars, compare) { 
    if (!Array.isArray(vars)) {
    return vars;
    }
    if (vars.length < 2) {
        return vars; 
    }

    for (let i = 0; i < vars.length-1; i++) {
        for (let j = 0; j < vars.length-i-1; j++) {
            if (compare(vars[j], vars[j+1]) > 0) {
                    [vars[j], vars[j+1]] = [vars[j+1], vars[j]];
            }
        }
    }
    return vars;
}

/**
 * Функция, сортирующая массив строк и вовзращающая новый массив
 * @param {Array<String>} strings - массив строк
 * 
 * @param {String} a - строка, выбранная из массива
 * 
 * @param {String} b - строка, выбранная из массива после строки a
 * 
 * @example
 * // returns ["fig", "new", "Like"]
 * max(["new", "like", "fig"]);
 * 
 * @returns {Array<String>}
 */
const sortByLength = function (strings) {
    if(!Array.isArray(strings) || !strings.every(item => typeof item === "string") ) {
        return strings;
    }
    const res = [...strings]

    return mysort(res, (a, b) => { 
        return (a.length !== b.length) ? a.length - b.length : a.localeCompare(b);
    })
}
