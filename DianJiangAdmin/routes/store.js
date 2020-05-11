var express = require('express');
var router = express.Router();

/* 渲染门店列表 */
router.get('/storeList', function(req, res, next) {
    res.render('store/storeList.html', {
        currentUrl: "/store/storeList",
    });
});

/* 渲染门店添加页面 */
router.get('/addStore', function(req, res, next) {
    res.render('store/addStore.html', {
        currentUrl: "/store/addStore",
    });
});

/* 渲染门店编辑页面 */
router.get('/editStore', function(req, res, next) {
    res.render('store/editStore.html', {
        currentUrl: "/store/editStore",
    });
});
/* 渲染门店订单页面 */
router.get('/storeOrder', function(req, res, next) {
    res.render('store/storeOrder.html', {
        currentUrl: "/store/storeOrder",
    });
});



module.exports = router;