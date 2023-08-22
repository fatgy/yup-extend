import test from 'ava';
import {string, ValidationError} from '../source/index.js';

test('yup string hostname: valid', t => {
	t.true(string().hostname().isValidSync('example.com'));
});

test('yup string hostname: valid with port', t => {
	t.true(string().hostname().isValidSync('example.com:8080'));
});

test('yup string hostname: valid with protocol', t => {
	t.true(string().hostname().isValidSync('http://example.com'));
});

test('yup string hostname: valid with port and protocol', t => {
	t.true(string().hostname().isValidSync('https://example.com:8080'));
});

test('yup string hostname: invalid with default message', async t => {
	await t.throwsAsync(
		async () => {
			await string()
				.hostname()
				.validate('invalid hostname');
		},
		{instanceOf: ValidationError, message: 'Invalid hostname'},
	);
});

test('yup string hostname: invalid', async t => {
	await t.throwsAsync(
		async () => {
			await string()
				.hostname('Domain format is incorrect')
				.validate('invalid hostname');
		},
		{instanceOf: ValidationError, message: 'Domain format is incorrect'},
	);
});

test('yup string hostname: invalid when it is email', async t => {
	await t.throwsAsync(
		async () => {
			await string().hostname('Domain format is incorrect').validate('hi@example.com');
		},
		{instanceOf: ValidationError, message: 'Domain format is incorrect'},
	);
});
