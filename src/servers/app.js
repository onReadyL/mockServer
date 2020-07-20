const fetch = require("fetch");

function getList() {
    return fetch("/home"); 
}
module.exports = {
    getList,
}