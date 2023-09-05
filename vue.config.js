/*
配置参考vue-cli官网
https://cli.vuejs.org/zh/config/#vue-config-js

vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。

*/

//打包分析
//let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//压缩js
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	//当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
	outputDir: 'dist', //默认 dist
	//生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
	filenameHashing: true, //默认 true
	//单页面不配置  多页面才配置
	pages: undefined, //默认 undefined
	/*
  调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象，
  该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。
  该方法的第一个参数会收到已经解析好的配置。
  在函数内，你可以直接修改配置，或者返回一个将会被合并的对象。
  */

	// configureWebpack: {
	//   mode: 'production',//默认 production
	//   //插件
	//   plugins: [
	//     //new BundleAnalyzerPlugin(),
	//     new UglifyJsPlugin(),
	//   ],
	//   externals: {
	//     //'vue': 'Vue',
	//     //'vue-router': 'VueRouter',
	//     //'vuex':'Vuex',
	//     //"element-ui": "ELEMENT"
	//   }
	// },

	configureWebpack: config => {
		console.log('打印在命令窗口', config);
		console.log('NODE_ENV', process.env.NODE_ENV);
		if (process.env.NODE_ENV === '生产环境') {
			// 为生产环境修改配置
		} else {
			// 为开发环境修改配置
		}
		config.optimization = {
			minimizer: [
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							dead_code: true, // 去除不可达代码
							drop_console: true, //去除console
							drop_debugger: true, //去除debugger
							pure_funcs: ['console.log']
						}
					}
				})
			]
		};
		//less配置  有问题？？
		// config.module.rules.push({
		//   test: /\.less$/,
		//   loader: "style-loader!css-loader!less-loader",
		// });
	},
	/*
  会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  */
	// chainWebpack: config => {
	//   // 压缩图片
	//   const imagesRule = config.module.rule('images')
	//   imagesRule
	//       .use('image-webpack-loader')
	//       .loader('image-webpack-loader')
	//       .options({
	//         bypassOnDebug: true
	//       })
	//       .end()
	// },
	/*
  所有 webpack-dev-server 的选项都支持。
  配置参考webpack官网
  https://webpack.docschina.org/configuration/dev-server/#devserver
  */
	devServer: {
		port: 666, // 项目运行的端口号
		open: true, // 是否自动打开浏览器页面
		// 前端node代理 解决跨域 配置此项
		proxy: {
			// 标识位：拦截以/baiduNews/开头的请求路径
			'/baiduNews/': {
				target: 'https://news.baidu.com', // 域名 端口号
				pathRewrite: {
					'^/baiduNews/': '', // 干掉标识位
				},
				changeOrigin: true, // 是否开启跨域
				ws: true // 是否开启websocket
			},
			// 标识位：拦截以/taobaoSearchSuggest/开头的请求路径
			'/taobaoSearchSuggest/': {
				target: 'https://suggest.taobao.com', // 域名 端口号
				pathRewrite: {
					'^/taobaoSearchSuggest/': '', // 干掉标识位
				},
				changeOrigin: true, // 是否开启跨域
				ws: true // 是否开启websocket
			},
		}
	},
};