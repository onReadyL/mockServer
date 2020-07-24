const fetch = require("fetch");

module.exports = {
    get: (url="", options={}) => {
        const defaultOpt = {
            headers: {
                "content-type": "json"
            }
        };
        return fetch(url, {...defaultOpt, ...options}).then(res => res.json()).catch(err => console.log(err));
    },
    post: (url="", data={}, options={}) => {
        const defaultOpt = {
            headers: {
                "content-type": "json",
            }
        }
        return fetch(url, { ...defaultOpt, ...options }).then(res => res.json()).catch(err => console.log(err));
    }
}