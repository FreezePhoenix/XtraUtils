// #!/user/bin/node
'use strict';

if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	/**
   * @type {Utility}
   * @property {function} aidsIn The String class
   * @property {Object} aidsIn.prototype the String prototype
   * @namespace
   * @memberof XtraUtils
   */
	XtraUtils.String = new XtraUtils.Utility(String);

	var min = Math.min,
	    ceil = Math.ceil,
	    round = Math.round,
	    random = Math.random,
	    pow = Math.pow,
	    words = function words(str) {
		return str.match(/((?:^_*)?(?:[A-Z][-_A-Z]*|[^-\s_A-Z]+)(?:_*$)?)/gi);
	},
	    repeat = function repeat(string, times) {
		return somethinghacky.call(string, ceil(times)).slice(0, Math.round(times * string.length));
	},
	    toUpperCase = function toUpperCase(str) {
		return ''.toUpperCase.call(str);
	},
	    toLowerCase = function toLowerCase(str) {
		return ''.toLowerCase.call(str);
	},
	    somethinghacky = XtraUtils.String.aidsIn.prototype.repeat;

	XtraUtils.String.addMethod('generateRandom', function () {
		function generateRandom() {
			var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;

			return (random() * pow(36, len)).toString(36).split('.')[0];
		}
	}());

	XtraUtils.String.addUtil('reverse', function () {
		/**
   * Reverses a string
   * @returns {string} The reversed string.
   * @memberof XtraUtils.String#
   */
		function reverse() {
			return this.split('').reverse().join('');
		}
		return reverse;
	}());

	XtraUtils.String.addUtil('sort', function () {
		/**
   * Sorts a string by character.
   * @param {CallBack} [sortFunction=(str1,str2)=>{return str1.charCodeAt(0) - str2.charCodeAt(0)}] The function to sort it with. By default, it sorts by character code.
   * @returns {string} The sorted string.
   * @memberof XtraUtils.String#
   */
		function sort() {
			var sortFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (str1, str2) {
				return str1.charCodeAt(0) - str2.charCodeAt(0);
			};

			return this.split('').sort(sortFunction).join('');
		}
		return sort;
	}());

	XtraUtils.String.addMethod('rot13', function () {
		var translate = function translate(x) {
			return index(x) > -1 ? output[index(x)] : x;
		},
		    index = function index(x) {
			return input.indexOf(x);
		},
		    input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		    output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
		/**
   * Reverses the famous rot13 cipher.
   * @param {string} str The string to perform rot13 on.
   * @returns {string} The de-ciphered string.
   * @memberof XtraUtils.String.
   */
		return function rot13(str) {
			return str.split('').map(translate).join('');
		};
		return rot13;
	}());

	XtraUtils.String.addMethod('levenshtein', function () {
		var last = function last(arr) {
			return arr[arr.length - 1];
		};
		/**
   * Finds the [Levenshtein distance]{@link https://en.wikipedia.org/wiki/Levenshtein_distance} between a string and another string.
   * @param {string} str1 The first string to find the distance between.
   * @param {string} str2 The second string.
   * @returns {number} The Levenshtein distance.
   * @memberof XtraUtils.String.
   */
		function levenshtein(str1, str2) {
			var charArr1 = str1.split(''),
			    charArr2 = str2.split(''),
			    Vector0 = [],
			    Vector1 = [],
			    deletionCost = void 0,
			    insertionCost = void 0,
			    substitutionCost = void 0;
			charArr2.forEach(function (_, index) {
				Vector0[index] = index;
			});
			charArr1.forEach(function (item1, index1) {
				if (item1 !== last(charArr1)) {
					Vector1[0] = index1 + 1;
					charArr2.forEach(function (item2, index2) {
						deletionCost = Vector0[index2 + 1] + 1;
						insertionCost = Vector1[index2] + 1;
						if (charArr1[index2] === charArr2[index2]) {
							substitutionCost = Vector0[index2];
						} else {
							substitutionCost = Vector0[index2] + 1;
						}
						Vector1[index2 + 1] = min(deletionCost, insertionCost, substitutionCost);
					});
					var temp1 = Vector1,
					    temp2 = Vector0;
					Vector0 = temp1;
					Vector1 = temp2;
				}
			});
			return Vector0[charArr2.length - 1];
		}
		return levenshtein;
	}());

	XtraUtils.String.addUtil('words', function () {
		/**
   * Finds the words in a string, per the following regex:
   * ````javascript
   * /((?:^_*)?(?:[A-Z][-_A-Z]*|[^-\s_A-Z]+)(?:_*$)?)/gi
   * ````.
   * @returns {Array.<string>} The words.
   * @memberof XtraUtils.String#
   */
		function words() {
			/*
   	 This regex is to match all words in the string
   		/((?:^_*)?(?:[A-Z][-_A-Z]*|[^-\s_A-Z]+)(?:_*$)?)/gi  : Regex to match words
   	 ((?:^_*)?(?:[A-Z][-_A-Z]*|[^-\s_A-Z]+)(?:_*$)?)		 : Main group
   	  (?:^_*)																						: Match all '_' in the string, non-capturing
   	  (?:   )																						: Non-capturing
   			 ^																						   : Position at start of string
   			  _*																						 : Match '_' as many times as needed
   	  (		 )?																				   : Match this group between 0 and 1 times, giving back as needed
   					  (?:[A-Z][-_A-Z]*|[^-\s_A-Z]+)						  : Find all matches for letters A-Z and anything that is not a space
   					  (?:												 )						  : Non-capturing
   							 [A-Z]																   : Match the characters A-Z
   									  [-_A-Z]*												   : Match the characters A-Z, hyphen, and underscore as many times as needed
   													  |												  : Regex OR
   													   [^-\s_A-Z]+						   : Match anything that is not a space or a letter or a hyphen or an underscore
   																			  (?:_*$)?		   : Match underscore as many times as needed at the end of the string but only count as one match
   																			  (?:   )				: Non-capturing
   																					 _*				  : Match underscore as many times as needed
   																					   $				 : Match at end of string
   																			  (		 )?		   : Match this group only once
   																							   gi		: Global and case-Insesensitive flags
    */
			return this.match(/((?:^_*)?(?:[A-Z][-_A-Z]*|[^-\s_A-Z]+)(?:_*$)?)/gi);
		}
		return words;
	}());

	XtraUtils.String.addUtil('toCamelCase', function () {
		/**
   * Converts the string to camelCase.
   * @returns {string} The camelCase form of the string.
   * @memberof XtraUtils.String#
   * @example
   * // returns 'myCat'
   * let str = 'my cat';
   * str.toCamelCase();
   */
		function toCamelCase() {
			return words(this).map(function (_) {
				return _.replace(/^./, function (match) {
					return toUpperCase(match);
				});
			}).join('').replace(/^./, function (match) {
				return toLowerCase(match);
			});
		}
		return toCamelCase;
	}());
	XtraUtils.String.addUtil('ToPascalCase', function () {
		/**
   * Converts the string to PascalCase.
   * @returns {string} The PascalCase form of the string.
   * @memberof XtraUtils.String#
   * @example
   * // returns 'MyCat'
   * let str = 'my cat';
   * str.ToPascalCase();
   */
		function ToPascalCase() {
			return words(this).map(function (_) {
				return _.replace(/^./, function (match) {
					return toUpperCase(match);
				});
			}).join('');
		}
		return ToPascalCase;
	}());
	XtraUtils.String.addUtil('to_snake_case', function () {
		/**
   * Converts the string to snake_case.
   * @returns {string} The snake_case form of the string.
   * @memberof XtraUtils.String#
   * @example
   * // returns 'my_cat'
   * let str = 'my cat';
   * str.to_snake_case();
   */
		function to_snake_case() {
			return words(this).map(function (_) {
				return _.replace(/^./, function (match) {
					return toLowerCase(match);
				});
			}).join('_');
		}
		return to_snake_case;
	}());
	XtraUtils.String.addUtil('TO_CONSTANT_CASE', function () {
		/**
   * Converts the string to CONSTANT_CASE.
   * @returns {string} The CONSTANT_CASE form of the string.
   * @memberof XtraUtils.String#
   * @example
   * // returns 'my_cat'
   * let str = 'my cat';
   * str.to_snake_case();
   */
		function TO_CONSTANT_CASE() {
			return words(toUpperCase(this)).join('_');
		}
		return TO_CONSTANT_CASE;
	}());
	XtraUtils.String.addUtil('to_seperated_case', function () {
		/**
   * Converts the string to a seperated case, where the seperator is defined by the user.
   * @param {string} [seperator="-"] The seperator to seperate the string with.
   * @returns {string} The resulting seperated form of the string.
   * @memberof XtraUtils.String#
   * @example
   * // returns 'my-cat'
   * let str = 'my cat';
   * str.to-seperated-case();
   * @example
   * // returns 'my|cat'
   * let str = 'my cat';
   * str.to-seperated-case('|');
   */
		function to_seperated_case() {
			var seperator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';

			return this.words().map(function (_) {
				return _.replace(/^./, function (match) {
					return toLowerCase(match);
				});
			}).join(seperator);
		}
		return to_seperated_case;
	}());
	XtraUtils.String.addUtil('ToTitleCase', function () {
		/**
   * Converts the string to a seperated case, where the seperator is defined by the user.
   * @returns {string} The resulting Title Case form of the string.
   * @memberof XtraUtils.String#
   * @example
   * // returns 'My Cat'
   * let str = 'my cat';
   * str.ToTitleCase();
   */
		function ToTitleCase() {
			return this.words().map(function (_) {
				return _.replace(/^./, function (match) {
					return toUpperCase(match);
				});
			}).join(' ');
		}
		return ToTitleCase;
	}());

	XtraUtils.String.addUtil('repeat', function () {
		/**
   * An extension of the native repeat, this one takes decimals as a parameter, and splits the string accordingly.
   * @param {number} times How many times to repeat the string. Splits string if it is a decimal.
   * @returns {string} The repeated string.
   * @memberof XtraUtils.String#
   * @example
   * // returns 'my catmy cat'
   * let str = 'my cat';
   * str.repeat(2);
   * @example
   * // returns 'my catmy '
   * let str = 'my cat';
   * str.repeat(1.5);
   */
		function repeat(times) {
			return somethinghacky.call(this, ceil(times)).slice(0, round(times * this.length));
		}
		return repeat;
	}());
	XtraUtils.String.addUtil('padLeft', function () {
		return function padLeft() {
			var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.length;
			var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

			if (this.length >= len) {
				return this;
			}
			return repeat(char, len - this.length) + this;
		};
	}());
	XtraUtils.String.addUtil('padRight', function () {
		return function padRight(len, char) {
			if (this.length >= len) {
				return this;
			}
			char = char || ' ';
			return this + repeat(char, len - this.length);
		};
	}());
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}
/**
 * @callback CallBack
 * @param {string} str The string being passed
 * @returns {*}
 * @memberof XtraUtils.String
 */