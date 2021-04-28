const Matrix = ( function(){
	const padRight = ( num, len ) => {
			let str = num.toString();
			if( str.length >= ( num >= 0 ? len - 1 : length ) ){
				return str;
			}
			return str + repeat( ' ', len - str.length - Number( num >= 0 ) );
		},
		{ ceil, round } = Math,
		{ defineProperty } = Object,
		somethinghacky = ''.repeat.
			repeat = ( string, times ) => somethinghacky.call( string, ceil( times ) ).slice( 0, round( times * string.length ) );
	/**
	 * A matrix class, allows you to visualize multiple dimensions.
	 * @class
	 * @extends Array
	 */
	class Matrix extends Array {
		/**
		 * Constructs a new array.
		 * @param {number} height The number of rows in the matrix.
		 * @param {number} width The number of collumns in the matrix.
		 * @constructs Matrix
		 */
		constructor( height, width ) {
			super( height );
			defineProperty( this, '__width__', {
				value: width,
				protected: true
			} );
			defineProperty( this, '__height__', {
				value: height,
				protected: true
			} );
			for( let i = 0; i < this.length; i++ ) {
				let item = Array( width ).fill( 0 );
				this[i] = item;
			}
		}
		/**
		 * Invert the matrix.
		 * @param {Matrix} a The matrix to invert.
		 * @returns {Matrix} The inverted matrix.
		 * @throws {Error} You either fed it a non-square matrix, or something else went wrong.
		 */
		static invert( a ) {
			if( a.__width__ !== a.__height__ ){
				throw Error( 'Must be a square matrix.' );
			}
			let res = new Matrix( a.__height__, a.__width__ ),
			 copy = new Matrix( a.__height__, a.__width__ ),
			 e = 0, t = 0;
			for( let i = 0, height = a.__height__; i < height; i++ ){
				for( let j = 0, width = a.__width__; j < width; j++ ){
					//if we're on the diagonal, put a 1 (for identity)
					if( i == j ){
						res[i][j] = 1;
					}
					copy[i][j] = a[i][j];
				}
			}
			for( let i = 0, height = a.__height__; i < height; i++ ){
				e = copy[i][i];

				if( e === 0 ){
					for( let ii = i + 1; ii < height; ii++ ){
						if( copy[ii][i] != 0 ){
							for( let j = 0, width = a.__width__; j < width; j++ ){
								e = copy[i][j];				//temp store i'th row
								copy[i][j] = copy[ii][j]; //replace i'th row by ii'th
								copy[ii][j] = e;				//repace ii'th by temp
								e = res[i][j];					//temp store i'th row
								res[i][j] = res[ii][j];		//replace i'th row by ii'th
								res[ii][j] = e;				//repace ii'th by temp
							}
							break;
						}
					}
					e = copy[i][i];
					if( e == 0 ){
						throw Error( 'something went wrong' );
					}
				}
				for( let j = 0, width = a.__width__; j < width; j++ ){
					copy[i][j] = copy[i][j] / e; //apply to original matrix
					res[i][j] = res[i][j] / e;		//apply to identity
				}
				for( let ii = 0, height = a.__height__; ii < height; ii++ ){
					if( ii === i ){
						continue;
					}
					e = copy[ii][i];

					for( let j = 0, width = a.__width__; j < width; j++ ){
						copy[ii][j] -= e * copy[i][j]; //apply to original matrix
						res[ii][j] -= e * res[i][j];	 //apply to identity
					}
				}
			}
			return res;
		}
		static product( a, b ) {
			if( a.__width__ !== b.__height__ ) {
				throw Error( 'The number of collumns in `a` must be the same as the number of rows in `b`' );
			}
			let res = new Matrix( a.__height__, b.__width__ );
			for( let i = 0, height = a.__height__; i < height; i++ ) {
				for( let j = 0, width = b.__width__; j < width; j++ ) {
					res[i][j] = a[i].reduce( ( a,b )=>{return a + b;},0 ) * b.getCollumn( j + 1 ).reduce( ( a,b )=>{return a + b;}, 0 );
				}
			}
			return res;
		}
		static entrywiseSum( a, b ) {
			if( a.__height__ !== b.__height || a.__width__ !== b.__width__ ) {
				throw Error( 'The two matrices must have the same dimensions.' );
			}
			let res = new Matrix( a.__height__, a.__width__ );
			for( let i = 0, hieght = a.__height__; i < height; i++ ) {
				for( let j = 0, width = a.__width__; j < width; j++ ) {
					res[i][j] = a[i][j] + b[i][j];
				}
			}
		}
		static directSum( a, b ) {
			let res = new Matrix( a.__height__ + b.__height__, a.__width__ + b.__width__ );
			for( let i = 0, height = a.__height__; i < height; i++ ) {
				for( let j = 0, width = a.__width__; j < width; j++ ) {
					res[i][j] = a[i][j];
				}
			}
			for( let i = 0, height = b.__height__; i < height; i++ ) {
				for( let j = 0, width = b.__width__; j < width; j++ ) {
					res[i + a.__height__][j + a.__width__] = b[i][j];
				}
			}
			return res;
		}
		getRow( rowNum ) {
			return this[rowNum - 1];
		}
		print() {
			let str = '[',
			 maxLen = this.reduce( ( ret, item )=>{let len = item.reduce( ( a,b )=>{return b.toString().length > a ? b.toString().length : a;}, 0 ); return len > ret ? len : ret; }, 0 );
			this.forEach( ( item, _ ) => {
				let res = ( _ ? ', ' : '' ) + '\n	 [';
				item.forEach( ( num, index )=>{
					res += ( index ? ', ' : ' ' ) + ( num >= 0 ? ' ' : '' ) + padRight( num, maxLen ) + ' ';
				} );
				res += ']';
				str += res;
			} );
			return str + '\n]';
		}
		getCollumn( collumnNum ) {
			return this.map( ( item )=>item[collumnNum - 1] );
		}

	}
	return Matrix;
} )();
if ( ( 0, eval )( 'this' ).XtraUtils && ( 0, eval )( 'this' ).XtraUtils.Utility ) {
	XtraUtils.Matrix = new XtraUtils.Utility( Matrix );
} else {
	console.warn( 'XtraUtils is not defined. For more details, please visit ' +
					  'https://github.com/FreezePhoenix/XtraUtils/. If your issue still occurs, submit an issue here:' +
					  'https://github.com/FreezePhoenix/XtraUtils/issues/new' );
}