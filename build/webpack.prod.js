const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'js/[name].[chunkhash:8].js',
		chunkFilename: 'js/[name].[chunkhash:8].js',
		publicPath: './'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							publicPath: '../',
							name: 'img/[name].[hash:8].[ext]',
							limit: 1024 * 5,
							fallback:'file-loader'
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
				options: {
					name: 'font/[name].[hash:8].[ext]',
					publicPath: '../',
					limit: 1024 * 10,
				}
			}	
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '..')
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css',
            allChunks: false
        }),
		new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
	],
	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				cache: true,
				parallel: true,
				uglifyOptions: {
					compress: false,
					ecma: 6,
					mangle: true
				},
				sourceMap: true
			})
		],
		splitChunks: {
			chunks: 'all',
			minChunks: 1,
			cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
		},
		runtimeChunk: {
	        name: 'manifest'
	    },
	},
	performance: {
		hints: "warning",
		maxAssetSize: 100000,
		assetFilter: function (assetFilename) {
			return !(/\.map$/.test(assetFilename))
		}
	}
});