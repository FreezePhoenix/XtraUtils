// #!/user/bin/node
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ref = function () {
	/**
  * A class that represents a stack. When an item is added, it goes to the top. When an item is removed, it is removed from the top.
  * @class
  */
	var Stack = function () {
		/**
   * @constructs Stack
   */
		function Stack() {
			_classCallCheck(this, Stack);

			this.__elems__ = [];
		}
		/**
   * The number of items in the stack.
   */


		_createClass(Stack, [{
			key: 'add',

			/**
    * Add an item to the stack.
    * @param {...*} items The items to add.
    * @returns {undefined}
    */
			value: function add() {
				var _elems__;

				(_elems__ = this.__elems__).push.apply(_elems__, arguments);
			}
			/**
    * Remove an item from the stack.
    * @returns {*} The item.
    */

		}, {
			key: 'remove',
			value: function remove() {
				return this.__elems__.pop();
			}
		}, {
			key: Symbol.iterator,
			value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
				return regeneratorRuntime.wrap(function value$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!this.items) {
									_context.next = 5;
									break;
								}

								_context.next = 3;
								return this.remove();

							case 3:
								_context.next = 0;
								break;

							case 5:
							case 'end':
								return _context.stop();
						}
					}
				}, value, this);
			})
		}, {
			key: 'items',
			get: function get() {
				return this.__elems__.length;
			}
		}]);

		return Stack;
	}();
	/**
    * A stack class that only allows only specific types.
    * @class
    * @extends Stack
    */


	var TypedStack = function (_Stack) {
		_inherits(TypedStack, _Stack);

		/**
   	 * @constructs TypedStack
   	 * @param {...Class} types The types to allow.
   	 * @throws {TypeError} You provided an invalid type!
   	 */
		function TypedStack() {
			_classCallCheck(this, TypedStack);

			for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
				types[_key] = arguments[_key];
			}

			if (types.all(function (type) {
				return typeof type === 'function' && type.prototype;
			})) {
				var _this = _possibleConstructorReturn(this, (TypedStack.__proto__ || Object.getPrototypeOf(TypedStack)).call(this));

				_this.__types__ = types;
			} else {
				throw TypeError('TypedStack expects an array of types.');
			}
			return _possibleConstructorReturn(_this);
		}
		/**
    	 * Add an item to the stack. Throws a `TypeError` if it is not an instance of any of the types.
       * @param {...*} items The items to add.
       * @throws {TypeError} Invalid item provided.
       * @returns {undefined}
       */


		_createClass(TypedStack, [{
			key: 'add',
			value: function add() {
				var _this2 = this;

				for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					items[_key2] = arguments[_key2];
				}

				items.forEach(function (item, _) {
					if (_this2.__types__.some(function (type) {
						return item instanceof type;
					})) {
						_get(TypedStack.prototype.__proto__ || Object.getPrototypeOf(TypedStack.prototype), 'add', _this2).call(_this2, item);
					} else {
						throw TypeError('Invalid item: ' + item);
					}
				});
			}
		}]);

		return TypedStack;
	}(Stack);
	/**
  * A stack class with limited size.
  * @class
  * @extends Stack
  */


	var SizeLimitedStack = function (_Stack2) {
		_inherits(SizeLimitedStack, _Stack2);

		/**
   * @constructs SizeLimitedStack
   * @param {number} size The max on the number of items.
   */
		function SizeLimitedStack(size) {
			_classCallCheck(this, SizeLimitedStack);

			var _this3 = _possibleConstructorReturn(this, (SizeLimitedStack.__proto__ || Object.getPrototypeOf(SizeLimitedStack)).call(this));

			_this3.__elems__ = Array(size).fill();
			return _this3;
		}
		/**
   * Add an item to the stack. Note: Items that are pushed off the front are lost.
   * @param {...*} items The items to add.
   * @returns {undefined}
   */


		_createClass(SizeLimitedStack, [{
			key: 'add',
			value: function add() {
				var _this4 = this;

				for (var _len3 = arguments.length, items = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					items[_key3] = arguments[_key3];
				}

				items.forEach(function (item, _) {
					_get(SizeLimitedStack.prototype.__proto__ || Object.getPrototypeOf(SizeLimitedStack.prototype), 'add', _this4).call(_this4, item);
					_this4.__elems__.shift();
				});
			}
		}]);

		return SizeLimitedStack;
	}(Stack);
	/**
  * A stack thats with limited size and specific types.
  * @class
  * @extends Stack
  */


	var TypedSizeLimitedStack = function (_Stack3) {
		_inherits(TypedSizeLimitedStack, _Stack3);

		function TypedSizeLimitedStack(size) {
			_classCallCheck(this, TypedSizeLimitedStack);

			for (var _len4 = arguments.length, types = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
				types[_key4 - 1] = arguments[_key4];
			}

			if (types.all(function (type) {
				return typeof type === 'function' && type.prototype;
			})) {
				var _this5 = _possibleConstructorReturn(this, (TypedSizeLimitedStack.__proto__ || Object.getPrototypeOf(TypedSizeLimitedStack)).call(this));

				_this5.__types__ = types;
				_this5.__elems__ = Array(size).fill();
			} else {
				throw TypeError('TypedStack expects an array of types.');
			}
			return _possibleConstructorReturn(_this5);
		}

		return TypedSizeLimitedStack;
	}(Stack);

	return [Stack, TypedStack, SizeLimitedStack];
}(),
    _ref2 = _slicedToArray(_ref, 3),
    Stack = _ref2[0],
    TypedStack = _ref2[1],
    SizeLimitedStack = _ref2[2];
/**
 * A constructor or class.
 * @alias Type
 * @typedef {function} Type
 * @memberof TypedStack
 */