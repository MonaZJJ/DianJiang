var express = require('express');
var router = express.Router();

/* 渲染积分商城页 */
router.get('/integrateProductList', function (req, res, next) {
    res.render('integralProduct/integralProductList.html',{
        currentUrl :"/integrateProduct/integrateProductList"
    });
});

/* 渲染添加积分商品 */
router.get('/integralProductAdd', function (req, res, next) {
    res.render('integralProduct/integralProductAdd.html',{
        currentUrl :"/integrateProduct/integralProductAdd"
    });
});


module.exports = router;