// #!/user/bin/node
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	/**
  * @type {Utility}
  * @property {function} aidsIn The Functionw class
  * @property {Function} aidsIn.prototype the Function prototype
  * @namespace
  * @memberof XtraUtils
  */
	XtraUtils.Function = new XtraUtils.Utility(Function);

	var keys = Object.keys,
	    isArray = Array.isArray,
	    rename = function rename(a, b) {
		return Function('fn', 'return (function ' + b + '(){\n\treturn fn.apply(this, arguments)\n});')(a);
	};


	XtraUtils.Function.addMethod('flow', function () {
		/**
   * Applies functions in order of the arguments passed to `Function.flow`.
   * @param {...Function} functs The functions to flow. Each function should return an array of arguments to pass to the next function, or a single value.
   * @returns {Function} The resulting built function.
   * @memberof XtraUtils.Function.
   * @example
   * function add(a,b) { return a + b };
   * function square(a) { return a ** 2};
   * addSquare = Function.flow(add, sqaure);
   * addSquare(1,2);		// 9
   */
		function flow() {
			for (var _len = arguments.length, functs = Array(_len), _key = 0; _key < _len; _key++) {
				functs[_key] = arguments[_key];
			}

			return rename(function () {
				var args = arguments,
				    value = undefined;
				functs.forEach(function (funct, _) {
					value = funct.apply(undefined, _toConsumableArray(args));
					args = [isArray(value) ? [].concat(_toConsumableArray(value)) : value];
				});
				return value;
			}, 'flowed');
		}
		return flow;
	}());

	XtraUtils.Function.addMethod('reArg', function () {
		var _toString = Object.prototype.toString,
		    _isNumber = function _isNumber(val) {
			return typeof val === 'number';
		},
		    _reOrg = function _reOrg(a, c) {
			var b = Array(a.length).fill();a.forEach(function (a, d) {
				b[c[d]] = a;
			});return b;
		},
		    _regularize = function _regularize(a) {
			var b = [];if ('[object Array]' === _toString.call(a)) {
				return a;
			}keys(a).filter(_isNumber).forEach(function (c) {
				b[c] = a[c];
			});return b;
		};
		/**
   * Re-arranges the arguments to a function.
   * @param {Function} fn The function to remap the arguments.
   * @param {Array.<number>|Object<number,number>} indexes The way to map the arguments.
   * @param {Object} [context=null] The context to set the `this` value to.
   * @returns {Function} The resulting re-mapped function!
   * @memberof XtraUtils.Function.
   * @example
   * function j(a,b,c) { return `${a}+${b}+${c}` };
   * j = Function.reArg(j, [2, 1, 0])
   * j(1,2,3);						 // '3+2+1'
   */
		function reArg(fn, indexes) {
			var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var func = fn.bind(context);
			indexes = _regularize(indexes);
			return rename(function () {
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				return func.apply(undefined, _toConsumableArray(_reOrg(args, indexes)));
			}, fn.name);
		}
		return reArg;
	}());

	XtraUtils.Function.addMethod('template', function () {
		var _toString = Object.prototype.toString,
		    _isNumber = function _isNumber(val) {
			return typeof val === 'number';
		},
		    _reOrg = function _reOrg(c, a, d) {
			var b = [].concat(_toConsumableArray(c));a = [].concat(_toConsumableArray(a));d.forEach(function (c, d) {
				b.splice(c, 1, a[d]);a.shift();
			});b.splice.apply(b, [b.length, 0].concat(_toConsumableArray(a)));return b;
		},
		    _regularize = function _regularize(a) {
			var b = [];if ('[object Array]' === _toString.call(a)) {
				return a;
			}keys(a).filter(_isNumber).forEach(function (c) {
				b[c] = a[c];
			});return b;
		};
		/**
   * Templates a function, enabling you to set static arguments and placeholders.
   * @param {Function} fn The function to template.
   * @param {Object} [context=null] The context to operate the function under.
   * @param {...*} BoundArgs The arguments to revert to static, use '_PH_' for placeholders.
   * @returns {Function} The resulting function.
   * @memberof XtraUtils.Function.
   * @example
   * function j(a,b,c) { return a + '+' + b + '+' + c };
   * j = Function.template(j, null, 3, '_PH_', 2);
   * j(4);		// '3+4+2'
   * j(8);		// '3+8+2'
   */
		function template(fn) {
			for (var _len3 = arguments.length, BoundArgs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
				BoundArgs[_key3 - 2] = arguments[_key3];
			}

			var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var func = fn.bind(context),
			    placeholders = [],
			    indexes = [];
			BoundArgs.forEach(function (item, index) {
				if (item === '_PH_') {
					placeholders.push(index);
				}
			});
			return rename(function () {
				for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					args[_key4] = arguments[_key4];
				}

				return func.apply(undefined, _toConsumableArray(_reOrg(BoundArgs, args, placeholders)));
			}, fn.name);
		}
		return template;
	}());

	XtraUtils.Function.addMethod('capArgs', function () {
		/**
   * Limits the number of arguments that can be used by a function.
   * @param {Function} fn The function to cap the number of arguments on.
   * @param {number} [cap=fn.length] The cap of the number of args.
   * @param {Object} [context=null] The context to run the function on.
   * @returns {Function} The function with arguments capped.
   * @memberof XtraUtils.Function.
   * @example
   * function j(a,b,c) { return a + '+' + b + '+' + 'c' };
   * j = Function.capArgs(j, 2);
   * j(1,2,3);		// '1+2+undefined'
   */
		function capArgs(fn) {
			var cap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.length;
			var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var func = fn.bind(context);
			return rename(function () {
				for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
					args[_key5] = arguments[_key5];
				}

				args.length = cap;
				return func.apply(undefined, args);
			}, fn.name);
		}
		return capArgs;
	}());

	XtraUtils.Function.addMethod('memoize', function () {
		/**
	   	 * Caches the result. Should only be used on pure functions, which return the same result for the same input.
	   	 * @param {Function} fn The function to cache.
	   	 * @param {Object} [context=null] The context to operate in.
	   	 * @returns {Function} The resulting function.
	   	 * @memberof XtraUtils.Function.
	   	 */
		class MemoHash extends Map {
			constructor(...args) {
				super(...args);
			}
			has(value) {
				let keys = [...this.keys()],
				    res = value;
				for(let i = 0; i < keys.length; i++) {
					const key = keys[i]
					if(key.length !== value.length) {
						continue;
					}
      					let isVal = true
         				for(let j = 0; j < key.length; j++) {
            					isVal = isVal && key[j] === value[j];
         				}
         				if(isVal) {
            					value = key;
         				}
         				break;
      				}
	      			return super.has(value)
   			}
			["get"](value) {
    				let keys = [...this.keys()],
				for(let i = 0; i < keys.length; i++) {
					const key = keys[i]
         				if(key.length !== value.length) {
            					continue;
         				}
         				let isVal = true
         				for(let j = 0; j < key.length; j++) {
            					isVal = isVal && key[j] === value[j];
         				}
         				if(isVal) {
            					value = key;
         				}
         				break;
      				}
      				return super.get(value)
   			}
		}
		function memoize(fn, context=null) {

			//======================================================
			// Many thanks to @ConorO'Brien for allowing me to use.
			// The file this is used from is located here:
			// https://github.com/ConorOBrien-Foxx/ffuncs/blob/master/backend/memoize.js
			// github profile located here:
			// https://github.com/ConorOBrien-Foxx
			//======================================================
			const func = fn.bind(context),
			      mem = new MemoHash();
			return (...args) => {
				return !mem.has(args) && mem.set(args, func(args)), mem.get(args);
			}
		}
		return memoize;
	}());

	XtraUtils.Function.addMethod('throttle', function () {
		/**
   * Delayes the execution of a function. You call it with the normal arguments you would. If you don't wait until the timout expires, this also works as a debounce method.
   * @param {Function} fn The function to throttle.
   * @param {number} time The delay to execute the function after.
   * @param {Object} [context=null] What context to execute under.
   * @returns {Function} The throttled function.
   * @memberof XtraUtils.Function.
   */
		function throttle(fn, time) {
			var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var func = fn.bind(context);
			var timeout = -1;
			return rename(function () {
				for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
					args[_key7] = arguments[_key7];
				}

				clearTimeout(timeout);
				timeout = setTimeout(function () {
					func.apply(undefined, args);
				}, time);
			}, fn.name);
		}
		return throttle;
	}());

	XtraUtils.Function.addMethod('curry', function () {
		//======================================================
		// Many thanks to @ConorO'Brien for allowing me to use.
		// The file this is used from is located here:
		// https://github.com/ConorOBrien-Foxx/ffuncs/blob/master/backend/curry.js
		//======================================================
		var currier = function currier(fn) {
			var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.length;
			var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var func = fn.bind(context);
			args = [];
			var _rec = function _rec() {
				var _args;

				(_args = args).push.apply(_args, arguments);
				if (args.length === arity) {
					return func.apply(undefined, _toConsumableArray(args));
				} else {
					(function () {
						return _rec.apply(undefined, arguments);
					});
				}
			};
			return function () {
				return _rec.apply(undefined, arguments);
			};
		};
		/**
   * Allows the function to be called many times, before executing.
   * @param {Function} fn The function to curry.
   * @param {number} [arity=fn.length] The number of arguments to execute it at.
   * @param {Object} [context=null] The context to execute in.
   * @returns {Function} The curried function.
   * @memberof XtraUtils.Function.
   * @example
   * function j(a,b,c) { return [a,b,c] };
   * j = Function.curry(j);
   * j(1,2)(3);		// [1,2,3]
   * j(1)(2,3);		// [1,2,3]
   * j(1)(2)(3);	 // [1,2,3]
   */
		function curry(fn) {
			var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.arity;

			return rename(currier(fn, arity), fn.name);
		}
		return curry;
	}());

	XtraUtils.Function.addUtil('once', function () {
		/**
   * Restricts the execution of a function to one call. Note this does not change the original function.
   * @param {Function} fn The function to limit.
   * @param {Object} [context=null] The context to use.
   * @returns {Function} The restricted function.
   * @memberof XtraUtils.Function.
   * @example
   * function k(a) { return a };
   * k = Function.once(k);
   * k(3);		// 3
   * k(4);		// 4
   */
		function once(fn) {
			var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var func = fn.bind(context);
			called = 0, result = null;
			return rename(function () {
				result = called === 1 ? result : func.apply(undefined, arguments);
				called |= 1;
				return result;
			}, fn.name);
		}
	}());

	XtraUtils.Function.addMethod('afterNCalls', function () {
		/**
   * Returns a function that doesn't execute unless called `n` or more times.
   * @param {Function} callback The function to restrict.
   * @param {number} n The number that determines how many times to wait.
   * @param {Object} [context=null] The context to operate thome.
   * @returns {Function} The restricted function.
   * @memberof Xtrautils.Function.
   */
		function afterNCalls(callback, n) {
			var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var func = callback.bind(context),
			    calls = 0;
			return function () {
				if (calls++ >= times) {
					return func.apply(undefined, arguments);
				}
			};
		}
		return afterNCalls;
	}());
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}
/**
 * Used to denote that the function has been modified, and may not be a pure function.
 * @alias ModifiedFunction
 * @typedef {Function} ModifiedFunction
 * @memberof XtraUtils.Function.
 */
