$(function () {
    UserLabelList.init();
})
var UserLabelList = {

    // // 穿衣
    // valueData:[0],

    labelTpl:`{{each List as value i}}
                <li class='clearfix'>
                    <input type="text" value="{{List[i].Name}}">
                    <span data-id="{{List[i].Value}}" class="confirm">√</span>
                    <span data-id="{{List[i].Value}}" class="cancel">×</span>
                </li>
                {{/each}}
                <li class='clearfix'>
                    <input type="text" value="">
                    <span class="confirm">√</span>
                    <span class="cancel">×</span>
                </li>`,

    init:function () {

        // for(var i in UserLabelList.valueData){
            UserLabelList.getOptionList();
        // }

        $("body").on("click",".confirm",function () {
            var value = $(this).siblings("input").val();
            var id = $(this).attr("data-id");
            if(value == ""){
                Common.showInfoMsg("请输入标签名");
                return false;
            }else {
                if(id){
                    UserLabelList.editOption(value,id);    //编辑
                }else {
                    UserLabelList.addOption(value);    //添加
                }
            }
        })

        $("body").on("click",".cancel",function () {
            var id = $(this).attr("data-id");
            var target = $(this);
            if(id){
                Common.confirmDialog("确认要删除该标签吗？",function () {
                    UserLabelList.deleteOption(id,target);
                })
            }
        })

        $(".operate-btn").on("click",function () {
            var display = $(this).find('.upBtn').css('display');
            if(display == 'none'){
                $(this).find('.upBtn').css("display","block");
                $(this).find('.downBtn').css("display","none");
            }else {
                $(this).find('.upBtn').css("display","none");
                $(this).find('.downBtn').css("display","block");
            }
        })

    },

    //标签信息信息
    getOptionList: function () {
        var methodName = "/user/GetStyleList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(UserLabelList.labelTpl);
                var html = render(data.Data);
                $("#cloth").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //添加选项
    addOption: function (value) {
        var methodName = "/user/AddOption";
        var data = {
            "Name": value
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("添加成功",function () {
                    UserLabelList.getOptionList();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑
    editOption:function(value,rid){
        var methodName = "/user/UpdateOption";
        var data = {
            "Value": rid,
            "Name": value
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功");
                // UserLabelList.getOptionList(type);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //删除选项内容
    deleteOption: function (id,tag) {
        var methodName = "/user/DeleteOption";
        var data = {
            "Value": id
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $(tag).parent().hide();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
}

