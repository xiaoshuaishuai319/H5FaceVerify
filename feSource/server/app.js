/**
 * @file 本地开发server
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

const fs = require('fs-extra');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers');
const express = require('express');
const webpack = require('webpack');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const opn = require('opn');

helpers.comparison();

// mock数据存储路径
const mockDataDir = path.join(__dirname, '../mock');

const app = express();
// 创建proxy
const proxy = httpProxy.createProxyServer();

// api转发配置常量
const PROXY_SETTING = {
    // 本机
    LOCAL: 0,
    // 测试服务器
    DEV_SERVER: 1
};

const PORT = 9000;
// 部署了项目后端的测试服务器地址
const DEV_SERVER = 'http://10.95.106.174:8032';

// 默认将api请求发送至本地mock server
let proxyType = PROXY_SETTING.DEV_SERVER;

// webpack compiler
const compiler = webpack(require(path.resolve(__dirname, '../scripts/webpack.config.dev')));

app.use(
    webpackDevMiddleware(
        compiler,
        {
            publicPath: '/dist',
            stats: {
                colors: true
            },
            historyApiFallback: true
        }
    )
);

// hmr
app.use(
    webpackHotMiddleware(
        compiler,
        {
            // webpack的信息打印在控制台上
            log: console.log
        }
    )
);

const renderHtml = function (device) {

    return function (req, res, next) {
        fs.readFile(
            path.join(__dirname, '../template/index.hbs'),
            (err, data) => {
                if (err) {
                    next();

                    return;
                }

                const renderer = handlebars.compile(data.toString());
                res
                    .type('html')
                    .end(renderer({
                        device,
                        env: 'dev'
                    }));
            }
        );
    };
};

app.get('/', renderHtml('pc'));
app.get('/m', renderHtml('mobile'));

// 服务器配置页面接口
app.get('/option', (req, res, next) => {
    fs.readFile(
        path.resolve(__dirname, '../template/option.html'),
        (err, content) => {
            if (err) {
                next();
                return;
            }

            res.type('html').end(content.toString());
        }
    );
});

// 修改接口发送地址的接口
app.post('/option/proxy', bodyParser.urlencoded({extended: false}), (req, res) => {
    // 调整接口发送地址
    proxyType = +req.body.proxyType;

    res.json({
        status: 0
    });
});

app.post(
    '*',
    (req, res, next) => {
        // 转发至项目测试服务器
        if (proxyType === PROXY_SETTING.DEV_SERVER) {
            proxy.web(req, res, {
                target: DEV_SERVER
            });

            return;
        }

        // http返回本地mock数据
        const mockDataPath = path.join(
            mockDataDir,
            // open api接口路径过长，这里减去基础路径，方面读取mock数据
            `${req.path}.json`
        );

        // 这里不用res.sendFile是因为这个api拼接路径实在是麻烦
        fs.readFile(
            mockDataPath,
            (err, data) => {
                if (err) {
                    next(err);

                    return;
                }

                res
                    .type('json')
                    .end(data.toString());
            }
        );
    }
);

app.listen(
    PORT,
    () => {
        console.log(`服务器已于${PORT}端口部署`);
        opn(`http://localhost:${PORT}`, {app: 'google chrome'});
    }
);
