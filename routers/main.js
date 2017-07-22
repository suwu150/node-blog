/**
 * Created by jkwu on 17-7-22.
 */
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  res.render('main/index')
});

module.exports = router;