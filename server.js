const express = require("express");

const mock = require("./mock/mock.js");
const userRouter = require('./router/user.js');

const app = express(); // 创建express实例
const port = '3737'; // 端口


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // 指定模板引擎
app.set('views', __dirname + '/views'); // 设置模板所在目录

app.use('/user', userRouter); // 可以用作版本管理

const setOnline = mock.apis;

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
   const name = item.name;
   if(Object.prototype.toString.call(name) === '[object Function]'){
        app[item.type](item.url, mock[name.name]);
   }else {
        app[item.type](item.url, mock[name]);
   }
});

// 指定html
app.get("/index.html", function (req, res) {
    const {url, method, header, params, query, body, path, route} = req;
    console.log(req.path)
    res.sendFile(__dirname + req.path);
});

app.get("/", (req, res) => {
    res.render('index', {
        name: 'Express render with ejs',
        pageTitle: 'hello ejs'
    })
})

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    res.render("user", {
        id,
        html: `<h1>我是标题</h1>`,
        users: [
            {
                name: '张三',
                email: 'xxx@qq.com'
            },
            {
                name: '李四',
                email: 'xxxxxx@qq.com'
            }
        ]
    })
})

// 监听端口
app.listen(port, function () {
    console.log(`localhost:${port}/index.html`);
});