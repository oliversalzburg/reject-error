"use strict";

const chai           = require( "chai" );
const chaiAsPromised = require( "chai-as-promised" );
const crypto         = require( "crypto" );
const expect         = chai.expect;

chai.use( chaiAsPromised );

describe( "reject-error", () => {
	const rejectError = require( "." );

	describe( "rejections", () => {
		it( "subject throws", () => {
			function subject() {
				throw new Error();
			}

			return expect( rejectError( subject ) ).to.eventually.be.rejected;
		} );
		it( "subject rejects", () => {
			function subject() {
				return Promise.reject( new Error() );
			}

			return expect( rejectError( subject ) ).to.eventually.be.rejected;
		} );
		it( "subject rejects with Bluebird", () => {
			function subject() {
				const Bluebird = require( "bluebird" );
				return Bluebird.reject( new Error() );
			}

			return expect( rejectError( subject ) ).to.eventually.be.rejected;
		} );
	} );

	describe( "resolutions", () => {
		it( "subject returns", () => {
			function subject() {
				return "foo";
			}

			return expect( rejectError( subject ) ).to.eventually.equal( "foo" );
		} );
		it( "subject resolves", () => {
			function subject() {
				return Promise.resolve( "foo" );
			}

			return expect( rejectError( subject ) ).to.eventually.equal( "foo" );
		} );
	} );

	describe( "bindings", () => {
		it( "uses correct this", () => {
			function subject() {
				return this.foo;
			}

			return expect( rejectError( subject ) ).to.eventually.be.rejected;
		} );

		it( "uses correct this", () => {
			const binding = {
				foo : "bar"
			};

			function subject() {
				return this.foo;
			}

			return expect( rejectError( subject, binding ) ).to.eventually.equal( "bar" );
		} );
	} );

	describe( "arguments", () => {
		it( "passes all arguments", () => {
			function subject( a, b, c ) {
				return a + b + c;
			}

			return expect( rejectError( subject, this, 1, 2, 4 ) ).to.eventually.equal( 7 );
		} );
	} )
} );

describe( "reject-error proxy", () => {
	const rejectError = require( "." );

	describe( "rejections", () => {
		it( "subject throws", () => {

			function subject() {
				throw new Error();
			}

			return expect( rejectError.proxy( subject )() ).to.eventually.be.rejected;
		} );
		it( "subject rejects", () => {

			function subject() {
				return Promise.reject( new Error() );
			}

			return expect( rejectError.proxy( subject )() ).to.eventually.be.rejected;
		} );
		it( "subject rejects with Bluebird", () => {

			function subject() {
				const Bluebird = require( "bluebird" );
				return Bluebird.reject( new Error() );
			}

			return expect( rejectError.proxy( subject )() ).to.eventually.be.rejected;
		} );
	} );

	describe( "resolutions", () => {
		it( "subject returns", () => {

			function subject() {
				return "foo";
			}

			return expect( rejectError.proxy( subject )() ).to.eventually.equal( "foo" );
		} );
		it( "subject resolves", () => {

			function subject() {
				return Promise.resolve( "foo" );
			}

			return expect( rejectError.proxy( subject )() ).to.eventually.equal( "foo" );
		} );
	} );

	describe( "bindings", () => {
		it( "uses correct this", () => {
			function subject() {
				return this.foo;
			}

			return expect( rejectError.proxy( subject )() ).to.eventually.be.rejected;
		} );

		it( "uses correct this", () => {
			const binding = {
				foo : "bar"
			};

			function subject() {
				return this.foo;
			}

			return expect( rejectError.proxy( subject, binding )() ).to.eventually.equal( "bar" );
		} );
	} );

	describe( "arguments", () => {
		it( "passes all arguments", () => {
			function subject( a, b, c ) {
				return a + b + c;
			}

			return expect( rejectError.proxy( subject, this )( 1, 2, 4 ) ).to.eventually.equal( 7 );
		} );
	} );
} );

describe( "Promise", () => {
	const Bluebird    = require( "bluebird" );
	const rejectError = require( "." );

	beforeEach( () => {
		rejectError.Promise = Bluebird;
	} );
	afterEach( () => {
		rejectError.Promise = Promise;
	} );

	it( "should use the provided promise library", () => {
		function subject() {
			return "foo";
		}

		return expect( rejectError( subject ) ).to.be.an.instanceof( Bluebird );
	} );
	it( "should use the provided promise library for rejections", () => {
		function subject() {
			throw new Error( "boom" );
		}

		// .catch all to avoid unhandled rejection warning.
		return expect( rejectError( subject ).catch( Function.prototype ) ).to.be.an.instanceof( Bluebird );
	} );
} );
