<template>
    <div class="box">
        <!--<div class="wayBox">-->
        <!--<div class="wayItem" :class="{'active':shipType == 1}" @click="shipTypeChangeHandle(1)">到店取货</div>-->
        <!--<div class="wayItem" :class="{'active':shipType == 0}" @click="shipTypeChangeHandle(0)">物流快递</div>-->
        <!--</div>-->
        <div class="contactBox">
            <div class="contactTitle">
                <img class="myIcon" src="../../../static/images/payOrder/myIcon.png" alt/>
                <span>选择联系方式</span>
            </div>
            <template v-if="shipType == 0">
                <div class="contactBottom" v-if="defaultFullShipAddressInfo" @click="toAddress">
                    <div class="contactLeft">
                        <div class="userNameBox">
                            <span class="userName">{{defaultFullShipAddressInfo.Consignee}}</span>
                            <span>{{defaultFullShipAddressInfo.Mobile}}</span>
                        </div>
                        <div class="address">
                            地址：{{defaultFullShipAddressInfo.ProvinceName}}{{defaultFullShipAddressInfo.CityName}}{{defaultFullShipAddressInfo.CountyName}}{{defaultFullShipAddressInfo.Address}}
                        </div>
                    </div>
                    <img class="rightIcon" src="../../../static/images/product/right.png" alt/>
                </div>
                <div class="contactBottom" v-else @click="toAddress">
                    <div class="contactLeft">
                        <div class="address">请选择地址</div>
                    </div>
                    <img class="rightIcon" src="../../../static/images/product/right.png" alt/>
                </div>
            </template>
            <template v-else>
                <div class="contactBottom" @click="toStore" v-if="selfMentionInfos">
                    <div class="contactLeft">
                        <div class="userNameBox">
                            <span class="userName">{{selfMentionInfos.StoreName}}</span>
                            <span>{{selfMentionInfos.StoreMobile}}</span>
                        </div>
                        <div class="address">地址：{{selfMentionInfos.StoreAddress}}</div>
                    </div>
                    <img class="rightIcon" src="../../../static/images/product/right.png" alt/>
                </div>
                <div class="contactBottom" @click="toStore" v-else>
                    <div class="contactLeft">
                        <div class="address">请选择门店</div>
                    </div>
                    <img class="rightIcon" src="../../../static/images/product/right.png" alt/>
                </div>
            </template>

        </div>
        <div class="productListBox">
            <div class="productTopTitleBox">
                <div class="topTitleLeft">
                    <img class="storeIcon" src="../../../static/images/payOrder/store.png" alt/>
                    <span>典匠生活家</span>
                </div>
                <span>您拍的宝贝清单</span>
            </div>
            <div class="productList">
                <div class="productItem">
                    <img class="pImg" :src="productInfo.ShowImg" alt/>
                    <div class="productRightBox">
                        <div class="productNameBox">
                            <div class="productName">{{productInfo.Name}}</div>
                            <div class="productPrice">{{productInfo.Credit}}积分</div>
                        </div>
                        <div class="skuBox">
                            <div class="sku">{{productInfo.Sku}}</div>
                            <div class="num">X{{productInfo.Count}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shipFeeBox">
            <div class="shipItem">
                <div class="shipTitle">运费：</div>
                <span class="grayColor">￥{{confirmInfo.ShipFee}}</span>
            </div>
            <div class="totalBox">
                共{{confirmInfo.TotalCount}}件商品 实付:
                <span class="totalPrice">{{confirmInfo.CreditAmount}}积分</span>
            </div>
        </div>
        <div class="payWayBox">
            <van-radio-group v-model="payType" class="radioClass">
                <van-radio name="0" checked-color="#09bb07">
                    <img class="wechatIcon" src="../../../static/images/payOrder/wechat.png" alt/>
                </van-radio>
                <van-radio name="1" v-if="IsVIP" checked-color="#09bb07" style="font-weight:800">货款支付</van-radio>
            </van-radio-group>
        </div>
        <div class="payWayBox" style="display: flex;flex-direction: row;justify-content: space-between">
            <div>配送方式</div>
            <div>快递配送</div>
        </div>
        <div class="markBox">
            <div class="markTitle">
                <img class="markIcon" src="../../../static/images/product/mark.png" alt/>
                备注信息
            </div>
            <textarea class="markContent" placeholder="请输入备注信息" v-model="mark"></textarea>
        </div>
        <div class="payBtnBox">
            <div class="payLeft">
                合计:
                <span class="redC">{{confirmInfo.OrderCredit}}积分</span>
            </div>
            <button class="payBtn" @click="submitOrderHandle" v-if="!disabled">提交订单</button>
            <button class="payBtn" @click="submitOrderHandle" v-if="disabled" disabled="disabled">提交订单</button>
        </div>
        <div style="height:55px"></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {RadioGroup, Radio} from "vant";
    import {
        confirmCreditOrder,
        submitCreditOrder,
    } from "@/api/order";

    export default {
        props: {},
        data() {
            return {
                payType: "0",
                skuStr: "",
                pId: 0,
                isCartBuy: "",
                saId: 0,
                confirmInfo: "",
                defaultFullShipAddressInfo: "",
                selfMentionInfos: "",
                shipAddressInfo: "",
                cartStr: "",
                disabled: false,
                cartProductList: [],
                payData: "",
                mark: "",
                storeId: 0,
                shipType: 0,
                productInfo:"",
                IsVIP:false,
            };
        },
        components: {
            "van-radio-group": RadioGroup,
            "van-radio": Radio
        },
        watch: {},
        computed: {},
        created() {
            var that = this;
            //获取参数
            that.count = that.$route.query.count;
            that.pId = that.$route.query.pId;
            that.confirmOrderHandle();
        },
        mounted() {
        },
        methods: {
            onBlurInput() {
                window.scroll(0, 0)
            },
            //切换收货方式
            shipTypeChangeHandle: function (type) {
                var that = this;
                that.$store.commit('SET_SHIPTYPE', type)
            },
            //确认订单接口
            confirmOrderHandle: function () {
                var that = this;
                //如果本地缓存存在said
                if (localStorage.SAId) {
                    that.saId = localStorage.SAId;
                } else {
                    that.saId = 0;
                }
                var data = {
                    "PId": that.pId,
                    "Count": that.count,
                    "SaId": that.saId,
                };
                confirmCreditOrder(data).then(response => {
                    console.log(response);
                    //判断是否存在默认地址
                    if (response.Data.DefaultFullShipAddressInfo) {
                        that.defaultFullShipAddressInfo = response.Data.DefaultFullShipAddressInfo;
                        that.saId = response.Data.DefaultFullShipAddressInfo.SAId;
                        that.productInfo = response.Data.ProductInfo;
                    } else {
                        that.defaultFullShipAddressInfo = ""
                    }

                    that.confirmInfo = response.Data;
                    that.IsVIP = response.Data.IsVIP;

                })


            },
            //提交订单处理
            submitOrderHandle: function () {
                var that = this;
                var AppId = that.GLOBAL.appId;
                var local = encodeURIComponent('' + that.GLOBAL.urlPrefixNoAdmin + '/middlePage?type=product');
                //调起支付
                that.submitOrder();
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
                                that.$router.replace({path: "/order",query: {value: 0, shipType: 0}});
                            });

                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            //用户取消支付后跳转地址
                            that.Common.showMsg("取消支付", function () {
                                localStorage.removeItem('payObj')
                                that.$router.replace({path: "/order",query: {value: 0, shipType: 0}});
                            });
                        } else {
                            that.Common.showMsg(res.errMsg, function () {
                                localStorage.removeItem('payObj')
                                that.$router.replace({path: "/order",query: {value: 0, shipType: 0}});
                            });
                            //用户支付失败后跳转地址
                        }
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
                    });
            },
            //提交订单接口
            submitOrder: function () {
                var that = this;
                var data = {
                    "PId": that.pId,
                    "Count": that.count,
                    "SaId": that.saId,
                    "PayType": that.payType,
                    "BuyerRemark": that.mark,
                };
                that.disabled = true;
                submitCreditOrder(data).then(response => {
                    console.log(response);
                    that.payData = response;
                    if(response.Data.IsPaySuccess){
                        that.Common.showMsg("支付成功", function () {
                            that.$router.replace({path: "/order",query: {value: 0, shipType: 0}});
                        });
                    }else{
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
                    }
                }).catch(error => {
                    that.disabled = false;
                })
            },
            toAddress: function () {
                var that = this;
                that.$router.push('/orderAddress')
            },
            toStore: function () {
                var that = this;
                that.$router.push('/chooseStore')
            }
        }
    };
</script>

<style scoped src="../../../static/css/payOrder.css">
</style>
