const [Tree, Fragment] = ( function(){
	const LeafCache = Object.create( null ),
	 genLeaf = ( CLASS ) => {
	   return LeafCache[CLASS.name] || (LeafCache[CLASS.name] = eval( `class Leaf extends ${CLASS.name} {
	constructor(val) {
		super(val);
}
}; Leaf.prototype.__isleaf__ = true; Leaf` ));
		},
	 TARGET = Symbol( '__target__' ),
		HANDLER = Symbol( '__handler__' ),
		PROXY = Symbol( '__proxy__' ),
		ISTREE = Symbol( '__istree__' ),
		{ assign, defineProperty, entries, setPrototypeOf } = Object,
		{ hasOwnProperty } = {},
		convert = ( obj ) => {
		  let res = obj instanceof Branch ? obj : new Branch( obj );
		  for( const key in obj ) {
		    const value = obj[key];
		    if( hasOwnProperty.call( obj, key ) ) {
		      if( '__isfragment__' !== key ) {
		        if( typeof value === 'object' ) {
		        	res[key] = convert( value );
		        	Object.defineProperty( res[key], '__parent__', {
		        	  value: res[PROXY],
		        	  configurable: false,
		        	  protected: false
		        	} );
		        } else {
		          let val;
		          res[key] = new Proxy( val = new ( genLeaf( value.constructor ) )( value ), genHandler( val ) );
		        }
		      }
		    }
		  }
		  return res;
		},
		getKey = ( obj, val ) => {
		  for( const key in obj ) {
		    const value = obj[key];
		    if( value[TARGET] === val ) {
		      return key;
		    }
		  }
		};
	let genHandler = ( _target ) => {
		return ( function(){
			let res;
			const _raw = __raw__.bind( _target ),
				_keys = {
					'__raw__': _raw,
			  		[ISTREE]: true,
			  		[TARGET]: _target,
			  		get [PROXY]() {
						return res.proxy;
					},
			  		get [HANDLER]() {
			  			return res;
					}
				};
			res = {
				set: ( target, prop, value ) => {
					if( prop === '__parent__' ) {
						if( _keys[PROXY] instanceof Fragment ) {
							throw TypeError( 'Cannot set __parent__ on fragments.' );
						} else if( typeof value === 'object' && value[ISTREE] ) {
							const key = getKey( target.__parent__, target );
							if( target.__parent__[key] ) {
								delete target.__parent__[key];
							}
							value[key] = target;
							return value;
						} else {
							throw TypeError( 'Cannot assign __parent__ to a non-tree value' );
						}
					}
					if( typeof value === 'object' && value.constructor.name !== 'Leaf' ) {
						value = convert( value );
						if( value[PROXY] instanceof Tree ) {
							throw TypeError( 'Cannot have a tree as a child of another tree.' );
						}
						value = convert( value );
						defineProperty( value, '__parent__', {
							value: _keys[PROXY],
							configurable: false,
							writable: true
						} );
					} else if ( typeof value !== 'object' ) {
						let val;
						value = new Proxy( val = new ( genLeaf( value.constructor ) )( value ), genHandler( val ) );
					}
					target[prop] = value;
					return value;
				},
				get: ( target, prop ) => {
				   if( prop === 'toJSON' ) {
				     return _raw;
				   }
				   if( [HANDLER, PROXY, '__raw__', ISTREE, TARGET].includes( prop ) ) {
				     return _keys[prop];
				   }
					return target[prop];
				}
			};
			return res;
		} )();
	};
	/**
	 * Get the raw value of the tree, without all that proxy stuff.
	 * @returns {Object} The raw object. Please not that objects will not be the same instances.
	 * @memberof Tree#
	 */
	function __raw__() {
		let res = setPrototypeOf( {}, this.__proto__ );
		for( const key in this ) {
			if( key.slice( 0, 2 ) === key.slice( -2 ) && key.slice( -2 ) === '__' ) {
         	continue;
      	} else {
				const value = this[key];
				if( hasOwnProperty.call( this, key ) ) {
					res[key] = typeof value === 'object' ? __raw__.call( value[TARGET] ) : value;
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
	class Tree {
		/**
		 * Constructs a new Tree instance.
		 * @constructs Tree
		 */
		constructor() {
			return Tree.from( {} );
		}
		/**
		 * Attempt to create a tree from an existing object.
		 * @param {Object} obj The object to convert to a tree.
		 * @throws {TypeError} You probably passed it a primitive.
		 * @returns {Tree} The resulting tree.
		 */
		static from( obj ) {
			const self = {},
				res = new Proxy( setPrototypeOf( self, obj.__proto__ ), genHandler( self ) );
			defineProperty( res[HANDLER], 'proxy', {
				value: res,
				configurable: false,
				protected: true
			} );
			if( typeof obj !== 'object' ) {
				throw TypeError( 'Tree expects an object' );
			} else {
				for( const key in obj ) {
					const value = obj[key];
					let val;
					res[key] = typeof value === 'object' ? convert( value ) : new Proxy( val = new ( genLeaf( value.constructor ) )( value ), genHandler( val ) );
					console.log( res[key][TARGET] );
				}
			}
			defineProperty( res, '__istree__', {
				value: true,
				configurable: false,
				protected: true
			} );
			return res;
		}
		static [Symbol.hasInstance]( obj ) {
		  return obj[ISTREE] && obj.__istree__ || false;
		}
	}
	/**
	 * A class that behaves similar to a tree and similar to a branch. It can be added to a tree like a branch.
	 * @class
	 */
	class Fragment {
		/**
		 * Construct a new fragment.
		 * @constructs Fragment
		 */
		constructor() {
	  		return Fragment.from( {} );
	  	}
	  	/**
	  	 * Attempt to make a fragment from an existing object.
	  	 * @param {Object} obj The object to use.
	  	 * @returns {Fragment} The resulting fragment.
	  	 */
	  	static from( obj ) {
	  		const self = {},
	    		res = new Proxy( setPrototypeOf( self, obj.__proto__ ), genHandler( self ) );
	    	defineProperty( res[HANDLER], 'proxy', {
	     	 value: res,
	     	 configurable: false,
	     	 protected: true
	    	} );
	    	if( typeof obj !== 'object' ) {
				throw TypeError( 'Tree expects an object' );
			} else {
				  for( let key in obj ) {
				    let value = obj[key];
				    res[key] = typeof value === 'object' ? convert( value ) : value;
				  }
			}
			defineProperty( res, '__isfragment__', {
				value: true,
				configurable: false,
				protected: true
			} );
	    	return res;
	  	}
		static [Symbol.hasInstance]( obj ) {
		  return obj[ISTREE] && obj.__isfragment__ || false;
		}
	}
	class Branch {
		constructor( obj ) {
		  let self = {},
				res = new Proxy( setPrototypeOf( self, obj.__proto__ ), genHandler( self ) );
			defineProperty( res[HANDLER], 'proxy', {
				value: res,
				configurable: false,
				protected: true
			} );
			defineProperty( res, '__isbranch__', {
				value: true,
				configurable: false,
				protected: true
			} );
			return res;
		}
		static [Symbol.hasInstance]( obj ) {
		  return obj[ISTREE] && obj.__isbranch__ || false;
		}
	}
	return [Tree, Fragment];
} )();
if ( ( 0, eval )( 'this' ).XtraUtils && ( 0, eval )( 'this' ).XtraUtils.Utility ) {
	XtraUtils.Tree = new XtraUtils.Utility( Tree );
} else {
	console.warn( 'XtraUtils is not defined. For more details, please visit ' +
							 'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' +
							 'https://github.com/FreezePhoenix/XtraUtils/issues/new' );
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
