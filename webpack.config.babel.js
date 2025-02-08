import 'dotenv/config';

import { resolve } from 'path';
import { DefinePlugin } from 'webpack';
import { CopyPlugin } from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CnamePlugin from 'cname-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';

const dev = process.env.NODE_ENV === 'development';

const plugins = [
  new CopyPlugin({
    patterns: ['./static']
  }),
  new DefinePlugin({
    WEBPACK_HLS_STREAM_URL: JSON.stringify(process.env.HLS_STREAM_URL)
  }),
  new CnamePlugin({
    domain: 'campigs.xyz'
  }),
  new CleanPlugin(),
  new StylelintPlugin({
    configFile: '.stylelintrc',
    context: 'src',
    files: '**/*.scss',
    failOnError: true,
    quiet: false,
    customSyntax: 'postcss-scss'
  }),
  new MiniCSSExtractPlugin({
    filename: '[name].css'
  }),
  new HtmlPlugin({
    template: './src/index.html'
  }),
  new ESLintPlugin({
    configType: 'flat'
  })
];

export default {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  entry: './src/index.js',
  devServer: {
    compress: dev,
    hot: dev,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          dev ? 'style-loader' : MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer'),
                  require('postcss-flexbugs-fixes')
                ],
                sourceMap: dev
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: ['import'],
                quietDeps: true
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',
    chunkFilename: '[name].js'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
    alias: {
      components: resolve(__dirname, 'src/components'),
      utils: resolve(__dirname, 'src/utils')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 12
        }
      }),
      new CssMinimizerPlugin()
    ]
  }
};
