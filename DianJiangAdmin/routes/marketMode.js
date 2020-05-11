var express = require('express');
var router = express.Router();

/* 渲染优惠券页 */
router.get('/marketCoupon', function (req, res, next) {
    res.render('marketMode/marketing_way.html',{
        currentUrl :"/marketMode/marketCoupon",
    });
});
/* 渲染活动详情页 */
router.get('/marketing_detail_list', function (req, res, next) {
    res.render('marketMode/marketing_detail_list.html',{
        currentUrl : "/marketMode/marketing_detail_list"
    });
});


/* 限时抢购 正在进行 */
router.get('/limitSalePerformanceIng', function (req, res, next) {
    res.render('marketMode/limitSalePerformanceIng.html',{
        currentUrl :"/marketMode/limitSalePerformanceIng"
    });
});
/* 限时抢购 即将开始 */
router.get('/limitSalePerformanceWillStar', function (req, res, next) {
    res.render('marketMode/limitSalePerformanceWillStar.html',{
        currentUrl :"/marketMode/limitSalePerformanceWillStar"
    });
});
/* 限时抢购 历史抢购 */
router.get('/limitSalePerformanceHistory', function (req, res, next) {
    res.render('marketMode/limitSalePerformanceHistory.html',{
        currentUrl :"/marketMode/limitSalePerformanceHistory"
    });
});
/* 限时抢购 添加*/
router.get('/limitSalePerformanceAdd', function (req, res, next) {
    res.render('marketMode/limitSalePerformanceAdd.html',{
        currentUrl :"/marketMode/limitSalePerformanceAdd"
    });
});
/* 限时抢购 编辑*/
router.get('/limitSalePerformanceEdit', function (req, res, next) {
    res.render('marketMode/limitSalePerformanceEdit.html',{
        currentUrl :"/marketMode/limitSalePerformanceEdit"
    });
});
/* 限时抢购 详情页 */
router.get('/limitSalePerformanceDetail', function (req, res, next) {
    res.render('marketMode/limitSalePerformanceDetail.html',{
        currentUrl :"/marketMode/limitSalePerformanceDetail"
    });
});

/* 限时抢购 详情页 */
router.get('/limitSaleDetail', function (req, res, next) {
    res.render('marketMode/limitSaleDetail.html',{
        currentUrl :"/marketMode/limitSaleDetail"
    });
});

/* 限时抢购 详情页 */
router.get('/limitSaleAdd', function (req, res, next) {
    res.render('marketMode/limitSaleAdd.html',{
        currentUrl :"/marketMode/limitSaleAdd"
    });
});




module.exports = router;