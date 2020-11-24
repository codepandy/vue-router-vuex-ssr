const path = require('path');

const Config = {
    entry: {
        index: path.join(__dirname, '../src/index.js'),
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
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
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    // MiniCSSExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    // MiniCSSExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },

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

module.exports = Config;
