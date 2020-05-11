<template>
    <div class="allBox">
        <div class="upgrade-box">
            <div class="title">VIP会员充值中心</div>
            <div class="input-box">
                <span>￥</span><input type="number" placeholder="0" v-model="money">
            </div>
            <div class="tips">可通过微信或支付宝充值即时到账</div>
            <div class="type">
                <img src="../../../static/images/payOrder/wechat.png" alt="">
                <span>微信支付</span>
            </div>
            <div class="confirmBtn" @click="submit()">确认充值</div>
        </div>
    </div>
</template>

<script>
    import {
        upgradeVIP
    } from "@/api/member";

    export default {
        name: "upgrade",
        components: {

        },
        data() {
            return {
                money: "",

                timestamp : "",
                nonceStr : "",
                // signature : "",
                package:"",
                paySign:"",
                signType:"",


            };
        },
        computed: {},
        methods: {

            submit(){
                var that = this;
                var amount = Number(that.money);
                if (amount == "" || amount == 0){
                    that.Common.showMsg("请输入充值金额");
                } else{
                    that.Common.confirmDialog("确认充值吗？",function () {
                        upgradeVIP({
                            "Amount": amount
                        }).then(response => {
                            that.timestamp = response.Data.TimeStamp;
                            that.nonceStr = response.Data.NonceStr;
                            that.package = response.Data.Package;
                            that.paySign = response.Data.PaySign;
                            that.signType = response.Data.SignType;
                            // that.OId = response.Data.OId;
                            // that.IsPaySuccess = response.Data.IsPaySuccess;
                            // that.signature = response.Data.Signature;
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
                        }).catch(err => {
                            that.Common.showMsg(err.data.Message);
                        });
                    });
                }
            },

            onBridgeReady: function () {
                var that = this;
                //微信端调起支付
                WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId": that.GLOBAL.appId, //公众号名称，由商户传入,不用修改
                        "timeStamp": that.timestamp, //时间戳，由接口返回
                        "nonceStr": that.nonceStr, //随机串，由接口返回
                        "package": that.package, //扩展包，由接口返回
                        "signType": that.signType, //微信签名方式:MD5,不用修改
                        "paySign": that.paySign //微信签名，由接口返回
                    },
                    function (res) {
                        console.log("jsdk", res)
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            that.Common.showMsg("支付成功", function () {
                                that.$router.replace({path: "/member",query: { }});
                            });
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            //用户取消支付后跳转地址
                            that.Common.showMsg("取消支付", function () {
                                that.$router.go(0);
                            });
                        } else {
                            that.Common.showMsg(res.errMsg, function () {
                                that.$router.go(0);
                            });
                            //用户支付失败后跳转地址
                        }
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
                    });
            },

        },
        watch:{

        },
        mounted() {
            var that = this;

        },
        created() {
            var that = this;


        }
    }
</script>

<style scoped src="../../../static/css/upgrade.css">

</style>