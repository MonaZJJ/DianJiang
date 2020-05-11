<template>
    <div class="allBox">
        <van-row class="state-box">
            <van-col span="24" class="text">{{info.StateStr}}</van-col>
            <van-col span="24">{{info.ApplyTime}}</van-col>
        </van-row>

        <!--<van-cell class="" title="小明" icon="contact" value="1354867489"/>-->
        <van-row class="line-box">
            <van-col span="14" class="contact"><img src="../../../static/images/index/contact.png" alt=""><span>{{info.Consignee}}</span></van-col>
            <van-col span="10" class="phone">{{info.Mobile}}</van-col>
        </van-row>

        <div class="detail-box">
            <div class="detailTop">
                <span class="floatLeft">订单编号：{{info.OSn}}</span>
                <span class="floatRight">宝贝清单</span>
            </div>

            <div class="pro-item" v-for="(item, index) in info.ProductList" :key="index">
                <img :src="item.PShowImg" alt="">
                <div>
                    <div class="pro_name van-clearfix">
                        <span class="floatLeft van-multi-ellipsis--l2">{{item.PName}}</span>
                        <span class="floatRight">￥{{item.ShopPrice}}</span>
                    </div>
                    <div class="van-clearfix">
                        <span class="floatLeft">{{item.Sku}}</span>
                        <span class="floatRight">X{{item.PCount}}</span>
                    </div>
                </div>
            </div>

            <div class="actuallyBtm">
                共{{info.Count}}件商品&emsp;实付:<span>￥{{info.OrderAmount}}</span>
            </div>
            <div class="describe">
                {{info.BuyerNote}}
            </div>
            <div class="type">
                <p>申请单号：{{info.OSn}}</p>
                <p>申请时间：{{info.ApplyTime}}</p>
                <p>服务类型：{{info.AsTypeStr}}</p>
            </div>
        </div>
        <div class="line-box btn" v-if="info.State==1">
            <div class="confirm" @click.stop="confirm">确认{{info.AsTypeStr}}</div>
            <div class="cancel" @click.stop="cancel">取消{{info.AsTypeStr}}</div>
        </div>

    </div>

</template>

<script>
    import {
        stroeGetAfterSalesServiceDetail,
        storeAuditAfterSalesService
    } from "@/api/store";
    import {
        Col,
        Row,
        Cell,
        CellGroup,
        Field
    } from 'vant';

    export default {
        name: "afterSaleOrderDetail",
        components: {
            "van-row": Row,
            "van-col": Col,
            "van-cell": Cell,
            "van-cell-group": CellGroup,
            "van-field": Field
        },
        data() {
            return {

                oid: 0,
                info:"",

            };
        },
        computed: {},
        methods: {

            //通过申请
            confirm(){
                var that = this;
                var data = {
                    "AsSId": that.info.ASId,
                    "AuditState": 2,        //2：通过 3拒绝
                };
                that.Common.confirmDialog("确认该订单申请吗？",function () {
                    storeAuditAfterSalesService(data).then(response => {
                        that.Common.showMsg("审核成功",function () {
                            that.$router.go(0);  //刷新当前页面
                        });
                    }).catch(err => {
                        that.Common.showMsg(err.data.Message);
                    });
                });
            },

            //拒绝申请
            cancel(){
                var that = this;
                var data = {
                    "AsSId": that.info.ASId,
                    "AuditState": 3,        //2：通过 3拒绝
                };
                that.Common.confirmDialog("拒绝该订单申请吗？",function () {
                    storeAuditAfterSalesService(data).then(response => {
                        that.Common.showMsg("审核成功",function () {
                            that.$router.go(0);  //刷新当前页面
                        });
                    }).catch(err => {
                        that.Common.showMsg(err.data.Message);
                    });
                });
            }

        },
        mounted() {
            var that = this;
        },
        created() {
            var that = this;
            that.oid = that.$route.query.oId ? that.$route.query.oId : 0;
            stroeGetAfterSalesServiceDetail({
                "AsId": that.oid
            }).then(response => {
                that.info = response.Data;
            }).catch(err => {
                that.Common.showMsg(err.data.Message);
            });
        }
    };
</script>

<style scoped src="../../../static/css/afterSaleOrderDetail.css">

</style>