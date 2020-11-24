/*
 * @Author: Clloz
 * @Date: 2020-11-08 19:24:15
 * @LastEditTime: 2020-11-16 20:27:29
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /todo/webpack.config.js
 * @symbol_custom_string_obkoro1: 博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // eslint-diable-line
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理打包目录
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 优化打包命令行输出
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const isDev = process.env.NODE_ENV === 'development';

const Config = {
    entry: { index: path.join(__dirname, 'src/index.js') },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true, // 开启 babel-loader 缓存
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    // MiniCSSExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    // MiniCSSExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'less-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        // new MiniCSSExtractPlugin({
        //     filename: '[name]_[contenthash:8].css',
        //     chunkFilename: '[name].[contenthash].css',
        // }),
        new HTMLWebpackPlugin({
            inlineSource: '.css$',
            template: path.join(__dirname, `./src/index.html`),
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
        // new HtmlWebpackTagsPlugin({
        //     append: false, // 如果是 true 表示插入在最后
        //     scripts: [{ path: '../dll/react4099a463c42053c458c2.dll.js' }],
        // }),
    ],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js', // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        },
    },
    optimization: {
        // 代码分割
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minRemainingSize: 0,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            usedExports: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minChunks: 1,
                    priority: -10,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    stats: 'errors-only',
};

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
