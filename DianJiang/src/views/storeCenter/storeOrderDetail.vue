<template>
    <div class="allBox">
        <van-row class="state-box">
            <van-col span="24" class="text">{{info.OrderStateDesc}}</van-col>
            <van-col span="24">{{info.ExtractionTimeStr}}</van-col>
            <img src="../../../static/images/order/ziti.png" alt="" class="pickupImg">
        </van-row>

        <van-row class="line-box">
            <van-col span="14" class="contact">
                <img src="../../../static/images/index/contact.png" alt/>
                <span>{{info.UserName}}</span>
            </van-col>
            <van-col span="10" class="phone">{{info.Mobile}}</van-col>
        </van-row>

        <div class="detail-box">
            <div class="detailTop">
                <span class="floatLeft">订单编号：{{info.OSn}}</span>
                <span class="floatRight">宝贝清单</span>
            </div>
            <div class="pro-item" v-for="(item, index) in productList" :key="index">
                <img :src="item.ShowImg" alt/>
                <div>
                    <div class="pro_name van-clearfix">
                        <span class="floatLeft van-multi-ellipsis--l2">{{item.ProductsName}}</span>
                        <span class="floatRight">￥{{item.ShopPrice}}</span>
                    </div>
                    <div class="van-clearfix">
                        <span class="floatLeft">{{item.Summary}}</span>
                        <span class="floatRight">X{{item.RealCount}}</span>
                    </div>
                </div>
            </div>
            <div class="actuallyBtm">
                共{{info.ProductAmount}}件商品&emsp;实付:
                <span>￥{{info.ProductAmount}}</span>
            </div>
            <div class="describe">{{info.BuyerRemark}}</div>
            <div class="copy-box">
                <div class="copy-left">
                    <div>下单编号：{{info.OSn}}</div>
                    <div>下单时间：{{info.AddTimes}}</div>
                </div>
                <van-button class="copy-right" v-clipboard:copy="info.OSn">复制单号</van-button>
            </div>
        </div>
        <div class="line-box btn" v-if="info.ShipType==1&&info.OrderState==90">
            <div class="confirm" @click.stop='selfConfirm'>确认自提</div>
        </div>
    </div>

</template>

<script>
    import {
        storeOrderInfo,
        storeSelfMention
    } from "@/api/store";
    import {Col, Row, Cell, Button} from "vant";

    export default {
        name: "afterSaleOrderDetail",
        components: {
            "van-row": Row,
            "van-col": Col,
            "van-cell": Cell,
            "van-button": Button
        },
        data() {
            return {

                oid: 0,
                info:"",
                productList:"",
                addressInfo:"",

            };
        },
        computed: {},
        methods: {
            selfConfirm(){
                var that = this;
                that.Common.confirmDialog("确认自提该订单吗？",function () {
                    storeSelfMention({
                        "oid": that.oid
                    }).then(response => {
                        that.Common.showMsg("自提订单成功",function () {
                            that.$router.go(0);
                        });
                    }).catch(err => {
                        that.Common.showMsg(err.data.Message);
                    });
                });
            },

        },
        mounted() {
            var that = this;

        },
        created() {
            var that = this;
            that.oid = that.$route.query.oId ? that.$route.query.oId : 0;
            storeOrderInfo({
                "oid": that.oid
            }).then(response => {
                that.info = response.Data.TakeOutOrderInfo;
                that.productList = response.Data.OrderProductList;
                that.addressInfo = response.Data.OrderAddressInfo;
            }).catch(err => {
                that.Common.showMsg(err.data.Message);
            });

        }
    };
</script>

<style scoped src="../../../static/css/orderDetail.css">

</style>
<style scoped>
    .state-box{
        position: relative;
    }
    .state-box .pickupImg{
        width: 30px;
        height: 30px;
        position: absolute;
        top: 22px;
        right: 14px;
    }
</style>