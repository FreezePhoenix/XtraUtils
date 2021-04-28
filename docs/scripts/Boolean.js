// #!/user/bin/node
'use strict';

if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	/**
  * @type {Utility}
  * @property {function} aidsIn The Array class
  * @property {boolean} aidsIn.prototype the Array prototype
  * @namespace
  * @memberof XtraUtils
  */
	XtraUtils.Boolean = new XtraUtils.Utility(Boolean);

	XtraUtils.Boolean.addMethod('and_multi', function () {
		var _and = function _and(a, b) {
			return a && b && true || false;
		};
		/**
   * Execute an AND (this AND that AND ...) gate with more than 2 inputs. Returns true only if all inputs are true.
   * @param {...BooleanValue} inputs The inputes to the AND gate.
   * @returns {boolean} Whether all inputs were true.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.and_multi(false, true, true, true);		// false
   * Boolean.and_multi(true, true, true);				// true;
   */
		function and_multi() {
			for (var _len = arguments.length, inputs = Array(_len), _key = 0; _key < _len; _key++) {
				inputs[_key] = arguments[_key];
			}

			return inputs.map(Boolean).reduce(_and, true);
		}
		return and_multi;
	}());

	XtraUtils.Boolean.addMethod('nand', function () {
		/**
   * Simulate an NAND gate `NOT(this AND that)`
   * @param {BooleanValue} a The first input.
   * @param {BooleanValue} b The second input
   * @returns {boolean} The resulting value.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.nand(false, true);		 // true
   * Boolean.nand(false, false);	 // true
   * Boolean.nand(true, true);		 // false
   */
		function nand(a, b) {
			return Boolean(!(Boolean(a) && Boolean(b)));
		}
		return nand;
	}());

	XtraUtils.Boolean.addMethod('nand_multi', function () {
		var _and = function _and(a, b) {
			return a & b;
		};
		/** run an NAND gate with more than 2 inputs. Returns true so long as at least one argument is false.
   * @param {...BooleanValue} inputs The inputs to give to the AND gate.
   * @returns {Boolean} Whether at least one input was false.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.nand_multi(true, true, false);		// true
   * Boolean.nand_multi(true, true, true);		// false
   */
		function nand_multi() {
			for (var _len2 = arguments.length, inputs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				inputs[_key2] = arguments[_key2];
			}

			return !inputs.map(Boolean).reduce(_and, true);
		}
		return nand_multi;
	}());

	XtraUtils.Boolean.addMethod('xor', function () {
		/**
   * run an XOR gate with 2 inputs.
   * @param {BooleanValue} a The first input.
   * @param {BooleanValue} b The second input.
   * @returns {boolean} The result.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.xor(true, false);		// true
   * Boolean.xor(true, true);		// false
   * Boolean.xor(false, false);		// false;
   */
		function xor(a, b) {
			return Boolean(!Boolean(a) ^ !Boolean(b));
		}
		return xor;
	}());

	XtraUtils.Boolean.addMethod('xor_multi', function () {
		/**
   * Runs an XOR. Returns true if only one input is true.
   * @param {...BooleanValue} inputs The inputs to run the XOR with.
   * @returns {boolean} The result of the muli-xor.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.xor_multi(false, false, false, true);	// true
   * Boolean.xor_multi(true, false, true, false);		// false
   */
		function xor_multi() {
			for (var _len3 = arguments.length, inputs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				inputs[_key3] = arguments[_key3];
			}

			return inputs.filter(Boolean).length === 1;
		}
		return xor_multi;
	}());

	XtraUtils.Boolean.addMethod('nor', function () {
		/**
   * Runs an NOR gate. Returns true only if all of the inputs are false.
   * @param {BooleanValue} a The first input.
   * @param {BooleanValue} b The second input.
   * @returns {boolean} The result.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.nor(false, false);		// true
   * Boolean.nor(true, false);		// false
   */
		function nor(a, b) {
			return Boolean(!(a | b));
		}
		return nor;
	}());

	XtraUtils.Boolean.addMethod('nor_multi', function () {
		/**
   * Runs an NOR gate. Returns true only if all of the inputs are false.
   * @param {...BooleanValue} inputs The inputs.
   * @returns {boolean} The result.
   * @memberof XtraUtils.Boolean.
   */
		function nor_multi() {
			for (var _len4 = arguments.length, inputs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				inputs[_key4] = arguments[_key4];
			}

			return !inputs.map(Boolean).includes(true);
		}
		return nor_multi;
	}());

	XtraUtils.Boolean.addMethod('xnor', function () {
		/**
   * Runs an XNOR gate. Returns true only if all inputs are both true or false.
   * @param {BooleanValue} a The first input.
   * @param {BooleanValue} b The second input.
   * @returns {boolean} The result.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.xnor(true, false);		// false
   * Boolean.xnor(false, false);	// true
   * Boolean.xnor(true, true);		// true
   */
		function xnor(a, b) {
			return Boolean(!(!a ^ !b));
		}
		return xnor;
	}());

	XtraUtils.Boolean.addMethod('xnor_multi', function () {
		var _and = function _and(a, b) {
			return a & b;
		};
		/**
   * Runs an XNOR gate with more than 2 inputs. Returns false only if one input is true.
   * @param {...BooleanValue} inputs The inputs to take.
   * @returns {boolean} The result.
   * @memberof XtraUtils.Boolean.
   * @example
   * Boolean.xnor_multi(false, false, false);		// true
   * Boolean.xnor_multi(false, true, false);		// false
   * Boolean.xnor_multi(false, true, true);			// true
   * Boolean.xnor_multi(true, true, true);        // true
   */
		function xnor_multi() {
			for (var _len5 = arguments.length, inputs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				inputs[_key5] = arguments[_key5];
			}

			return inputs.filter(Boolean).length !== 1;
		}
		return xnor_multi;
	}());
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}
/**
 * A true/false Boolean, or a number than can be converted to a boolean.
 * typedef {(boolean|number)} BooleanValue
 * @memberof XtraUtils.Boolean
 * @alias BooleanValue
 */