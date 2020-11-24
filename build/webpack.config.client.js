const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // eslint-diable-line
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理打包目录
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 优化打包命令行输出
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

const Config = merge(baseConfig, {
    // entry: { index: path.join(__dirname, 'src/index.js') },
    // output: {
    //     filename: '[name].js',
    //     path: path.join(__dirname, 'dist'),
    //     publicPath: './',
    // },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin(),

        new HTMLWebpackPlugin({
            inlineSource: '.css$',
            template: path.join(__dirname, `../src/index.html`),
            filename: `index.html`,
            chunks: ['index'], // 这里似乎必须写成数组，不然所有chunk都会打包进每一个html
            // excludeChunks: ['index', 'page2'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"',
            },
        }),
    ],
});

if (isDev) {
    Config.target = 'web';
    Config.mode = 'development';
    Config.devServer = {
        host: '0.0.0.0',
        port: '8000',
        hot: true,
        open: true,
        overlay: {
            errors: true,
        },
        stats: 'errors-only',
    };
    Config.devtool = 'eval-cheap-module-source-map';
} else {
    Config.mode = 'production';
    Config.plugins.push(new CleanWebpackPlugin());
    Config.optimization.minimize = true;
    Config.optimization.minimizer = [
        new TerserPlugin({
            parallel: true, // 开启并行压缩
            extractComments: false, // 不生成 license.text
        }),
    ];
}

module.exports = Config;
