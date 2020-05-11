var express = require('express');
var router = express.Router();

/* 提现列表 */
router.get('/withdrawalList', function (req, res, next) {
    res.render('commission/withdrawalList.html',{
        currentUrl :"/commission/withdrawalList"
    });
});
/* 历史提现列表 */
router.get('/historicalWithdrawal', function (req, res, next) {
    res.render('commission/historicalWithdrawal.html',{
        currentUrl :"/commission/historicalWithdrawal"
    });
});
/* 提现设置 */
router.get('/withdrawConfig', function (req, res, next) {
    res.render('commission/withdrawConfig.html',{
        currentUrl :"/commission/withdrawConfig"
    });
});

/* 佣金设置 */
router.get('/commissionSetting', function (req, res, next) {
    res.render('commission/commissionSetting.html',{
        currentUrl :"/commission/commissionSetting"
    });
});

//佣金列表
router.get('/commissionList', function (req, res, next) {
    res.render('commission/commission_list.html',{
        currentUrl :"/commission/commissionList"
    });
});



module.exports = router;