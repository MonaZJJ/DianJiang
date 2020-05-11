$(function () {
    ProductExport.init();
})

var ProductExport = {
    init: function () {
        ProductExport.getOrderSetting();
        // 初始化switch开关控件
        Common.initSwitch();

        //完成按钮的点击
        $('body').on('click', '#submit', function () {

            //下单超过时间未付款，订单关闭验证
            if (!Validate.emptyValidateAndFocus("#orderDay", "请输入下单超过的时间未付款，订单关闭", "")) {
                return false;
            }
            //发货超过时间未付款，订单自动完成
            if (!Validate.emptyValidateAndFocus("#sendDay", "请输入发货超过时间未付款，订单自动完成", "")) {
                return false;
            }
            //订单完成超过的天数，不能售后验证
            if (!Validate.emptyValidateAndFocus("#finishDay", "请输入订单完成超过的天数，不能售后", "")) {
                return false;
            }
            // 订单完成超过的天数，自动五星好评验证
            if (!Validate.emptyValidateAndFocus("#finishEvaluate", "请输入订单完成超过的天数，自动评价", "")) {
                return false;
            }
            // 下单所得积分
            if (!Validate.emptyValidateAndFocus("#orderAmount", "请输入下单所得积分比例", "")) {
                return false;
            }
            // 联系人名称
            if (!Validate.emptyValidateAndFocus("#Consignee", "请输入联系人名称", "")) {
                return false;
            }
            //联系电话
            if (!Validate.emptyValidateAndFocus("#Mobile", "请输入联系电话", "")) {
                return false;
            }
            // 地址
            if (!Validate.emptyValidateAndFocus("#Address", "请输入地址", "")) {
                return false;
            }
            // 地址
            if (!Validate.emptyValidateAndFocus("#CustomerPhone", "请输入客服联系电话", "")) {
                return false;
            }
            // 地址
            // if (!Validate.emptyValidateAndFocus("#PresentationPoints", "请输入订单完成赠送积分", "")) {
            //     return false;
            // }
            ProductExport.orderSetting()
        });
    },
//    订单设置
    orderSetting: function () {
        //请求方法
        var methodName = "/orderSetting/AdminSetMallSetting";
        var data = {
            "OrderLimitTime": $('#orderDay').val(),
            "SendTime": $('#sendDay').val(),
            "CompleteOrder": $('#finishDay').val(),
            "AutoGoodComments": $('#finishEvaluate').val(),
            "OrderAmount": $('#orderAmount').val(),
            "Consignee": $('#Consignee').val(),
            "Mobile": $('#Mobile').val(),
            "Address": $('#Address').val(),
            "CustomerPhone": $('#CustomerPhone').val(),
            "PresentationPoints": $('#PresentationPoints').val()
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('设置成功', function () {
                    location.reload();
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
//    获得订单设置
    getOrderSetting: function () {
        //请求方法
        var methodName = "/orderSetting/AdminGetMallSetting";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $('#orderDay').val(data.Data.OrderLimitTime);
                $('#sendDay').val(data.Data.SendTime);
                $('#finishDay').val(data.Data.CompleteOrder);
                $('#finishEvaluate').val(data.Data.AutoGoodComments);
                $('#orderAmount').val(data.Data.OrderAmount);
                $('#Consignee').val(data.Data.Consignee);
                $('#Mobile').val(data.Data.Mobile);
                $('#Address').val(data.Data.Address);
                $('#CustomerPhone').val(data.Data.CustomerPhone);
                $('#PresentationPoints').val(data.Data.PresentationPoints);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
}

