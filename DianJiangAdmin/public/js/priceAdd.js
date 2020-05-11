$(function () {
    PriceAdd.init();
})

var PriceAdd ={
    RankType:0,

    init:function () {
        //上传品牌size
        uploadIconPic('#logo_upload_pick', '#logo_icon','/ranges/AdminUploadRangesLogo');

        // 区间类型改变
        $("#IntervalSelect").on("change",function () {
            var rankType = $(this).find("option:selected").val();
            PriceAdd.RankType = rankType;
            if (rankType==0){
                $(".input-rank-box").addClass("input-hidden");
                $("#greaterThan").removeClass("input-hidden");
            } else {
                $("#greaterThan").addClass("input-hidden");
                $(".input-rank-box").removeClass("input-hidden");
            }
        });

        $("#completeBtn").on("click",function () {
            if (!Validate.emptyValidateAndFocus("#DiscountName", "请输入价格名称", "")) {
                return false;
            }
            // if($("#logo_icon").attr("data-src") == "" || $("#logo_icon").attr("data-src") == null){
            //     Common.showInfoMsg("请上传价格图标");
            //     return false;
            // }
            if (PriceAdd.RankType == 0){
                if (!Validate.emptyValidateAndFocus("#greaterThan", "请输入大于数值", "")) {
                    return false;
                }
                var startValue = $("#greaterThan").val();
                PriceAdd.addDiscount(startValue,0);
            }
            if (PriceAdd.RankType == 1){
                if (!Validate.emptyValidateAndFocus("#rank1", "请输入范围的开始值", "")) {
                    return false;
                }
                if (!Validate.emptyValidateAndFocus("#rank2", "请输入范围的结束值", "")) {
                    return false;
                }
                var startValue = $("#rank1").val();
                var endValue = $("#rank2").val();
                PriceAdd.addDiscount(startValue,endValue);
            }
        });

    },

    addDiscount:function (startValue,endValue) {
        var methodName = "/ranges/AdminAddRangesInfo";
        var data = {
            "Name": $("#DiscountName").val(),
            "Logo":"",
            "Type": 1,
            "StartValue": startValue,
            "EndValue": endValue
        };
        console.log(data);
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('添加成功',function(){
                    window.location="/classify/priceList";
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
}