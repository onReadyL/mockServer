const express = require('express');

const router = express.Router();

router.post('/login',(req, res) => {
    res.send('登录成功')
});

router.post('/register',(req, res) => {
    res.send('注册成功')
})

module.exports = router;