/**
 * Created by jkwu on 17-8-3.
 */

var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content', contentsSchema);