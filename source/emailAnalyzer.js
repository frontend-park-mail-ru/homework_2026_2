'use strict';

/**
 * Анализирует электронные адреса в строке.
 *
 * @param {String} text - строка, в которой нужно найти email-адреса
 * @returns {{
 *     emailCount: Number,
 *     uniqueEmails: Array<String>,
 *     mostFrequentEmail: String
 * }}
 * @example emailAnalyzer("Мой email: test@example.com")
 * // { emailCount: 1, uniqueEmails: ["test@example.com"], mostFrequentEmail: "test@example.com" }
 * 
 *  Если в строке нет ни одного email-адреса, функция возвращает:
 * { emailCount: 0, uniqueEmails: [], mostFrequentEmail: "" }
 *
 * Если аргумент не является строкой (null, число, объект и т.д.)
 * функция также возвращает { emailCount: 0, uniqueEmails: [], mostFrequentEmail: "" }
 */
const emailAnalyzer = (text) => {
    if (typeof text === "string") {
        let emails = text.match(/[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{1,}/g);

        if (emails === null) {
            emails = [];
        }

        const normalEmails = emails.map(email => email.toLowerCase());

        const emailFrequencies = normalEmails.reduce((acc, email) => {
            acc.set(email, (acc.get(email) ?? 0) + 1);
            return acc;
        }, new Map());

        const uniqueEmails = [...emailFrequencies.keys()];


        const mostFrequentEmail = uniqueEmails.reduce((mostFrequent, email) => {
            if (mostFrequent === null) {
                return email;
            }
            const currentCount = emailFrequencies.get(email);
            const maxCount = emailFrequencies.get(mostFrequent);
            return currentCount > maxCount ? email : mostFrequent;
        }, null) ?? '';
        const totalEmailCount = normalEmails.length;

        const result = {
            emailCount: totalEmailCount,
            uniqueEmails: uniqueEmails,
            mostFrequentEmail: mostFrequentEmail
        };

        return result;
    } else {
        return {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        };
    }

}
