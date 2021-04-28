// #!/user/bin/node
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SealedArray = function () {
	var setPrototypeof = Object.setPrototypeof,
	    assign = Object.assign,
	    seal = Object.seal;
	/**
   * A class for those pedantic people who can't stand dynamic memory allocation. This class gives you a fixed length array. Every method that would in the case of a normal array push items off the other end.
   * @class
   * @extends Array
  */

	var SealedArray = function (_Array) {
		_inherits(SealedArray, _Array);

		/**
   * Constructs a new SealedArray. Argument format is the same as that of `Array`.
   * @constructs SealedArray
   * @param {...*} args The arguments to pass to Array.
   */
		function SealedArray() {
			var _ref;

			_classCallCheck(this, SealedArray);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = SealedArray.__proto__ || Object.getPrototypeOf(SealedArray)).call.apply(_ref, [this].concat(args)));

			args.length === 1 && _this.fill();
			seal(_this);
			return _this;
		}
		/**
   * Pushes item(s) to the end of the array. Items that overflow the beginning are removed from the array.
   * @param {...*} args The items to push to the end of the array.
   * @returns {number} The length of the array.
   */


		_createClass(SealedArray, [{
			key: 'push',
			value: function push() {
				var self = this.toNativeArray();

				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				args.forEach(function (item) {
					self.shift();
					self.push(item);
				});
				this.propogate(self);
				return this.length;
			}
			/**
    * Pushes items to the beginning of the array. Items that overflow the end are removed.
    * @param {...*} args The items to prepend at the start of the array.
    * @returns {number} The length of the array.
    */

		}, {
			key: 'unshift',
			value: function unshift() {
				var self = this.toNativeArray();

				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				args.forEach(function (item) {
					self.pop();
					self.unshift(item);
				});
				this.propogate(self);
				return this.length;
			}
			/**
    * Removes the last item at the end of the array, and puts `undefined` onto the beginning.
    * @returns {*} The item that was at the end of the array.
    */

		}, {
			key: 'pop',
			value: function pop() {
				var self = this.toNativeArray();self.unshift(undefined);
				console.log(self);
				var arr = assign([], self);
				arr.pop();
				console.log(arr);
				this.propogate(arr);
				return self.pop();
			}
			/**
    * The SealedArray equivalent of `Array.prototype.filter`.
    * @param {ArrayCallback} fn The callback to iterate on.
    * @returns {SealedArray} The filtered array
    */

		}, {
			key: 'filter',
			value: function filter() {
				var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
					return false;
				};

				return setPrototypeOf(this.toNativeArray().filter(fn), this.__proto__);
			}
			/**
    * Removes the first item in the array, and pushes `undefined` onto the end.
    * @returns {*} The item that was at the start of the array.
    */

		}, {
			key: 'shift',
			value: function shift() {
				var self = this.toNativeArray(),
				    arr = assign([], self);
				arr.shift();
				this.propogate(arr);
				return self.shift();
			}
		}, {
			key: 'propogate',
			value: function propogate(array) {
				array.length = this.length;
				this.fill();
				Object.assign(this, array);
				return this;
			}
			/**
    * Returns a shallow duplicate of the array.
    * @returns {SealedArray} The shallow clone.
    */

		}, {
			key: 'clone',
			value: function clone() {
				return setPrototypeof(this.toNativeArray(), this.__proto__);
			}
		}, {
			key: 'toNativeArray',
			value: function toNativeArray() {
				return Object.assign([], this);
			}
			/**
    * The SealedArray equivalent of `Array.prototype.map`.
    * @param {ArrayCallback} fn The function to map the array with.
    * @returns {SealedArray} The mapped array.
    */

		}, {
			key: 'map',
			value: function map(fn) {
				return new (Function.prototype.bind.apply(SealedArray, [null].concat(_toConsumableArray([].concat(_toConsumableArray(this)).map(fn)))))();
			}
		}, {
			key: Symbol.species,
			get: function get() {
				return SealedArray;
			}
		}]);

		return SealedArray;
	}(Array);

	return SealedArray;
}();
if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	XtraUtils.SealedArray = new XtraUtils.Utility(SealedArray);
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}
/**
 * @callback ArrayCallback
 * @param {*} item The item.
 * @param {number} index The index of the item in the array.
 * @param {Array} array The array being mapped.
 * @returns {*} The result.
 * @memberof SealedArray
 * @alias ArrayCallback
 */