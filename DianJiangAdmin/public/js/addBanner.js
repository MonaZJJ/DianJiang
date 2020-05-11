$(function () {
    AddBanner.init();
})

var AddBanner = {
    state: 1,

    objectTypeTpl:`
         <option value="0" selected>请选择</option>
         {{each List as value i}}
          <option value="{{List[i].Id}}" >{{List[i].Name}}</option>
         {{/each}}
    `,

    init: function () {

        $('input[name="States"]').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue',
            increaseArea: '20%' // optional
        });

        $('input:radio[name="States"]').on('ifClicked', function(event){
            if ($(this).hasClass("open")) {
                AddBanner.state = 1;
            }else {
                AddBanner.state = 0;
            }
        });
        
        //上传图片
        uploadIconPic("#small_upload_pick", "#small_icon", "/indexDatas/AdminUploadBannerImg");

        //类型选择
        $("#type").on("change",function () {
             var val = $(this).val();
             if(val == 1){
                 $(".objectDiv").show();
                 AddBanner.getObject(1);
             }else if(val == 2){
                 $(".objectDiv").show();
                 AddBanner.getObject(2);
             } else if(val == 3){
                 $(".objectDiv").show();
                 AddBanner.getObject(3);
             } else {
                 $(".objectDiv").hide();
             }
        })

        //点击取消按钮
        $("#cancelBtn").click(function () {
            window.location.href = '/platform/bannerList';
        });

        //点击提交按钮
        $("#submitBtn").click(function () {
            // 名称验证
            if (!Validate.emptyValidateAndFocus("#Title", "请输入标题名称", "")) {
                return false;
            }
            var Icon = $('#small_icon').attr('data-src');
            //图片验证
            if (Icon == null || Icon == undefined) {
                Common.showInfoMsg('请先上传图片');
                return false;
            }
            var type = $("#type").val();
            if(type != 0){
                if ($("#objectType").val() == 0){
                    Common.showInfoMsg('请选择跳转对象');
                    return false;
                }
            }
            AddBanner.addDetail();
        });

    },
    
    //获取对象
    getObject:function(type){
        var methodName = "/indexDatas/AdminBannerTypeList";
        var data = {
            "Type": type,
            "Name": ""
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(AddBanner.objectTypeTpl);
                var html = render(data.Data);
                $("#objectType").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //新增
    addDetail: function () {
        var methodName = "/indexDatas/AdminAddBanner";
        var data = {
            "State": AddBanner.state,
            "DisplayOrder": Number($("#DisplayOrder").val()),
            "Title": $("#Title").val(),
            "Image": $("#small_icon").attr("data-src"),
            "Type":$("#type").val(),
            "LinkId": $("#type").val() == 0 ? 0: $("#objectType").val()
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("添加成功",function () {
                   window.location.href = '/platform/bannerList';
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
};