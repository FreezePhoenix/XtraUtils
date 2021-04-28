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
const XtraUtils = {
	/**
	 * Activates all the utilities on the object.
	 * @returns {boolean} Whether is succeded or not.
	 * @method
	 */
	activateAll() {
		try {
			Object.values( this ).filter( i => i instanceof XtraUtils.Utility ).forEach( ( item, index ) => {
				item.activate();
			} );
			return true;
		} catch( e ) {
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
XtraUtils.Utility = class {
	/**
	 * Create a new utility
	 * @constructs
	 * @param {Function} ofWhat What class are we extending?
	 * @throws {TypeError} The first argument of Utility must be a class.
	 */
	constructor( ofWhat ) {
		if ( typeof ofWhat === 'function' && ofWhat.prototype ) {
			Object.assign( this, {
				methods: new Map(),
				utils: new Map(),
				Activated: [],
				OverWritten: {},
				isActivated: false
			} );
			Object.defineProperty( this, 'aidsIn', {
				value: ofWhat,
				writable: false
			} );
		} else {
			throw Error( 'new Utility expects a class to be passed as the first argument.' );
		}
	}
	/**
	 * Activates the utilities in this Utility instance.
	 * @returns {boolean} Whether it succeded or not.
	 */
	activate() {
		try {
			if( !this.isActivated ) {
				for ( let [name, func] of this.utils ) {
					this.aidsIn.prototype[name] && ( this.OverWritten[[name, 'util']] = this.aidsIn.prototype[name].valueOf() );
					this.aidsIn.prototype[name] = func;
					this.Activated.push( [name, 'util'] );
				}
				for ( let [name, func] of this.methods ) {
					if ( this.aidsIn[name] ) {
						this.OverWritten[[name, 'method']] = this.aidsIn[name].valueOf();
					}
					this.aidsIn[name] = func;
					this.Activated.push( [name, 'method'] );
				}
				this.isActivated = true;
			}
			return true;
		} catch( e ) {
			return false;
		}
	}
	/**
	 * Deactivates utilities and methods, putting overwritten methods back.
	 * @returns {boolean} Whether it succeded or not.
	 */
	deactivate() {
		try{
			this.Activated.forEach( ( item, _ ) => {
				if( item[1] === 'util' ) {
					if ( this.OverWritten[[item[0],'util']] ) {
						this.aidsIn.prototype[item[0]] = this.OverWritten[item];
					} else {
						delete this.aidsIn.prototype[item[0]];
					}
				} else if( item[1] === 'method' ) {
					if ( this.OverWritten[[item[0],'method']] ) {
						this.aidsIn[item[0]] = this.OverWritten[[item[0],'method']];
					} else {
						delete this.aidsIn[item[0]];
					}
				}
			} );
			this.Activated = [];
			this.isActivated = false;
			return true;
		} catch( e ) {
			return false;
		}
	}
	/**
	 * Add a method, which will be placed as a static method on the class.
	 * @param {string} name The name to register it under.
	 * @param {Function} method The method to register.
	 * @returns {boolean} Success or not.
	 */
	addMethod( name, method ) {
		try {
			this[name] = method;
			this.methods.set( `${name}`, method );
			if( this.isActivated ) {
				if( this.aidsIn[name] ) {
					this.overWritten[name] = this.aidsIn[name].valueOf();
				}
				this.aidsIn[name] = method;
				this.activated.push( [name, 'method'] );
			}
			return true;
		} catch( e ) {
			return false;
		}
	}
	/**
   * Add a utility, which will be placed on class instances.
   * @param {string} name The name to register it by.
   * @param {Function} util The utility to register.
   * @returns {boolean} Success state.
   */
	addUtil( name, util ) {
		try {
			this[name] = util;
			this.utils.set( `${name}`, util );
			if( this.isActivated ) {
				if( this.aidsIn.prototype[name] ) {
					this.overWritten[name] = this.aidsIn.prototype[name].valueOf();
				}
				this.aidsIn.prototype[name] = util;
				this.Activated.push( [name, 'util'] );
			}
			return true;
		} catch( e ) {
			return false;
		}
	}
};