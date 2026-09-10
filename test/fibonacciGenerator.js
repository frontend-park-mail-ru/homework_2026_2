'use strict';

QUnit.module("Тестируем функцию fibonacciGenerator", function() {
    QUnit.test("Правильно генерирует первое число Фибоначчи", function(assert) {
        const fibGen = fibonacciGenerator(1);

        assert.deepEqual([...fibGen], [0], "Должно быть сгенерировано только первое число Фибоначчи.");
    });
    
    QUnit.test("Правильно генерирует 5 первых чисел Фибоначчи", function(assert) {
        const fibGen = fibonacciGenerator(5);

        assert.deepEqual([...fibGen], [0, 1, 1, 2, 3], "Должны быть сгенерированы первые 5 чисел Фибоначчи.");
    });

    QUnit.test("Работает правильно с отрицательным числом чисел", function(assert) {
        const fibGen = fibonacciGenerator(-5);

        assert.deepEqual([...fibGen], [], "Генерация отрицательного числа должна вернуть пустой массив.");
    });

    QUnit.test("Возвращает пустой массив при n === 0", function(assert) {
        const fibGen = fibonacciGenerator(0);

        assert.deepEqual([...fibGen], [], "При n === 0 генератор не должен ничего генерировать.");
    });

    QUnit.test("Каждый вызов возвращает независимый генератор", function(assert) {
        const first = fibonacciGenerator(3);
        const second = fibonacciGenerator(3);

        first.next();

        assert.deepEqual([...second], [0, 1, 1], "Продвижение одного генератора не должно влиять на другой.");
    });

    QUnit.test("Корректно работает с ручным вызовом next()", function(assert) {
        const fibGen = fibonacciGenerator(2);

        assert.deepEqual(fibGen.next(), { value: 0, done: false }, "Первый next() должен вернуть 0 и done: false.");
        assert.deepEqual(fibGen.next(), { value: 1, done: false }, "Второй next() должен вернуть 1 и done: false.");
        assert.deepEqual(fibGen.next(), { value: undefined, done: true }, "После исчерпания next() должен вернуть done: true.");
    });

    QUnit.test("Бросает TypeError при невалидном n", function(assert) {
        assert.throws(() => [...fibonacciGenerator(null)], TypeError, "null должен приводить к TypeError.");
        assert.throws(() => [...fibonacciGenerator(undefined)], TypeError, "undefined должен приводить к TypeError.");
        assert.throws(() => [...fibonacciGenerator('5')], TypeError, "Строка должна приводить к TypeError.");
        assert.throws(() => [...fibonacciGenerator([1, 2, 3])], TypeError, "Массив должен приводить к TypeError.");
        assert.throws(() => [...fibonacciGenerator({})], TypeError, "Объект должен приводить к TypeError.");
        assert.throws(() => [...fibonacciGenerator(NaN)], TypeError, "NaN должен приводить к TypeError.");
    });
});
