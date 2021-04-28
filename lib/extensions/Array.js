// #!/user/bin/node
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	var _global = (0, eval)('this');
	var XtraUtils = _global.XtraUtils;
	/**
   * @type {Utility}
   * @property {function} aidsIn The Array class.
   * @property {Array} aidsIn.prototype the Array prototype.
   * @namespace
   * @memberof XtraUtils
   */
	XtraUtils.Array = new XtraUtils.Utility(Array);
	// Some overly-large and commonly-used methods defined once.
	var unique = function unique(b) {
		var a = [];b.forEach(function (c, b) {
			a.includes(c) || a.push(c);
		});return a;
	},
	    _compactor = function _compactor(item) {
		return isNumber(item) ? true : Boolean(item);
	},
	    isNumber = function isNumber(item) {
		return typeof item === 'number';
	},
	    flatten = function flatten(c, d) {
		if (0 === c) {
			return d;
		}var a = [];d.forEach(function (b) {
			b instanceof Array ? a = a.concat(deepClone(flatten(c - 1, b))) : a.push(deepClone(b));
		});return a;
	},
	    compact = function compact(a) {
		var b = a.filter(_compactor);a.length = 0;assign(a, b);return b;
	},
	    types = [Number, String, Boolean],
	    deepClone = function deepClone(e) {
		var a = e;if (!a) {
			return a;
		}types.forEach(function (d) {
			a instanceof d && (b = d(a));
		});if ('undefined' === typeof b) {
			if ('[object Array]' === {}.toString.call(a)) {
				var b = [];a.forEach(function (a, c, e) {
					b[c] = deepClone(a);
				});
			} else if ('object' === (typeof a === 'undefined' ? 'undefined' : _typeof(a))) {
				if (a.nodeType && 'function' == typeof a.cloneNode) {
					b = a.cloneNode(!0);
				} else if (a.prototype) {
					b = a;
				} else if (a instanceof Date) {
					b = new Date(a);
				} else {
					b = {};for (var c in a) {
						b[c] = deepClone(a[c]);
					}
				}
			} else {
				b = a;
			}
		}Object.setPrototypeOf(b, a.__proto__);return b;
	},
	    _shallowClone = function _shallowClone(a) {
		return [].concat(_toConsumableArray(a));
	},
	    max = Math.max,
	    round = Math.round,
	    random = Math.random,
	    floor = Math.floor,
	    ceil = Math.ceil,
	    isArray = Array.isArray,
	    assign = Object.assign,
	    setPrototypeOf = Object.setPrototypeOf;


	XtraUtils.Array.addMethod('range', function () {
		/**
   * Creates an array representing the range between two numbers.
   * @param {number} min The lower limit on the range.
   * @param {number} max The upper limit on the range.
   * @param {boolean} [minInclusive=true] Whether to include `min` in the range.
   * @param {boolean} [maxInclusive=true] Whether to include the maximum in the range.
   * @returns {Array.<Number>} The range.
   * @memberof XtraUtils.Array.
   * @example
   * Array.range(1, 4, true, true);    // [1, 2, 3, 4]
   *
   * Array.range(1, 4, false, true);   // [2, 3, 4]
   *
   * Array.range(1, 4, false, false);  // [2, 3]
   */
		function range(min, max) {
			var minInclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
			var maxInclusive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			if (min > max) {
				var temp = max;
				max = min;
				min = temp;
			}
			return Array(max - min - 1 + Number(maxInclusive) + Number(minInclusive)).fill(undefined).map(function (_, i) {
				return Number(!minInclusive) + i + min;
			});
		}
		return range;
	}());

	XtraUtils.Array.addMethod('fromArrayLike', function () {
		/**
   * Returns an array that is the same as the first paramater in indices and values.
   * @param {Object} arrayLike the object to create an array from.
   * @returns {Array} The resulting array.
   * @memberof XtraUtils.Array.
   */
		function fromArrayLike(arrayLike) {
			return arrayLike.slice();
		}
		return fromArrayLike;
	}());

	XtraUtils.Array.addMethod('zip', function () {
		var _maxLen = function _maxLen() {
			for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
				a[_key] = arguments[_key];
			}

			return max.apply(undefined, _toConsumableArray(a.map(function (i) {
				return i.length;
			})));
		};
		/**
   * Zips the arrays so that they are parallel.
   * @param {...Array} arrays The arrays to zip.
   * @returns {Array.<Array>} The resulting zipped arrays.
   * @memberof XtraUtils.Array.
   */
		function zip() {
			for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				arrays[_key2] = arguments[_key2];
			}

			var maxLen = _maxLen.apply(undefined, arrays),
			    res = Array(maxLen).fill(undefined).map(function (i, index1) {
				return Array(arrays.length).fill(undefined).map(function (j, index2) {
					return arrays[index2][index1];
				});
			});
			return res;
		}
		return zip;
	}());

	XtraUtils.Array.addMethod('unzip', function () {
		var _maxLen = function _maxLen() {
			for (var _len3 = arguments.length, a = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				a[_key3] = arguments[_key3];
			}

			return max.apply(undefined, _toConsumableArray(a.map(function (i) {
				return i.length;
			})));
		};
		/**
   * Reverses `Array.zip`.
   * @param {Array} zippedArr The array to unzip.
   * @returns {Array.<Array>} The resulting unzipped arrays.
   * @memberof XtraUtils.Array.
   */
		function unzip(zippedArr) {
			var maxLen = _maxLen.apply(undefined, _toConsumableArray(zippedArr)),
			    res = Array(maxLen).fill(undefined).map(function (i, index1) {
				return Array(zippedArr.length).fill(undefined).map(function (j, index2) {
					return zippedArr[index2][index1];
				});
			});
			return res;
		}
		return unzip;
	}());

	XtraUtils.Array.addMethod('diff', function () {
		var _filter = function _filter(item) {
			return [item.before, item.after].indexOf(null) + 1 && item.index === undefined;
		};
		/**
   * Calculates the difference between two arrays.
   * @param {Array} arr1 The 'old' value.
   * @param {Array} arr2 The 'new' value.
   * @returns {Array.<Diff>} An array of diffs.
   * @memberof XtraUtils.Array.
   */
		function diff(arr1, arr2) {
			arr1 = _shallowClone(arr1);arr2 = _shallowClone(arr2);
			var maxLength = max(arr1.length, arr2.length),
			    result = [];
			result.length = arr1.length = arr2.length = maxLength;
			result.fill(undefined).map(function () {
				return { 'before': null, 'after': null };
			});
			return result.map(function (item, index) {
				if (arr1[index] !== arr2[index]) {
					return assign(item, {
						'before': arr1[index],
						'after': arr2[index],
						'index': index
					});
				}
			}).filter(_filter);
		}
		return diff;
	}());

	XtraUtils.Array.addMethod('unique', function () {
		/**
   * Removes duplicate values in an array.
   * @param {Array} arr The array to remove duplicate values from.
   * @returns {Array} The uniquified array.
   * @memberof XtraUtils.Array.
   * @example
   * Array.unique([1, 2, 3, 1, '1']);		// [1, 2, 3, '1']
   */
		function unique(arr) {
			var result = [];
			arr.forEach(function (item, _) {
				if (!result.includes(item)) {
					result.push(item);
				}
			});
			return result;
		}
		return unique;
	}());

	XtraUtils.Array.addMethod('intersection', function () {
		/**
   * Finds all values that are in both arrays.
   * @param {Array} arr1 The first array.
   * @param {Array} arr2 The second array.
   * @returns {Array} An array of the values that are the same.
   * @memberof XtraUtils.Array.
   * @example
   * let myFirstArray = [1, 2, 3],
   * 	mySecondArray = [2, 3, 4];
   * Array.intersection(myFirstArray, mySecondArray);	// [2, 3]
   */
		function intersection(arr1, arr2) {
			var Unique = unique(arr1),
			    result = [];
			Unique.forEach(function (item, _) {
				if (arr2.includes(item)) {
					result.push(item);
				}
			});
			return result;
		}
		return intersection;
	}());

	XtraUtils.Array.addMethod('union', function () {
		/**
   * Returns all values in all arrays, minus duplicates.
   * @param {Array} arr1 The first array.
   * @param {Array} arr2 The second array.
   * @returns {Array} The union of the two arrays.
   * @memberof XtraUtils.Array.
   * @example
   * Array.union([1, 2, 3], [2, 3, 4]);	// [1, 2, 3, 4]
   */
		function union(arr1, arr2) {
			return unique(arr1.concat(arr2));
		}
		return union;
	}());

	XtraUtils.Array.addUtil('one', function () {
		/**
   * Returns true if only one item in the array passes the test.
   * @param {ArrayCallBack} fn The function.
   * @param {boolean} [originalFlag=false] Whether to give the function the original array.
   * @param {...*} [args] Additional arguments to give the function.
   * @returns {boolean} Whether only one item in the array passes the test.
   * @memberof XtraUtils.Array#
   * @example
   * [1, 2, 3].one((item)=>{return item === 1});		// true
   */
		function one(fn) {
			for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
				args[_key4 - 2] = arguments[_key4];
			}

			var originalFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var self = originalFlag ? this : _shallowClone(this);
			return self.map(function (item, index) {
				return fn.apply(undefined, [item, index, self].concat(args));
			}).filter(Boolean).length === 1;
		}
		return one;
	}());

	XtraUtils.Array.addMethod('xor', function () {
		/**
   * Returns all values that are in one array but not the other.
   * @param {Array} arr1 The first array.
   * @param {Array} arr2 The second array.
   * @returns {Array} The logical XOR of the two arrays.
   * @memberof XtraUtils.Array.
   * @example
   * Array.xor([1, 2, 3] [2, 3, 4]);		// [1, 4]
   */
		function xor(arr1, arr2) {
			var result = [];
			arr1 = unique(arr1), arr2 = unique(arr2);
			arr1.forEach(function (item, _) {
				!arr2.includes(item) && result.push(item);
			});
			arr2.forEach(function (item, _) {
				!arr1.includes(item) && result.push(item);
			});
			return result;
		}
		return xor;
	}());

	XtraUtils.Array.addUtil('last', function () {
		/**
   * Gets the last `n` elements in the array.
   * @param {number} [n=1] The number of elements to get off of the end of the array.
   * @returns {Array} The last `n` elements in the array.
   * @memberof XtraUtils.Array#
   * @example
   * [1, 2, 3].last(2);	// [2, 3]
   */
		function last() {
			var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			return this.slice(this.length - n, this.length);
		}
		return last;
	}());

	XtraUtils.Array.addUtil('first', function () {
		/**
   * Gets the first `n` elements in the array.
   * @param {number} [n=1] The number of elements to get off of the beginnng of the array.
   * @returns {Array} The first `n` elements in the array.
   * @memberof XtraUtils.Array#
   * @example
   * [1, 2, 3].first(2);		// [1, 2]
   */
		function first() {
			var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			return this.slice(0, n);
		}
		return first;
	}());

	XtraUtils.Array.addUtil('initial', function () {
		/**
   * Gets all the elements of an array *except* the last `n` elements.
   * @param {number} [n=1] The number of elements to exclude.
   * @returns {Array} The elements in the array except the last `n` elements.
   * @memberof XtraUtils.Array#
   * @example
   * [1, 2, 3].initial(2);	// [1]
   */
		function initial() {
			var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			return this.slice(0, this.length - n);
		}
		return initial;
	}());

	XtraUtils.Array.addUtil('drop', function () {
		/**
   * Gets all elements of the array except the first `n` elements.
   * @param {number} [n=1] The number of elements.
   * @returns {Array} The remaining elements.
   * @memberof XtraUtils.Utility
   * @example
   * [1, 2, 3].drop(2);	// [3]
   */
		function drop() {
			var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			return this.slice(n, this.length);
		}
		return drop;
	}());

	XtraUtils.Array.addUtil('shuffle', function () {
		/**
   * Shuffles the elements in the array. By default does not modify the original array.
   * @param {boolean} [originalFlag=false] Whether to modify the original array.
   * @returns {Array} The shuffled array.
   * @memberof XtraUtils.Array#
   */
		function shuffle() {
			var originalFlag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var self = originalFlag ? this : _shallowClone(this),
			    i = self.length;
			while (i) {
				var j = floor(random() * i),
				    t = self[--i];
				self[i] = self[j];
				self[j] = t;
			}
			return self;
		}
		return shuffle;
	}());

	XtraUtils.Array.addUtil('max', function () {
		var _max = function _max(a) {
			return Math.max.apply(Math, _toConsumableArray(a));
		};
		/**
   * Finds the maximum of the array.
   * @returns {number} The largest number in the array.
   * @memberof XtraUtils.Array#
   * @example
   * [1, 2, 3].max();	// 3
   * [-1, -4, -2].max();	// -1
   */
		function max() {
			return _max(this);
		}
		return max;
	}());

	XtraUtils.Array.addUtil('min', function () {
		var _min = function _min(a) {
			return Math.min.apply(Math, _toConsumableArray(a));
		};
		/**
   * Finds the smallest number in the array.
   * @returns {number} The smallest number in the array.
   * @memberof XtraUtils.Array#
   */
		function min() {
			return _min(this);
		}
		return min;
	}());

	XtraUtils.Array.addUtil('deepFlatten', function () {
		/**
   * Flattens the object recursively, so that it has a depth of 0.
   * @param {boolean} [originalFlag=false] Whether to modify the original array.
   * @returns {Array} The smallest number in the array.
   * @memberof XtraUtils.Array#
   */
		function deepFlatten() {
			var originalFlag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var self = originalFlag ? this : _shallowClone(this);
			return assign(self, flatten(Number.POSITIVE_INFINITY, self));
		}
		return deepFlatten;
	}());

	XtraUtils.Array.addUtil('chunks', function () {
		/**
   * Gets the chunks of an array, where chunks are sections of the array with a constant width.
   * @param {number} chunkWidth The width of the chunks.
   * @returns {Array.<Array>} The chunks of the array.
   * @memberof XtraUtils.Array#
   */
		function chunks(chunkWidth) {
			var result = Array(ceil(this.length / chunkWidth)).fill(undefined).map(function (_) {
				return [];
			});
			this.forEach(function (item, index) {
				result[floor(index / chunkWidth)][index % chunkWidth] = item;
			});
			return result;
		}
		return chunks;
	}());

	XtraUtils.Array.addUtil('deepFlatMap', function () {
		/**
   * Maps the array, then flattens it to a depth of 0.
   * @param {ArrayCallback} [fn=(..._)=>{return _[0]}] The mapping function.
   * @param {boolean} [originalFlag=false] Whether to give the function the original array.
   * @returns {Array} The flattend and mapped array.
   * @memberof XtraUtils.Array#
   */
		function deepFlatMap() {
			var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
				return arguments.length <= 0 ? undefined : arguments[0];
			};
			var originalFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var self = originalFlag ? this : _shallowClone(this);
			return flatten(Number.POSITIVE_INFINITY, self.map(fn));
		}
		return deepFlatMap;
	}());

	XtraUtils.Array.addUtil('shallowClone', function () {
		/**
   * Shallow clones the object, returning an array with the same length, and the same properties, but not equal.
   * @returns {Array} The cloned array.
   * @memberof XtraUtils.Array#
   */
		function shallowClone() {
			return setPrototypeOf(assign([], this), this.__proto);
		}
		return shallowClone;
	}());

	XtraUtils.Array.addUtil('sample', function () {
		var _random = function _random(arr) {
			return arr[floor(random() * arr.length)];
		};
		/**
   * Gets `n` random items from the array.
   * @param {number} n How many items.
   * @returns {Array.<*>} The items.
   * @memberof XtraUtils.Array#
   */
		function sample(n) {
			var results = [],
			    i = n,
			    copy = _shallowClone(this);
			while (i--) {
				var item = _random(copy);
				copy.splice(copy.indexOf(item), 1);
				results.push(item);
			}
			return results;
		}
		return sample;
	}());

	XtraUtils.Array.addUtil('concatMap', function () {
		/**
   * Maps the array and concatenates the results.
   * @param {ArrayCallback} fn The mapper.
   * @returns {Array} The mapped and concatenated result.
   * @memberof XtraUtils.Array#
   */
		function concatMap(fn) {
			var _ref;

			return (_ref = []).concat.apply(_ref, _toConsumableArray(this.map(function (item, index) {
				var res = fn(item, index);
				return isArray(res) ? res : [res];
			})));
		}
		return concatMap;
	}());

	XtraUtils.Array.addMethod('permutations', function () {
		var permute = function permute(arr) {
			var legacy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			var res = [];
			if (arr.length === 0) {
				res.push(legacy);
			} else {
				arr.forEach(function (item, index) {
					var current = arr.slice(),
					    next = current.splice(index, 1);
					res.push.apply(res, _toConsumableArray(permute(current.slice(), legacy.concat(next))));
				});
			}
			return res;
		};
		/**
   * Finds all permutations, or possible combinations, of the array.
   * @param {Array} arr The array to find permutations of.
   * @returns {Array.<Array>} An array of permutations.
   * @memberof XtraUtils.Array.
   */
		function permutations(arr) {
			return permute(arr);
		}
		return permutations;
	}());

	XtraUtils.Array.addUtil('mean', function () {
		var _mean = function _mean(array) {
			var result = 0,
			    total = 0;
			array.forEach(function (item) {
				if (typeof item !== 'number' && typeof item !== 'string') {
					throw TypeError('Item must be all numbers');
				}
				total += Number(item);
			});
			result = total / array.length;
			return result;
		};
		/**
   * Gets the mean or average of the array.
   * @returns {number} The average.
   * @throws {TypeError} All items of the array must be numbers, or valid number strings.
   * @memberof XtraUtils.Array#
   */
		function mean() {
			return _mean(this);
		}
		return mean;
	}());

	XtraUtils.Array.addUtil('compact', function () {
		var isNumber = function isNumber(item) {
			return typeof item === 'number';
		},
		    _compactor = function _compactor(item) {
			return isNumber(item) ? true : Boolean(item);
		};
		/**
   * Filters out values. Similar to `Array.prototype.filter`.
   * @param {ArrayCallback} [compactor=(_)=>{return (typeof _ === 'number') ? true : Boolean(_)}] The function to compact it with.
   * @param {boolean} [originalFlag=false] Whether to compact the original array.
   * @returns {Array} The compacted array.
   * @memberof XtraUtils.Array#
   */
		function compact() {
			var compactor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _compactor;
			var originalFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var self = originalFlag ? this : _shallowClone(this);
			return assign(self, self.filter(compactor));
		}
		return compact;
	}());

	XtraUtils.Array.addUtil('random', function () {
		/**
   * Gets a random item from the array.
   * @returns {*} The item.
   * @memberof XtraUtils.Array#
   */
		function random() {
			return this[floor(Math.random() * this.length)];
		}
		return random;
	}());

	XtraUtils.Array.addUtil('flatten', function () {
		var _flatten = function _flatten(array, depth) {
			if (depth === 0) {
				return array;
			}
			var result = [];
			array.forEach(function (item, _) {
				if (item instanceof Array) {
					result = result.concat(_shallowClone(_flatten(item, depth - 1)));
				} else {
					result.push(_shallowClone(item));
				}
			});
			return result;
		};
		/**
   * Flattens the array by the specified amount.
   * @param {number} [depth=1] The amount to flatten it by.
   * @param {boolean} [originalFlag=false] Whether to modify the original array.
   * @returns {Array} The flattened array.
   * @memberof XtraUtils.Array#
   */
		function flatten() {
			var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
			var originalFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var self = originalFlag ? this : _shallowClone(this);
			return assign(self, _flatten(self, depth));
		}
		return flatten;
	}());

	XtraUtils.Array.addUtil('repeat', function () {
		/**
   * Makes the array repeat `times` times.
   * @param {number} times How many times to repeat the array. Can be a decimal, if so, rounds to the nearest whole number length.
   * @returns {Array} The repeated array.
   * @memberof XtraUtils.Array#
   */
		function repeat(times) {
			var _this = this;

			var originalLength = this.length,
			    length = round(this.length * times),
			    self = this;
			return new Array(length).fill(undefined).map(function (_, i) {
				return _this[i % originalLength];
			});
		}
		return repeat;
	}());

	XtraUtils.Array.addUtil('padLeft', function () {
		/**
   * Pad an array to the left. Does not modify the original array.
   * @param {number} length The length to pad to.
   * @param {*} [object=0] The element to pad with.
   * @returns {Array} The resulting padded array.
   * @memberof XtraUtils.Array#
   */
		function padLeft(length) {
			var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			if (this.length >= length) {
				return this;
			}
			return [].repeat.call([object], length - this.length).concat(this);
		}
		return padLeft;
	}());

	XtraUtils.Array.addUtil('padRight', function () {
		/**
   * Pads the array, adding to the right.
   * @param {number} length The length to pad to.
   * @param {*} [object=0] The element to pad with.
   * @returns {Array} The padded array.
   * @memberof XtraUtils.Array#
   */
		function padRight(length) {
			var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			if (this.length >= length) {
				return this;
			}
			return this.concat([object].repeat(length - this.length));
		}
		return padRight;
	}());

	XtraUtils.Array.addUtil('fillWith', function () {
		return function fillWith(object) {
			var _this2 = this;

			var originalFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var self = originalFlag ? this : _shallowClone(this);
			self.forEach(function (item, index) {
				_this2[index] = typeof object === 'function' ? object(item, index, self) : deepClone(object);
			});
			return this;
		};
	}());

	XtraUtils.Array.addUtil('where', function where() {
		var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
			return arguments.length <= 0 ? undefined : arguments[0];
		};
		var originalFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var self = originalFlag ? this : _shallowClone(this),
		    result = [];
		self.forEach(function (item, index) {
			if (predicate(item, index, self)) {
				result.push(item);
			}
		});
		return result;
	});

	XtraUtils.Array.addUtil('count', function count() {
		var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
			return arguments.length <= 0 ? undefined : arguments[0];
		};
		var originalFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var self = originalFlag ? this : _shallowClone(this),
		    Count = 0;
		this.forEach(function (item, index) {
			if (typeof predicate === 'function' ? predicate(item, index, self) : item === predicate) {
				Count++;
			}
		});
		return Count;
	});
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}
/**
 * The diff object returned by `Array.diff`.
 * @alias Diff
 * @typedef {Object} Diff
 * @property {*} before The value before changes applied.
 * @property {*} after The value after changes were applied.
 * @property {number} index The index in the array.
 * @memberof XtraUtils.Array
 */

/**
 * @alias ArrayCallback
 * @callback ArrayCallback
 * @param {*} item The item.
 * @param {number} index The index of the item in the array.
 * @param {Array} array The array being mapped.
 * @returns {*} The result.
 * @memberof XtraUtils.Array
 */