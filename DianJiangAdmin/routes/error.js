var express = require('express');
var router = express.Router();

/* 渲染403页 */
router.get('/403', function (req, res, next) {
    res.render('error/403.html',{
        currentUrl :"/error/403"
    });
});

module.exports = router;