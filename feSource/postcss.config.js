/**
 * @file postcss配置
 * @author Franck chen(chenfan02@baidu.com)
 */

const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['ie > 1', 'chrome > 1', 'ff > 1']
        })
    ]
};
