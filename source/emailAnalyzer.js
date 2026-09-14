"use strict";
/**
 * регулярное выражение для поиска корректных email-адресов в тексте
 * электронный адрес: символы до `@`, а за ним домен из букв, цифр и точек
 *
 * @constant {RegExp}
 *
 */
const EMAIL_REGEXP = /[\w+-]+(?:\.[\w+-]+)*@[a-z\d]+(?:\.[a-z\d]+)+/gi;

/**
 *
 * анализирует электронные адреса в строке: считает их количество,
 * собирает уникальные и находит самый частый, регистр не учитывается
 *
 * @param {String} text - строка для анализа
 *
 * @throws {TypeError} если аргумент не является строкой
 *
 * @example
 * // returns { emailCount: 2, uniqueEmails: ['user@example.com'],  mostFrequentEmail: 'user@example.com' }
 * emailAnalyzer('Контакты: User@Example.com и user@example.com.');
 *
 * @returns {{emailCount: Number, uniqueEmails: Array<String>, mostFrequentEmail: String}}
 */
const emailAnalyzer = (text) => {
  if (typeof text !== "string") {
    throw new TypeError("Аргумент должен быть строкой");
  }

  const emails = (text.match(EMAIL_REGEXP) ?? []).map((email) =>
    email.toLowerCase(),
  );

  const frequencies = emails.reduce(
    (counts, email) => counts.set(email, (counts.get(email) ?? 0) + 1),
    new Map(),
  );

  const uniqueEmails = [...frequencies.keys()];

  return {
    emailCount: emails.length,
    uniqueEmails,
    mostFrequentEmail: uniqueEmails.reduce(
      (best, email) =>
        frequencies.get(email) > (frequencies.get(best) ?? 0) ? email : best,
      "",
    ),
  };
};
