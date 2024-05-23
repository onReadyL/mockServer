const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    res.render('index', {
        name: 'Express render with ejs',
        pageTitle: 'hello ejs'
    })
});
module.exports = router;