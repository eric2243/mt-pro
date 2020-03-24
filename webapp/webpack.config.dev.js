const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const devMode = process.env.NODE_ENV !== 'production';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const srcRoot = path.resolve( __dirname, "src" );
const devPath = path.resolve( __dirname, "dev" );
const pageDir = path.resolve( srcRoot, "page" );
const mainFile = "index.js";
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let webpack = require('webpack');

function getEntry() {
	let entryMap = {};

	fs.readdirSync( pageDir ).forEach( ( pathname ) => {
		let fullPathName = path.resolve( pageDir, pathname );
		let stat = fs.statSync( fullPathName );
		let fileName = path.resolve( fullPathName, mainFile );

		if( stat.isDirectory() && fs.existsSync( fileName ) ) {
			entryMap[ pathname ] = fileName;
		} 
	} );
	return entryMap;
}

function getHtmlArray( entryMap ) {
	let htmlArray = [];
	Object.keys( entryMap ).forEach( ( key ) => {
		let fullPathName = path.resolve( pageDir, key );
		let fileName = path.resolve( fullPathName, key + ".html" );

		if( fs.existsSync( fileName ) ) {
			htmlArray.push( new htmlWebpackPlugin( {
				filename: key + ".html",
				template: fileName,
				chunks: [ key, "common" ]
			} ) );
		}
	} );
	return htmlArray;
}


const entryMap = getEntry();
const htmlArray = getHtmlArray( entryMap );
module.exports =  {
  // 入口文件配置项
  entry: 
    entryMap,
  resolve: {
    alias: {
      component: path.resolve( srcRoot, 'components' )
    },
    extensions: [ ".js", ".jsx" ]
  },
  // 出口文件配置项
  output: {
    // 打包路径
    path: devPath,
    // 打包文件名
    filename: '[name].[hash].min.js',
    publicPath: "/"
  },
  module: {
    rules: [
        {
          test: /\.(sc|sa|c)ss$/,
          use: 
            [ devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            // ["style-loader",
            {
              loader: 'css-loader',
              options: {
              importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            }, 
            {
              loader: 'sass-loader',
            },
            {
              loader: "sass-resources-loader",
              options: {
                resources: srcRoot + "/components/rem_function.scss"
              }
            }
          ],
            include: srcRoot //右向左解析
        },
        { 
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: '8192', // 小于8k自动转成base64，不会存在实体图片
                outputPath: 'images' // 打包存放目录
              }
            },
          ],
          include: srcRoot
        },
        {
          test: /\.(htm|html)$/,
          use: 'html-withimg-loader',
          include: srcRoot
        },
        {
          test: /\.(eot|ttf|woff|svg)$/,
          use: 'file-loader',
          include: srcRoot
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
          include: srcRoot
        },
      ]
  },
  // 插件配置
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      // html模板
      template: HtmlWebpackTemplate,
      appMountId: "root",
      inject: false,
      // multihtmlCatch: true, // 开启多入口缓存
      filename: 'detail.html',
      chunks: ['detail', 'commons' ],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash: true // 打包文件追加 hash 串
    }),
    new htmlWebpackPlugin({
      // html模板
      template: HtmlWebpackTemplate,
      appMountId: "root",
      inject: false,
      multihtmlCatch: true, // 开启多入口缓存
      filename: 'index.html',
      chunks: ['index', 'commons' ],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash: true // 打包文件追加 hash 串
    }),
        new htmlWebpackPlugin({
      // html模板
      template: HtmlWebpackTemplate,
      appMountId: "root",
      inject: false,
      multihtmlCatch: true, // 开启多入口缓存
      filename: 'category.html',
      chunks: ['category', 'commons' ],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash: true // 打包文件追加 hash 串
    }),
    new htmlWebpackPlugin({
      // html模板
      template: HtmlWebpackTemplate,
      appMountId: "root",
      inject: false,
      multihtmlCatch: true, // 开启多入口缓存
      filename: 'evaluation.html',
      chunks: ['evaluation', 'commons' ],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash: true // 打包文件追加 hash 串
    }),
    new MiniCssExtractPlugin({
    filename:  devMode ? './css/[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? './css/[id].css' : '[id].[hash].css'
    }),
    new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, 'src/*.html'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
    options: {
        eslint: {
          configFile: './.eslintrc'
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化\最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随cssnano.process接口的函数（接收CSS和选项参数并返回一个Promise）。
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
            canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
        })],
    // ].concat(htmlArray),
  mode: 'development',
  // 配置webpack开发服务
  devServer: {
    port: 8080, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true,
    contentBase: devPath,
    // inline: true
    publicPath: "/"
  },
  optimization: {
        splitChunks: {
            cacheGroups: {
                //打包公共模块
                commons: {
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    minSize: 0, //表示提取公共部分最小的大小
                    name: 'commons' //提取出来的文件命名
                }
            }
        }
    }
}