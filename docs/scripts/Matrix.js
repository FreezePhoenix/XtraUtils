// #!/user/bin/node
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Matrix = function () {
	var padRight = function padRight(num, len) {
		var str = num.toString();
		if (str.length >= (num >= 0 ? len - 1 : length)) {
			return str;
		}
		return str + repeat(' ', len - str.length - Number(num >= 0));
	},
	    ceil = Math.ceil,
	    round = Math.round,
	    defineProperty = Object.defineProperty,
	    somethinghacky = ''.repeat.repeat = function (string, times) {
		return somethinghacky.call(string, ceil(times)).slice(0, round(times * string.length));
	};
	/**
  * A matrix class, allows you to visualize multiple dimensions.
  * @class
  * @extends Array
  */

	var Matrix = function (_Array) {
		_inherits(Matrix, _Array);

		/**
   * Constructs a new array.
   * @param {number} height The number of rows in the matrix.
   * @param {number} width The number of collumns in the matrix.
   * @constructs Matrix
   */
		function Matrix(height, width) {
			_classCallCheck(this, Matrix);

			var _this = _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).call(this, height));

			defineProperty(_this, '__width__', {
				value: width,
				protected: true
			});
			defineProperty(_this, '__height__', {
				value: height,
				protected: true
			});
			for (var i = 0; i < _this.length; i++) {
				var item = Array(width).fill(0);
				_this[i] = item;
			}
			return _this;
		}
		/**
   * Invert the matrix.
   * @param {Matrix} a The matrix to invert.
   * @returns {Matrix} The inverted matrix.
   * @throws {Error} You either fed it a non-square matrix, or something else went wrong.
   */


		_createClass(Matrix, [{
			key: 'getRow',
			value: function getRow(rowNum) {
				return this[rowNum - 1];
			}
		}, {
			key: 'print',
			value: function print() {
				var str = '[',
				    maxLen = this.reduce(function (ret, item) {
					var len = item.reduce(function (a, b) {
						return b.toString().length > a ? b.toString().length : a;
					}, 0);return len > ret ? len : ret;
				}, 0);
				this.forEach(function (item, _) {
					var res = (_ ? ', ' : '') + '\n	 [';
					item.forEach(function (num, index) {
						res += (index ? ', ' : ' ') + (num >= 0 ? ' ' : '') + padRight(num, maxLen) + ' ';
					});
					res += ']';
					str += res;
				});
				return str + '\n]';
			}
		}, {
			key: 'getCollumn',
			value: function getCollumn(collumnNum) {
				return this.map(function (item) {
					return item[collumnNum - 1];
				});
			}
		}], [{
			key: 'invert',
			value: function invert(a) {
				if (a.__width__ !== a.__height__) {
					throw Error('Must be a square matrix.');
				}
				var res = new Matrix(a.__height__, a.__width__),
				    copy = new Matrix(a.__height__, a.__width__),
				    e = 0,
				    t = 0;
				for (var i = 0, _height = a.__height__; i < _height; i++) {
					for (var j = 0, width = a.__width__; j < width; j++) {
						//if we're on the diagonal, put a 1 (for identity)
						if (i == j) {
							res[i][j] = 1;
						}
						copy[i][j] = a[i][j];
					}
				}
				for (var _i = 0, _height2 = a.__height__; _i < _height2; _i++) {
					e = copy[_i][_i];

					if (e === 0) {
						for (var ii = _i + 1; ii < _height2; ii++) {
							if (copy[ii][_i] != 0) {
								for (var _j = 0, _width = a.__width__; _j < _width; _j++) {
									e = copy[_i][_j]; //temp store i'th row
									copy[_i][_j] = copy[ii][_j]; //replace i'th row by ii'th
									copy[ii][_j] = e; //repace ii'th by temp
									e = res[_i][_j]; //temp store i'th row
									res[_i][_j] = res[ii][_j]; //replace i'th row by ii'th
									res[ii][_j] = e; //repace ii'th by temp
								}
								break;
							}
						}
						e = copy[_i][_i];
						if (e == 0) {
							throw Error('something went wrong');
						}
					}
					for (var _j2 = 0, _width2 = a.__width__; _j2 < _width2; _j2++) {
						copy[_i][_j2] = copy[_i][_j2] / e; //apply to original matrix
						res[_i][_j2] = res[_i][_j2] / e; //apply to identity
					}
					for (var _ii = 0, _height3 = a.__height__; _ii < _height3; _ii++) {
						if (_ii === _i) {
							continue;
						}
						e = copy[_ii][_i];

						for (var _j3 = 0, _width3 = a.__width__; _j3 < _width3; _j3++) {
							copy[_ii][_j3] -= e * copy[_i][_j3]; //apply to original matrix
							res[_ii][_j3] -= e * res[_i][_j3]; //apply to identity
						}
					}
				}
				return res;
			}
		}, {
			key: 'product',
			value: function product(a, b) {
				if (a.__width__ !== b.__height__) {
					throw Error('The number of collumns in `a` must be the same as the number of rows in `b`');
				}
				var res = new Matrix(a.__height__, b.__width__);
				for (var i = 0, _height4 = a.__height__; i < _height4; i++) {
					for (var j = 0, width = b.__width__; j < width; j++) {
						res[i][j] = a[i].reduce(function (a, b) {
							return a + b;
						}, 0) * b.getCollumn(j + 1).reduce(function (a, b) {
							return a + b;
						}, 0);
					}
				}
				return res;
			}
		}, {
			key: 'entrywiseSum',
			value: function entrywiseSum(a, b) {
				if (a.__height__ !== b.__height || a.__width__ !== b.__width__) {
					throw Error('The two matrices must have the same dimensions.');
				}
				var res = new Matrix(a.__height__, a.__width__);
				for (var i = 0, hieght = a.__height__; i < height; i++) {
					for (var j = 0, width = a.__width__; j < width; j++) {
						res[i][j] = a[i][j] + b[i][j];
					}
				}
			}
		}, {
			key: 'directSum',
			value: function directSum(a, b) {
				var res = new Matrix(a.__height__ + b.__height__, a.__width__ + b.__width__);
				for (var i = 0, _height5 = a.__height__; i < _height5; i++) {
					for (var j = 0, width = a.__width__; j < width; j++) {
						res[i][j] = a[i][j];
					}
				}
				for (var _i2 = 0, _height6 = b.__height__; _i2 < _height6; _i2++) {
					for (var _j4 = 0, _width4 = b.__width__; _j4 < _width4; _j4++) {
						res[_i2 + a.__height__][_j4 + a.__width__] = b[_i2][_j4];
					}
				}
				return res;
			}
		}]);

		return Matrix;
	}(Array);

	return Matrix;
}();
if ((0, eval)('this').XtraUtils && (0, eval)('this').XtraUtils.Utility) {
	XtraUtils.Matrix = new XtraUtils.Utility(Matrix);
} else {
	console.warn('XtraUtils is not defined. For more details, please visit ' + 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' + 'https://github.com/FreezePhoenix/XtraUtils/issues/new');
}