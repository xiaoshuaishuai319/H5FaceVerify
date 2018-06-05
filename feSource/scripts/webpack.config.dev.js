/**
 * @file webpack构建配置
 * @author FranckChen(chenfan02@baidu.com)
 */

const webpack = require('webpack');
const merge = require('webpack-merge');

const basicConfig = require('./webpack.config.basic');

// 定义webpack配置合并策略
const devStrategyMerge = merge.strategy({
    'entry.main': 'prepend',
    'plugins': 'prepend',
    'module.rules': 'append'
});

module.exports = devStrategyMerge(
    basicConfig,
    {
        mode: 'development',
        output: {
            publicPath: '/dist/',
        },
        // 注意合并策略，是prepend, 实现react HMR
        entry: {
            'pc/main': [
                'webpack-hot-middleware/client?reload=true'
            ],
            'mobile/main': [
                'webpack-hot-middleware/client?reload=true'
            ]
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        plugins: [
            // 激活webpack HMR API
            new webpack.HotModuleReplacementPlugin()
        ]
    }
);
