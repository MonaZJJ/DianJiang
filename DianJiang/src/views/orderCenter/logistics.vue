<template>
    <div class="allBox">
        <section class="productBox">
            <div class="productItem" v-for="item,index in logistsProductInfoList" :key="index">
                <img :src="item.ShowImg" class="productImg" alt/>
                <div class="productRightBox">
                    <div class="productName">{{item.Name}}</div>
                    <div class="priceBox">
                        <div class="num">￥{{item.ShopPrice}}</div>
                        <!--<div class="red" v-clipboard:copy="orderInfo.OSn">复制</div>-->
                    </div>
                </div>
            </div>
        </section>

        <div class="bigBox">
            <div class="title">物流跟踪</div>
            <div class="logisticsBox" >
                <div class="item_infoTop" v-if="logisticInfo.status==0" >暂时没有物流信息</div>
                <div>
                    <div class="outBox" v-if="logisticInfo.status!=0" v-for="(item,index) in logisticInfo.data" :key="index">
                        <div class="item_info" v-if="index == 0">
                            <div class="desc_content">
                                <span class="title_desc" style="color:#999;">{{item.context}}</span>
                                <span class="time_date">{{item.time}}</span>
                                <span class="time_dateNext">{{item.ftime}}</span>
                                <div class="icon"></div>
                            </div>
                        </div>
                        <div class="item_info" v-if="index!=0 && index!=(logisticInfo.data.length-1)">
                            <div class="desc_content">
                                <span class="title_desc" style="color:#999;">{{item.context}}</span>
                                <span class="time_date">{{item.time}}</span>
                                <span class="time_dateNext">{{item.ftime}}</span>
                                <div class="icon_sign_dot"></div>
                            </div>
                        </div>
                        <div class="item_info"
                             v-if="index==(logisticInfo.data.length-1) && logisticInfo.data.length > 1">
                            <div class="desc_content">
                                <span class="title_desc" style="color:#999;">{{item.context}}</span>
                                <span class="time_date">{{item.time}}</span>
                                <span class="time_dateNext">{{item.ftime}}</span>
                                <div class="icon"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {orderLogistics} from "@/api/order";

    export default {
        props: {},
        data() {
            return {
                oid: 0,
                olid: 0,
                logisticInfo: "",
                logisticsCompany: "",
                logistsProductInfoList:[],
            };
        },
        components: {},
        watch: {},
        computed: {},
        created() {
            var that = this;
            that.oId = that.$route.query.oId;
            text().then(response => {
                console.log(response);
            });
        },
        mounted() {
            var that = this;
            that.orderLogistics();
        },
        methods: {
            //物流信息接口
            orderLogistics: function () {
                var that = this;
                //请求数据
                var data = {
                    Oid: that.oId,
                };
                orderLogistics(data).then(response => {
                    console.log(response);
                    that.logisticInfo = response.Data.OrdersLogisticsInfo.ReceiveLogistics;
                    that.logisticsCompany = response.Data.OrdersLogisticsInfo.OrderAddressInfo.ShipFriendName;
                    that.logistsProductInfoList = response.Data.OrdersLogisticsInfo.LogistsProductInfoList;
                })
            }
        }
    };
</script>

<style scoped src="../../../static/css/logistics.css">

</style  >
