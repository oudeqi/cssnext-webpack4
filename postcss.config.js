module.exports = function({file, options, env}){
	return {
		plugins: {
			'postcss-import': {},
			'postcss-cssnext': {},
			'postcss-px2rem': {
				remUnit: 14 ////px转rem，如果不需要转换，在样式规则后面加：/*no*/
			}
		}
	}
}