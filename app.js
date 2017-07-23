// 应用入口文件
//加载express模块
var express = require('express');

// 加载模板处理模块
var swig = require('swig');

//加载数据库模块
var mongoose = require('mongoose');

//加载body-parser,用于处理[-post-]提交过来的数据
var bodyParser = require('body-parser');


//加载cookies模块
var Cookies = require('cookies');

var User = require('./models/User');
//创建应用
var app = express();

// 设置静态文件托管
// 当用户访问的url以public开始,那么直接返回对应 __dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));


//配置应用模板
//定义当前模板所使用的模板引擎
/*
* 第一个参数: 模板引擎的名称,同时也是模板文件的后缀
* 第二个参数: 表示用于解析处理模板内容的方法
* */
app.engine('html', swig.renderFile);

// 设置模板文件存放的目录, 第一个参数必须是views, 第二个参数是目录
app.set('views', './views');

//注册所使用的模板引擎,第一个参数必须是 view engine, 第二个参数和app.engine()方法中的第一个参数(模板引擎的名称)必须相同
app.set('view engine', 'html');

//设置bodyParser
// parse application/x-www-form-urlencoded
//添加这个属性之后,会自动在请求的request请求中添加body属性,这个属性就是对post中参数的封装
app.use(bodyParser.urlencoded({ extended: true }));

//在开发过程中需要去掉模板缓存
swig.setDefaults({ cache: false});


//解析登录信息cookies
app.use(function (req, res, next) {
  req.cookies = new Cookies(req, res);
  req.userInfo = {};
  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
      User.findById(req.userInfo.id).then(function (userInfo) {
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
        next();
      })
    }
    catch(e) {
      next();
    }
  } else {
    next();
  }

});


/*
* 首页
*  request
*  respose
*  next : 函数
* */

// 根据不同的功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


// app.get('/', function (req,res, next) {
//   // res.send('<span>Hello</span>');
//
//   /*
//   * 读取views目录下的指定文件,解析并返回给客户端
//   * 第一个参数: 表示模板的文件,相对于views目录  views/index.html
//   * 第二个参数: 传递给模板使用的数据
//   * */
//   res.render('index');
// });


// 连接数据库
mongoose.connect('mongodb://localhost:27017/nodeBlog', { useMongoClient: true }, function (err) {
  if (err) {
    console.log('数据库连接失败' + err);
  } else {
    console.log('数据库连接成功');
    // 监听http请求
    app.listen(8080);
    console.log('服务器正常启动...,监听地址端口为: localhost:8080');
  }
});