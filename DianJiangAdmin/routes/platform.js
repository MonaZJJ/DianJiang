var express = require('express');
var router = express.Router();

/* 渲染导航栏页面 */
router.get('/navbarList', function (req, res, next) {
    res.render('platform/navbarList.html', {
        currentUrl: "/platform/navbarList"
    });
});

/* 渲染导航栏添加页面 */
router.get('/navbarAdd', function (req, res, next) {
    res.render('platform/navbarAdd.html', {
        currentUrl: "/platform/navbarAdd"
    });
});

/* 渲染导航栏编辑页面 */
router.get('/navbarEdit', function (req, res, next) {
    res.render('platform/navbarEdit.html', {
        currentUrl: "/platform/navbarEdit"
    });
});

/* 渲染轮播图页面 */
router.get('/bannerList', function (req, res, next) {
    res.render('platform/bannerList.html', {
        currentUrl: "/platform/bannerList"
    });
});

/* 渲染轮播图添加页面 */
router.get('/addBanner', function (req, res, next) {
    res.render('platform/addBanner.html', {
        currentUrl: "/platform/addBanner"
    });
});

/* 渲染轮播图编辑页面 */
router.get('/editBanner', function (req, res, next) {
    res.render('platform/editBanner.html', {
        currentUrl: "/platform/editBanner"
    });
});

/* 渲染物流公司页面 */
router.get('/logisticsCompany', function (req, res, next) {
    res.render('platform/logisticsCompany.html',{
        currentUrl :"/platform/logisticsCompany"
    });
});

/* 渲染区域管理页面 */
router.get('/areaManage', function (req, res, next) {
    res.render('platform/areaManage.html',{
        currentUrl :"/platform/areaManage"
    });
});

/* 渲染常见问题页面 */
router.get('/platformService', function (req, res, next) {
    res.render('platform/platformService.html', {
        currentUrl: "/platform/platformService"
    });
});

/* 渲染常见问题添加页面 */
router.get('/addService', function (req, res, next) {
    res.render('platform/addService.html', {
        currentUrl: "/platform/addService"
    });
});

/* 渲染常见问题编辑页面 */
router.get('/editService', function (req, res, next) {
    res.render('platform/editService.html', {
        currentUrl: "/platform/editService"
    });
});

/* 渲染运费设置页面 */
router.get('/freightTemplate', function (req, res, next) {
    res.render('platform/freightTemplate.html', {
        currentUrl: "/platform/freightTemplate"
    });
});

/* 渲染运费添加页面 */
router.get('/addFreightTemplate', function (req, res, next) {
    res.render('platform/addFreightTemplate.html', {
        currentUrl: "/platform/addFreightTemplate"
    });
});

/* 渲染运费编辑页面 */
router.get('/editfreightTemplate', function (req, res, next) {
    res.render('platform/editfreightTemplate.html', {
        currentUrl: "/platform/editfreightTemplate"
    });
});

/* 渲染专场列表页面 */
router.get('/specialSetting', function (req, res, next) {
    res.render('platform/specialSetting.html', {
        currentUrl: "/platform/specialSetting"
    });
});

/* 渲染留言反馈页面 */
router.get('/messageFeedback', function (req, res, next) {
    res.render('platform/messageFeedback.html', {
        currentUrl: "/platform/messageFeedback"
    });
});

/* 渲染公司介绍页面 */
router.get('/companySetting', function (req, res, next) {
    res.render('platform/companySetting.html', {
        currentUrl: "/platform/companySetting"
    });
});


// /* 渲染售后原因页面 */
// router.get('/afterSellReason', function (req, res, next) {
//     res.render('platform/afterSellReason.html', {
//         currentUrl: "/platform/afterSellReason"
//     });
// });
//
// /* 渲染设置页面 */
// router.get('/setting', function (req, res, next) {
//     res.render('platform/setting.html', {
//         currentUrl: "/platform/setting"
//     });
// });


module.exports = router;