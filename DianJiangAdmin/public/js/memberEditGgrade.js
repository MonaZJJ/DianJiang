$(function () {
    MemberGrade.init();
})


var MemberGrade = {

    IsDefault:"",


    init: function () {

        MemberGrade.adminUserRank();

        $('body').on('click','#editsubmit',function(){
            var name = $('#memberName').val().trim();
            var creditsLower = $('#creditsLower').val().trim();
            var memberPrice = $('#memberPrice').val().trim();
            var note = $('#note').val().trim();
            if (!Validate.emptyValidateAndFocus("#memberName", "请输入会员等级名称", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#creditsLower", "请输入积分满足点数", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#memberPrice", "请输入会员等级价格", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#note", "请输入备注", "")) {
                return false;
            }
            MemberGrade.adminEditUserRank(name,creditsLower,memberPrice,note)
        })

        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue',
            increaseArea: '20%' // optional
        });
        $('#stuCheckBox').on('ifChecked', function (event) { //ifCreated 事件应该在插件初始化之前绑定
            MemberGrade.IsDefault = 1;
        });
        $('#stuCheckBox2').on('ifChecked', function (event) { //ifCreated 事件应该在插件初始化之前绑定
            MemberGrade.IsDefault = 0;
        });



    },
    //后台编辑bi信息
    adminEditUserRank: function (name,creditsLower,memberPrice,note) {
        //请求方法
        var methodName = "/userRank/AdminEditUserRank";
        var data = {
            "UserRId": Common.getUrlParam('id'),
            "Title": name,
            "CreditsLower": creditsLower,
            "IsDefault": MemberGrade.IsDefault,
            "Note": note,
            "RankPrice": memberPrice
        };
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('编辑成功', function () {
                    location.href="/member/memberGrade"
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取后台会员等级信息
    adminUserRank:function(){
        //请求方法
        var methodName = "/userRank/AdminUserRank";
        var data = {
            "UserRId": Common.getUrlParam('id')
        };
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                $('#memberName').val(data.Data.UserRankInfo.Title);
                $('#creditsLower').val(data.Data.UserRankInfo.CreditsLower);
                $('#memberPrice').val(data.Data.UserRankInfo.RankPrice);
                $('#note').val(data.Data.UserRankInfo.Note);
                if(data.Data.UserRankInfo.IsDefault == "1"){
                    MemberGrade.IsDefault = 1;
                    $('#stuCheckBox').iCheck('check');
                }else if(data.Data.UserRankInfo.IsDefault == "0"){
                    MemberGrade.IsDefault = 0;
                    $('#stuCheckBox2').iCheck('check');
                }

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },


}
