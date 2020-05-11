$(function() {
    Setting.init();
})

var Setting = {
    list: [],
    rulesTpl: `{{each Rule as value i}}
       <li class='clearfix'>
           <input type="text" value="{{Rule[i]}}">                 
       </li>
       {{/each}}
       <li class='clearfix'>
         <input type="text" value="">                
       </li>
   `,

    init: function() {

        Setting.getDetail();

        //点击提交按钮
        $("#submitBtn").click(function() {
            if (!Validate.emptyValidateAndFocus("#name", "请输入名称", "")) {
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#money", "请输入金额", "")) {
                return false;
            }
            Setting.editDetail();
        })

        //取消按钮
        $("#cancelBtn").click(function() {
            window.location.href = '/member/vipSetting';
        })
    },

    //获取
    getDetail: function() {
        var methodName = "/user/AdminGetVIPSettingResponse";
        var data = {};
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                $("#name").val(data.Data.VIPName);
                $("#money").val(data.Data.RechargeMoney);
                var render = template.compile(Setting.rulesTpl);
                var html = render(data.Data);
                $("#rules").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑
    editDetail: function() {
        var list = [];
        $("#rules").find("input").each(function(index, item) {
            list.push($(item).val())
        })
        var methodName = "/user/AdminEditVIPSetting";
        var data = {
            "VIPName": $("#name").val(),
            "RechargeMoney": $("#money").val(),
            "Rule": list,
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("设置成功", function() {
                    location.reload();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
};