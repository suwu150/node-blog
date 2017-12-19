/**
 * Created by jkwu on 17-12-19.
 */
var spawn = require('child_process').spawn;
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var ensureDirectoryExistence = require('./utils/json-es5');

var projectPath = __dirname;
var dbPath = projectPath + '/db';

if (argv['app']) {
  ensureDirectoryExistence(dbPath);
  //启动mongod数据库
  // mongod --dbpath=/home/jkwu/WebStormProject/node-blog/db  --port=27017
  var params = '--dbpath=' + dbPath +'  --port=27018';
  spawn('mongod', [params], { shell: true, env: process.env, stdio: 'inherit' })
    .on('close', function (code) {
      { console.log('--77-'); process.exit(code)}
    } )
    .on('error', function (spawnError) {
      console.log('--66-');
      console.error(spawnError)});

  spawn('node', ['app.js'], { shell: true, env: process.env, stdio: 'inherit' })
    .on('close', function (code) {
      { console.log('--77-'); process.exit(code)}
    } )
    .on('error', function (spawnError) {
      console.log('--66-');
      console.error(spawnError)});
}