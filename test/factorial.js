'use strict';

QUnit.module('Тестируем функцию factorial', () => {
    QUnit.test('Факториал 0 должен быть 1', (assert) => {
        assert.strictEqual(factorial(0), 1, '0! = 1');
    });

    QUnit.test('Факториал 5 должен быть 120', (assert) => {
        assert.strictEqual(factorial(5), 120, '5! = 120');
    });

    QUnit.test('Факториал для отрицательного числа должен выбрасывать ошибку', (assert) => {
        assert.throws(() => {
            factorial(-1);
        }, /Факториал не определен для отрицательных чисел/, 'Ошибка выбрасывается для -1');
    });

    QUnit.test('Правильно вычисляет факториалы небольших чисел', (assert) => {
        assert.strictEqual(factorial(1), 1, '1! = 1');
        assert.strictEqual(factorial(2), 2, '2! = 2');
        assert.strictEqual(factorial(3), 6, '3! = 6');
        assert.strictEqual(factorial(10), 3628800, '10! = 3628800');
    });

    QUnit.test('Правильно вычисляет факториалы больших чисел', (assert) => {
        assert.strictEqual(factorial(13), 6227020800, '13! = 6227020800 (не помещается в 32 бита)');
        assert.strictEqual(factorial(18), 6402373705728000, '18! = 6402373705728000 (наибольший факториал до Number.MAX_SAFE_INTEGER)');
    });

    QUnit.test('Возвращает Infinity, если результат больше Number.MAX_VALUE', (assert) => {
        assert.ok(Number.isFinite(factorial(170)), '170! - конечное число');
        assert.strictEqual(factorial(171), Infinity, '171! = Infinity');
        assert.strictEqual(factorial(Number.MAX_SAFE_INTEGER), Infinity, 'factorial(Number.MAX_SAFE_INTEGER) = Infinity');
    });

    QUnit.test('Выбрасывает RangeError для отрицательных целых чисел', (assert) => {
        assert.throws(() => factorial(-1), RangeError, 'RangeError для -1');
        assert.throws(() => factorial(-100), RangeError, 'RangeError для -100');
    });

    QUnit.test('Выбрасывает TypeError для нецелых чисел', (assert) => {
        assert.throws(() => factorial(1.5), TypeError, 'TypeError для 1.5');
        assert.throws(() => factorial(-1.5), TypeError, 'TypeError для -1.5');
        assert.throws(() => factorial(NaN), TypeError, 'TypeError для NaN');
        assert.throws(() => factorial(Infinity), TypeError, 'TypeError для Infinity');
    });

    QUnit.test('Выбрасывает TypeError, если аргумент не является числом', (assert) => {
        assert.throws(() => factorial(), TypeError, 'TypeError при вызове без аргумента');
        assert.throws(() => factorial(null), TypeError, 'TypeError для null');
        assert.throws(() => factorial('5'), TypeError, 'TypeError для строки "5"');
        assert.throws(() => factorial(true), TypeError, 'TypeError для true');
        assert.throws(() => factorial([ 5 ]), TypeError, 'TypeError для массива [5]');
    });

    QUnit.test('Возвращает правильный результат при повторных вызовах', (assert) => {
        assert.strictEqual(factorial(12), 479001600, '12! = 479001600');
        assert.strictEqual(factorial(12), 479001600, 'повторный вызов: 12! = 479001600');
        assert.strictEqual(factorial(6), 720, 'меньшее число после большего: 6! = 720');
        assert.strictEqual(factorial(15), 1307674368000, 'большее число после меньшего: 15! = 1307674368000');
    });

    QUnit.test('Переполнение и ошибки не влияют на последующие вызовы', (assert) => {
        assert.strictEqual(factorial(171), Infinity, '171! = Infinity');
        assert.strictEqual(factorial(5), 120, '5! = 120 после переполнения');
        assert.throws(() => factorial(-1), RangeError, 'RangeError для -1');
        assert.strictEqual(factorial(5), 120, '5! = 120 после ошибки');
    });
});
