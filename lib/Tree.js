// #!/user/bin/node
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = function () {
	var LeafCache = Object.create(null),
	    genLeaf = function genLeaf(CLASS) {
		return LeafCache[CLASS.name] || eval('class Leaf extends ' + CLASS.name + ' {\n\tconstructor(val) {\n\t\tsuper(val);\n\t}\n}; Leaf.prototype.__isleaf__ = true; Leaf');
	},
	    TARGET = Symbol('__target__'),
	    HANDLER = Symbol('__handler__'),
	    PROXY = Symbol('__proxy__'),
	    ISTREE = Symbol('__istree__'),
	    assign = Object.assign,
	    defineProperty = Object.defineProperty,
	    entries = Object.entries,
	    setPrototypeOf = Object.setPrototypeOf,
	    _ref3 = {},
	    hasOwnProperty = _ref3.hasOwnProperty,
	    convert = function convert(obj) {
		var res = obj instanceof Branch ? obj : new Branch(obj);
		for (var key in obj) {
			var value = obj[key];
			if (hasOwnProperty.call(obj, key)) {
				if ('__isfragment__' !== key) {
					if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
						res[key] = convert(value);
						Object.defineProperty(res[key], '__parent__', {
							value: res[PROXY],
							configurable: false,
							protected: false
						});
					} else {
						var val = void 0;
						res[key] = new Proxy(val = new (genLeaf(value.constructor))(value), genHandler(val));
					}
				}
			}
		}
		return res;
	},
	    getKey = function getKey(obj, val) {
		for (var key in obj) {
			var value = obj[key];
			if (value[TARGET] === val) {
				return key;
			}
		}
	};

	var genHandler = function genHandler(_target) {
		return function () {
			var _keys2, _mutatorMap;

			var res = void 0;
			var _raw = __raw__.bind(_target),
			    _keys = (_keys2 = {
				'__raw__': _raw
			}, _defineProperty(_keys2, ISTREE, true), _defineProperty(_keys2, TARGET, _target), _mutatorMap = {}, _mutatorMap[PROXY] = _mutatorMap[PROXY] || {}, _mutatorMap[PROXY].get = function () {
				return res.proxy;
			}, _mutatorMap[HANDLER] = _mutatorMap[HANDLER] || {}, _mutatorMap[HANDLER].get = function () {
				return res;
			}, _defineEnumerableProperties(_keys2, _mutatorMap), _keys2);
			res = {
				set: function set(target, prop, value) {
					if (prop === '__parent__') {
						if (_keys[PROXY] instanceof Fragment) {
							throw TypeError('Cannot set __parent__ on fragments.');
						} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value[ISTREE]) {
							var key = getKey(target.__parent__, target);
							if (target.__parent__[key]) {
								delete target.__parent__[key];
							}
							value[key] = target;
							return value;
						} else {
							throw TypeError('Cannot assign __parent__ to a non-tree value');
						}
					}
					if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor.name !== 'Leaf') {
						value = convert(value);
						if (value[PROXY] instanceof Tree) {
							throw TypeError('Cannot have a tree as a child of another tree.');
						}
						value = convert(value);
						defineProperty(value, '__parent__', {
							value: _keys[PROXY],
							configurable: false,
							writable: true
						});
					} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
						var val = void 0;
						value = new Proxy(val = new (genLeaf(value.constructor))(value), genHandler(val));
					}
					target[prop] = value;
					return value;
				},
				get: function get(target, prop) {
					if (prop === 'toJSON') {
						return _raw;
					}
					if ([HANDLER, PROXY, '__raw__', ISTREE, TARGET].includes(prop)) {
						return _keys[prop];
					}
					return target[prop];
				}
			};
			return res;
		}();
	};
	/**
  * Get the raw value of the tree, without all that proxy stuff.
  * @returns {Object} The raw object. Please not that objects will not be the same instances.
  * @memberof Tree#
  */
	function __raw__() {
		var res = setPrototypeOf({}, this.__proto__);
		for (var key in this) {
			if (key.slice(0, 2) === key.slice(-2) && key.slice(-2) === '__') {
				continue;
			} else {
				var value = this[key];
				if (hasOwnProperty.call(this, key)) {
					res[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? __raw__.call(value[TARGET]) : value;
				}
			}
		}
		return res;
	}
	/**
  * A class that enables navigation from child properties to parent. WIP - currently figuring out how to make new properties.
  * For all purposes this functions as intended, but it doesn't print well in the console. It even perserves prototypes.
  * @property {(Branch|Leaf)} * Properties.
  */

	var Tree = function () {
		/**
   * Constructs a new Tree instance.
   * @constructs Tree
   */
		function Tree() {
			_classCallCheck(this, Tree);

			return Tree.from({});
		}
		/**
   * Attempt to create a tree from an existing object.
   * @param {Object} obj The object to convert to a tree.
   * @throws {TypeError} You probably passed it a primitive.
   * @returns {Tree} The resulting tree.
   */


		_createClass(Tree, null, [{
			key: 'from',
			value: function from(obj) {
				var self = {},
				    res = new Proxy(setPrototypeOf(self, obj.__proto__), genHandler(self));
				defineProperty(res[HANDLER], 'proxy', {
					value: res,
					configurable: false,
					protected: true
				});
				if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
					throw TypeError('Tree expects an object');
				} else {
					for (var key in obj) {
						var value = obj[key];
						var val = void 0;
						res[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? convert(value) : new Proxy(val = new (genLeaf(value.constructor))(value), genHandler(val));
						console.log(res[key][TARGET]);
					}
				}
				defineProperty(res, '__istree__', {
					value: true,
					configurable: false,
					protected: true
				});
				return res;
			}
		}, {
			key: Symbol.hasInstance,
			value: function value(obj) {
				return obj[ISTREE] && obj.__istree__ || false;
			}
		}]);

		return Tree;
	}();
	/**
  * A class that behaves similar to a tree and similar to a branch. It can be added to a tree like a branch.
  * @class
  */


	var Fragment = function () {
		/**
   * Construct a new fragment.
   * @constructs Fragment
   */
		function Fragment() {
			_classCallCheck(this, Fragment);

			return Fragment.from({});
		}
		/**
   * Attempt to make a fragment from an existing object.
   * @param {Object} obj The object to use.
   * @returns {Fragment} The resulting fragment.
   */


		_createClass(Fragment, null, [{
			key: 'from',
			value: function from(obj) {
				var self = {},
				    res = new Proxy(setPrototypeOf(self, obj.__proto__), genHandler(self));
				defineProperty(res[HANDLER], 'proxy', {
					value: res,
					configurable: false,
					protected: true
				});
				if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
					throw TypeError('Tree expects an object');
				} else {
					for (var key in obj) {
						var value = obj[key];
						res[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? convert(value) : value;
					}
				}
				defineProperty(res, '__isfragment__', {
					value: true,
					configurable: false,
					protected: true
				});
				return res;
			}
		}, {
			key: Symbol.hasInstance,
			value: function value(obj) {
				return obj[ISTREE] && obj.__isfragment__ || false;
			}
		}]);

		return Fragment;
	}();

	var Branch = function () {
		function Branch(obj) {
			_classCallCheck(this, Branch);

			var self = {},
			    res = new Proxy(setPrototypeOf(self, obj.__proto__), genHandler(self));
			defineProperty(res[HANDLER], 'proxy', {
				value: res,
				configurable: false,
				protected: true
			});
			defineProperty(res, '__isbranch__', {
				value: true,
				configurable: false,
				protected: true
			});
			return res;
		}

		_createClass(Branch, null, [{
			key: Symbol.hasInstance,
			value: function value(obj) {
				return obj[ISTREE] && obj.__isbranch__ || false;
			}
		}]);

		return Branch;
	}();

	return [Tree, Fragment];
}(),
    _ref2 = _slicedToArray(_ref, 2),
    Tree = _ref2[0],
    Fragment = _ref2[1];

if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	XtraUtils.Tree = new XtraUtils.Utility(Tree);
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}
/**
 * A class that shows that an item is a terminal node. Parent properties cannot be accessed by this node.
 * @alias Brance
 * @class Leaf
 * @extends Primitive
 */
/**
 * A class that simply shows that it is an inner object of a Tree.
 * @alias Branch
 * @class Branch
 * @property {(Tree|Branch)} __parent__ The parent element. This can be changed to move the object to another tree or branch.
 */