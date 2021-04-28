// #!/user/bin/node
'use strict';

if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	/**
  * @type {Utility}
  * @property {function} aidsIn The Number class
  * @property {Object} aidsIn.prototype the Number prototype
  * @namespace
  * @memberof XtraUtils
  */
	XtraUtils.Number = new XtraUtils.Utility(Number);

	var _2 = 0,
	    _toString = _2.toString,
	    _Math$floor = Math.floor,
	    floor = _Math$floor.floor,
	    pow = _Math$floor.pow;


	XtraUtils.Number.addMethod('clamp', function () {
		/**
   * Clamps a number to a range.
   * @param {number} number The number to clamp.
   * @param {number} min The minimum of the range.
   * @param {number} max The maximum of the range.
   * @returns {number} The clamped number.
   * @memberof XtraUtils.Number.
   */
		function clamp(number, min, max) {
			return number | 0 > max | 0 ? max | 0 : number | 0 < min | 0 ? min | 0 : number | 0;
		}
	}());

	XtraUtils.Number.addMethod('ratio', function () {
		var gcf = function gcf(a, b) {
			a = Number(a);return (b = Number(b)) ? gcf(b, a % b) : a;
		};
		/**
   * Turns the number into a ratio based on an argument.
   * @param {number} a The first number.
   * @param {number} b The number to use as the second part of the ratio.
   * @returns {string} The resulting ratio.
   * @memberof XtraUtils.Number.
   * @example
   * // returns "2:1"
   * let num = 2;
   * num.ratio(1);
   * @example
   * // returns "2:1"
   * let num = 10;
   * num.ratio(5);
   */
		function ratio(a, b) {
			var GCF = gcf(a | 0, b | 0);
			return a / GCF + ':' + b / GCF;
		}
		return ratio;
	}());

	XtraUtils.Number.addMethod('factorial', function () {
		function factorial(n) {
			var f = 1;
			for (var i = f; i <= n | 0; i++) {
				f *= i;
			}
			return f;
		}
	}());
	XtraUtils.Number.addMethod('gcf', function () {
		var _gcf = function _gcf(a, b) {
			a = Number(a);return (b = Number(b)) ? _gcf(b, a % b) : a;
		};
		/**
   * Returns the GCF (**G**reatest **C**ommon **F**actor) of two numbers.
   * @param {number} a The first number.
   * @param {number} b The second number.
   * @returns {number} The GCF
   * @memberof XtraUtils.Number.
   * @example
   * // returns 1
   * Number.gcf(10, 3);
   * @example
   * // returns 2
   * Number.gcf(4, 2);
   */
		function gcf(a, b) {
			if (!b) {
				return a | 0;
			}
			return _gcf(b | 0, a | 0 % b | 0);
		}
		return gcf;
	}());

	XtraUtils.Number.addMethod('lcm', function () {
		var _gcf = function _gcf(a, b) {
			a = Number(a);return (b = Number(b)) ? _gcf(b, a % b) : a;
		};
		/**
   * Gets the LCM (**L**east **C**ommon **M**ultiple) of two numbers.
   * @param {number} a The first number.
   * @param {number} b The second number.
   * @returns {number} The LCM.
   * @memberof XtraUtils.Number.
   * @example
   * // returns 6
   * Number.lcm(2,3);
   */
		function lcm(a, b) {
			return a | 0 * b | 0 / _gcf(a, b) | 0;
		}
		return lcm;
	}());

	XtraUtils.Number.addUtil('map', function () {
		/**
   * Maps a number between ranges.
   * @param {number} in_min The minimum of the input range.
   * @param {number} in_max The maximum of the input range.
   * @param {number} out_min The minimum of the output range.
   * @param {number} out_max The maximum of the output range.
   * @returns {number} The resulting number.
   * @memberof XtraUtils.Number#
   */
		function map(in_min, in_max, out_min, out_max) {
			return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
		}
		return map;
	}());

	XtraUtils.Number.addUtil('toBaseN', function () {
		/**
   * Returns the number in base `n`
   * @param {number} [n=10] The base to output the number in.
   * @returns {string} The number in base N.
   * @memberof XtraUtils.Number#
   */
		function toBaseN() {
			var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

			return _toString.call(parseInt(_toString.call(this), 10), n);
		}
		return toBaseN;
	}());

	XtraUtils.Number.addUtil('toPlaceN', function () {
		/**
   * Returns the number truncated at the `n`th decimal place.
   * @param {number} n The decimal place to truncate it to.
   * @returns {number} The number trucated to place `n`
   * @memberof XtraUtils.Number#
   */
		function toPlaceN(n) {
			var exponent = pow(10, n);
			return floor(this * exponent) / exponent;
		}
		return toPlaceN;
	}());

	XtraUtils.Number.addUtil('pow', function () {
		var _pow = function _pow(a, b) {
			return Math.pow(a, b);
		};
		/**
   * Returns the number to the `n`th power.
   * @param {number} n The power.
   * @returns {number} The number to the `n`th power.
   * @memberof XtraUtils.Number#
   */
		function pow(n) {
			return _pow(this, n);
		}
		return pow;
	}());

	XtraUtils.Number.addUtil('ceil', function () {
		/**
   * Rounds the number up.
   * @returns {number} The number rounded up.
   * @memberof XtraUtils.Number#
   */
		function ceil() {
			return Math.ceil(this);
		}
		return ceil;
	}());

	XtraUtils.Number.addUtil('floor', function () {
		/**
   * Rounds the number down.
   * @returns {number} The number rounded down.
   * @memberof XtraUtils.Number#
   * @example
   * // returns 5
   * let num = 5.9
   * num.floor();
   */
		function floor() {
			return Math.floor(this);
		}
		return floor;
	}());

	XtraUtils.Number.addUtil('sqrt', function () {
		/**
   * Finds the square root of the number.
   * @returns {number} The sqaure root of the number.
   * @memberof XtraUtils.Number#
   * @example
   * // returns 5
   * let num = 25;
   * num.sqrt();
   */
		function sqrt() {
			return Math.sqrt(this);
		}
		return sqrt;
	}());

	XtraUtils.Number.addUtil('toOrdinal', function () {
		var _ = [, 'st', 'nd', 'rd'];
		/**
   * Returns the number in it's ordinal form.
   * @returns {number} The ordinal form of the number.
   * @memberof XtraUtils.Number#
   * @example
   * // returns "5th"
   * let num = 5;
   * num.toOrdinal();
   */
		function toOrdinal() {
			return this + (_[/1?.$/.exec(this)] || 'th');
		}
		return toOrdinal;
	}());

	XtraUtils.Number.addUtil('modulo', function () {
		/**
   * Returns modulo of the number
   * @param {number} number The number to use modulo with.
   * @returns {number} The resulting modulo.
   * @memberof XtraUtils.Number#
   * @example
   * // returns 1
   * let num = 5;
   * num.modulo(2);
   */
		function modulo(number) {
			var modulo = this % number | 0;
			return modulo < 0 ? modulo + number : modulo;
		}
		return modulo;
	}());

	XtraUtils.Number.addUtil('needsPromotion', function () {
		var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
		/**
   * Whether the number is greater than the maximum allowed number
   * @returns {boolean} Whether the number is too large.
   * @memberof XtraUtils.Number#
   * @example
   * // returns false
   * let num = 5;
   * num.needsPromotion();
   * @example
   * // returns true
   * let num = Number.MAX_SAFE_INTEGER + 2;
   * num.needsPromotion();
   */
		function needsPromotion() {
			return this > MAX_SAFE_INTEGER;
		}
		return needsPromotion;
	}());
} else {
	throw Error('XtraUtils is not defined, or XtraUtils.Number is not a valid instance.' + 'You must include the base for XtraUtils, and XtraUtils.Number must be ' + 'an instance of XtraUtils.Utility. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}