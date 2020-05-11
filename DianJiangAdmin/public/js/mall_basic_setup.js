$(function () {
    basicSetup.init();
})

var basicSetup={
    init:function () {
        basicSetup.getbasicSetting(); //初始化获取基本设置数据

        // //初始化富文本编辑器
        // var ue = UE.getEditor('regEditor');
        //
        // ue.ready(function () {
        // });

        //完成按钮的点击
        $('.basicsetup-btn').on('click','#nextStep',function(){
            var goodsKind = $('#goodsKind').val();
            var servicePhone = $('#servicePhone').val();
            var websiteTitle = $('#websiteTitle').val();
            var websiteUrl = $('#websiteUrl').val();
            var recordInfo = $('#recordInfo').val();
            // var Description = ue.getContent();
            //商品种类验证
            if (!Validate.emptyValidateAndFocus("#goodsKind", "请输入商品种类", "")) {
                return false;
            }
            //客服电话验证
            if (!Validate.emptyValidateAndFocus("#servicePhone", "请输入客服电话", "")) {
                return false;
            }
            //网站标题验证
            if (!Validate.emptyValidateAndFocus("#websiteTitle", "请输入网站标题", "")) {
                return false;
            }
            // //网站网址验证
            // if (!Validate.emptyValidateAndFocus("#websiteUrl", "请输入网站网址", "")) {
            //     return false;
            // }
            // //备案信息验证
            // if (!Validate.emptyValidateAndFocus("#recordInfo", "请输入备案信息", "")) {
            //     return false;
            // }
            // //会员注册协议验证
            // if (!Description){
            //     Common.showErrorMsg("请填入会员注册协议!");
            //     return false;
            // }
            basicSetup.submitBasicSetup(goodsKind,servicePhone,websiteTitle,websiteUrl,recordInfo);
        });
    },

//    提交基本设置
    submitBasicSetup:function (goodskind,servicephone,websitetitle,websiteurl,recordinfo,description) {
        //请求方法
        var methodName = "/shoppingsetting/AdminShoppingBasicSetup";
        var data = {
            "ShoppingName":goodskind,
            "CustomerPhone": servicephone,
            "WebsiteTitle": websitetitle,
            "WebsiteUrl": websiteurl,
            "RecordInformation": recordinfo,
            "MemBerRegAgre": description
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('提交成功!')
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //    获得基本设置
    getbasicSetting:function () {
        //请求方法
        var methodName = "/shoppingsetting/AdminShoppingBasicSetupData";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                // var ue = UE.getEditor('regEditor');
                var result = data.Data;
                $('#goodsKind').val(result.ShoppingName);
                $('#servicePhone').val(result.CustomerPhone);
                $('#websiteTitle').val(result.WebsiteTitle);
                $('#websiteUrl').val(result.WebsiteUrl);
                $('#recordInfo').val(result.RecordInformation);
                // var html = ue.setContent(result.MemBerRegAgre);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }

}