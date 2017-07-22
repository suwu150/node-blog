/**
 * Created by jkwu on 17-7-22.
 */
var express = require('express');
var router = express.Router();


router.get('/User', function (req, res, next) {
  res.send('User');
});

module.exports = router;