$(function() {
    MemberDetailInfo.init();
});

var MemberDetailInfo = {
    //个人信息模板
    baseInfoTpl: `
                                        <div class="form-group col-sm-12" style="margin-left: 18px;">
                                            <label class="col-xs-1 control-label">头像：</label>
                                            <div class="col-xs-11">
                                                <img src="{{Avatar}}" style="width:80px;height:80px;border-radius: 50%;"/>
                                            </div>
                                        </div>
                                     <div class="form-group col-sm-12">
                                        <div class="form-group col-sm-4">
                                            <label class="col-xs-4 control-label">微信昵称：</label>
                                            <div class="col-xs-8">
                                                <p class="control-text">{{NickName}}</p>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-4">
                                            <label class="col-xs-4 control-label">性别：</label>
                                            <div class="col-xs-8">
                                             {{if Gender==0}}
                                                <p class="control-text">保密</p>
                                             {{/if}}
                                             {{if Gender==1}}
                                                <p class="control-text">男</p>
                                             {{/if}}
                                             {{if Gender==2}}
                                                <p class="control-text">女</p>
                                             {{/if}}
                                            </div>
                                        </div>   
                                        <div class="form-group col-sm-4">
                                            <label class="col-xs-4 control-label">真实姓名：</label>
                                            <div class="col-xs-8">
                                                <p class="control-text">{{RealName}}</p>
                                            </div>
                                        </div>                                   
                                        </div>
                                                                       
                                        <div class="form-group col-sm-12">
                                         <div class="form-group col-sm-4">
                                            <label class="col-xs-4 control-label">会员等级：</label>
                                            <div class="col-xs-8">
                                                <p class="control-text">{{LevelName}}</p>
                                            </div>
                                        </div>
                                             <div class="form-group col-sm-4">
                                            <label class="col-xs-4 control-label">注册时间：</label>
                                            <div class="col-xs-8">
                                                <p class="control-text">{{AddTimeStr}}</p>
                                            </div>
                                        </div>                                                      
                                         </div>
                                                       
      `,
    // orderInfoTpl: `


    //       {{each UserOrderList as value i}}
    //       <tr>
    //           <td>{{UserOrderList[i].Name}}</td>
    //           <td>{{UserOrderList[i].OSn}}</td>
    //           <td>{{UserOrderList[i].OrderStateDec}}</td>
    //           <td>¥{{UserOrderList[i].OrderAmount}}</td>
    //           <td>{{UserOrderList[i].AddTimeStr}}</td>
    //           <td>{{UserOrderList[i].PayTimeStr}}</td>
    //       </tr>
    //       {{/each}}



    // `,
    init: function() {

        //使用辅助函数
        template.defaults.imports.exchangeTimeData = Common.exchangeTimeData;

        MemberDetailInfo.getMemberInfo();
        // 返回上一页
        $('body').on('click', '.backBtn', function() {
            window.history.go(-1);
        })

        //收缩效果
        $(".img_toggle").click(function() {
            $(this).parents().next(".row").find('.chart_1').slideToggle();
            $(this).children().toggle();
        })
    },

    //获取详情
    getMemberInfo: function() {
        var UId = Common.getUrlParam("UId");
        var methodName = "/user/AdminGetUserDetails";
        var data = {
            UId: UId
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                var render = template.compile(MemberDetailInfo.baseInfoTpl);
                var baseHtml = render(data.Data.UserInfo);
                $("#baseInfo").html(baseHtml);

                // var render = template.compile(MemberDetailInfo.orderInfoTpl);
                // var orderHtml = render(data.Data);
                // $("#orderInfo").html(orderHtml);

                $("#consume").text(data.Data.UserInfo.ConsumptionAmount);
                $("#order").text(data.Data.UserInfo.OrderCount);
                $("#money").text(data.Data.UserInfo.Amount);
                $("#integral").text(data.Data.UserInfo.Integral)
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
}