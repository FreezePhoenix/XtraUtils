// #!/user/bin/node
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral([''], ['']),
    _templateObject2 = _taggedTemplateLiteral(['g'], ['g']),
    _templateObject3 = _taggedTemplateLiteral(['i'], ['i']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * @namespace
 */
var Testers = Object.freeze({
	/**
   * Is it a primitive?
   * @param {*} value The value to test.
   * @return {boolean} Whether it is a primitive or not.
   * @memberof Testers
   */
	isPrimitive: function isPrimitive(value) {
		return value === null || ['boolean', 'number', 'string', 'symbol', 'undefined'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== -1;
	},

	/**
  * Is it an array?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is an array or not.
   * @memberof Testers
  */
	isArray: function isArray(value) {
		if (Array.isArray) {
			return Array.isArray(value);
		}
		return {}.toString.apply(value) === '[object Array]';
	},

	array: Object.freeze({}),
	/**
  * Is it a boolean?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is a boolean or not.
  * @memberof Testers
  */
	isBoolean: function isBoolean(value) {
		return typeof value === 'boolean';
	},

	/**
  * Some boolean tests. Includes: `isFalse`, `isTrue`.
  * @memberof Testers
  */
	boolean: Object.freeze({
		isFalse: function isFalse(bool) {
			return bool === false;
		},
		isTrue: function isTrue(bool) {
			return bool === true;
		}
	}),
	/**
  * Is it null?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is null or not.
  * @memberof Testers
  */
	isNull: function isNull(value) {
		return value === null;
	},

	/**
  * Is it a number?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is a number or not.
  * @memberof Testers
  */
	isNumber: function isNumber(value) {
		return typeof value === 'number';
	},

	/**
  * Some number tests. Includes: 'isInfinite', 'isInteger', `isNaN`.
  * @memberof Testers
  */
	number: Object.freeze({
		isInfinite: function isInfinite(number) {
			return number === Infinity || number === -Infinity;
		},
		isInteger: function isInteger(number) {
			return Number(number) === number && number % 1 === 0;
		},
		isNaN: function isNaN(number) {
			return typeof number === 'number' && number !== number;
		}
	}),
	/**
  * Is it a string?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is a string or not.
  * @memberof Testers
  */
	isString: function isString(value) {
		return typeof value === 'string';
	},

	/**
  * Some string tests. Includes: `isPalindrome`.
  * @memberof Testers
  */
	string: Object.freeze({
		isPalindrome: function isPalindrome(string) {
			return string.split(_templateObject).reverse().join(_templateObject) === string;
		}
	}),
	/**
  * Is it a symbol?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is a symbol or not.
  * @memberof Testers
  */
	isSymbol: function isSymbol(value) {
		return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol';
	},

	/**
  * Is it undefined?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is undefined or not.
  * @memberof Testers
  */
	isUndefined: function isUndefined(value) {
		return value === void 0;
	},

	/**
  * Is it a regular expression?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is a regular expression or not.
  * @memberof Testers
  */
	isRegExp: function isRegExp(value) {
		return {}.toString.apply(value) === '[object RegExp]';
	},

	/**
  * Some regular expression tests. Includes: `isGlobal`, `isCaseInsensitive`.
  * @memberof Testers
  */
	regex: Object.freeze({
		isGlobal: function isGlobal(regex) {
			return {}.toString.apply(regex) === '[object RegExp]' && regex.flags.includes(_templateObject2);
		},
		isCaseInsensitive: function isCaseInsensitive(regex) {
			return {}.toString.apply(regex) === '[object RegExp]' && regex.flags.includes(_templateObject3);
		}
	}),
	/**
  * Is it an object?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is an object or not.
  * @memberof Testers
  */
	isObject: function isObject(value) {
		return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
	},

	/**
  * Some object tests. Includes: `isEmpty`, `isPure`.
  * @memberof Testers
  */
	object: Object.freeze({
		isEmpty: function isEmpty(object) {
			return Object.entries(value).length === 0;
		},
		isPure: function isPure(object) {
			return {}.toString.apply(value) === '[object Object]';
		}
	}),
	/**
  * Is it a date?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is a date or not.
  * @memberof Testers
  */
	isDate: function isDate(value) {
		return {}.toString.apply(value) === '[object Date]';
	},

	/**
  * Is it an error?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is an error or not.
  * @memberof Testers
  */
	isError: function isError(value) {
		return objectToString(e) === '[object Error]' || e instanceof Error;
	},

	/**
  * Some error tests. Includes: `isTypeError`.
  * @memberof Testers
  */
	error: Object.freeze({
		isTypeError: function isTypeError(error) {
			return value instanceof TypeError;
		}
	}),
	/**
  * Is it a function?
  * @param {*} value The value to test.
  * @returns {boolean} Whether it is a function or not.
  * @memberof Testers
  */
	isFunction: function isFunction(value) {
		return typeof value === 'function';
	}
});