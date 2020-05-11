$(function () {
    CommissionSetting.init();
})

var CommissionSetting = {
    init() {
        CommissionSetting.getDistributionSettingConfig();

        $('body').on('click', '#completeBtn', function () {
            if (!Validate.emptyValidateAndFocus("#UserFirstRate", "请输入VIP与下级的直接上级佣金比例", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#UserSecRate", "请输入VIP与下级的二级佣金比例", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#StoreFirstRate", "请输入门店与下级的直接上级佣金比例", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#StoreSecRate", "请输入门店与下级的二级佣金比例", "")) {
                return false;
            }
            CommissionSetting.settingConfig();
        })
    },

    // 后台获取佣金设置数据
    getDistributionSettingConfig: function () {
        var methodName = "/sSplitComm/AdminGetSplitCommSetting";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $("#UserFirstRate").val(data.Data.UserFirstRate);
                $("#UserSecRate").val(data.Data.UserSecRate);
                $("#StoreFirstRate").val(data.Data.StoreFirstRate);
                $("#StoreSecRate").val(data.Data.StoreSecRate);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    // 保存
    settingConfig: function () {
        var methodName = "/sSplitComm/AdminSetSplitCommSetting";
        var data = {
            "UserFirstRate": $("#UserFirstRate").val(),
            "UserSecRate": $("#UserSecRate").val(),
            "StoreFirstRate": $("#StoreFirstRate").val(),
            "StoreSecRate": $("#StoreSecRate").val(),
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

