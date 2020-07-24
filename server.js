const express = require("express"); // 引入express
const app = express(); // 创建express实例

const Mock = require("mockjs"); // 引入mock

const Random = Mock.Random;

const apis = require("./src/utils/api.js");

app.use("/v1", apis); // 可以用作版本管理

const mock = require("./mock/mock.js");
const setOnline = mock.setOnline;

/** 解决跨域问题 */
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // 此处根据前端请求携带的请求头进行配置 
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Client-Type");
    next();
})

setOnline.forEach(function (item) {
    app[item.type](item.url, mock[item.name]);
})

// 指定html
app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + req.path);
});

// 监听端口
app.listen("3737", function () {
    // console.log("localhost:3737/index.html");
});

// const fs = require("fs");

// app.get("/home", function(req, res) {
//     res.setHeader("Content-type", "application/json; charset=utf-8");
//     fs.readFile("./mock/home.json", function(err, data) {
//         if(err) throw err;
//         res.json(JSON.parse(data));
//     });
// });