const fs = require("fs");
const urls = require("./urls");
const setOnline = urls.urls;

exports.setOnline = setOnline;

for (let i = 0, len = setOnline.length; i < len; i++) {
    (function () {
        const name = setOnline[i].name;
        exports[name] = function (req, res) {
            res.setHeader("Content-type", "application/json; charset=utf-8");
            fs.readFile("./mock/" + name + ".json", function (err, data) {
                if (err) throw err;

                res.json(JSON.parse(data));
            });
        }
    })(i);
}