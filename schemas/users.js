/**
 * Created by jkwu on 17-7-22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  //用户名
  username: String,
  //密码
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = userSchema;