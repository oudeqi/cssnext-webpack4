module.exports = function({file, options, env}){
	return {
		plugins: {
			'postcss-import': {},
			'postcss-cssnext': {}
		}
	}
}