$(function () {
    Setting.init();
})

var Setting = {
    init: function () {

        //初始化富文本编辑器
        var ue = UE.getEditor('hcEditor', {initialFrameHeight: 500, initialFrameWidth: 700, autoHeightEnabled: false});
        ue.ready(function () {
           
        });

        //点击提交按钮
        $("#submitBtn").click(function () {
            if (!Validate.emptyValidateAndFocus("#title", "请输入标题", "")) {
                return false;
            }
            Setting.addDetail();
        })

        //取消按钮
        $("#cancelBtn").click(function () {
            window.location.href = '/platform/platformService';
        })

    },

    //添加
    addDetail: function () {
        var ue = UE.getEditor('hcEditor');
        var explain = ue.getContent();
        var methodName = "/indexDatas/AdminAddHelps";
        var data = {
            "Title": $("#title").val(),
            "Description": explain,
            // "DisplayOrder": Number($("#DisplayOrder").val())
            "DisplayOrder": 0
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("添加成功",function () {
                    location.href = "/platform/platformService"
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
};