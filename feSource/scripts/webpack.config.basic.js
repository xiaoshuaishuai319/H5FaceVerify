/**
 * @file webpack构建基础部分
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
// 原生模块
const path = require('path');
/* eslint-enable */

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill', 'vue'
        ],
        'pc/main': ['src/pc/main.js'],
        'mobile/main': ['src/mobile/main.js']
    },
    // 注意基准路径是webroot
    context: path.resolve(__dirname, '..'),
    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'node_modules')
        ],
        alias: {
            src: path.resolve(__dirname, '..', 'src'),
            // 模板路径
            view: path.resolve(__dirname, '..', 'src', 'view'),
            // less快捷路径
            less: path.resolve(__dirname, '..', 'src', 'less')
        },
        extensions: ['.js', '.vue', '.css', '.less']
    },
    output: {
        // 放入已包含时间戳的路径
        path: path.join(__dirname, '..', 'dist'),
        filename: 'js/[name].js',
        // 优化jsonp函数名
        jsonpFunction: 'duAI'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|mp4)$/i,
                oneOf: [
                    {
                        // icon转换base64
                        test: /sprite|icons([\/\\]).+\.(jpe?g|png|gif)$/,
                        loader: 'url-loader'
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ico|svg|woff|woff2|ttf)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            }
        ]
    }
};
