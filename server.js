const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');

const mock = require("./mock/mock.js");
const userRouter = require('./router/user.js');
const setOnline = mock.apis;

const app = express(); // 创建express实例
const port = '3737'; // 端口

app.set('view engine', 'ejs'); // 指定模板引擎
app.set('views', path.join(__dirname, 'views')); // 设置模板所在目录

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

/** 解决跨域问题 */
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, GET, POST, DELETE, OPTIONS');
    // 此处根据前端请求携带的请求头进行配置 
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.use('/user', userRouter); // 可以用作版本管理

setOnline.forEach(function (item) {
   const name = item.name;
   if(Object.prototype.toString.call(name) === '[object Function]'){
        app[item.type](item.url, mock[name.name]);
   }else {
        app[item.type](item.url, mock[name]);
   }
});

app.get("/", (req, res) => {
    res.render('index', {
        name: 'Express render with ejs',
        pageTitle: 'hello ejs'
    })
})

app.use((err, req, res, next) => {
    // 这里可以定义错误状态码
    res.send('Error:'+ err.message)
})
// 监听端口
app.listen(port, function () {
    console.log(`localhost:${port}`);
});