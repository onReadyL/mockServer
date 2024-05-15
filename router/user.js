const express = require('express');

const userMiddleware = require('../middleware/user');

const router = express.Router();

router.use((req, res, next) => {
    console.log('user下的app中间件')
    next();
})

router.post('/login',userMiddleware.valiteLoginInfo(),userMiddleware.setCookie(), (req, res) => {
    res.send('登录成功');
});

/** 用户注册 */
router.post('/register',userMiddleware.valiteFields(), userMiddleware.valiteUser(), userMiddleware.encryptPassword(), (req, res) => {
    res.send('注册成功');
})

/** 登出 */
router.post('/logout', userMiddleware.clearCookie(), (req, res) => {
    res.send('退出登录');
})

/** 用户详情接口前缀 /detail/xxxx/xxxx */
router.use('/detail', userMiddleware.valiteCookie())
router.get("/detail/:id", (req, res) => {
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

module.exports = router;