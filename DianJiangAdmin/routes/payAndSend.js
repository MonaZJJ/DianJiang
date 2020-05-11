var express = require('express');
var router = express.Router();

/* 渲染物流公司页面 */
router.get('/logisticCompany', function (req, res, next) {
    res.render('payAndSend/logisticCompany.html',{
        currentUrl :"/payAndSend/logisticCompany"
    });
});

/* 渲染区域管理页面 */
router.get('/areaManage', function (req, res, next) {
    res.render('payAndSend/areaManage.html',{
        currentUrl :"/payAndSend/areaManage"
    });
});


module.exports = router;