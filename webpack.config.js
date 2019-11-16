const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * @type {webpack.Configuration}
 */
const config = {
  mode: 'production',
  entry: {
    main: './src/example.tsx'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'cheap-module-eval-source-map',
  devServer: { contentBase: ['./dist', './public'], inline: false },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx'],
    modules: ['src', 'node_modules'] //typescript 识别根路径（绝对路径的根节点）
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true // 大大提升 ts 文件的编译速度//但损失了 type-checking 编译报错（vscode飘红不变）（更好了！）//可以安装 fork-ts-checker-webpack-plugin 弥补
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      }
    ]
  },
  plugins: [new BundleAnalyzerPlugin()],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}

module.exports = config
