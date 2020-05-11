$(function () {
    WithdrawSetting.init();
})

var WithdrawSetting = {
    init() {
        WithdrawSetting.getDistributionSettingConfig();

        $('body').on('click', '#completeBtn', function () {
            if (!Validate.emptyValidateAndFocus("#SplitLimitAmount", "请输入每日最高可提现金额", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#SplitLowAmount", "请输入每日最低可提现金额", "")) {
                return false;
            }
            WithdrawSetting.settingConfig();
        })
    },

    // 获取数据
    getDistributionSettingConfig: function () {
        var methodName = "/sSplitComm/AdminGetWithdrawSetting";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $("#SplitLimitAmount").val(data.Data.SplitLimitAmount);        //每日最高可提现金额
                $("#SplitLowAmount").val(data.Data.SplitLowAmount);            //每日最低可提现金额
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    // 保存
    settingConfig: function () {
        var methodName = "/sSplitComm/AdminSetWithdrawSetting";
        var data = {
            "SplitLimitAmount": $("#SplitLimitAmount").val(),
            "SplitLowAmount": $("#SplitLowAmount").val(),
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('保存成功', function () {
                    location.reload();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
}

