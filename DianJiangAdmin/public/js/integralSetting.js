$(function () {
    Setting.init();
})

var Setting = {
    init: function () {

        //上传图片
        uploadIconPic("#small_upload_pick", "#small_icon", "/creditMall/AdminUploadCreditProductImg")
        //初始化富文本编辑器
        var ue = UE.getEditor('hcEditor', {initialFrameHeight: 500, initialFrameWidth: 700, autoHeightEnabled: false});
        ue.ready(function () {
            Setting.getDetail();
        });

        //点击提交按钮
        $("#submitBtn").click(function () {
            Setting.editDetail();
        })
    },

    //获取积分商城详情
    getDetail: function () {
        var methodName = "/mallSetting/AdminGetCreditMall";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $("#small_icon").attr("data-src", data.Data.CreditMallImg);
                $("#small_icon").attr("src", data.Data.CreditMallImgFull);
                var ue = UE.getEditor('hcEditor');
                ue.setContent(data.Data.CreditProductConvRule);
                $("#discount").val(data.Data.VipDiscount);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑积分商城
    editDetail: function () {
        var ue = UE.getEditor('hcEditor');
        var explain = ue.getContent();
        var methodName = "/mallSetting/AdminSetCreditMall";
        var data = {
            "CreditMallImg": $("#small_icon").attr("data-src"),
            "CreditProductConvRule": explain,
            "VipDiscount":$("#discount").val()
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("设置成功",function () {
                    location.reload();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
};