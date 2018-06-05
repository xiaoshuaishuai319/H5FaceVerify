/**
 * @file 生成页面模板容器
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

const fs = require('fs-extra');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers');
const version = require('./version');

helpers.comparison();

module.exports = function (env) {
    fs.readFile(
        path.resolve(__dirname, '../../template/index.hbs'),
        (err, content) => {
            if (err) {
                // 有错误了其实处理也没意义
                return;
            }

            // 生成html
            const renderer = handlebars.compile(content.toString());
            ['pc', 'mobile'].forEach(device => {
                const html = renderer({
                    device,
                    env,
                    version: version.getCurrentVersion()
                });

                fs.outputFile(path.join(__dirname, `../../pages/${device}.html`), html);
            });
        }
    );
};
