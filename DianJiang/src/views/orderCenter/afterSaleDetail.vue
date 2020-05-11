<template>
    <div class="allBox">
        <div class="code-box" v-if="info.ShipType==1">
            <div class="qrCode" id="qrcode">
                <img :src="info.AsCodeImg" alt="">
            </div>
            <!--<p>{{info.ASId}}</p>-->
            <div class="tips">请将二维码展示给店家扫描</div>
        </div>

        <section style="padding: 10px;">
            <div class="info-box">
                <img src="../../../static/images/index/contact.png" alt="">
                <van-row class="infoRight">
                    <van-col span="14">{{addressInfo.Consignee}}</van-col>
                    <van-col span="10" style="text-align: right;">{{addressInfo.Mobile}}</van-col>
                    <van-col span="24" class="info-address">{{addressInfo.Address}}</van-col>
                </van-row>
            </div>
            <div class="detail-box">
                <div class="detailTop">
                    <img src="../../../static/images/index/shop.png" alt="">
                    <span class="floatLeft">典匠生活家</span>
                    <span class="floatRight">您拍的宝贝清单</span>
                </div>
                <div class="pro-item"  v-for="(item, index) in productList" :key="index">
                    <img :src="item.PShowImg" alt="" class="pitem_img">
                    <div class="pitem_div">
                        <div class="pro_name van-clearfix">
                            <span class="van-multi-ellipsis--l2 floatLeft">{{item.PName}}</span>
                            <span class="floatRight">￥{{item.ShopPrice}}</span>
                        </div>
                        <div class="van-clearfix">
                            <span class="floatLeft">{{item.Sku}}</span>
                            <span class="floatRight">X{{item.PCount}}</span>
                        </div>
                    </div>
                </div>
                <div class="actuallyBtm">
                    共{{count}}件商品&ensp;&ensp;&ensp;实付:<span>￥{{money}}</span>
                </div>
            </div>
            <div class="choice-box">售后状态：{{info.TypeDesc}}</div>
            <div class="order-box">
                <div>订单信息</div>
                <div>申请状态：{{info.StateDesc}}</div>
                <div>申请单号：{{info.ASId}}</div>
                <div>申请时间：{{info.ApplyTime}}</div>
            </div>
            <div class="reason-box">
                <div>申请原因</div>
                <div>{{info.ApplyReason}}</div>
            </div>

            <van-steps direction="vertical" :active="active" class="serveStep">
                <van-step  v-for="(item, index) in step" :key="index">
                    <div>{{item.ContentDesc}}</div>
                    <p>{{item.Time}}</p>
                </van-step>
            </van-steps>

            <!--配送订单-->
            <div class="submit-box" v-if="info.State==2&&info.ShipType==0"><button @click.stop="sendSubmit">发货</button></div>

        </section>

    </div>
</template>

<script>
    import { afterServicesDetail } from "@/api/aftersale";
    import { Col, Row, Step, Steps } from 'vant';

    export default {
        name: "afterSaleDetail",
        components: {
            "van-row": Row,
            "van-col": Col,
            "van-step": Step,
            "van-steps": Steps,
        },
        data() {
            return {
                said: 0,
                info: "",
                addressInfo:"",
                productList:"",

                money: 0,
                count: 0,

                active: "0",
                step:[],
            };
        },
        computed: {},
        methods: {

            //发货
            sendSubmit(){
                var that = this;
                that.$router.push({
                    path: '/deliverDoods',
                    query: { said: that.said }
                })
            }


        },
        mounted() {
            var that = this;

        },
        created() {
            var that = this;
            that.said = that.$route.query.said ? that.$route.query.said : 0;
            afterServicesDetail({
                "ASId": that.said
            }).then(response => {
                that.info = response.Data;
                that.addressInfo = response.Data.OrderAddressInfo;
                that.productList = response.Data.ProductList;
                that.step = response.Data.Action.reverse();

                response.Data.ProductList.forEach((item, index) => {
                    that.money += (item.PCount * item.ShopPrice);
                    that.count += item.PCount;
                })
            }).catch(err =>{
                that.Common.showMsg(err.data.Message);
            });
        }
    };
</script>

<style scoped src="../../../static/css/afterSaleApply.css">
</style>

<style scoped>
    .code-box{
        width: 100%;
        height: 200px;
        background-color: #fff;
        text-align: center;
    }
    .code-box .qrCode{
        width: 100px;
        height: 100px;
        margin: 0 auto;
        margin-top: 28px;
    }
    .code-box .qrCode >>> img{
        width: 100px;
        height: 100px;
        vertical-align: top;
    }
    .code-box p{
        color: #333333;
        font-size: 14px;
        line-height: 15px;
        margin: 12px 0 16px 0;
        font-weight: bold;
    }
    .code-box div.tips{
        font-size: 11px;
        line-height: 15px;
        color: #999999;
        margin-top: 16px;
    }

    .order-box{
        background-color: #fff;
        border-radius: 10px;
        padding: 14px 15px 10px 15px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #666666;
    }
    .order-box>div{
        margin-top: 6px;
    }
    .order-box>div:first-child{
        font-size: 13px;
        color: #333;
        margin-top: 0px;
        margin-bottom: 12px;
    }

    .reason-box{
        background-color: #fff;
        border-radius: 10px;
        padding: 14px 15px 10px 15px;
        box-sizing: border-box;
        min-height: 118px;
        font-size: 13px;
        color: #666666;
    }
    .reason-box>div:first-child{
        color: #333;
        margin-bottom: 20px;
    }
    .serveStep{
        border-radius: 10px;
        background-color: #fff;
        font-size: 14px;
        margin: 10px 0;
    }
    .serveStep p{
        margin: 0;
        padding: 0;
        font-size: 13px;
    }
    .pitem_img{
        margin-top: 24px;
    }
    .pitem_div{
        margin-top: 23px;
    }
</style>