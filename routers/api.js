/**
 * Created by jkwu on 17-7-22.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');

//统一返回格式
var responseData;

router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ''
  };
  next();
});

/*用户注册
*   注册逻辑的实现
* */

router.post('/user/register', function (req, res, next) {
  // console.log(req);
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;
  if (username === '') {
    responseData.code = 1;
    responseData.message = '用户名不能为空';
    res.json(responseData);return ;
  }
  if (password === '') {
    responseData.code = 2;
    responseData.message = '密码不能为空';
    res.json(responseData);return ;
  }
  if (password !== repassword) {
    responseData.code = 3;
    responseData.message = '两次输入的密码不一致';
    res.json(responseData);return ;
  }

  //判断用户名是否被注册

  User.findOne({
    username: username
  }).then(function (userInfo) {
    console.log('userinfo:' + userInfo);
    if (userInfo) {
      responseData.code = 4;
      responseData.message = '用户名已经被注册,请重新输入';
      res.json(responseData);return ;
    }
    // 保存用户信息到数据库
    var user = new User({
      username: username,
      password: password
    });
     return user.save();
  }).then(function (newUserInfo) {
    console.log('newUserInfo:' + newUserInfo);
    responseData.message = '注册成功';
    res.json(responseData);
  });
});

/*用户登录
 *   登录逻辑的实现
 * */

router.post('/user/login', function (req, res, next) {
  // console.log(req);
  var username = req.body.username;
  var password = req.body.password;
  if (username === '') {
    responseData.code = 1;
    responseData.message = '用户名不能为空';
    res.json(responseData);return ;
  }
  if (password === '') {
    responseData.code = 2;
    responseData.message = '密码不能为空';
    res.json(responseData);return ;
  }
  //判断用户名是否被注册,如果注册了就进行判断是否密码和用户名一致

  User.findOne({
    username: username,
    password: password
  }).then(function (userInfo) {
    console.log('userinfo:login:' + userInfo);
    if (!userInfo) {
      responseData.message = '登录失败,用户名或密码不正确';
      responseData.code = 3;
      res.json(responseData); return ;
    }
    responseData.message = '登录成功';
    responseData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username
    };

    //将对象保存成字符串,存放在cookies中request中
    req.cookies.set('userInfo', JSON.stringify({
      _id: userInfo._id,
      username: userInfo.username
    }));
    res.json(responseData);
  });
});

router.get('/user/logout', function (req,res,next) {
  //将对象保存成字符串,存放在cookies中request中
  req.cookies.set('userInfo', null);
  responseData.message = '退出成功';
  res.json(responseData);
});

module.exports = router;