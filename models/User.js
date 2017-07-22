/**
 * Created by jkwu on 17-7-22.
 */
var mongoose = require('mongoose');

var userSchema = require('../schemas/users');

module.exports = mongoose.model('User', userSchema);