'use strict';

QUnit.module('Тестируем функцию plainify', () => {
	QUnit.test('Работает правильно с вложенным объектом', assert => {
		const originalObject = {
			a: 1,
			b: {
				c: 2,
				d: {
					e: 3,
				},
			},
			f: 4,
		};
		const result = plainify(originalObject);

		assert.deepEqual(
			result,
			{ a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 },
			'Объект должен быть преобразован в plain',
		);
	});

	QUnit.test('Работает правильно с пустым объектом', assert => {
		const originalObject = {};
		const result = plainify(originalObject);

		assert.deepEqual(
			result,
			{},
			'Пустой объект должен возвращать пустой объект',
		);
	});

	QUnit.test('Работает правильно с объектом, содержащим примитивы', assert => {
		const originalObject = {
			x: 'hello',
			y: 42,
			z: { a: 1, b: 2 },
		};
		const result = plainify(originalObject);

		assert.deepEqual(
			result,
			{ x: 'hello', y: 42, 'z.a': 1, 'z.b': 2 },
			'Примитивы и вложенные объекты должны быть правильно преобразованы',
		);
	});

	QUnit.test(
		'Работает правильно с объектом, содержащим пустые объекты',
		assert => {
			const originalObject = {
				x: 'a',
				y: {},
				z: {},
				q: 227,
			};

			const result = plainify(originalObject);

			assert.deepEqual(
				result,
				{
					x: 'a',
					y: {},
					z: {},
					q: 227,
				},
				'Объект, содержащий пустые объекты должен быть правильно обработан',
			);
		},
	);

	QUnit.test('Работает правильно с объектом, не содержащий объекты', assert => {
		const originalObject = {
			a: 1,
			b: 4,
			c: 8,
			d: 'no',
		};

		const result = plainify(originalObject);

		assert.deepEqual(
			result,
			{
				a: 1,
				b: 4,
				c: 8,
				d: 'no',
			},
			'',
		);
	});

	QUnit.test('Бросает TypeError: null', assert => {
		assert.throws(() => plainify(null), TypeError, 'null -> TypeError');
	});

	QUnit.test('Бросает TypeError: число', assert => {
		assert.throws(() => plainify(42), TypeError, 'число -> TypeError');
	});

	QUnit.test('Бросает TypeError: строку', assert => {
		assert.throws(() => plainify('abc'), TypeError, 'строка -> TypeError');
	});

	QUnit.test('Бросает TypeError: массив', assert => {
		assert.throws(() => plainify([2, 2, 8]), TypeError, 'массив -> TypeError');
	});

	QUnit.test('Бросает TypeError: undefined', assert => {
		assert.throws(
			() => plainify(undefined),
			TypeError,
			'undefined -> TypeError',
		);
	});

	QUnit.test('Работает с объектом без прототипа', assert => {
		const a = Object.create(null);
		a.x = 1;

		const result = plainify(a);

		assert.deepEqual(
			result,
			{
				x: 1,
			},
			'Функция не должна падать при работе с объектом без прототипа',
		);
	});
});
