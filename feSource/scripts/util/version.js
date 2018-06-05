/**
 * @file 版本相关逻辑
 * @author FranckChen(chenfan02@baidu.com)
 */

const path = require('path');

const fs = require('fs-extra');
const moment = require('moment');
const glob = require('glob');

let distDirectory = path.join(__dirname, '../../dist/');

const globConfig = {
    cwd: distDirectory,
    ignore: []
};

function globDist() {
    return glob.sync('*', globConfig);
}

function genNewDistDirectory() {
    const ts = moment.now();

    fs.ensureDirSync(path.join(distDirectory, ts + ''));

    return ts;
}

module.exports.getCurrentVersion = function () {
    let timeStampDirectories = globDist();
    // 没有资源版本路径的情况下首先创建一个
    if (timeStampDirectories.length <= 0) {
        return genNewDistDirectory();
    }

    // 过滤得到所有的时间戳路径
    timeStampDirectories = timeStampDirectories
        .filter(dir => !isNaN(+dir))
        .sort((a, b) => b - a);

    // 如果没有一个文件夹带数字
    if (timeStampDirectories.length <= 0) {
        return genNewDistDirectory();
    }
    else if (timeStampDirectories.length === 1) {
        return +timeStampDirectories[0];
    }

    // 如果有旧时间戳路径则先去除，返回最新的
    const [newest, ...deprecated] = timeStampDirectories;
    deprecated.forEach(dir => fs.removeSync(path.join(distDirectory, dir)));

    return +newest;
};

module.exports.bump = function () {
    const dirs = globDist();

    // 清除掉旧的时间戳路径，同时只保留一个
    dirs.forEach(dir => {
        if (isNaN(+dir)) {
            return;
        }

        fs.removeSync(path.join(distDirectory, dir));
    });

    genNewDistDirectory();
};
