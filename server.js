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

// 示例中间件函数
// const a_middleware_function = (req, res, next) => {
//     // ... 进行一些操作
//     next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
//   };
  
// // 用 use() 为所有的路由和动词添加该函数
// app.use(a_middleware_function);

/** 解决跨域问题 */
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // 此处根据前端请求携带的请求头进行配置 
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Client-Type");
    next();
});

/** 当且仅当访问/secret监听到 */
app.all('/secret', (req, res, next) => {
    console.log('访问私有文件 ...');
    next(); // 控制权传递给下一个处理器
  });

setOnline.forEach(function (item) {
    app[item.type](item.url, mock[item.name]);
})

/** 指定首页 */
// TODO: 没成功
// router.get("/index", (req, res) => {
//     res.send("首页")
//     // res.sendFile(__dirname + req.path);
// })

// 指定html
app.get("/index.html", function (req, res) {
    const {url, method, header, params, query, body, path, route} = req;
    console.log(url);
    // let { pathname, query } = url.parse(req.url, true)
    res.sendFile(__dirname + req.path);
});

app.get("/api/relationTask/info/:id", function(req, res, next) {
    console.log("测试next");
    next();
}, function(req2, res2) {
    // res2.send({
    //     data: []
    // })
    res2.download('./sanda.json', 'file');
});

app.get("/cmssearch/1/search/task/songsource.json", function(req, res) {
    res.send({
        "msg":"操作成功",
        "code":"000000",
        "data":{"list":[{"songName":"Mannish Boy","toUser":"刘晓斌","site":"m","unconfirmBenchCount":121,"createTime":"2020-11-26 17:13:53","siteId":1115654612,"artistName":"Muddy Waters","id":188429,"distributionTime":"2020-11-26 17:26:40","songFlag":{"tencentFlag":true,"oppoFlag":false,"huaweiFlag":false,"miguFlag":true,"wangyiFlag":false,"xiamiFlag":false,"kugouFlag":false},"unconfirmCopyrightCount":49,"status":1},{"songName":"Everyday","toUser":"刘晓斌","site":"m","unconfirmBenchCount":14,"createTime":"2020-11-27 10:20:09","siteId":1111905479,"artistName":"Buddy Holly+The Crickets","id":188430,"distributionTime":"2020-11-27 10:20:09","songFlag":{"tencentFlag":true,"oppoFlag":false,"huaweiFlag":false,"miguFlag":true,"wangyiFlag":false,"xiamiFlag":false,"kugouFlag":false},"unconfirmCopyrightCount":13,"status":1}],"pageNo":1,"pageSize":2,"pageTotal":1,"startRow":0,"totalCount":2}})
})

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