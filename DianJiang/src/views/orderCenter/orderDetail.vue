<template>
    <div class="allBox">
        <van-row class="state-box">
            <van-col span="24" class="text">{{orderInfo.OrderStateDesc}}</van-col>
            <van-col span="24">{{orderInfo.AddTimes}}</van-col>
        </van-row>

        <van-row class="line-boxTop">
            <van-col span="14" class="contact">
                <img src="../../../static/images/index/contact.png" alt/>
                <span>{{orderInfo.Consignee}}</span>
            </van-col>
            <van-col span="10" class="phone">{{orderInfo.Mobile}}</van-col>
            <div class="addressText">{{orderAddressInfo.Address}} </div>
        </van-row>

        <div class="detail-box">
            <div class="detailTop">
                <div class="topTitleLeft" style="float: left">
                    <img class="storeIcon" src="../../../static/images/order/store.png" alt/>
                    <span>典匠生活家</span>
                </div>
                <span class="floatRight">宝贝清单</span>
            </div>
            <div class="pro-item" v-for="item,index in productsList" :key="index">
                <img :src="item.ShowImg" alt/>
                <div>
                    <div class="pro_name van-clearfix">
                        <span class="floatLeft van-multi-ellipsis--l2">{{item.ProductName}}</span>
                        <span class="floatRight" v-if="orderInfo.OrderType == 1">￥{{item.ShopPrice}}</span>
                        <span class="floatRight" v-else>{{item.CPCredit}}积分</span>
                    </div>
                    <div class="van-clearfix">
                        <span class="floatLeft">{{item.Sku}}</span>
                        <span class="floatRight">X{{item.RealCount}}</span>
                    </div>
                </div>
            </div>
            <div class="shipTypeBox">
                <div style="color: #333">配送方式</div>
                <div style="color: #D4342B">快递</div>
            </div>
            <div class="totalTextBox">
                <div class="itemText" style="margin-bottom:8px">
                    <div>订单金额</div>
                    <div>￥{{orderInfo.OrderAmount}}</div>
                </div>
                <div class="itemText">
                    <div>配送费</div>
                    <div>￥{{orderInfo.ShipFee}}</div>
                </div>
            </div>
            <div class="actuallyBtm" v-if="orderInfo.OrderType == 1">
                共{{orderInfo.BuyCount}}件商品&emsp;实付:
                <span>￥{{orderInfo.OrderAmount}}</span>
            </div>
            <div class="actuallyBtm" v-else>
                共{{orderInfo.BuyCount}}件商品&emsp;实付:
                <span>{{orderInfo.PayCreditCount}}积分</span>
            </div>
            <div class="describe" v-if="orderInfo.BuyerRemark">备注：{{orderInfo.BuyerRemark}}</div>
            <div class="copy-box">
                <div class="copy-left">
                    <div>下单编号：{{orderInfo.OSn}}</div>
                    <div>下单时间：{{orderInfo.AddTimes}}</div>
                </div>
                <van-button class="copy-right" v-clipboard:copy="orderInfo.OSn">复制单号</van-button>
            </div>
        </div>

        <!--付款方式-->
        <div class="payBox">
            <div class="payLeft">
                <img style="width:15px;height:12px;margin-right:4px" src="../../../static/images/order/qian.png" alt="">
                <span>付款方式</span>
            </div>
            <img style="width:28px;height:28px;" src="../../../static/images/payOrder/wechat.png" alt="">
        </div>
        <!--待付款-->
        <div class="line-box btn" v-if="orderInfo.OrderState == 20">
            <div class="confirm" @click="payHandle">立即支付</div>
            <div class="cancel" @click="closeOrderHandle">取消订单</div>
        </div>
        <!--待发货-->
        <div class="line-box btn" v-if="orderInfo.OrderState == 65">
            <div class="confirm" v-if="orderInfo.OrderType == 1" @click="returnHandle(orderInfo.OId,orderInfo.RecordId,orderInfo.ShipType)">申请退款</div>
        </div>
        <!--待收货-->
        <div class="line-box btn" v-if="orderInfo.OrderState == 75">
            <div class="confirm" @click="receiveOrderHandle">确认收货</div>
            <div class="cancel" @click.stop="checkLogicstHandle()">查看物流</div>
        </div>
        <!--待取货-->
        <div class="line-box btn" v-if="orderInfo.OrderState == 90">
            <div class="confirm" @click="closeOrderHandle">取消订单</div>
        </div>
        <!--已完成-->
        <div class="line-box btn" v-if="orderInfo.OrderState == 120">
            <a class="copy-rightOne" :href="CustomerPhone" style="color: #E53333">联系客服</a>
            <div class="confirm" v-if="orderInfo.OrderType == 1" @click="againHandle">再次购买</div>
            <div class="cancel" v-if="!orderInfo.IsReview" @click="toAssessHandle(orderInfo.OId,orderInfo.RecordId,orderInfo.ShipType)">评价商品</div>
            <div class="cancel" v-if="orderInfo.OrderType == 1" @click="applyHandle">申请售后</div>
        </div>
        <!--已取消-->
        <div class="line-box btn" v-if="orderInfo.OrderState == 160">
            <div class="confirm" v-if="orderInfo.OrderType == 1" @click="againHandle">重新购买</div>
        </div>
    </div>
</template>

<script>
    import {Col, Row, Cell, Button} from "vant";
    import {
        orderInfo,
        reSubmitOrder,
        putOrdersRefund,
        receiveOrder,
        cancelOrder,
        againBuyProduct,
    } from "@/api/order";

    export default {
        name: "OrderDetail",
        components: {
            "van-row": Row,
            "van-col": Col,
            "van-cell": Cell,
            "van-button": Button
        },
        data() {
            return {
                orderInfo: "",
                orderAddressInfo:"",
                productsList: [],
            };
        },
        computed: {
            CustomerPhone:function(){
                return 'tel:'+this.phone
            }
        },
        methods: {
            //查看物流跳转
            checkLogicstHandle:function(){
                var that = this;
                that.$router.push({path:'/logistics',query:{oId:that.oId}})
            },
            //申请售后跳转
            applyHandle:function(){
                var that = this;
                that.$router.push({path:'/afterSaleApply',query:{oId:that.oId,type:that.shipType}})
            },
            //订单详情接口
            orderInfoHandle: function () {
                var that = this;
                var data = {
                    "oid": that.oId,
                    "ShipType": that.shipType
                };
                orderInfo(data).then(response => {
                    console.log(response);
                    that.orderInfo = response.Data.OrderInfo;
                    that.orderAddressInfo = response.Data.OrderAddressInfo;
                    that.productsList = response.Data.ProductsList;
                    that.phone = response.Data.CustomerPhone
                })
            },
            //评价商品
            toAssessHandle:function(oId,recordId,shipType){
                var that = this;
                that.$router.push({path:'/productAssess',query:{oId:oId,recordId:recordId,shipType:shipType}})
            },
            //再次购买
            againHandle: function (id) {
                var that = this;
                var data = {
                    "oid": that.oId
                };
                againBuyProduct(data).then(response => {
                    console.log(response);
                    that.$router.push({path: '/cart'})
                })

            },
            //申请退款
            returnHandle: function (oId,recordId,shipType) {
                var that = this;
                that.$router.push({path:'/productRefund',query:{oId:oId,recordId:recordId,shipType:shipType}})
            },
            //确认收货
            receiveOrderHandle: function (id) {
                var that = this;
                var data = {
                    "oid": that.oId
                };
                that.Common.confirmDialog('确认收货吗', function () {
                    receiveOrder(data).then(response => {
                        console.log(response);
                        that.orderInfoHandle()
                    })
                })
            },
            //关闭订单
            closeOrderHandle: function (id) {
                var that = this;
                var data = {
                    "oid": that.oId
                };
                that.Common.confirmDialog('确认要取消吗', function () {
                    cancelOrder(data).then(response => {
                        console.log(response);
                        that.Common.showMsg('取消订单成功', function () {
                            that.orderInfoHandle()
                        })
                    })
                })
            },
            onBridgeReady: function () {
                var that = this;
                //微信端调起支付
                WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId": that.GLOBAL.appId, //公众号名称，由商户传入,不用修改
                        "timeStamp": that.payData.Data.TimeStamp, //时间戳，由接口返回
                        "nonceStr": that.payData.Data.NonceStr, //随机串，由接口返回
                        "package": that.payData.Data.Package, //扩展包，由接口返回
                        "signType": that.payData.Data.SignType, //微信签名方式:MD5,不用修改
                        "paySign": that.payData.Data.PaySign //微信签名，由接口返回
                    },
                    function (res) {
                        console.log("jsdk", res)
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            that.Common.showMsg("支付成功", function () {
                                localStorage.removeItem('payObj')
                                that.orderInfoHandle()
                            });

                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            //用户取消支付后跳转地址
                            that.Common.showMsg("取消支付", function () {
                                localStorage.removeItem('payObj')
                                that.orderInfoHandle()
                            });
                        } else {
                            that.Common.showMsg(res.errMsg, function () {
                                localStorage.removeItem('payObj')
                                that.orderInfoHandle()
                            });

                            //用户支付失败后跳转地址
                        }
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
                    });
            },
            //立即付款
            payHandle: function (id, type) {
                var that = this;
                var oid = that.oId;
                that.submitOrder(oid);
            },
            //重新提交订单接口(h5支付)
            submitOrder: function (id) {
                var that = this;
                var data = {
                    "oid": id
                };
                reSubmitOrder(data).then(response => {
                    console.log(response);
                    that.payData = response;
                    if (typeof WeixinJSBridge == "undefined") {//微信浏览器内置对象。参考微信官方文档
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
                        }
                    } else {
                        that.onBridgeReady();
                    }
                })
            },
        },
        mounted() {
            var that = this;
            that.oId = that.$route.query.oId;
            that.recordId = that.$route.query.recordId;
            that.shipType = that.$route.query.shipType;
            that.orderInfoHandle()
        },
        created() {
            var that = this;
        }
    };
</script>

<style scoped src="../../../static/css/orderDetail.css">
</style>