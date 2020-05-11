var IntegralSet = {
    init: function () {

        IntegralSet.adminGetCreditInfo();
        //收缩效果
        $(".img_toggle").click(function () {
            $(this).parents().next(".row").find('.chart_1').slideToggle();
            $(this).children().toggle();
        })
        //提交按钮点击
        $('body').on('click','#finish',function(){
            //收货地址
            if (!Validate.emptyValidateAndFocusAndColor("#address", "请输入完善您的收货地址获取的积分", "")) {
                return false;
            }
            //个人信息
            if (!Validate.emptyValidateAndFocusAndColor("#personal", "请输入完善您的个人信息获取的积分", "")) {
                return false;
            }
            //签到1
            if (!Validate.emptyValidateAndFocusAndColor("#one", "请输入签到第一天获取的积分", "")) {
                return false;
            }
            //签到2
            if (!Validate.emptyValidateAndFocusAndColor("#two", "请输入签到第二天获取的积分", "")) {
                return false;
            }
            //签到3
            if (!Validate.emptyValidateAndFocusAndColor("#three", "请输入签到第三天获取的积分", "")) {
                return false;
            }
            //签到4
            if (!Validate.emptyValidateAndFocusAndColor("#four", "请输入签到第四天获取的积分", "")) {
                return false;
            }
            //签到5
            if (!Validate.emptyValidateAndFocusAndColor("#five", "请输入签到第五天获取的积分", "")) {
                return false;
            }
            //签到6
            if (!Validate.emptyValidateAndFocusAndColor("#six", "请输入签到第六天获取的积分", "")) {
                return false;
            }
            //签到7
            if (!Validate.emptyValidateAndFocusAndColor("#serven", "请输入签到第七天获取的积分", "")) {
                return false;
            }
            //新用户注册
            if (!Validate.emptyValidateAndFocusAndColor("#new", "请输入新用户注册获取的积分", "")) {
                return false;
            }
            //购物满1元
            if (!Validate.emptyValidateAndFocusAndColor("#money", "请输入购物满1元获取的积分", "")) {
                return false;
            }
            //分享好友注册成功
            if (!Validate.emptyValidateAndFocusAndColor("#share", "请输入分享好友注册成功获取的积分", "")) {
                return false;
            }
            IntegralSet.adminSetCreditInfo();
        })
    },
    //获取积分设置接口
    adminGetCreditInfo: function () {
        var methodName = "/credit/AdminGetCreditInfo";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                $('#address').val(data.Data.ShipAddressTask)
                $('#personal').val(data.Data.PersonalInfoTask)
                $('#one').val(data.Data.ClockOneDay)
                $('#two').val(data.Data.ClockTwoDay)
                $('#three').val(data.Data.ClockThreeDay)
                $('#four').val(data.Data.ClockFourDay)
                $('#five').val(data.Data.ClockFiveDay)
                $('#six').val(data.Data.ClockSixDay)
                $('#serven').val(data.Data.ClockSevenDay)
                $('#new').val(data.Data.RegisterCredit)
                $('#money').val(data.Data.BuyCredit)
                $('#share').val(data.Data.DistRegisterCredit)

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台编辑积分设置
    adminSetCreditInfo: function () {
        var methodName = "/credit/AdminSetCreditInfo";
        var data = {
            ShipAddressTask:$('#address').val(),
            PersonalInfoTask:$('#personal').val(),
            ClockOneDay:$('#one').val(),
            ClockTwoDay:$('#two').val(),
            ClockThreeDay:$('#three').val(),
            ClockFourDay:$('#four').val(),
            ClockFiveDay:$('#five').val(),
            ClockSixDay:$('#six').val(),
            ClockSevenDay:$('#serven').val(),
            RegisterCredit:$('#new').val(),
            BuyCredit:$('#money').val(),
            DistRegisterCredit:$('#share').val(),
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('设置成功',function(){
                    IntegralSet.adminGetCreditInfo()
                })

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
};
$(function () {
    IntegralSet.init()
})