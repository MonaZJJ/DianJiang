
var express = require('express');
var router = express.Router();

/* 普通订单列表页 */
router.get('/orderList', function (req, res, next) {
    res.render('order/orderList.html',{
        currentUrl :"/order/orderList"
    });
});

/* 积分订单列表页 */
router.get('/integrationOrderList', function (req, res, next) {
    res.render('order/integralOrderList.html',{
        currentUrl :"/order/integrationOrderList"
    });
});

/* 订单详情页 */
router.get('/orderListDetail', function (req, res, next) {
    res.render('order/orderListDetail.html',{
        currentUrl :"/order/orderListDetail"
    });
});

/* 积分订单详情页 */
router.get('/integrationOrderListDetail', function (req, res, next) {
    res.render('order/integralOrderListDetail.html',{
        currentUrl :"/order/integrationOrderListDetail"
    });
});
/* 渲染订单设置页面 */
router.get('/orderSettings', function (req, res, next) {
    res.render('order/order_settings.html',{
        currentUrl : "/order/orderSettings"
    });
});

router.get('/orderAdministration', function (req, res, next) {
    res.render('order/order_administration.html',{
        currentUrl :"/order/orderAdministration"
    });
});

router.get('/orderService', function (req, res, next) {
    res.render('order/order_service.html',{
        currentUrl :"/order/orderService"
    });
});

router.get('/orderServiceChange', function (req, res, next) {
    res.render('order/order_service_change.html',{
        currentUrl :"/order/orderService"
    });
});
router.get('/orderServiceDetail', function (req, res, next) {
    res.render('order/orderServiceDetail.html',{
        currentUrl :"/order/orderServiceDetail"
    });
});

/* 渲染退款申请单页面 */
router.get('/refundApplication', function (req, res, next) {
    res.render('order/refund_application.html',{
        currentUrl : "/order/refundApplication"
    });
});

/* 渲染退款申请单详情页面 */
router.get('/appicationDetail', function (req, res, next) {
    res.render('order/refundApplication_detail.html',{
        currentUrl : "/order/refundApplication"
    });
});

/* 渲染物流信息页面 */
router.get('/logistics', function (req, res, next) {
    res.render('order/logistics_detail.html',{
        currentUrl : "/order/orderList"
    });
});

/* 渲染退款详情页面 */
router.get('/orderServiceDetail', function (req, res, next) {
    res.render('order/orderServiceDetail.html',{
        currentUrl : "/order/orderServiceDetail"
    });
});
/* 渲染提现列表页面 */
router.get('/withdrawalList', function (req, res, next) {
    res.render('order/withdrawalList.html',{
        currentUrl : "/order/withdrawalList"
    });
});
/* 渲染售后原因页面 */
router.get('/afterSellReason', function (req, res, next) {
    res.render('order/afterSellReason.html', {
        currentUrl: "/order/afterSellReason"
    });
});

module.exports = router;