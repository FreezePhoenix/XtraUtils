const [Stack, TypedStack, SizeLimitedStack] = ( function(){
	/**
	 * A class that represents a stack. When an item is added, it goes to the top. When an item is removed, it is removed from the top.
	 * @class
	 */
	class Stack {
		/**
		 * @constructs Stack
		 */
		constructor() {
			this.__elems__ = [];
		}
		/**
		 * The number of items in the stack.
		 */
		get items() {
    	return this.__elems__.length;
		}
		/**
		 * Add an item to the stack.
		 * @param {...*} items The items to add.
		 * @returns {undefined}
		 */
		add( ...items ) {
			this.__elems__.push( ...items );
		}
		/**
		 * Remove an item from the stack.
		 * @returns {*} The item.
		 */
		remove() {
			return this.__elems__.pop();
		}
		*[Symbol.iterator]() {
			while( this.items ) {
    	  yield this.remove();
    	}
		}
	}
	/**
    * A stack class that only allows only specific types.
    * @class
    * @extends Stack
    */
	class TypedStack extends Stack {
		/**
   	 * @constructs TypedStack
   	 * @param {...Class} types The types to allow.
   	 * @throws {TypeError} You provided an invalid type!
   	 */
		constructor( ...types ) {
			if( types.all( ( type )=>typeof type === 'function' && type.prototype ) ) {
		      super();
  				this.__types__ = types;
    		} else {
    	  		throw TypeError( 'TypedStack expects an array of types.' );
    		}
		}
		/**
    	 * Add an item to the stack. Throws a `TypeError` if it is not an instance of any of the types.
       * @param {...*} items The items to add.
       * @throws {TypeError} Invalid item provided.
       * @returns {undefined}
       */
		add( ...items ) {
			items.forEach( ( item, _ ) => {
				if( this.__types__.some( type=>item instanceof type ) ) {
					super.add( item );
				} else {
					throw TypeError( `Invalid item: ${item}` );
				}
			} );
		}
	}
	/**
	 * A stack class with limited size.
	 * @class
	 * @extends Stack
	 */
	class SizeLimitedStack extends Stack {
		/**
		 * @constructs SizeLimitedStack
		 * @param {number} size The max on the number of items.
		 */
		constructor( size ) {
		  super();
		  this.__elems__ = Array( size ).fill();
		}
		/**
		 * Add an item to the stack. Note: Items that are pushed off the front are lost.
		 * @param {...*} items The items to add.
		 * @returns {undefined}
		 */
		add( ...items ) {
			items.forEach( ( item, _ ) => {
			  super.add( item );
			  this.__elems__.shift();
			} );
		}
	}
	/**
	 * A stack thats with limited size and specific types.
	 * @class
	 * @extends Stack
	 */
	class TypedSizeLimitedStack extends Stack {
		constructor( size, ...types ) {
		  if( types.all( ( type )=>typeof type === 'function' && type.prototype ) ) {
		      super();
  				this.__types__ = types;
  				this.__elems__ = Array( size ).fill();
    		} else {
    	  		throw TypeError( 'TypedStack expects an array of types.' );
    		}
		}
	}
	return [Stack, TypedStack, SizeLimitedStack];
} )();
/**
 * A constructor or class.
 * @alias Type
 * @typedef {function} Type
 * @memberof TypedStack
 */
