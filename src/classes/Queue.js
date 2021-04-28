const [Queue, TypedQueue] = ( function(){
	/**
   * A class that represents a queue. When an item is added, it is added to the top. When an item is removed, it is removed from the bottom.
   * @class
   */
	class Queue {
	  /**
	   * @constructs Queue
	   */
		constructor() {
			this.__elems__ = [];
		}
		/**
		 * The number of items in the queue.
		 */
		get items() {
			return this.__elems__.length;
		}
		/**
		 * Add an item to the queue
		 * @param {...*} items The items to add.
		 * @returns {undefined}
		 */
		add( ...items ) {
			this.__elems__.push( ...items );
		}
		/**
		 * Get the bottom item from the queue.
		 * @returns {*} The item.
		 */
		remove() {
			return this.__elems__.shift();
		}
		*[Symbol.iterator]() {
			while( this.items ) {
    	  yield this.remove();
    	}
		}
	}
	class TypedQueue extends Queue {
		constructor( ...types ) {
    	if( types.all( type=>typeof type === 'function' && type.prototype ) ) {
    	  super();
    	  this.__types__ = types;
    	} else {
    	  throw TypeError( 'TypedStack expects an array of types.' );
    	}
		}
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
	return [Queue, TypedQueue];
} )();