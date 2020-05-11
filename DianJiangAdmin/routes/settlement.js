
var express = require('express');
var router = express.Router();

/* 渲染后台获取全部结算记录 */
router.get('/settlementSummary', function (req, res, next) {
    res.render('settlement/settlementSummary.html',{
        currentUrl :"/settlement/settlementSummary"
    });
});
/* 渲染后台获取结算明细 */
router.get('/settlementDetail', function (req, res, next) {
    res.render('settlement/settlementDetail.html',{
        currentUrl :"/settlement/settlementDetail"
    });
});
/* 渲染后台获取待结算明细 */
router.get('/waitSettlementDetail', function (req, res, next) {
    res.render('settlement/waitSettlementDetail.html',{
        currentUrl :"/settlement/waitSettlementDetail"
    });
});


module.exports = router;