var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('product/product_release.html',{
        currentUrl :"/product/productRelease"
    });
});

/* 渲染商品列表页 */
router.get('/productList', function (req, res, next) {
    res.render('product/product_list.html',{
        currentUrl :"/product/productList"
    });
});

/* 渲染商品评价页 */
router.get('/productEvaluate', function (req, res, next) {
    res.render('product/product_evaluate.html',{
        currentUrl :"/product/productEvaluate"
    });
});


//新加
/* 商品分类列表页 */
router.get('/classifyList', function (req, res, next) {
    res.render('classify/classifyList.html',{
        currentUrl :"/product/classifyList"
    });
});
/* 商品分类添加页 */
router.get('/classifyAdd', function (req, res, next) {
    res.render('classify/classifyAdd.html',{
        currentUrl :"/product/classifyAdd"
    });
});
/* 商品分类编辑页 */
router.get('/classifyEdit', function (req, res, next) {
    res.render('classify/classifyEdit.html',{
        currentUrl :"/product/classifyAdd"
    });
});

/* 商品类型列表页 */
router.get('/typeList', function (req, res, next) {
    res.render('classify/typeList.html',{
        currentUrl :"/product/typeList",
    });
});
/* 商品类型添加类型名称页 */
router.get('/typeAdd_name', function (req, res, next) {
    res.render('classify/typeAdd_name.html',{
        currentUrl :"/product/typeAdd_name",
    });
});
/* 商品类型添加扩展属性页 */
router.get('/typeAdd', function (req, res, next) {
    res.render('classify/typeAdd.html',{
        currentUrl :"/product/typeAdd",
    });
});
/* 商品类型编辑类型名称页 */
router.get('/typeEdit_name', function (req, res, next) {
    res.render('classify/typeEdit_name.html',{
        currentUrl :"/product/typeEdit_name",
    });
});
/* 商品类型添加扩展属性页 */
router.get('/typeEdit', function (req, res, next) {
    res.render('classify/typeEdit.html',{
        currentUrl :"/product/typeEdit",
    });
});

/* 渲染商品品牌页 */
router.get('/brandList', function (req, res, next) {
    res.render('brand/productBrand.html',{
        currentUrl :"/product/brandList",
    });
});
/* 渲染商品品牌编辑页 */
router.get('/editBrand', function (req, res, next) {
    res.render('brand/productEditBrand.html',{
        currentUrl :"/product/editBrand"
    });
});

/* 商品分类添加页 */
router.get('/classifySet', function (req, res, next) {
    res.render('classify/classifySet.html',{
        currentUrl :"/product/classifySet"
    });
});
/* 商品类型添加规格页 */
router.get('/typeAdd_third', function (req, res, next) {
    res.render('classify/typeAdd_third.html',{
        currentUrl :"/product/typeAdd_third",
    });
});
/* 商品新规格值页 */
router.get('/ruleAdd', function (req, res, next) {
    res.render('classify/ruleAdd.html',{
        currentUrl :"/product/ruleAdd",
    });
});
/* 商品新规格值/（第三步）页 */
router.get('/ruleAdd_third', function (req, res, next) {
    res.render('classify/ruleAdd_third.html',{
        currentUrl :"/product/ruleAdd_third",
    });
});

/* 渲染商品标签页 */
router.get('/productLabel', function (req, res, next) {
    res.render('brand/productLabel.html',{
        currentUrl :"/product/productLabel"
    });
});


module.exports = router;