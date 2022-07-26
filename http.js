const http = require("http"); //请求http模块

http.createServer((req, res) => {
    // console.log(req);
    res.writeHead(401);
    res.statusCode = 500;
    res.statusMessage = '服务器错误';
    res.write('未授权')
    res.end();
}).listen(8888);

console.log(http.METHODS)

console.log("Server running at http://127.0.0.1:8888/");