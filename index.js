"use strict";

/**
 * Strong guarantee to return a promise.
 * @param {Function} func
 * @param {Object} thisArg
 * @param {*} args
 * @returns {Promise}
 */
function rejectError( func, thisArg, ...args ) {
	return new Promise( ( resolve, reject ) => {
		try {
			return Promise.resolve( func.call( thisArg, ...args ) )
				.then( resolve, reject );

		} catch( error ) {
			return reject( error );
		}
	} );
}

module.exports = rejectError;
