const fs = require('fs');
const debug = require('debug');
const path = require('path');

const log = debug('mx-dsl:utils/json');

/* eslint-disable */
// 判断文件是否存在
function fileExist(filePath) {
  return fs.existsSync(filePath);
}

function ensureDirectoryExistence(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      const parentDir = path.dirname(dirPath);
      ensureDirectoryExistence(parentDir);
      fs.mkdirSync(dirPath);
    }
  } catch (err) {
    console.log('失败');
    log('目录创建失败:' + err);
    throw err;
  }
}


module.exports = ensureDirectoryExistence;
