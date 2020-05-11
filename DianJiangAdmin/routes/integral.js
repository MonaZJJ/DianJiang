var express = require('express');
var router = express.Router();

/* 渲染积分列表页 */
router.get('/integralList', function(req, res, next) {
    res.render('integral/integralList.html', {
        currentUrl: "/integral/integralList"
    });
});
/* 渲染积分明细页 */
router.get('/integralDetail', function(req, res, next) {
    res.render('integral/integralDetail.html', {
        currentUrl: "/integral/integralDetail"
    });
});
/* 渲染积分设置页 */
router.get('/integralSet', function(req, res, next) {
    res.render('integral/integralSet.html', {
        currentUrl: "/integral/integralSet"
    });
});
/* 渲染货款明细页 */
router.get('/moneyDetail', function(req, res, next) {
    res.render('integral/moneyDetail.html', {
        currentUrl: "/integral/moneyDetail"
    });
});

module.exports = router;