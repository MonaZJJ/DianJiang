var express = require('express');
var router = express.Router();

/* 商品分类列表页 */
router.get('/classifyList', function (req, res, next) {
    res.render('classify/classifyList.html',{
        currentUrl :"/classify/classifyList"
    });
});
/* 商品分类添加页 */
router.get('/classifyAdd', function (req, res, next) {
    res.render('classify/classifyAdd.html',{
        currentUrl :"/classify/classifyAdd"
    });
});
/* 商品分类编辑页 */
router.get('/classifyEdit', function (req, res, next) {
    res.render('classify/classifyEdit.html',{
        currentUrl :"/classify/classifyAdd"
    });
});
/* 商品类型列表页 */
router.get('/typeList', function (req, res, next) {
    res.render('classify/typeList.html',{
        currentUrl :"/classify/typeList",
        IsStoreManager:req.session.isStoreManager
    });
});
/* 商品类型添加类型名称页 */
router.get('/typeAdd_name', function (req, res, next) {
    res.render('classify/typeAdd_name.html',{
        currentUrl :"/classify/typeAdd_name",
        IsStoreManager:req.session.isStoreManager
    });
});
/* 商品类型添加扩展属性页 */
router.get('/typeAdd', function (req, res, next) {
    res.render('classify/typeAdd.html',{
        currentUrl :"/classify/typeAdd",
        IsStoreManager:req.session.isStoreManager
    });
});
/* 商品类型编辑类型名称页 */
router.get('/typeEdit_name', function (req, res, next) {
    res.render('classify/typeEdit_name.html',{
        currentUrl :"/classify/typeEdit_name",
        IsStoreManager:req.session.isStoreManager
    });
});
/* 商品类型添加扩展属性页 */
router.get('/typeEdit', function (req, res, next) {
    res.render('classify/typeEdit.html',{
        currentUrl :"/classify/typeEdit",
        IsStoreManager:req.session.isStoreManager
    });
});


/* 商品分类添加页 */
router.get('/classifySet', function (req, res, next) {
    res.render('classify/classifySet.html',{
        currentUrl :"/classify/classifySet"
    });
});
/* 商品类型添加规格页 */
router.get('/typeAdd_third', function (req, res, next) {
    res.render('classify/typeAdd_third.html',{
        currentUrl :"/classify/typeAdd_third",
        IsStoreManager:req.session.isStoreManager
    });
});
/* 商品新规格值页 */
router.get('/ruleAdd', function (req, res, next) {
    res.render('classify/ruleAdd.html',{
        currentUrl :"/classify/ruleAdd",
        IsStoreManager:req.session.isStoreManager
    });
});
/* 商品新规格值/（第三步）页 */
router.get('/ruleAdd_third', function (req, res, next) {
    res.render('classify/ruleAdd_third.html',{
        currentUrl :"/classify/ruleAdd_third",
        IsStoreManager:req.session.isStoreManager
    });
});

/* 渲染商品品牌编辑页 */
router.get('/editBrand', function (req, res, next) {
    res.render('brand/productEditBrand.html',{
        currentUrl :"/classify/editBrand"
    });
});

/* 渲染商品品牌页 */
router.get('/brandList', function (req, res, next) {
    res.render('brand/productBrand.html',{
        currentUrl :"/classify/brandList",
    });
});

/* 价格列表页 */
router.get('/priceList', function (req, res, next) {
    res.render('classify/priceList.html',{
        currentUrl :"/classify/priceList"
    });
});
/* 价格区间添加页 */
router.get('/priceAdd', function (req, res, next) {
    res.render('classify/priceAdd.html',{
        currentUrl :"/classify/priceAdd"
    });
});
/* 价格区间编辑页 */
router.get('/priceEdit', function (req, res, next) {
    res.render('classify/priceEdit.html',{
        currentUrl :"/classify/priceEdit"
    });
});


module.exports = router;