'use strict';
const Vector = ( function(){
	const others = {
			0: [1,2],
			1: [2,0],
			2: [0,1]
		},
	 isNumber = ( a ) => { let t = Number( a ); return t === t; },
		attemptConversion = ( ...args ) => {
			if( args[0] instanceof Vector ) {
				return args[0].coords;
			}
			if( args[0].every( isNumber ) ) {
				return args[0].map( ( item, _ )=> {
					let res = Number( item );
					return typeof res === 'number' && res != res ? 0 : res;
				} );
			}
			if( args[0][0] instanceof Array && args[0][0].every( isNumber ) ) {
				return args[0][0].map( ( item, _ ) => {
					let res = Number( item );
					return typeof res === 'number' && res != res ? 0 : res;
				} );
			}
			return [0];
		};

	/**
   * The classical Vector class, with some extensions.  Vector does it's best to convert this to something useable, but it may not always find success. In this case, it returns `new Vector(0)`.
   * @class
   */
	class Vector {
		/**
		 * Constructs a new Vector instance
		 * @constructs Vector
		 * @param {*} args The coordinates of the vector.
		 */
		constructor( ...args ) {
			let coords;
			coords = attemptConversion( args );
			Object.assign( this, {
				coords
			} );
		}
		/**
		 * Find the [Cross Product](https://en.wikipedia.org/wiki/Cross_product) of two vectors. The resulting vector is at 90 degree angles to the other two.
		 * @param {Vector} vector1 The first vector.
		 * @param {Vector} vector2 The second vector.
		 * @returns {Vector} The resulting cross product.
		 * @memberof Vector
		 */
		static crossProduct( vector1 = new Vector( 0, 0, 0 ), vector2 = new Vector( 0, 0, 0 ) ) {
			let firstCoords = [...vector1.coords],
				otherCoords = [...vector2.coords],
				greatest = Math.max( firstCoords.length, otherCoords.length );
			if( greatest > 3 ) {
			  throw Error( 'All vectors must be 3D or less.' );
			}
			[firstCoords, otherCoords].forEach( ( item ) => {
				while( item.length < greatest ) {
					item.push( 0 );
				}
			} );
			let product = new Vector( ...Array( 3 ).fill( undefined ).map( ( _, index ) => {
			  let _others = others[index];
			  return firstCoords[_others[0]] * otherCoords[_others[1]] - firstCoords[_others[1]] * otherCoords[_others[0]];
			} ) );
			return product;
		}
		/**
		 * Find the [Dot Product](https://en.wikipedia.org/wiki/Dot_product) of two vectors.
		 * @param {Vector} vector1 The first vector.
		 * @param {Vector} vector2 The second vector.
		 * @returns {number} The resulting dot product.
		 * @meberof Vector
		 */
		static dotProduct( vector1 = new Vector( 0 ), vector2 = new Vector( 0 ) ) {
			let firstCoords = [...vector1.coords],
				otherCoords = [...vector2.coords],
				greatest = Math.max( firstCoords.length, otherCoords.length );
			[firstCoords, otherCoords].forEach( ( item ) => {
				while( item.length < greatest ) {
					item.push( 0 );
				}
			} );
			let result = Array( greatest ).fill( undefined ).map( ( _, index ) => {
			  return firstCoords[index] * otherCoords[index];
			} ).reduce( ( a,b )=> a + b );
			return result;
		}
		/**
		 * Finds the [Taxicab Distance]{@link https://en.wikipedia.org/wiki/Taxicab_geometry} between two vectors.
		 * @param {Vector} [vector1=Vector(0)] The first vector in the distance calculation.
		 * @param {Vector} [vector2=Vector(0)] The second vector in the distance calculation.
		 * @returns {number} The taxicab distance between the two vectors
		 * @memberof Vector
		 */
		static taxicabDistance( vector1 = new Vector( 0 ), vector2 = new Vector( 0 ) ) {
			let firstCoords = [...vector1.coords],
				otherCoords = [...vector2.coords],
				greatest = Math.max( firstCoords.length, otherCoords.length );
			[firstCoords, otherCoords].forEach( ( item ) => {
				while( item.length < greatest ) {
					item.push( 0 );
				}
			} );
			let difference = Array( greatest ).fill( undefined ).map( ( i, index ) => {
					return Math.abs( firstCoords[index] - otherCoords[index] );
				} ).reduce( ( a,b ) => a + b ),
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
		static linearDistance( vector1 = new Vector( 0 ),vector2 = new Vector( 0 ) ) {
			let firstCoords = [...vector1.coords],
				otherCoords = [...vector2.coords],
				greatest = Math.max( firstCoords.length, otherCoords.length );

			[firstCoords, otherCoords].forEach( ( item ) => {
				while( item.length < greatest ) {
					item.push( 0 );
				}
			} );

			let difference = Array( greatest ).fill( undefined ).map( ( item, index ) => {
					return Math.abs( firstCoords[index] - otherCoords[index] );
				} ).reduce( ( a,b ) => a + b ),
				distance = Math.sqrt( difference );
			return distance;
		}
		/**
		 * Add a vector to another vector
		 * @param {Vector} vector The vector to add.
		 * @returns {Vector} The resulting vector.
		 * @memberof Vector
		 */
		addVector( vector ) {
			if( !( vector instanceof Vector ) ) {
				throw TypeError( 'Vector.prototype.addVector expects a vector' );
			}
			let ownCoords = Object.assign( [], this.coords ),
				otherCoords = Object.assign( [], vector.coords ),
				newLength = Math.max( ownCoords.length, otherCoords.length );

			[ownCoords, otherCoords].forEach( ( item ) => {
				while( item.length < newLength ) {
					item.push( 0 );
				}
			} );

			this.coords = Array( newLength ).fill( undefined ).map( ( item, index ) => {
				return ownCoords[index] + otherCoords[index];
			} );
			return this;
		}
		static equals( vector1, vector2 ) {
			if( !( vector1 instanceof Vector ) && !( vector2 instanceof Vector ) ) {
				throw TypeError( 'Vector.prototype.addVector expects a vector' );
			}
			let firstCoords = [...vector1.coords],
				otherCoords = [...vector2.coords];
			if( firstCoords.length !== otherCoords.length ) {
				return false;
			}

			// They're both equal  length, so it doesn't matter which one we pick.
			let len = firstCoords.length;
			while( --len ) {
				if( firstCoords[len] !== otherCoords[len] ) {
					return false;
				}
			}
			return true;
		}
	}
	return Vector;
} )();
if ( ( 0,eval )( 'this' ).XtraUtils && ( 0,eval )( 'this' ).XtraUtils.Utility ) {
	let _global = ( 0,eval )( 'this' );
	_global.XtraUtils.Vector = new _global.XtraUtils.Utility( Vector );
} else {
	console.warn( 'XtraUtils is not defined. For more details, please visit ' +
						   'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' +
						   'https://github.com/FreezePhoenix/XtraUtils/issues/new' );
}