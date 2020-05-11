var Benefits = {
    init: function () {
        Benefits.adminGetAboutUs();


        //保存按钮点击Benefits
        $('body').on('click', '#nextStep', function () {
            //充值金额
            // if (!Validate.emptyValidateAndFocus("#money", "请输入充值金额", "")) {
            //     return false;
            // }
            //标题
            if (!Validate.emptyValidateAndFocus("#Title", "请输入标题", "")) {
                return false;
            }
            //简介
            if (!Validate.emptyValidateAndFocus("#Summary", "请输入简介", "")) {
                return false;
            }
            //规则
            if (!Validate.emptyValidateAndFocus("#rule", "请输入规则", "")) {
                return false;
            }
            Benefits.addStoreAnnouncement();
        })
    },
//    设置
    addStoreAnnouncement: function () {
        //请求方法
        var methodName = "/OrderSetting/AdminEditApplyRules";
        var data = {
            "Type": 1,
            "Title": $('#Title').val(),
            "Summary": $('#Summary').val(),
            "Rules": $('#rule').val(),
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('设置成功', function () {
                    location.href = '/homePage/partner'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取信息
    adminGetAboutUs: function () {
        var methodName = "/OrderSetting/AdminGetApplyRules";
        var data = {
            "Type": 1
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $('#Title').val(data.Data.Title)
                $('#Summary').val(data.Data.Summary)
                $('#rule').val(data.Data.Rules)
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
}
$(function () {
    Benefits.init();
})