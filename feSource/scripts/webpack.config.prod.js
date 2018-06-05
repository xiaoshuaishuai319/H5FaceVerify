/**
 * @file webpack生产环境构建配置
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

// webpack plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');

// 定义webpack配置合并策略
const prodMerge = merge.strategy({
    'plugins': 'append'
});

module.exports = function (version, env) {
    // 样式独立打包
    const extractLESS = new ExtractTextPlugin('css/[name].css');

    const extractCSSConfig = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    // 压缩css
                    minimize: true
                }
            },
            'postcss-loader',
            'less-loader'
        ]
    });

    let publicPath = '/';
    if (env === 'online') {
        publicPath = `//aip.bdstatic.com/faceliveness/dist/${version}/`;
    }
    else if (env === 'rd') {
        publicPath = `/faceliveness/dist/${version}/`;
    }

    return prodMerge(
        require('./webpack.config.basic'),
        {
            mode: 'production',
            output: {
                publicPath,
                path: path.join(__dirname, `../dist/${version}`)
            },
            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: extractCSSConfig,
                                less: extractCSSConfig
                            }
                        }
                    }
                ]
            },
            plugins: [
                extractLESS
            ]
        }
    );
};
