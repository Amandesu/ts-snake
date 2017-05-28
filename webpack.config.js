var path = require('path');
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	// 入口文件
	entry : ["./src/entry.ts"],
	devServer: {
		historyApiFallback: true,
		hot: false,
		inline: true,
		grogress: true
	},
	// 输出配置
	output: {
		path: "dist",
		filename: "bundle.js"
	},
	resolve: {
		extensions:['', '.js', '.vue']
	},
	module: {
		loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ["es2015", "react", "stage-1"]
                }
            }, 
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: /node_modules/
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }

        ]
	},
	devtool: 'source-map',
	babel: {
     	 presets: ['es2015'],
    	 plugins: ['transform-runtime']
  	},
  	plugins:[
  		new HtmlWebpackPlugin({
  			filename:"index.html",
  			template: "./src/index.html"
  		})

  	]
}
