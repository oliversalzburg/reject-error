# reject-error
[![Build Status](https://travis-ci.org/oliversalzburg/reject-error.svg?branch=master)](https://travis-ci.org/oliversalzburg/reject-error)

Strong guarantee to return a promise

## Usage
### Call a function and return a promise, no matter what.

```js
const promisify = require( "reject-error" );

function throws() {
	throw new Error( "boom" );
}

promisify( throws ); // returns a rejected promise
```

### Get a function that, when called, returns a promise, no matter what.

```js
const promisify = require( "reject-error" );

function throws() {
	throw new Error( "boom" );
}

const safe = promisify.proxy( throws );
safe(); // returns a rejected promise
```

### Use a different promise library
```js
const Promise   = require( "bluebird" );
const promisify = require( "reject-error" );

promisify.Promise = Promise;

function throws() {
	throw new Error( "boom" );
}

promisify( throws )
	.bind( this )
	.catch( { message : "boom" }, console.log ); // Bluebird-specific methods work
```
