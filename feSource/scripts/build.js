/**
 * @file 构建任务
 * @author FranckChen(chenfan02@baidu.com)
 */

/* eslint-disable */
const webpack = require('webpack');
const inquirer = require('inquirer');


const generateAllHTML = require('./util/genHTML');
const {bump, getCurrentVersion} = require('./util/version');
/* eslint-enable */

// 打印配置
const printConfig = {
    hash: false,
    children: false,
    modules: false,
    chunkOrigins: false,
    chunksSort: false,
    source: false,
    // 以下是控制台参数
    chunks: false,
    colors: true
};

inquirer
    .prompt([
        {
            type: 'list',
            name: 'env',
            message: '请选择构建场景',
            choices: [
                {
                    name: '沙盒测试环境',
                    value: 'rd'
                },
                {
                    name: '线上环境',
                    value: 'online'
                }
            ]
        },
        {
            type: 'confirm',
            name: 'isBump',
            message: '是否生产新版本号',
            default: false
        }
    ])
    .then(answers => {
        if (answers.isBump) {
            bump();
        }

        const ts = getCurrentVersion();
        // 编译器
        const compiler = webpack(require('./webpack.config.prod')(ts, answers.env));
        compiler.run(
            (err, stats) => {
                if (err) {
                    console.log(err);

                    return;
                }

                console.log(stats.toString(printConfig));

                // js编译结束后生成HTML
                generateAllHTML(answers.env);
            }
        );
    });
