// #!/user/bin/node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Adds some utilities to the base classes.
 * Note that this is modular and is able to modify any class it is given.
 * @projectname XtraUtils
 * @author FreezePhoenix
 * @version 1.1.0
 */
/**
 * @namespace
 */
var XtraUtils = {
	/**
  * Activates all the utilities on the object.
  * @returns {boolean} Whether is succeded or not.
  * @method
  */
	activateAll: function activateAll() {
		try {
			Object.values(this).filter(function (i) {
				return i instanceof XtraUtils.Utility;
			}).forEach(function (item, index) {
				item.activate();
			});
			return true;
		} catch (e) {
			return false;
		}
	}
};
/**
 * The base class for XtraUtils
 * @class
 * @classdesc Enables utilities to be added to classes.
 * @property {Function} aidsIn The constructor or class that this Utility expands on
 * @property {Object} utils The functions to be added to the instances of this Utility.
 * @property {Object} methods The functions to be added to the class constructor itself.
 */
XtraUtils.Utility = function () {
	/**
  * Create a new utility
  * @constructs
  * @param {Function} ofWhat What class are we extending?
  * @throws {TypeError} The first argument of Utility must be a class.
  */
	function _class(ofWhat) {
		_classCallCheck(this, _class);

		if (typeof ofWhat === 'function' && ofWhat.prototype) {
			Object.assign(this, {
				methods: new Map(),
				utils: new Map(),
				Activated: [],
				OverWritten: {},
				isActivated: false
			});
			Object.defineProperty(this, 'aidsIn', {
				value: ofWhat,
				writable: false
			});
		} else {
			throw Error('new Utility expects a class to be passed as the first argument.');
		}
	}
	/**
  * Activates the utilities in this Utility instance.
  * @returns {boolean} Whether it succeded or not.
  */


	_createClass(_class, [{
		key: 'activate',
		value: function activate() {
			try {
				if (!this.isActivated) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = this.utils[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _slicedToArray(_step.value, 2),
							    name = _step$value[0],
							    func = _step$value[1];

							this.aidsIn.prototype[name] && (this.OverWritten[[name, 'util']] = this.aidsIn.prototype[name].valueOf());
							this.aidsIn.prototype[name] = func;
							this.Activated.push([name, 'util']);
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

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = this.methods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var _step2$value = _slicedToArray(_step2.value, 2),
							    name = _step2$value[0],
							    func = _step2$value[1];

							if (this.aidsIn[name]) {
								this.OverWritten[[name, 'method']] = this.aidsIn[name].valueOf();
							}
							this.aidsIn[name] = func;
							this.Activated.push([name, 'method']);
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

					this.isActivated = true;
				}
				return true;
			} catch (e) {
				return false;
			}
		}
		/**
   * Deactivates utilities and methods, putting overwritten methods back.
   * @returns {boolean} Whether it succeded or not.
   */

	}, {
		key: 'deactivate',
		value: function deactivate() {
			var _this = this;

			try {
				this.Activated.forEach(function (item, _) {
					if (item[1] === 'util') {
						if (_this.OverWritten[[item[0], 'util']]) {
							_this.aidsIn.prototype[item[0]] = _this.OverWritten[item];
						} else {
							delete _this.aidsIn.prototype[item[0]];
						}
					} else if (item[1] === 'method') {
						if (_this.OverWritten[[item[0], 'method']]) {
							_this.aidsIn[item[0]] = _this.OverWritten[[item[0], 'method']];
						} else {
							delete _this.aidsIn[item[0]];
						}
					}
				});
				this.Activated = [];
				this.isActivated = false;
				return true;
			} catch (e) {
				return false;
			}
		}
		/**
   * Add a method, which will be placed as a static method on the class.
   * @param {string} name The name to register it under.
   * @param {Function} method The method to register.
   * @returns {boolean} Success or not.
   */

	}, {
		key: 'addMethod',
		value: function addMethod(name, method) {
			try {
				this[name] = method;
				this.methods.set('' + name, method);
				if (this.isActivated) {
					if (this.aidsIn[name]) {
						this.overWritten[name] = this.aidsIn[name].valueOf();
					}
					this.aidsIn[name] = method;
					this.activated.push([name, 'method']);
				}
				return true;
			} catch (e) {
				return false;
			}
		}
		/**
    * Add a utility, which will be placed on class instances.
    * @param {string} name The name to register it by.
    * @param {Function} util The utility to register.
    * @returns {boolean} Success state.
    */

	}, {
		key: 'addUtil',
		value: function addUtil(name, util) {
			try {
				this[name] = util;
				this.utils.set('' + name, util);
				if (this.isActivated) {
					if (this.aidsIn.prototype[name]) {
						this.overWritten[name] = this.aidsIn.prototype[name].valueOf();
					}
					this.aidsIn.prototype[name] = util;
					this.Activated.push([name, 'util']);
				}
				return true;
			} catch (e) {
				return false;
			}
		}
	}]);

	return _class;
}();