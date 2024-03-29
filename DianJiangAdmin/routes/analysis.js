
var express = require('express');
var router = express.Router();

/* 渲染流量分析页 */
router.get('/analysisFlow', function (req, res, next) {
    res.render('analysis/analysis_flow.html',{
        currentUrl :"/analysis/analysisFlow"
    });
});
/* 渲染会员分析页 */
router.get('/analysisMember', function (req, res, next) {
    res.render('analysis/analysis_member.html',{
        currentUrl :"/analysis/analysisMember"
    });
});

/* 渲染交易分析页 */
router.get('/analysisTransaction', function (req, res, next) {
    res.render('analysis/analysis_ transaction.html',{
        currentUrl :"/analysis/analysisTransaction"
    });
});

/* 渲染商品分析页 */
router.get('/analysisCommodity', function (req, res, next) {
    res.render('analysis/analysis_commodity.html',{
        currentUrl :"/analysis/analysisCommodity"
    });
});

/* 渲染订单分析页 */
router.get('/analysisOrder', function (req, res, next) {
    res.render('analysis/analysis_order.html',{
        currentUrl :"/analysis/analysisOrder"
    });
});

/* 渲染区域订单分析页 */
router.get('/regionalOrders', function (req, res, next) {
    res.render('analysis/regionalOrders.html',{
        currentUrl :"/analysis/regionalOrders"
    });
});



module.exports = router;