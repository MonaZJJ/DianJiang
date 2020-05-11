var express = require('express');
var router = express.Router();

/* 普通分销员列表页 */
router.get('/distributorList', function (req, res, next) {
    res.render('distribution/distributor_list.html',{
        currentUrl :"/distribution/distributorList"
    });
});

/* 门店分销员列表页 */
router.get('/distributorStoreList', function (req, res, next) {
    res.render('distribution/distributorStore_list.html',{
        currentUrl :"/distribution/distributorStoreList"
    });
});

/* 普通分销明细页（直接下级数） */
router.get('/distributionSubsidiary', function (req, res, next) {
    res.render('distribution/distribution_subsidiary.html',{
        currentUrl :"/distribution/distributionSubsidiary"
    });
});

/* 门店分销明细页（直接下级数） */
router.get('/distributionStoreSubsidiary', function (req, res, next) {
    res.render('distribution/distributionStore_subsidiary.html',{
        currentUrl :"/distribution/distributionStoreSubsidiary"
    });
});

/* 佣金列表页 */
router.get('/commissionList', function (req, res, next) {
    res.render('distribution/commission_list.html',{
        currentUrl :"/distribution/commissionList"
    });
});

/* 佣金明细页 */
router.get('/commissionSubsidiary', function (req, res, next) {
    res.render('distribution/commission_subsidiary.html',{
        currentUrl :"/distribution/commissionSubsidiary"
    });
});

/* 佣金设置页 */
router.get('/commissionSetting', function (req, res, next) {
    res.render('distribution/commission_setting.html',{
        currentUrl :"/distribution/commissionSetting"
    });
});

/*提现审核列表页 */
router.get('/withdrawList', function (req, res, next) {
    res.render('distribution/withdraw_list.html',{
        currentUrl :"/distribution/withdrawList"
    });
});

/*历史提现列表页 */
router.get('/withdrawHistory', function (req, res, next) {
    res.render('distribution/withdraw_history.html',{
        currentUrl :"/distribution/withdrawHistory"
    });
});

/*提现设置页 */
router.get('/withdrawSetting', function (req, res, next) {
    res.render('distribution/withdraw_setting.html',{
        currentUrl :"/distribution/withdrawSetting"
    });
});

module.exports = router;