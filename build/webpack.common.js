const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		index: ['./src/pages/index/index.js']
	},
	resolve: {
		modules: [ "node_modules", path.resolve(__dirname, '..', 'src') ],
		extensions: [".js", ".json", ".jsx", ".css"],
		alias: {
			'@': path.resolve(__dirname, '..', 'src')
		}
	},
	externals: { //防止将某些外部引用的包打包到 bundle 中
		// jquery: 'jQuery'
	},
	module: {
		noParse: /jquery|lodash/,
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				include: path.resolve(__dirname, '..', 'src'),
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.html$/,
				use: [
					{
                        loader: "html-loader",
                        options: {
                            attrs: [':data-src'],
                            interpolate: true,
                            minimize: false,
                            removeComments: false,
                            collapseWhitespace: false,
                        }
                    }
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
			template: './src/pages/index/index.html',
			filename: 'index.html',
			// chunks: ['main']
		}),
	]	
};




