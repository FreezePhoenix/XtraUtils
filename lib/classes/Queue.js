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
   * A class that represents a queue. When an item is added, it is added to the top. When an item is removed, it is removed from the bottom.
   * @class
   */
	var Queue = function () {
		/**
   * @constructs Queue
   */
		function Queue() {
			_classCallCheck(this, Queue);

			this.__elems__ = [];
		}
		/**
   * The number of items in the queue.
   */


		_createClass(Queue, [{
			key: 'add',

			/**
    * Add an item to the queue
    * @param {...*} items The items to add.
    * @returns {undefined}
    */
			value: function add() {
				var _elems__;

				(_elems__ = this.__elems__).push.apply(_elems__, arguments);
			}
			/**
    * Get the bottom item from the queue.
    * @returns {*} The item.
    */

		}, {
			key: 'remove',
			value: function remove() {
				return this.__elems__.shift();
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

		return Queue;
	}();

	var TypedQueue = function (_Queue) {
		_inherits(TypedQueue, _Queue);

		function TypedQueue() {
			_classCallCheck(this, TypedQueue);

			for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
				types[_key] = arguments[_key];
			}

			if (types.all(function (type) {
				return typeof type === 'function' && type.prototype;
			})) {
				var _this = _possibleConstructorReturn(this, (TypedQueue.__proto__ || Object.getPrototypeOf(TypedQueue)).call(this));

				_this.__types__ = types;
			} else {
				throw TypeError('TypedStack expects an array of types.');
			}
			return _possibleConstructorReturn(_this);
		}

		_createClass(TypedQueue, [{
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
						_get(TypedQueue.prototype.__proto__ || Object.getPrototypeOf(TypedQueue.prototype), 'add', _this2).call(_this2, item);
					} else {
						throw TypeError('Invalid item: ' + item);
					}
				});
			}
		}]);

		return TypedQueue;
	}(Queue);

	return [Queue, TypedQueue];
}(),
    _ref2 = _slicedToArray(_ref, 2),
    Queue = _ref2[0],
    TypedQueue = _ref2[1];