const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');
module.exports = function(env, argv) {
	console.log('------------------------')
	console.log(process.env.NODE_ENV)// undefined
	return {
		// devtool: 'eval-source-map',// 发环境的最佳品质的 source map
		//uglifyjs-webpack-plugin 时，你必须提供 sourceMap：true 选项来启用 source map 支持。
	  devtool: 'source-map',
	  // 生产环境中，source map 作为一个单独的文件生成。
	  // 它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。
	  // 应该将服务器配置为，不允许普通用户访问 source map 文件
	  entry: {
	  	main: ['./src/pages/index/index.js'],
	  	// vendors: './src/vendors.js'
	  },
	  output: {
	    path: path.resolve(__dirname, 'dist'),
	    filename: 'js/[name].bundle.js',
	    chunkFilename: 'js/[name].bundle.js',//ExtractTextWebpackPlugin[contenthash]
	    sourceMapFilename: '[file].map',
	    publicPath: '/'
	  },
	  resolve: {
	  	modules: [ "node_modules", path.resolve(__dirname, "src") ],
	  	extensions: [".js", ".json", ".jsx", ".css"],
	  	alias: {
		  '@': path.resolve(__dirname, 'src')
		}
	  },
	  externals: {//防止将某些 import 的包(package)打包到 bundle 中
		  jquery: 'jQuery'
		},
	  module: {
	  	noParse: /jquery|lodash/,
	    rules: [
	      {
	        test: /\.css$/,
	        use: ['style-loader','css-loader']
	      },
	      {
	      	test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
			use: [
				{
		            loader: 'url-loader',
		            options: {
                    	publicPath: '../',
		            	name: 'img/[name].[ext]',
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
                name: 'font/[name].[ext]',
                publicPath: '../',
                limit: 1024 * 10,
            }
        }]
	  },
	  plugins: [
	   // new webpack.optimize.UglifyJsPlugin(),
	   	new CleanWebpackPlugin(['dist']),//打包时使用
	   	
	    new HtmlWebpackPlugin({
	    	template: './src/pages/index/index.html',
	    	filename: 'index.html',
      		chunks: ['main']
	    }),
	    new webpack.NamedModulesPlugin(),
	    new webpack.HotModuleReplacementPlugin()
	  ],
	  devServer: {
		contentBase: false,
		// contentBase:[path.join(__dirname, "dist")],//告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
		//watchContentBase: true,
		compress: true,
		port: 9000,
		clientLogLevel: "info",
		historyApiFallback: true,
		host: "0.0.0.0",
		open: true,
		useLocalIp: true,
		hot: true,
		hotOnly: true,
		index: 'index.htm',
		publicPath: '/'
	  },
	  // performance: {
	  // 	hints: "warning",//将展示一条警告，通知你这是体积大的资源。在开发环境，我们推荐这样。
	  // 	//hints: "error",//将展示一条错误，通知你这是体积大的资源。在生产环境构建时，
	  // 	//我们推荐使用 hints: "error"，
	  // 	//有助于防止把体积巨大的 bundle 部署到生产环境，从而影响网页的性能。
	  // 	maxEntrypointSize: 250000,//根据入口起点的最大体积，控制 webpack 何时生成性能提示
	  // 	maxAssetSize: 100000,//根据单个资源体积，控制 webpack 何时生成性能提示。
	  // 	assetFilter: function (assetFilename) {//控制用于计算性能提示的文件
	  // 		return !(/\.map$/.test(assetFilename))
	  // 	}
	  // }
	}
};;




