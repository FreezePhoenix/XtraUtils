const Pool = ( function(){
	const { setPrototypeOf, defineProperty, getOwnPropertyNames, freeze } = Object,
	 { toString, hasOwnProperty } = {},
	 empty = ( obj, template ) => {
			let templateNames = getOwnPropertyNames( template ),
		 ownNames = getOwnPropertyNames( obj );
			for ( let name of [...templateNames, ...ownNames] ) {
				if( hasOwnProperty.call( template, name ) ) {
					if( typeof template[name] === 'object' ) {
						obj[name] = empty( obj[name], template[name] );
					} else {
						obj[name] = template[name];
					}
				} else {
					delete obj[name];
				}
			}
			return obj;
		},
	 deepFreeze = ( object ) => {
			let propNames = getOwnPropertyNames( object );
			for ( const name of propNames ) {
				let value = object[name];
				object[name] = value && typeof value === 'object' ? deepFreeze( value ) : value;
			}
			return Object.freeze( object );
		},
	 deepClone = ( object ) => {
			let result = {},
				propNames = getOwnPropertyNames( obj );
			for ( let name of propNames ) {
		    let value = object[name];
		    result[name] = value && typeof value === 'object' ? deepClone( value ) : value;
			}
			return setPrototypeOf( result, object.__proto__ );
		};
	/**
	 * An object pool class.
	 * @class
	 */
	class Pool {
		/**
		 * The Pool constructor.
		 * @param {Template} obj The template to use.
		 * @param {number} size The number of objects to create.
		 * @constructs Pool
		 */
		constructor( obj, size ) {
			defineProperty( this, '__default__', {
				value: deepFreeze( deepClone( obj ) ),
				configurable: false,
				protected: true
			} );
			defineProperty( this, '__items__', {
			  value: freeze( setPrototypeOf( Array( size ).fill().map( ( item ) => {
					return [1, deepClone( obj )];
				} ), null ) ),
				configurable: false,
				protected: true
			} );
		}
		/**
		 * Get a new object.
		 * @returns {Object} The new allocated object.
		 */
		allocate() {
			for( let i = 0; i < this.__items__.length; i++ ) {
				let pair = this.__items__[i];
				if( pair[0] === 1 ) {
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
		free( obj ) {
			for( let i = 0; i < this.__items__.length; i++ ) {
				let pair = this.__items__[i];
				if( pair[1] === obj ) {
					pair[0] = 1;
					Promise.resolve().then( ()=>{empty( obj, this.__default__ );} );
					return;
				}
			}
			throw Error( 'Object not found in pool.' );
		}
	}
	return Pool;
} )();
/**
 * A template to use for an object pool.
 * @alias Template
 * @typedef {Object} Template
 * @memberof Pool
 */