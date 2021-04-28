'use strict';
const SealedArray = ( function(){
	let { setPrototypeof, assign, seal } = Object;
	/**
   * A class for those pedantic people who can't stand dynamic memory allocation. This class gives you a fixed length array. Every method that would in the case of a normal array push items off the other end.
   * @class
   * @extends Array
	 */
	class SealedArray extends Array {
		/**
		 * Constructs a new SealedArray. Argument format is the same as that of `Array`.
		 * @constructs SealedArray
		 * @param {...*} args The arguments to pass to Array.
		 */
		constructor( ...args ) {
			super( ...args );
			args.length === 1 && this.fill();
			seal( this );
		}
		/**
		 * Pushes item(s) to the end of the array. Items that overflow the beginning are removed from the array.
		 * @param {...*} args The items to push to the end of the array.
		 * @returns {number} The length of the array.
		 */
		push( ...args ) {
			let self = this.toNativeArray();
			args.forEach( item => {
				self.shift();
				self.push( item );
			} );
			this.propogate( self );
			return this.length;
		}
		/**
		 * Pushes items to the beginning of the array. Items that overflow the end are removed.
		 * @param {...*} args The items to prepend at the start of the array.
		 * @returns {number} The length of the array.
		 */
		unshift( ...args ) {
			let self = this.toNativeArray();
			args.forEach( ( item ) => {
				self.pop();
				self.unshift( item );
			} );
			this.propogate( self );
			return this.length;
		}
		/**
		 * Removes the last item at the end of the array, and puts `undefined` onto the beginning.
		 * @returns {*} The item that was at the end of the array.
		 */
		pop() {
			let self = this.toNativeArray();self.unshift( undefined );
			console.log( self );
			let arr = assign( [],self );
			arr.pop();
			console.log( arr );
			this.propogate( arr );
			return self.pop();
		}
		/**
		 * The SealedArray equivalent of `Array.prototype.filter`.
		 * @param {ArrayCallback} fn The callback to iterate on.
		 * @returns {SealedArray} The filtered array
		 */
		filter( fn = ( ..._ )=>{return false;} ) {
			return setPrototypeOf( this.toNativeArray().filter( fn ), this.__proto__ );
		}
		/**
		 * Removes the first item in the array, and pushes `undefined` onto the end.
		 * @returns {*} The item that was at the start of the array.
		 */
		shift() {
			let self = this.toNativeArray(),
				arr = assign( [], self );
			arr.shift();
			this.propogate( arr );
			return self.shift();
		}
		propogate( array ) {
			array.length = this.length;
			this.fill();
			Object.assign( this, array );
			return this;
		}
		/**
		 * Returns a shallow duplicate of the array.
		 * @returns {SealedArray} The shallow clone.
		 */
		clone() {
			return setPrototypeof( this.toNativeArray(), this.__proto__ );
		}
		toNativeArray() {
			return Object.assign( [], this );
		}
		/**
		 * The SealedArray equivalent of `Array.prototype.map`.
		 * @param {ArrayCallback} fn The function to map the array with.
		 * @returns {SealedArray} The mapped array.
		 */
		map( fn ) {
			return new SealedArray( ...[...this].map( fn ) );
		}
		get [Symbol.species]() { return SealedArray; }
	}

	return SealedArray;
} )();
if( ( 0, eval )( 'this' ).XtraUtils && ( 0, eval )( 'this' ).XtraUtils.Utility ) {
	XtraUtils.SealedArray = new XtraUtils.Utility( SealedArray );
} else {
	console.warn( 'XtraUtils is not defined. For more details, please visit ' +
						   'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' +
						   'https://github.com/FreezePhoenix/XtraUtils/issues/new' );
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