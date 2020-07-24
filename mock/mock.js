const fs = require("fs"); // fs 模块提供了用于与文件系统进行交互（以类似于标准 POSIX 函数的方式）的 API

const urls = require("./urls");

const setOnline = urls.urls;

exports.setOnline = setOnline;

for (let i = 0, len = setOnline.length; i < len; i++) {
    (function () {
        const name = setOnline[i].name;
        exports[name] = function (req, res) {
            // 此处可以解析请求 req
            if(false) {
                res.status(400); // 设置状态码
                res.json({ error: "Bad request." });
                return;
            }
            res.setHeader("Content-type", "application/json; charset=utf-8");
            fs.readFile("./mock/" + name + ".json", function (err, data) {
                if (err) throw err;

                res.json(JSON.parse(data));
            });
        }
    })(i);
}