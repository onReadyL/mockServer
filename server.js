const express = require("express"); // 引入express
const url = require("url"); // 还不知道是啥

const app = express(); // 创建express实例
const router = express.Router(); // 路由

const Mock = require("mockjs"); // 引入mock

const Random = Mock.Random;

const apis = require("./src/utils/api.js");

app.use("/v1", apis); // 可以用作版本管理

const mock = require("./mock/mock.js");
const setOnline = mock.setOnline;

/** 解决跨域问题 */
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, GET, POST, DELETE, OPTIONS');
    // 此处根据前端请求携带的请求头进行配置 
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

/** 当且仅当访问/secret监听到 */
app.all('/secret', (req, res, next) => {
    console.log('访问私有文件 ...');
    next(); // 控制权传递给下一个处理器
}, function (res2, req1) {
    req1.send(res2.path)
  });

setOnline.forEach(function (item) {
    app[item.type](item.url, mock[item.name]);
});

// 指定html
app.get("/index.html", function (req, res) {
    const {url, method, header, params, query, body, path, route} = req;
    res.sendFile(__dirname + req.path);
});

// 监听端口
app.listen("3737", function () {
    console.log("localhost:3737/index.html");
});