$(function () {
    UserLabelList.init();
})
var UserLabelList = {

    // // 穿衣
    // valueData:[],
    list:[],
    labelTpl:`{{each Data as value i}}
                <li class='clearfix'>
                    <input type="text" value="{{Data[i]}}">                 
                </li>
                {{/each}}
                <li class='clearfix'>
                    <input type="text" value="">                
                </li>
               `,

    init:function () {


        UserLabelList.getOptionList();

        $("body").on("click",".submitBtn",function () {
            var list=[];
            $("#cloth").find("input").each(function(index,item){
                list.push($(item).val())
            })
            UserLabelList.editOption(list);
        });

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
        var methodName = "/orderSetting/AdminGetCancelReasonList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(UserLabelList.labelTpl);
                var html = render(data);
                UserLabelList.list = data.Data
                $("#cloth").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },


    //编辑
    editOption:function(list){
        var methodName = "/orderSetting/SetCancelReasons";
        var data = {
            "List":list
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功",function () {
                    window.location.reload()
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
}

