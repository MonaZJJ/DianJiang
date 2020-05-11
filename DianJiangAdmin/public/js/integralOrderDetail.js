var orderListDetail = {
    DetailTemplate: `
                <!--物流跟踪-->
                {{if Logistics}}
                <div class="logistics_box">
                    <div class="page-header" style="color:#666;border-bottom: none;padding-bottom: 0px;font-size: 16px;">物流跟踪</div>
                    <div class="logistics_dv_detail">
                        <div style="margin-bottom:10px;">
                            <span style="display:inline-block;margin-right:20px;">快递公司：{{TakeOutOrderInfo[0].ShipFriendName}}</span>
                            <span>快递单号：{{TakeOutOrderInfo[0].ShipSn}}</span>
                        </div>
                        {{if Logistics.data}}
                            <ul class="listBox">
                                {{each Logistics.data as value i}}
                                    {{if i == "0"}}
                                        <li class="first_info">
                                            <span class="zhouji">{{Logistics.data[i].ftime}}</span>
                                            <span class="state_logistic">{{Logistics.data[i].context}}</span>
                                        </li>
                                    {{else}}
                                        <li>
                                            <span class="zhouji">{{Logistics.data[i].ftime}}</span>
                                            <span class="time_point">{{Logistics.data[i].time}}</span>
                                            <span class="state_logistic">{{Logistics.data[i].context}}</span>
                                        </li>
                                    {{/if}}
                                {{/each}}
                            </ul>
                        {{else}}
                            <div style="margin-bottom:20px;">{{Logistics.message}}</div>
                        {{/if}}
                        
                    </div>
                </div>
                 {{/if}}
                <!--物流跟踪end-->
                <!--&lt;!&ndash;门店信息&ndash;&gt;-->
                <!--{{if OrderStoresInfo != "" && OrderStoresInfo != null && OrderStoresInfo != undefined}}-->
                <!--<div class="buyer_info_big_box">-->
                        <!--<div class="page-header" style="color:#666;border-bottom: none;padding-bottom: 0px;font-size: 16px;">自提门店信息</div>-->
                       <!--{{if TakeOutOrderInfo.length > 0  }}-->
                        <!--<div class="buyer_info_box">-->
                            <!--<ul class="send_time">-->
                                <!--<li>门店名称：{{OrderStoresInfo.StoreName}}</li>-->
                            <!--</ul>-->
                            <!--<ul class="receive_info">-->
                                <!--<li>-->
                                    <!--<span style="">店铺编码：</span>-->
                                    <!--<span style="">-->
                                        <!--{{OrderStoresInfo.SN}}-->
                                    <!--</span>-->
                                <!--</li>-->
                            <!--</ul>-->
                            <!--<ul class="send_time">-->
                                <!--<li>联系方式：{{OrderStoresInfo.ContactsPhone}}</li>-->
                            <!--</ul>-->
                            <!--<ul class="mark_info">-->
                                <!--<li>所在位置：{{OrderStoresInfo.Address}}</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                        <!--{{/if}}-->
                                           <!---->
                <!--</div>-->
                <!--{{/if}}-->
                <!--&lt;!&ndash; 门店信息end &ndash;&gt;-->
                <!-- 买家信息盒子 -->
                <div class="buyer_info_big_box">
                        <div class="page-header" style="color:#666;border-bottom: none;padding-bottom: 0px;font-size: 16px;">买家信息</div>
                       {{if TakeOutOrderInfo.length > 0  }}
                        <div class="buyer_info_box">
                            <ul class="buyer_info_one">
                                <li>会员名：{{TakeOutOrderInfo[0].UseName}}</li>
                                <li>联系电话：{{TakeOutOrderInfo[0].Mobile}}</li>
                                <li>真实姓名：{{TakeOutOrderInfo[0].NickName}}</li>
                            </ul>
                            <ul class="buyer_info_one">
                               
                                <li>收货人姓名：{{TakeOutOrderInfo[0].Consignee}}</li>
                                <li>收货人电话：{{TakeOutOrderInfo[0].ConsigneeMobile}}</li>
                                 <li>
                                    <span style="">收货信息：</span>
                                    <span style="">
                                        {{TakeOutOrderInfo[0].Address}}
                                    </span>
                                </li>
                            </ul>
                            <ul class="send_time">
                                <li>送货时间：时间不限</li>
                            </ul>
                            <ul class="mark_info">
                                <li>买家备注：{{TakeOutOrderInfo[0].BuyerRemark}}</li>
                            </ul>
                     
                        </div>
                        {{/if}}
                   
                        <!-- 订单信息列表 -->
                        <!-- 表格内容 -->
                        <div class="box-body no-padding" style="border-bottom: 2px solid #ccc;">
                            <table class="table" id="table_order">
                                <tbody>
                                <tr style="background-color: #f8f8f8">
                                    <th style="">商品名称</th>
                                    <th>商品单价(元)</th>
                                    <th>购买数量</th>
                                    <th>运费</th>
                                    <th>小计(元)</th>
                                </tr>
                                {{each OrderProductList as value i}}
                                <tr>
                                    <td>
                                        <div class="media">
                                            <div class="media-left">
                                                <a href="#">
                                                    <img src="{{OrderProductList[i].ShowImg}}" class="media-object" style="width:80px;border-radius: 6px" alt="..."></a>
                                            </div>
                                            <div class="media-body" style="width:auto;vertical-align: middle;">
                                                <h4 class="media-heading" style="color:#1792e7;font-size: 14px;">{{OrderProductList[i].ProductsName}}</h4>
                                                <div class="detail_desc_pic" style="font-size: 14px;color:#666">
                                                   {{OrderProductList[i].Summary}}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>¥{{OrderProductList[i].ShopPrice}}</td>
                                    <td>{{OrderProductList[i].RealCount}}</td>
                                     <td>{{OrderProductList[i].ShipFee}}</td>
                                    <td class="editor_food_box">
                                        ¥{{OrderProductList[i].ProductsTogether}}
                                    </td>
                                </tr>
                                {{/each}}
                                </tbody>
                            </table>
                        </div>
                        <!-- 表格内容end -->
                        <div class="order_number_box" style="overflow: hidden;margin-top: 20px;">
                            {{if OrderActionInfo.length >0}}
                            <ul class="col-md-6 number_ul dingdan_xinxi" style="padding:0px">
                                <li>订单编号：{{TakeOutOrderInfo[0].OSn}}</li>
                                {{if OrderActionInfo[0].ActionTypes == "提交"}}
                                <li>订单时间：{{OrderActionInfo[0].ActionTime}}</li>
                                {{else if OrderActionInfo[0].ActionTypes == "确认"}}
                                <li>付款时间：{{OrderActionInfo[0].ActionTime}}</li>
                                {{else if OrderActionInfo[0].ActionTypes == "备货"}}
                                <li>发货时间：{{OrderActionInfo[0].ActionTime}}</li>
                                {{else if OrderActionInfo[0].ActionTypes == "发货"}}
                                <li>完成时间：{{OrderActionInfo[0].ActionTime}}</li>
                                {{/if}}
                                <!--{{each OrderActionInfo as value i}}-->
                                <!--{{if OrderActionInfo[i].ActionTypes == "提交"}}-->
                                <!--<li>订单时间：{{OrderActionInfo[i].ActionTime}}</li>-->
                                <!--{{else if OrderActionInfo[i].ActionTypes == "确认"}}-->
                                <!--<li>付款时间：{{OrderActionInfo[i].ActionTime}}</li>-->
                                <!--{{else if OrderActionInfo[i].ActionTypes == "备货"}}-->
                                <!--<li>发货时间：{{OrderActionInfo[i].ActionTime}}</li>-->
                                <!--{{else if OrderActionInfo[i].ActionTypes == "发货"}}-->
                                <!--<li>完成时间：{{OrderActionInfo[i].ActionTime}}</li>-->
                                <!--{{/if}}-->
                                <!--{{/each}}-->
                            </ul>
                            {{/if}}
                            {{if TakeOutOrderInfo.length >0}}
                            <ul class="col-md-6 total_ul" style="padding:0px">
                                <li>购物车小计：¥{{TakeOutOrderInfo[0].ProductAmount}}</li>
                                <li>运费：¥{{TakeOutOrderInfo[0].ShipFeeAmount}}</li>
                                <!--<li> 支付金额：¥{{TakeOutOrderInfo[0].SurplusMoney}}</li>-->
                                <li style="max-width:200px;">
                                    <hr style="border-bottom:1px solid #ccc;margin:0px -20px 0px;">
                                    <div class="has_receive" style="margin-top: 10px">订单实收款：{{TakeOutOrderInfo[0].OrderAmount}}元</div>
                                </li>
                            </ul>
                            {{/if}}
                        </div>

                </div>
                <!-- 买家信息盒子 end-->`,
    init: function () {
        orderListDetail.adminOrderInfo();
        // 返回上一页
        $('body').on('click', '.backBtn', function () {
            if (Common.getUrlParam('isSee')) {
                window.history.go(-3);
            } else {
                window.history.go(-1);
            }
        })
        //切换效果
        $('body').on('click', '.img_toggle', function () {
            console.log(123)
            $(this).parents().next(".Box").slideToggle();
            $(this).children().toggle();
        })
        //点击查看物流进入详情
        $('body').on('click', '.logisticsBtn', function () {
            var oid = $(this).attr('data-oid');
            var olid = $(this).attr('data-olid');
            location.href = '/order/logistics?oid=' + oid + '&olid=' + olid + ''
        })
        // //预览按钮点击
        // $('body').on('click', '.status_num', function () {
        //     var id = $(this).attr('data-id');
        //     $('.pmask').show();
        //     $('#productPreBox').show();
        //     $('#preIframe').attr('src', '' + SignRequest.urlPrefixMobile + '/productdetail?PId=' + id + '')
        // })
        // //点击遮罩
        // $('body').on('click', '#productPreBox', function () {
        //     $('.pmask').hide();
        //     $('#productPreBox').hide();
        // })
    },
    //订单信息
    adminOrderInfo: function () {
        var methodName = "/Order/AdminOrderInfo";
        var data = {
            "oid": Common.getUrlParam('id'),
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(orderListDetail.DetailTemplate);
                var html = render(data.Data);
                $("#rendering").append(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
};

$(function () {
    orderListDetail.init();
})