import * as yup from 'yup';

declare module 'yup' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export interface StringSchema {
		/**
		 * @param {string} [message='Invalid hostname']
		 */
		hostname(message?: string): StringSchema;
	}
}

/**
 * @see {@link https://www.regexpal.com/93652}
 *
 * @constant
 * @type {RegExp}
 * @default
 */
const regexHostname
	= /^(https?:\/\/)?(www\.)?[a-z\d]+([-.][a-z\d]+)*\.[a-z]{2,5}(:\d{1,5})?(\/.*)?$/i;

yup.addMethod<yup.StringSchema>(
	yup.string,
	'hostname',
	function yupStringHostname(message) {
		return this.matches(regexHostname, {
			name: 'hostname',
			message: message ?? 'Invalid hostname',
			excludeEmptyString: true,
		});
	},
);

export * from 'yup';
