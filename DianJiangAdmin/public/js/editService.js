$(function () {
    Setting.init();
})

var Setting = {
    init: function () {

        //初始化富文本编辑器
        var ue = UE.getEditor('hcEditor', {initialFrameHeight: 500, initialFrameWidth: 700, autoHeightEnabled: false});
        ue.ready(function () {
            Setting.getDetail();
        });

        //点击提交按钮
        $("#submitBtn").click(function () {
            if (!Validate.emptyValidateAndFocus("#title", "请输入标题", "")) {
                return false;
            }
            Setting.editDetail();
        })

        //取消按钮
        $("#cancelBtn").click(function () {
            window.location.href = '/platform/platformService';
        })
    },

    //获取
    getDetail:function(){
        var methodName = "/indexDatas/AdminHelpsInfo";
        var data = {
            "HId": Common.getUrlParam("id"),
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
               $("#title").val(data.Data.Title);
                var ue = UE.getEditor('hcEditor');
                ue.setContent(data.Data.Description);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑
    editDetail: function () {
        var ue = UE.getEditor('hcEditor');
        var explain = ue.getContent();
        var methodName = "/indexDatas/AdminEditHelps";
        var data = {
            "HId": Common.getUrlParam("id"),
            "Title": $("#title").val(),
            "Description": explain
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功",function () {
                    location.href = "/platform/platformService"
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
};