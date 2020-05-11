$(function () {
    Setting.init();
})

var Setting = {
    init: function () {

        //初始化富文本编辑器
        var ue = UE.getEditor('gradeEditor', {
            initialFrameHeight: 600,
            initialFrameWidth: 700,
            autoHeightEnabled: false
        });
        ue.ready(function () {
            Setting.getDetail();
        });

        //点击提交按钮
        $("#submitBtn").click(function () {
            Setting.editDetail();
        })
    },

    //获取详情
    getDetail: function () {
        var methodName = "/orderSetting/AdminGetCompanyDetails";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var ue = UE.getEditor('gradeEditor');
                ue.setContent(data.Data.CompanyDetails);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑
    editDetail: function () {
        var ue = UE.getEditor('gradeEditor');
        var grade = ue.getContent();
        var methodName = "/orderSetting/AdminEditCompanyDetails";
        var data = {
            "CompanyDetails": grade,
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("设置成功", function () {
                    location.reload();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
};