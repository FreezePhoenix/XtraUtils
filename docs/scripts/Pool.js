// #!/user/bin/node
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Pool = function () {
	var setPrototypeOf = Object.setPrototypeOf,
	    defineProperty = Object.defineProperty,
	    getOwnPropertyNames = Object.getOwnPropertyNames,
	    freeze = Object.freeze,
	    _ref = {},
	    toString = _ref.toString,
	    hasOwnProperty = _ref.hasOwnProperty,
	    empty = function empty(obj, template) {
		var templateNames = getOwnPropertyNames(template),
		    ownNames = getOwnPropertyNames(obj);

		var _arr = [].concat(_toConsumableArray(templateNames), _toConsumableArray(ownNames));

		for (var _i = 0; _i < _arr.length; _i++) {
			var name = _arr[_i];
			if (hasOwnProperty.call(template, name)) {
				if (_typeof(template[name]) === 'object') {
					obj[name] = empty(obj[name], template[name]);
				} else {
					obj[name] = template[name];
				}
			} else {
				delete obj[name];
			}
		}
		return obj;
	},
	    deepFreeze = function deepFreeze(object) {
		var propNames = getOwnPropertyNames(object);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var name = _step.value;

				var value = object[name];
				object[name] = value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? deepFreeze(value) : value;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return Object.freeze(object);
	},
	    deepClone = function deepClone(object) {
		var result = {},
		    propNames = getOwnPropertyNames(obj);
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = propNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var name = _step2.value;

				var value = object[name];
				result[name] = value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? deepClone(value) : value;
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		return setPrototypeOf(result, object.__proto__);
	};
	/**
  * An object pool class.
  * @class
  */


	var Pool = function () {
		/**
   * The Pool constructor.
   * @param {Template} obj The template to use.
   * @param {number} size The number of objects to create.
   * @constructs Pool
   */
		function Pool(obj, size) {
			_classCallCheck(this, Pool);

			defineProperty(this, '__default__', {
				value: deepFreeze(deepClone(obj)),
				configurable: false,
				protected: true
			});
			defineProperty(this, '__items__', {
				value: freeze(setPrototypeOf(Array(size).fill().map(function (item) {
					return [1, deepClone(obj)];
				}), null)),
				configurable: false,
				protected: true
			});
		}
		/**
   * Get a new object.
   * @returns {Object} The new allocated object.
   */


		_createClass(Pool, [{
			key: 'allocate',
			value: function allocate() {
				for (var i = 0; i < this.__items__.length; i++) {
					var pair = this.__items__[i];
					if (pair[0] === 1) {
						pair[0] = 0;
						return pair[1];
					}
				}
			}
			/**
    * Free an object for later use.
    * @param {Object} obj The obejct to free.
    * @returns {undefined}
    * @throws {Error} The item was not found in the pool.
    */

		}, {
			key: 'free',
			value: function free(obj) {
				var _this = this;

				for (var i = 0; i < this.__items__.length; i++) {
					var pair = this.__items__[i];
					if (pair[1] === obj) {
						pair[0] = 1;
						Promise.resolve().then(function () {
							empty(obj, _this.__default__);
						});
						return;
					}
				}
				throw Error('Object not found in pool.');
			}
		}]);

		return Pool;
	}();

	return Pool;
}();
/**
 * A template to use for an object pool.
 * @alias Template
 * @typedef {Object} Template
 * @memberof Pool
 */