# NodeBlog
NodeBlog is a website of blog

##### 1.mongodb数据库
在使用mongodb数据库的时候,需要在本地进行安装,首先你需要在官方网站进行下载,如下面链接
      [mongodb数据库下载](https://www.mongodb.com/download-center?jmp=tutorials&_ga=2.45634918.3712958.1502026458-1829401361.1502026458)
根据自己的电脑,进行对应版本的下载安装,在安装完之后,我们需要进行开启,其中默认端口为27017     
在Linux系统下,进入到安装目录,只需在终端下输入如下命令:
    
   `mongod --dbpath=/home/jkwu/WebstormProjects/NodeBlog/db  --port=27017`
        
       在上面命令中,使用指令dbpath指定了生成的数据库文件路径`/home/jkwu/WebstormProjects/NodeBlog/db`,      
##### 2. 项目中依赖文件的安装
      * body-parser: 解析post的请求数据
      * cookies: 读或者写cookies,用于存储临时数据
      * express: http数据服务器,用于响应数据
      * jquery: 插件
      * markdown: markdown语法解析生成模块
      * mongoose: 操作mongodb数据库中的数据
      * swig:模板解析引擎
  在项目根目录下使用命令`npm` 进行安装,即使用下面命令:
  ```
    npm i --save-dev body-parser cookies express jquery markdown mongoose swig
  ```

##### 3. 项目中目录结构
  |
  |--db                    :数据库存储路径
  |--models                :数据库模型
  |--public                :公共资源,图片,js等
  |--routers               :初始路径划分,用于划分管理员路径 与普通用户路径
  |--schemas               :定义monogodb数据库中schema格式
  |--views                 :显示的html页面
  |--.gitignore            : git忽略的文件
  |--app.js                :入口文件,用于启动服务等
  |--package.json          : package.json
  |--README.md             : 项目说明
  
##### 3. 项目启动

在根目录下面,使用如下命令进行启动
```
node app.js

```
启动之后,通过开始设置的端口进行访问:
```
http://localhost:8080/
```
  
  