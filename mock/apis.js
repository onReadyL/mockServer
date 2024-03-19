/**
 * 接口文件
 */

const apis = [
    {
        name: "home",
        type: "get",
        url: "/home"
    },
    {
        name: (res, req) => {
            req.send('yes')
        },
        type: 'post',
        url: '/somelist'
    }
];

exports.apis = apis;