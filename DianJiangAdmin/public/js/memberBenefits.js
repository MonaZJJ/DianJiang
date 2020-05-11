var Benefits={
    init:function () {
        var ue = UE.getEditor('hcEditor');
        ue.ready(function () {
            ue.setHeight(500);
            Benefits.adminGetAboutUs();
        });

        //初始化富文本编辑器
        var ue = UE.getEditor('hcEditor');

        //保存按钮点击Benefits
        $('body').on('click','#nextStep',function(){
            if(ue.getContent() == "" || ue.getContent() == null){
                Common.showInfoMsg('请输入权益内容')
                return false
            }
            //充值最低金额
            if (!Validate.emptyValidateAndFocus("#money", "请输入充值最低金额", "")) {
                return false;
            }
            Benefits.addStoreAnnouncement();
        })
    },
//    设置
    addStoreAnnouncement:function () {
        var ue = UE.getEditor('hcEditor');
        var Description = ue.getContent();
        //请求方法
        var methodName = "/Distribution/EquityRulesSettingConfig";
        var data = {
            "EquityRules": Description,
            "LimitRecharge": $('#money').val(),
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('设置成功',function(){
                    location.href = '/homePage/memberBenefits'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取信息
    adminGetAboutUs:function () {
        var ue = UE.getEditor('hcEditor');

        var methodName = "/Distribution/AdminGetEquityRulesSettingConfig";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                ue.setContent(data.Data.EquityRules);
                $('#money').val(data.Data.LimitRecharge)
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
}
$(function () {
    Benefits.init();
})