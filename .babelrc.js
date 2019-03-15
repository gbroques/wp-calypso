const codeSplit = require( './server/config' ).isEnabled( 'code-splitting' );

const config = {
	extends: require.resolve( '@automattic/calypso-build/babel.config.js' ),
	plugins: _.compact( [
		[
			path.join(
				__dirname,
				'server',
				'bundler',
				'babel',
				'babel-plugin-transform-wpcalypso-async'
			),
			{ async: isCalypsoClient && codeSplit },
		],
		isCalypsoClient && './inline-imports.js',
	] ),
};

module.exports = config;
