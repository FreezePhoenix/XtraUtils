'use strict';
if ( ( 0, eval )( 'this' ).XtraUtils && ( 0, eval )( 'this' ).XtraUtils.Utility ) {
	/**
   * @type {Utility}
   * @property {function} aidsIn The Object class
   * @property {Object} aidsIn.prototype the Object prototype
   * @namespace
   * @memberof XtraUtils
   */
	XtraUtils.Object = new XtraUtils.Utility( Object );

	const deepClone = ( a )=>{const types = [Number,String,Boolean];if( !a ){return a;}let b;types.forEach( ( d )=>{a instanceof d && ( b = d( a ) );} );if( 'undefined' === typeof b ){if( '[object Array]' === toString.call( a ) ){b = [],a.forEach( ( a,c,e )=>{b[c] = deepClone( a );} );}else if( 'object' === typeof a ){if( a.nodeType && 'function' == typeof a.cloneNode ){b = a.cloneNode( !0 );}else if( a.prototype ){b = a;}else if( a instanceof Date ){b = new Date( a );}else{b = {};for( var c in a ){a.hasOwnProperty( c ) && ( b[c] = deepClone( a[c] ) );}}}else {b = a;}}setPrototypeOf( b,a.__proto__ );return b;},
		deepEqual = ( c,b ) => {b = b || this;if( b === c ){return!0;}if( b && c && 'object' === typeof b && 'object' === typeof c ){var a = isArray( b ),d = isArray( c );if( a && d ){var e = b.length;if( e !== c.length ){return!1;}for( a = e;0 !== a--; ){if( !deepEqual( b[a],c[a] ) ){return!1;}}return!0;}if( a !== d ){return!1;}a = d instanceof Date;d = c instanceof Date;if( a !== d ){return!1;}if( a && d ){return b.getTime() == c.getTime();}a = isRegExp( b );d = isRegExp( c );if( a !== d ){return!1;}if( a && d ){return b.toString() === c.toString();}d = keys( b );e = d.length;if( e !== keys( c ).length ){return!1;}for( a = e;0 !== a--; ){if( !hasProp.call( c,d[a] ) ){return!1;}}for( a = e;0 !== a--; ){if( e = d[a],!deepEqual( b[e],c[e] ) ){return!1;}}return b.__proto__ !== c.__proto__ ? !1 : !0;}return b !== b && c !== c;},
		forIn = ( obj, fn ) => entries( obj ).forEach( fn ),
		isObject = prop=>prop !== null && typeof prop === 'object',

		{ setPrototypeOf, entries, keys, create, assign } = Object,
		{ reduce } = Array.prototype,
		{ hasOwnProperty, toString } = Object.prototype,
		{ isArray } = Array,

		isDate = obj => obj instanceof Date,
		isRegExp = obj => obj instanceof RegExp;

	XtraUtils.Object.addMethod( 'evolve', ( function(){
		const isFunction = a => typeof a === 'function',
			isNumber = a => typeof a === 'number',
			isObject = a => typeof a === 'object',
			isArray = a => a instanceof Array,
			isBoolean = a => typeof a === 'boolean',
			isString = a => typeof a === 'string';
		/**
		 * Modifies the object based upon `transformation`.
		 * @param {Object} target The target object.
		 * @param {ObjectDiff} transformations The transformations to apply.
		 * @param {boolean} [originalFlag=false] Whether to modify the original object.
		 * @returns {Object} the resulting object.
		 * @memberof XtraUtils.Object.
		 * @example
		 * let obj = {
		 *   x: 1,
		 *   y: 2
		 * };
		 * let transform = {
		 *   x: 1,
		 *   y: String
		 * };
		 * Object.evolve(obj, transform); // { x: 2, y: "3" }
		 */
		function evolve( target, transformations, originalFlag = false ) {
			let self = originalFlag ? target : deepClone( target );
			for( const key in self ) {
			  if( self.hasOwnProperty( key ) ) {
					let value = self[key],
						transform = transformations[key];
					if( transform ) {
						if( isObject( value ) ) {
							if( isFunction( transform ) ) {
								self[key] = evolve( value, transformations[key] );
							} else if( isObject( transform ) ) {
								self[key] = transform;
							}
						} else if( isFunction( transform ) ) {
							self[key] = transform( self[key] );
						} else if( isNumber( value ) ) {
							self[key] += transform;
						} else if( isBoolean( value ) && isBoolean( transform ) ) {
							self[key] = transform;
						}
					}
				}
			}
			return self;
		}
		return evolve;
	} )() );

	XtraUtils.Object.addMethod( 'merge', ( function(){
		/**
		 * Merges 1 or more objects.
		 * @param {Object} target The object to merge onto. Use an empty object to shallow clone and merge.
		 * @param {...Object} sources The objects to merge.
		 * @returns {Object} The merged objects.
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns { a: 1, b: 2 }
		 * Object.merge({a:1},{b:2})
		 */
		function merge( target, ...sources ) {
			return sources.reduce( ( ret, merger ) => {
				return assign( ret, merger );
			}, target );
		}
		return merge;
	} )() );

	XtraUtils.Object.addMethod( 'mergeDeep', ( function(){
		/**
		 * Merges 1 or more objects on the deep scale.
		 * @param {Object} target The object to merge onto. Use an empty object to deep clone and merge.
		 * @param {...Object} sources The objects to merge.
		 * @returns {Object} The resulting merged objects.
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns { a: 1, b: 2 }
		 * Object.merge({a:1},{b:2})
		 */
		function mergeDeep( target, ...sources ) {
			sources.forEach( ( source, _ ) => {
				if ( isObject( target ) && isObject( source ) ) {
					for ( const key in source ) {
					  const value = source[key];
						if ( isObject( value ) ) {
							if ( !target[key] ) {
								assign( target, { [key]: {} } );
							}
							mergeDeep( target[key], value );
						} else {
							target[key] = value;
						}
					}
				}
			} );
			return target;
		}
		return mergeDeep;
	} )() );

	XtraUtils.Object.addMethod( 'size', ( function(){
		/**
		 * Finds the number of own keys the object has.
		 * @param {Object} obj The object to get the size of.
		 * @returns {number} The size of the object.
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns 2
		 * Object.size({a: 1, b: {c: 3}});
		 */
		function size( obj ) {
			let Size = 0;
			for( const key in obj ) {
			  if( hasOwnProperty.call( obj, key ) ) {
			    Size++;
			  }
			}
			return size;
		}
		return size;
	} )() );

	XtraUtils.Object.addMethod( 'sizeDeep', ( function(){
		/**
		 * Finds the number of own keys the object has, and the number of keys it's children has, recursively.
		 * @param {Object} obj The object to get the size of.
		 * @returns {number} The size of the object.
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns 3
		 * Object.size({a: 1, b: {c: 3}});
		 */
		function sizeDeep( obj ) {
			let size = 0;
			for( const key in obj ) {
				const value = obj[key];
				if( hasOwnProperty.call( obj, key ) ) {
					size++;
					if( isObject( value ) ) {
						size += sizeDeep( value );
					}
				}
			}
			return size;
		}
		return sizeDeep;
	} )() );

	XtraUtils.Object.addMethod( 'clone', ( function(){
		const _clone = obj => setPrototypeOf( assign( {}, obj ),obj.__proto__ );
		/**
		 * Shallow clones the object.
		 * @param {*} obj The item to clone.
		 * @returns {*} The resulting item.
		 * @memberof XtraUtils.Object.
		 */
		function clone( obj ) {
			return _clone( obj );
		}
	} )() );

	XtraUtils.Object.addMethod( 'cloneDeep', ( function(){
		const types = [ Number, String, Boolean ];
		/**
		 * Clones the object on the deep level.
		 * @param {*} obj The item to clone.
		 * @returns {Object} The resulting object
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns { a: 1, b: 2, c: { d: 4 } }, but the object is not the same
		 * let obj = {
		 *   a: 1,
		 *   b: 2,
		 *   c: {
		 *		 d: 4
		 *   }
		 * }
		 * let clone = obj.deepClone();
		 * clone === obj;		 // false
		 * clone.c === obj.c; // false
		 * clone.a === obj.a; // true
		 */
		function cloneDeep( obj ) {
			if ( !obj ) { return obj; }

			let result;

			types.forEach( type => {
				if ( obj instanceof type ) { result = type( obj ); }
			} ); // normalizing primitives if someone did new String('aaa'), or new Number('444');

			if ( typeof result === 'undefined' ) {
				if ( toString.call( obj ) === '[object Array]' ) {
					result = [];
					obj.forEach( ( child, index, array ) => {
						result[index] = cloneDeep( child );
					} );
				} else if ( typeof obj === 'object' ) {
					if ( obj.nodeType && typeof obj.cloneNode == 'function' ) {
						result = obj.cloneNode( true );
					} else if ( !obj.prototype ) {
						if ( obj instanceof Date ) {
							result = new Date( obj );
						} else {
							result = {};
							for ( const key in obj ) {
							  const value = obj[key];
								if( hasOwnProperty.call( obj, key ) ) {
									result[key] = cloneDeep( value );
								}
							}
						}
					} else {
						if ( false && obj.constructor ) {
							result = new obj.constructor();
						} else {
							result = obj;
						}
					}
				} else {
					result = obj;
				}
			}
			setPrototypeOf( result, obj.__proto__ );
			return result;
		}
		return cloneDeep;
	} )() );

	XtraUtils.Object.addMethod( 'functions', ( function(){
		/**
		 * Gets the keys to all of the functions on an object
		 * @param {Object} obj The object to get the functions from
		 * @returns {Array.<string>} An array of the paths to the functions.
		 * @memberof XtraUtils.Object.
		 * @example
		 * Object.functions({a: 1, b: function(){return 2}}); // ["b"]
		 */
		function functions( obj ) {
			const res = [];
			for( const key in obj ) {
			  const value = obj[key];
			  if( typeof value === 'function' ) {
			    res.push( `.${key}` );
			  }
			}
			return res;
		}
		return functions;
	} )() );

	XtraUtils.Object.addMethod( 'functionsDeep', ( function(){
		const _functionsDeep = ( obj, namePath = '' )=>{
			const res = [];
			for( const key in obj ) {
			  const value = obj[key];
			  if( typeof value === 'function' ) {
			    res.push( `${namePath}.${key}` );
			  } else if ( typeof value === 'object' ) {
			    res.push( ..._functionsDeep( value, `${namePath}.${key}` ) );
			  }
			}
			return ret;
		};
		/**
		 * Gets the keys to all of the functions on an object at the deep level.
		 * @param {Object} obj The object to get the functions from.
		 * @returns {Array.<string>} An array of paths to functions.
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns ['b']
		 * Object.functions({a: 1, b: function(){return 2}});
		 */
		function functionsDeep( obj ) {
			return _functionsDeep( obj );
		}
		return functionsDeep;
	} )() );

	XtraUtils.Object.addMethod( 'fromPairs', ( function(){
		/**
		 * Creates an object from an array of key-value pairs.
		 * @param {Array.<Array>} pairs The key-value pairs to create the object from.
		 * @returns {Object} The resulting new object.
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns { a: 1, b: 2 }
		 * Object.fromPairs([[a,1],[b,2])
		 */
		function fromPairs( pairs ) {
			const length = pairs == null ? 0 : pairs.length;
			let i = length,
				result = {};
			while( i-- ) {
				let pair = pairs[i];
				result[pair[0]] = pair[1];
			}
			return result;
		}
		return fromPairs;
	} )() );

	XtraUtils.Object.addUtil( 'pick', ( function(){
		/**
		 * Selects properties from an object.
		 * @param {...string} pickedKeys The keys to pick
		 * @returns {Object} The resulting object
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns { a: 1, __omitted__: Object }
		 * let obj = {
		 *   a: 1,
		 *   b: 2
		 * };
		 * obj.pick("a");
		 */
		function pick( ...pickedKeys ) {
			this.__omitted__ = assign( {}, this.__omitted__ );
			for( const key in this ) {
			  const value = this[key];
			  if( !pickedKeys.includes( key ) && key !== '__omitted__' ) {
			    this.__omitted__[key] = value;
			    delete this[key];
			  }
			}
			return this;
		}
		return pick;
	} )() );

	XtraUtils.Object.addUtil( 'omit', ( function(){
		/**
		 * Removes properties from the visible object.
		 * @param {...string} omittedKeys The keys to omit
		 * @returns {Object} The resulting object
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns { b: 2, __omitted__: Object }
		 * let obj = {
		 *   a: 1,
		 *   b: 2
		 * };
		 * obj.omit("a");
		 */
		function ommit( ...omittedKeys ) {
			this.__omitted__ = assign( {}, this.__omitted__ );
			omittedKeys.forEach( ( key ) => {
				this.__omitted__[key] = this[key];
				delete this[key];
			} );
			if( deepEqual( this.__omitted__, {} ) ) {
				delete this.__omitted__;
			}
		}
		return ommit;
	} )() );

	XtraUtils.Object.addUtil( 'show', ( function(){
		/**
		 * Shows all hidden properties, or only properties selected.
		 * @param {...string} shownKeys The keys to omit, or, if empty, shows all keys.
		 * @returns {Object} The resulting object
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns { a:1, b: 2 }
		 * let obj = {
		 *   a: 1
		 *   __omitted__: {
		 *		b: 2
		 *  }
		 * };
		 * obj.show();
		 * @desc Which is the same as:
		 * let obj = {
		 *   a: 1
		 *   __omitted__: {
		 *		b: 2
		 *  }
		 * };
		 * obj.show("b");
		 */
		function show( ...shownKeys ) {
			if( shownKeys.length === 0 ){ shownKeys = keys( this.__omitted__ );}
			shownKeys.forEach( ( key ) => {
				this[key] = this.__omitted__[key];
				delete this.__omitted__[key];
			} );
			if( deepEqual( this.__omitted__, {} ) ) {
				delete this.__omitted__;
			}
		}
		return show;
	} )() );

	XtraUtils.Object.addMethod( 'deepGet', ( function(){
		const regularizePath = ( path ) => {
			if( path instanceof Array ) {
				return path;
			} else if( typeof path === 'string' ) {
				let res = path.replace( /(?:\[(\"|\')([^[\]]+)\1\])/, '.$2' );
				while( res != path ){
					path = res;
					res = res.replace( /(?:\[(\"|\')([^[\]]+)\1\])/, '.$2' );
				}
				res = res.split( /\./g );
				if( res[0] === '' ) { res.shift();}
				return res;
			}
		};
		/**
		 * Gets a property far down the property chain.
		 * @param {Object} obj The object to get the deep property from.
		 * @param {Array.<string>|string} path The path to the property.
		 * @returns {*} The property
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns 2
		 * let obj = {
		 *   a: 1,
		 *   others: {
		 *		 b: 2
		 *   }
		 * };
		 * obj.deepGet(['others','b']);
		 * @example
		 * // returns 2
		 * let obj = {
		 *   a: 1,
		 *   others: {
		 *		 b: 2
		 *   }
		 * };
		 * obj.deepGet('.others.b');
		 */
		function deepGet( obj, path ) {
			path = regularizePath( path );
			let length = path.length;
			for ( var i = 0; i < length; i++ ) {
				if ( obj == null ) {return void 0;}
				obj = obj[path[i]];
			}
			return length ? obj : void 0;
		}
		return deepGet;
	} )() );

	XtraUtils.Object.addUtil( 'isEmpty', ( function(){
		/**
		 * Tells if an object is empty.
		 * @returns {boolean} Whether the object is empty or not
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns false
		 * let obj = {
		 *   a: 1
		 * };
		 * obj.isEmpty();
		 * @example
		 * // returns true
		 * let obj = {};
		 * obj.isEmpty();
		 */
		function isEmpty(){
			return keys( this ).length === 0;
		}
		return isEmpty;
	} )() );

	XtraUtils.Object.addUtil( 'conforms', ( function(){
		/**
		 * Tells if an object matches the criteria of a function provided. In this method we leave most to the user in the function passed.
		 * @param {Function} fn The function to test on the object
		 * @param {boolean} [originalFlag=false] Whether to give the function the original object
		 * @returns {boolean} Whether the object matches criteria
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns false
		 * let obj = {
		 *   a: 1
		 * };
		 * obj.conforms(function(obj){return obj.a == 2});
		 * @example
		 * // returns true
		 * let obj = {
		 *   b: 2
		 * };
		 * obj.conforms(function(obj) { return obj.b == 2});
		 */
		function conforms( fn, originalFlag = false ) {
			return Boolean( fn( originalFlat ? this : deepClone( this ) ) );
		}
		return conforms;
	} )() );

	XtraUtils.Object.addUtil( 'invert', ( function(){
		const fromPairs = ( a )=>{for( var b = null == a ? 0 : a.length,c = {};b--; ){var d = a[b];c[d[0]] = d[1];}return c;};
		/**
		 * Inverts the object's keys and values.
		 * @param {boolean} [originalFlag=false] Whether to invert the original object or return a new object
		 * @returns {Object} The resulting object
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns { 1: 'a', 2: 'b' }
		 * let obj = {
		 *   a: 1,
		 *   b: 2
		 * };
		 * obj.invert();
		 */
		function invert( originalFlag = false ){
			return assign( originalFlag ? this : {}, fromPairs( entries( this ).map( item => item.reverse() ) ) );
		}
		return invert;
	} )() );

	XtraUtils.Object.addUtil( 'getKeysFor', ( function() {
		const _invert = obj => entries( obj ).map( item => item.reverse() ),
			_isPrimitive = obj => typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean';
		/**
		 * Gets the possible keys for a value.
		 * @param {*} property The value.
		 * @returns {string[]} An array of possible keys.
		 * @memberof XtraUtils.Object#
		 * @example
		 * // returns [ "a" ]
		 * let obj = {
		 *   a: 1,
		 *   b: 2
		 * }
		 * obj.getKeysFor(1);
		 */
		function getKeysFor( property ) {
		  const res = [];
			for( const key in this ) {
			  const value = this[key];
			  if( _isPrimitive( value ) && _isPrimitive( property ) ) {
			    if( value === property ) {
			      res.push( key );
			    }
			  } else {
			    if( deepEqual( value, property ) ) {
			      res.push( key );
			    }
			  }
			}
			return res;
		}
		return getKeysFor;
	} )() );

	XtraUtils.Object.addMethod( 'truthMap', ( function(){
		const assignTrue = ( a,b )=>{a[b[0]] = b[1];return a;};
		/**
		 * Assigns true to a value based on it's truthiness.
		 * @param {Object} obj The object to test the truthiness of.
		 * @param {Callback} [callBack=(..._)=>{return false}] The function to test the truthiness of a property.
		 * @param {boolean} [originalFlag=false] Whether to modify the original object or return a new object.
		 * @param {...*} [args] The arguments to hand to the function.
		 * @returns {Object} The object, with properties reduced to truthiness.
		 * @memberof XtraUtils.Object.
		 * @example
		 * // returns { a: true, b: true, c: false }
		 * let obj = {
		 *   a: 1,
		 *   b: 2,
		 *   c: 0
		 * };
		 * Object.truthMap(obj, function(key, value) {
		 *   return Boolean(value);
		 * });
		 */
		function truthMap( obj, callBack = ( ..._ )=>{return false;}, originalFlag = false, ...args ) {
			let self = originalFlag ? obj : deepClone( obj );
			return assign( self, enries( self ).map( ( [key, value], index ) => {
				return [key, callBack( key, value, self, ...args )];
			} ).reduce( assignTrue, {} ) );
		}
		return truthMap;
	} )() );

	XtraUtils.Object.addUtil( 'objReduce', ( function(){
		return function objReduce( callBack = ( ..._ )=>{return false;}, originalFlag = false, ...args ) {
			let self = originalFlag ? this : deepClone( this );
			entries( self ).reduce( ( ret, [key, value], _ ) => {
				return callBack( key, value, self, ...args );
			}, create( null ) );
		};
	} )() );

	XtraUtils.Object.addUtil( 'some', ( function(){
		/**
		 * Tests to see if some properties pass a test.
		 * @param {Callback} [callBack=(..._)=>{return false}] The function to test the object with.
		 * @param {boolean} [originalFlag=false] Whether to hand the function the original object or a duplicate.
		 * @param {...*} [args] The arguments to hand to the function.
		 * @returns {boolean} Whether some of the properties pass the function.
		 * @memberof XtraUtils.Object#
		 */
		function some( callBack = ( ..._ )=>{return false;}, originalFlag = false, ...args ) {
			let self = originalFlag ? this : deepClone( this ),
				ownKeys = keys( this ),
				i = ownKeys.length + 1;
		  for( const key in self ) {
		    const value = self[key];
		    if( callBack( key, value, self, ...args ) ) {
		      return true;
		    }
		  }
			return false;
		}
		return some;
	} )() );

	XtraUtils.Object.addUtil( 'iterate', ( function(){
		/**
		 * Iterates over each property in an object.
		 * @param {CallBack} [callBack=(..._)=>{return false}] The function to call for each property. Although this is optional, this is solely for the purpose of consistency. The default callBack will not function.
		 * @param {boolean} [originalFlag=false] Whether to give it the original object;
		 * @param {...*} [args] The arguments to hand the function.
		 * @returns {undefined}
		 * @memberof XtraUtils.Object#
		 */
		function iterate( callBack = ( ..._ )=>{return false;}, originalFlag = false, ...args ) {
			let self = originalFlag ? this : deepClone( this );
			for( const key in self ) {
			  const value = self[key];
			  callBack( key, value, self, ...args );
			}
		}
		return iterate;
	} )() );

	XtraUtils.Object.addMethod( 'deepEqual', ( function(){
		const isDate = obj => obj instanceof Date,
			isRegExp = obj => obj instanceof RegExp;
		/**
		 * Tests if the properties of an object are equal, recursively.
		 * @param {*} obj1 The first object to compare
		 * @param {*} obj2 The second object to compate
		 * @returns {boolean} Whether the objects are equal
		 * @memberof XtraUtils.Object#
		 */
		function deepEqual( obj1, obj2 ) {
			const a = obj1;
			b = obj2;
			if ( a === b ) {
				return true;
			} else if ( a && b && typeof a === 'object' && typeof b === 'object' ) {
				const arrA = isArray( a ),
					arrB = isArray( b );
				let i, length, key;

				if ( arrA && arrB ) {
					length = a.length;
					if ( length !== b.length ) { return false; }
					for ( i = length; i-- !== 0; ) {
						if ( !deepEqual( a[i], b[i] ) ) {
							return false;
						}
					}
					return true;
				}

				if ( arrA !== arrB ) {
					return false;
				}

				const dateA = isDate( a ),
					dateB = isDate( b );

				if( dateA !== dateB ) {
					return false;
				}
				if ( dateA && dateB ) {
					return a.getTime() == b.getTime();
				}

				const regexpA = isRegExp( a ),
					regexpB = isRegExp( b );

				if ( regexpA !== regexpB ) {
					return false;
				}
				if ( regexpA && regexpB ) {
					return a.toString() === b.toString();
				}

				let keys1 = keys( a );
				length = keys1.length;

				if ( length !== keys( b ).length ) {
					return false;
				}
				for ( i = length; i-- !== 0; ) {
					if ( !hasOwnProperty.call( b, keys1[i] ) ) {
						return false;
					}
				}
				for ( i = length; i-- !== 0; ) {
					key = keys1[i];
					if ( !deepEqual( a[key], b[key] ) ) {
						return false;
					}
				}
				if( a.__proto__ !== b.__proto__ ) {
					return false;
				}

				return true;
			}

			return a !== a && b !== b;
		}
		return deepEqual;
	} )() );

} else {
	console.warn( 'XtraUtils is not defined. For more details, please visit ' +
						   'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' +
						   'https://github.com/FreezePhoenix/XtraUtils/issues/new' );
}
/**
 * @alias ObjectDiff
 * @typedef {Object.<string,(EvolveCallBack|ObjectDiff)>} ObjectDiff
 * @memberof XtraUtils.Object
 */
/**
 * The callback class for `Object.evolve`.
 * @alias EvolveCallBack
 * @callback EvolveCallBack
 * @param {*} [value] The old value.
 * @returns {*} The new value.
 * @memberof XtraUtils.Object
 */
/**
 * The base callback class. All callbacks have a default for consistency. In the case of `Object.prototype.reduce`, the function is handed the merger as the fourth argument, and remainder of arguments are post-pended to the end if that.
 * @alias CallBack
 * @callback CallBack
 * @param {string} [key] An object key.
 * @param {*} [value] The value of the item.
 * @param {Object} [obj] The object being called from
 * @param {...*} [args] Static arguments determined at call
 * @returns {*}
 * @default (..._)=>{return false}
 * @memberof XtraUtils.Object
 */