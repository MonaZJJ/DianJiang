$(function () {
    EditBanner.init();
})

var EditBanner = {
    state: 0,  //状态

    objectTypeTpl: `
         <option value="0" selected>请选择</option>
         {{each List as value i}}
          <option value="{{List[i].Id}}" >{{List[i].Name}}</option>
         {{/each}}
    `,

    init: function () {
        EditBanner.getDetail();

        $('input[name="States"]').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue',
            increaseArea: '20%' // optional
        });

        $('input:radio[name="States"]').on('ifClicked', function (event) {
            if ($(this).hasClass("open")) {
                EditBanner.state = 1;
            } else {
                EditBanner.state = 0;
            }
        });

        //上传图片
        uploadIconPic("#small_upload_pick", "#small_icon", "/indexDatas/AdminUploadBannerImg");

        //类型选择
        $("#type").on("change", function () {
            var val = $(this).val();
            if (val == 1) {
                $(".objectDiv").show();
                EditBanner.getObject(1, function () {
                });
            } else if (val == 2) {
                $(".objectDiv").show();
                EditBanner.getObject(2, function () {
                });
            } else if (val == 3) {
                $(".objectDiv").show();
                EditBanner.getObject(3, function () {
                });
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
            if (type != 0) {
                if ($("#objectType").val() == 0) {
                    Common.showInfoMsg('请选择跳转对象');
                    return false;
                }
            }
            EditBanner.editDetail();
        });

    },

    //获取详情
    getDetail: function () {
        var methodName = "/indexDatas/AdminBannerInfo";
        var data = {
            "BId": Common.getUrlParam("id")
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $("#Title").val(data.Data.Title);
                if (data.Data.State == 1) {
                    $('input[name="States"].open').iCheck('check');
                    $('input[name="States"].close').iCheck('uncheck');
                } else {
                    $('input[name="States"].close').iCheck('check');
                    $('input[name="States"].open').iCheck('uncheck');
                }
                $("#small_icon").attr("data-src", data.Data.Image);
                $("#small_icon").attr("src", data.Data.ImageFull);
                $("#type").val(data.Data.Type);
                $("#DisplayOrder").val(data.Data.DisplayOrder);

                if (data.Data.Type != 0) {
                    $(".objectDiv").show();
                    EditBanner.getObject(data.Data.Type, function () {
                        $('#objectType option').each(function (index, item) {
                            if ($(item).val() == data.Data.LinkId) {
                                $(item).attr('selected', 'selected');
                            }
                        })
                    })
                }

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //获取对象
    getObject: function (type, callback) {
        var methodName = "/indexDatas/AdminBannerTypeList";
        var data = {
            "Type": type,
            "Name": ""
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(EditBanner.objectTypeTpl);
                var html = render(data.Data);
                $("#objectType").html(html);
                callback();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑
    editDetail: function () {
        var methodName = "/indexDatas/AdminEditBanner";
        var data = {
            "BId": Common.getUrlParam("id"),
            "State": EditBanner.state,
            "DisplayOrder": Number($("#DisplayOrder").val()),
            "Title": $("#Title").val(),
            "Image": $("#small_icon").attr("data-src"),
            "Type":$("#type").val(),
            "LinkId": $("#type").val() == 0 ? 0: $("#objectType").val()
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功", function () {
                    window.location.href = '/platform/bannerList';
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
};