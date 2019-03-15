/**
 * External dependencies
 */
const path = require( 'path' );

/**
 * Return a Webpack loader configuration object containing for JavaScript transpilation.
 *
 * @param {Object} _                 Options
 * @param {number} _.workerCount     Number of workers that are being used by the thread-loader
 * @param {string} _.cacheDirectory  Babel cache directory
 * @param {string} _.cacheIdentifier Babel cache identifier
 * @param {RegExp} _.exclude         Directories to exclude when looking for files to transpile
 *
 * @return {Object} Webpack loader object
 */
module.exports.loader = ( { workerCount, cacheDirectory, cacheIdentifier, exclude } ) => ( {
	test: /\.jsx?$/,
	exclude,
	use: [
		{
			loader: require.resolve( 'thread-loader' ),
			options: {
				workers: workerCount,
			},
		},
		{
			loader: require.resolve( 'babel-loader' ),
			options: {
				configFile: path.join( __dirname, '..', 'babel.config.js' ),
				cacheDirectory,
				cacheIdentifier,
			},
		},
	],
} );
