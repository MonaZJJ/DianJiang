$(function () {
    priceEdit.init();
})

var priceEdit ={
    RankType:0,

    init:function () {
        priceEdit.getRangesInfo();
        //上传品牌size
        uploadIconPic('#logo_upload_pick', '#logo_icon','/ranges/AdminUploadRangesLogo');

        // 区间类型改变
        $("#IntervalSelect").on("change",function () {
            var rankType = $(this).find("option:selected").val();
            priceEdit.RankType = rankType;
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
            if (priceEdit.RankType == 0){
                if (!Validate.emptyValidateAndFocus("#greaterThan", "请输入大于数值", "")) {
                    return false;
                }
                var startValue = $("#greaterThan").val();
                priceEdit.EditDiscount(startValue,0);
            }
            if (priceEdit.RankType == 1){
                if (!Validate.emptyValidateAndFocus("#rank1", "请输入范围的开始值", "")) {
                    return false;
                }
                if (!Validate.emptyValidateAndFocus("#rank2", "请输入范围的结束值", "")) {
                    return false;
                }
                var startValue = $("#rank1").val();
                var endValue = $("#rank2").val();
                priceEdit.EditDiscount(startValue,endValue);
            }
        });

    },

    getRangesInfo:function(){
        var methodName = "/ranges/AdminRangesInfo";
        var data = {
            "RecordId":Common.getUrlParam("id")
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $("#DiscountName").val(data.Data.AdminRangesInfos.Name);
                $("#logo_icon").attr("src",data.Data.AdminRangesInfos.FullLogo);
                $("#logo_icon").attr("data-src",data.Data.AdminRangesInfos.Logo);
                if (data.Data.AdminRangesInfos.EndValue==0){
                    priceEdit.RankType = 0;
                    $("#IntervalSelect option[value='0']").attr("selected","selected");
                    $("#greaterThan").val(data.Data.AdminRangesInfos.StartValue);
                } else {
                    priceEdit.RankType = 1;
                    $("#IntervalSelect option[value='1']").attr("selected","selected");
                    $("#rank1").val(data.Data.AdminRangesInfos.StartValue);
                    $("#rank2").val(data.Data.AdminRangesInfos.EndValue);
                    $("#greaterThan").addClass("input-hidden");
                    $(".input-rank-box").removeClass("input-hidden");
                }
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    EditDiscount:function (startValue,endValue) {
        var methodName = "/ranges/AdminEditRangesInfo";
        var data = {
            "RecordId":Common.getUrlParam("id"),
            "Name": $("#DiscountName").val(),
            "Logo": "",
            "Type": 1,
            "StartValue": startValue,
            "EndValue": endValue
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('编辑成功',function(){
                    window.location="/classify/priceList";
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
}