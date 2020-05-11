var express = require('express');
var router = express.Router();

/* 渲染会员列表页 */
router.get('/memberList', function (req, res, next) {
    res.render('member/member_list.html',{
        currentUrl : "/member/memberList"
    });
});


/* 渲染会员详情页 */
router.get('/memberDetailInfo', function (req, res, next) {
    res.render('member/member_detailInfo.html',{
        currentUrl : "/member/memberDetailInfo"
    });
});

//供货商列表页
router.get('/businessList', function (req, res, next) {
    res.render('member/businessList.html',{
        currentUrl : "/member/businessList"
    });
});


//vip设置页
router.get('/vipSetting', function (req, res, next) {
    res.render('member/vipSetting.html',{
        currentUrl : "/member/vipSetting"
    });
});

//浏览记录页
router.get('/memberRecord', function (req, res, next) {
    res.render('member/memberRecord.html',{
        currentUrl : "/member/memberRecord"
    });
});

module.exports = router;