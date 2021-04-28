// #!/user/bin/node
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
	var others = {
		0: [1, 2],
		1: [2, 0],
		2: [0, 1]
	},
	    isNumber = function isNumber(a) {
		var t = Number(a);return t === t;
	},
	    attemptConversion = function attemptConversion() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		if (args[0] instanceof Vector) {
			return args[0].coords;
		}
		if (args[0].every(isNumber)) {
			return args[0].map(function (item, _) {
				var res = Number(item);
				return typeof res === 'number' && res != res ? 0 : res;
			});
		}
		if (args[0][0] instanceof Array && args[0][0].every(isNumber)) {
			return args[0][0].map(function (item, _) {
				var res = Number(item);
				return typeof res === 'number' && res != res ? 0 : res;
			});
		}
		return [0];
	};

	/**
   * The classical Vector class, with some extensions.  Vector does it's best to convert this to something useable, but it may not always find success. In this case, it returns `new Vector(0)`.
   * @class
   */

	var Vector = function () {
		/**
   * Constructs a new Vector instance
   * @constructs Vector
   * @param {*} args The coordinates of the vector.
   */
		function Vector() {
			_classCallCheck(this, Vector);

			var coords = void 0;

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			coords = attemptConversion(args);
			Object.assign(this, {
				coords: coords
			});
		}
		/**
   * Find the [Cross Product](https://en.wikipedia.org/wiki/Cross_product) of two vectors. The resulting vector is at 90 degree angles to the other two.
   * @param {Vector} vector1 The first vector.
   * @param {Vector} vector2 The second vector.
   * @returns {Vector} The resulting cross product.
   * @memberof Vector
   */


		_createClass(Vector, [{
			key: 'addVector',

			/**
    * Add a vector to another vector
    * @param {Vector} vector The vector to add.
    * @returns {Vector} The resulting vector.
    * @memberof Vector
    */
			value: function addVector(vector) {
				if (!(vector instanceof Vector)) {
					throw TypeError('Vector.prototype.addVector expects a vector');
				}
				var ownCoords = Object.assign([], this.coords),
				    otherCoords = Object.assign([], vector.coords),
				    newLength = Math.max(ownCoords.length, otherCoords.length);

				[ownCoords, otherCoords].forEach(function (item) {
					while (item.length < newLength) {
						item.push(0);
					}
				});

				this.coords = Array(newLength).fill(undefined).map(function (item, index) {
					return ownCoords[index] + otherCoords[index];
				});
				return this;
			}
		}], [{
			key: 'crossProduct',
			value: function crossProduct() {
				var vector1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector(0, 0, 0);
				var vector2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector(0, 0, 0);

				var firstCoords = [].concat(_toConsumableArray(vector1.coords)),
				    otherCoords = [].concat(_toConsumableArray(vector2.coords)),
				    greatest = Math.max(firstCoords.length, otherCoords.length);
				if (greatest > 3) {
					throw Error('All vectors must be 3D or less.');
				}
				[firstCoords, otherCoords].forEach(function (item) {
					while (item.length < greatest) {
						item.push(0);
					}
				});
				var product = new (Function.prototype.bind.apply(Vector, [null].concat(_toConsumableArray(Array(3).fill(undefined).map(function (_, index) {
					var _others = others[index];
					return firstCoords[_others[0]] * otherCoords[_others[1]] - firstCoords[_others[1]] * otherCoords[_others[0]];
				})))))();
				return product;
			}
			/**
    * Find the [Dot Product](https://en.wikipedia.org/wiki/Dot_product) of two vectors.
    * @param {Vector} vector1 The first vector.
    * @param {Vector} vector2 The second vector.
    * @returns {number} The resulting dot product.
    * @meberof Vector
    */

		}, {
			key: 'dotProduct',
			value: function dotProduct() {
				var vector1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector(0);
				var vector2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector(0);

				var firstCoords = [].concat(_toConsumableArray(vector1.coords)),
				    otherCoords = [].concat(_toConsumableArray(vector2.coords)),
				    greatest = Math.max(firstCoords.length, otherCoords.length);
				[firstCoords, otherCoords].forEach(function (item) {
					while (item.length < greatest) {
						item.push(0);
					}
				});
				var result = Array(greatest).fill(undefined).map(function (_, index) {
					return firstCoords[index] * otherCoords[index];
				}).reduce(function (a, b) {
					return a + b;
				});
				return result;
			}
			/**
    * Finds the [Taxicab Distance]{@link https://en.wikipedia.org/wiki/Taxicab_geometry} between two vectors.
    * @param {Vector} [vector1=Vector(0)] The first vector in the distance calculation.
    * @param {Vector} [vector2=Vector(0)] The second vector in the distance calculation.
    * @returns {number} The taxicab distance between the two vectors
    * @memberof Vector
    */

		}, {
			key: 'taxicabDistance',
			value: function taxicabDistance() {
				var vector1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector(0);
				var vector2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector(0);

				var firstCoords = [].concat(_toConsumableArray(vector1.coords)),
				    otherCoords = [].concat(_toConsumableArray(vector2.coords)),
				    greatest = Math.max(firstCoords.length, otherCoords.length);
				[firstCoords, otherCoords].forEach(function (item) {
					while (item.length < greatest) {
						item.push(0);
					}
				});
				var difference = Array(greatest).fill(undefined).map(function (i, index) {
					return Math.abs(firstCoords[index] - otherCoords[index]);
				}).reduce(function (a, b) {
					return a + b;
				}),
				    distance = difference;
				return distance;
			}
			/**
    * Finds the Euclidean distance between two vectors.
    * @param {Vector} [vector1=Vector(0)] The first vector in the distance calculation.
    * @param {Vector} [vector2=Vector(0)] The second vector in the distance calculation.
    * @returns {number} The resulting distance.
    * @memberof Vector
    */

		}, {
			key: 'linearDistance',
			value: function linearDistance() {
				var vector1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector(0);
				var vector2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector(0);

				var firstCoords = [].concat(_toConsumableArray(vector1.coords)),
				    otherCoords = [].concat(_toConsumableArray(vector2.coords)),
				    greatest = Math.max(firstCoords.length, otherCoords.length);

				[firstCoords, otherCoords].forEach(function (item) {
					while (item.length < greatest) {
						item.push(0);
					}
				});

				var difference = Array(greatest).fill(undefined).map(function (item, index) {
					return Math.abs(firstCoords[index] - otherCoords[index]);
				}).reduce(function (a, b) {
					return a + b;
				}),
				    distance = Math.sqrt(difference);
				return distance;
			}
		}, {
			key: 'equals',
			value: function equals(vector1, vector2) {
				if (!(vector1 instanceof Vector) && !(vector2 instanceof Vector)) {
					throw TypeError('Vector.prototype.addVector expects a vector');
				}
				var firstCoords = [].concat(_toConsumableArray(vector1.coords)),
				    otherCoords = [].concat(_toConsumableArray(vector2.coords));
				if (firstCoords.length !== otherCoords.length) {
					return false;
				}

				// They're both equal  length, so it doesn't matter which one we pick.
				var len = firstCoords.length;
				while (--len) {
					if (firstCoords[len] !== otherCoords[len]) {
						return false;
					}
				}
				return true;
			}
		}]);

		return Vector;
	}();

	return Vector;
}();
if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	var _global = (0, eval)('this');
	_global.XtraUtils.Vector = new _global.XtraUtils.Utility(Vector);
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}