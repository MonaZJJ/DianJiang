<template>
    <div class="allBox" style="padding: 10px;">
        <div class="info-box">
            <img src="../../../static/images/index/contact.png" alt="">
            <van-row class="infoRight">
                <van-col span="14">{{orderAddressInfo.Consignee}}</van-col>
                <van-col span="10" style="text-align: right;">{{orderAddressInfo.Mobile}}</van-col>
                <van-col span="24" class="info-address">{{orderAddressInfo.Address}}</van-col>
            </van-row>
        </div>
        <div class="detail-box">
            <div class="detailTop">
                <img src="../../../static/images/index/shop.png" alt="">
                <span class="floatLeft">典匠生活家</span>
                <span class="floatRight">您拍的宝贝清单</span>
            </div>
            <van-checkbox-group v-model="idCheckbox" checked-color="#54B736">
                <van-checkbox :name="item.RecordId" class="pro-item" v-for="(item, index) in productsList" :key="index">
                    <img :src="item.ShowImg" alt="" class="pitem_img">
                    <div class="pitem_div">
                        <div class="pro_name van-clearfix">
                            <span class="van-multi-ellipsis--l2 floatLeft">{{item.ProductName}}</span>
                            <span class="floatRight">￥{{item.ShopPrice}}</span>
                        </div>
                        <div class="van-clearfix">
                            <span class="floatLeft">{{item.Sku}}</span>
                            <span class="floatRight">X{{item.RealCount}}</span>
                        </div>
                    </div>
                </van-checkbox>
            </van-checkbox-group>
            <div class="actuallyBtm">
                共{{orderInfo.BuyCount}}件商品&emsp;实付:<span>￥{{orderInfo.OrderAmount}}</span>
            </div>
        </div>
        <van-radio-group v-model="radio"  class="choice-box">
            <van-col span="12"><van-radio name="0" checked-color="#54B736">退款</van-radio></van-col>
            <van-col span="12"><van-radio name="1" checked-color="#54B736">换货</van-radio></van-col>
        </van-radio-group>
        <van-field :value="reasonText" readonly is-link label="原因" type="text" placeholder="请选择原因"
                   class="reason" @click.stop="showPicker=!showPicker" />

        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker=false"
                    @confirm="onConfirm"
            />
        </van-popup>

        <div class="remark-box">
            <img src="../../../static/images/index/remark.png" alt="">
            <span>备注信息</span>
        </div>
        <textarea rows="3" class="text-box" placeholder="请输入" v-model="remarkText"></textarea>
        <div class="submit-box"><button @click="applySubmit">提交申请</button></div>
    </div>
</template>

<script>
    import { returnOrderProduct } from "@/api/aftersale";
    import { getCancelReasonList } from "@/api/order";
    import { orderInfo } from "@/api/order";
    import {
        Col,
        Row,
        RadioGroup,
        Radio,
        Field,
        Checkbox,
        CheckboxGroup,
        Picker,
        Popup
    } from 'vant';

    export default {
        name: "afterSaleApply",
        components: {
            "van-row": Row,
            "van-col": Col,
            "van-radio-group": RadioGroup,
            "van-radio": Radio,
            "van-field": Field,
            "van-checkbox": Checkbox,
            "van-checkbox-group": CheckboxGroup,
            "van-picker":Picker,
            "van-popup":Popup,
        },
        data() {
            return {
                oId: 0,
                type: 0, //配送类型 0快递 1自提
                orderInfo: "",
                productsList:[],
                orderAddressInfo:"",

                idCheckbox:[],

                radio: "0",         //0-退货(退款) 1-换货
                remarkText:"",
                reasonText:"",          //原因
                columns:[],
                showPicker: false,

            };
        },
        computed: {},
        methods: {
            //售后原因接口
            getCancelReasonListHandle: function () {
                var that = this;
                getCancelReasonList({}).then(response => {
                    that.columns = response.Data;
                })
            },
            onConfirm(value) {
                this.reasonText = value;
                this.showPicker = false;
            },
            //申请提交
            applySubmit(){
                var that = this;
                if (that.idCheckbox.length == 0){
                    that.Common.showMsg("请选择要操作的商品");
                    return false;
                }
                var list = [];
                that.idCheckbox.forEach((item, index) => {
                    list.push(item);
                });
                var data = {
                    "OId": that.oId,
                    "CancelReason": that.reasonText,
                    "BuyerNote": that.remarkText,
                    "RecordId": list,  //订单记录Id列表
                    "Type": Number(that.radio)   //0-退货(退款) 1-换货
                }
                returnOrderProduct(data).then(response => {
                    that.Common.showMsg("提交成功",function () {
                        that.$router.replace({
                            path: '/afterSaleList',
                            query: {}
                        })
                    });
                })
            },


        },
        mounted() {
            var that = this;
        },
        created() {
            var that = this;
            that.oId = that.$route.query.oId ? that.$route.query.oId : 0;
            that.type = that.$route.query.type ? that.$route.query.type : 0;
            orderInfo({
                "oid": that.oId,
                "ShipType": that.type  //配送类型 0快递 1自提
            }).then(response => {
                that.orderInfo = response.Data.OrderInfo;
                that.productsList = response.Data.ProductsList;
                that.orderAddressInfo = response.Data.OrderAddressInfo;
                that.getCancelReasonListHandle();
            })
        }
    };
</script>

<style scoped src="../../../static/css/afterSaleApply.css">

</style>