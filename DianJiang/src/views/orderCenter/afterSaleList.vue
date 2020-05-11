<template>
    <div class="allBox">

        <!--<van-pull-refresh>-->
        <van-tabs
                v-model="active"
                sticky
                title-active-color="#56BD6B"
                :line-height="2"
                @click="tabsNav()"
        >
            <van-tab v-for="(item,index) in tabList" :title="item.title" :name="item.type" :key="index">

                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        :error.sync="error"
                        error-text="请求失败，点击重新加载"
                        @load="getOrderListHandle"
                >
                    <div class="orderBox" v-for="(item, index) in orderList" :key="index">
                        <router-link :to="{ path: '/afterSaleDetail', query: { said: item.ASId }}">
                            <div class="outBox">
                                <div class="storeBox">
                                    <div class="storeName">
                                        <img src="../../../static/images/member/item.png" style="width:14px;height:16px" />
                                        <span>典匠生活家</span>
                                    </div>
                                    <div class="state">{{item.AsStateStr}}</div>
                                </div>
                                <div class="contentBox">
                                    <img :src="item.PShowImg" class="productImg" />
                                    <div class="productBox">
                                        <div class="productItem">
                                            <div class="productName">{{item.PName}}</div>
                                            <div class="productTop">￥{{item.SurplusMoney}}</div>
                                        </div>
                                        <div class="productItem">
                                            <div class="productBottom">{{item.Sku}}</div>
                                            <div class="productBottom">X{{item.SendCount}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottomBox">
                                    <div class="totalBox">
                                        共{{item.SendCount}}件商品 实付: <span class="price">￥{{item.SurplusMoney}}</span>
                                    </div>
                                    <div class="actionBox" v-if="item.State==1">
                                        <div class="btnBox whiteBtn" @click.stop="withdraw(item.ASId)">取消申请</div>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </van-list>

            </van-tab>
        </van-tabs>
        <!--</van-pull-refresh>-->

    </div>
</template>

<script>
    import { afterServicesList,cancelReturnOrderProduct } from "@/api/aftersale";
    import { Tab, Tabs, List, PullRefresh } from "vant";
    export default {
        name: "afterSaleList",
        props: {},
        data() {
            return {
                tabList: [
                    {
                        title: "全部",
                        type: "-1"
                    },
                    {
                        title: "待售后",
                        type: "0"
                    },
                    {
                        title: "已完成",
                        type: "1"
                    }
                ],
                active: "-1",

                orderList: [],
                loading: false,
                finished: false,
                total: 0,
                pageIndex: 1,
                error: false,

            };
        },
        components: {
            "van-tabs": Tabs,
            "van-tab": Tab,
            "van-list": List,
            "van-pull-refresh": PullRefresh
        },
        watch: {
            '$route': {
                handler: function (to, from) {
                    var that = this;
                    that.active = that.$route.query.value;
                    that.error = false;
                    that.loading = false;
                    that.finished = false;
                    that.total = 0;
                    that.pageIndex = 1;
                    that.orderList = [];

                },
                immediate: true
            }
        },
        computed: {},
        created() {
            var that = this;
            console.log(that.active);

        },
        mounted() {},
        methods: {
            //tab切换
            tabsNav: function() {
                var that = this;
                that.$router.replace({ path: "/afterSaleList", query: { value: that.active } });
            },
            //取消申请
            withdraw: function(id){
                var that = this;
                that.Common.confirmDialog("确认取消申请？",function () {
                    var data = {
                        "AsId": id
                    }
                    cancelReturnOrderProduct(data).then(response =>{
                        that.Common.showMsg("取消申请成功",function () {
                            window.location.reload();
                        });
                    }).catch(err =>{
                        that.Common.showMsg(err.data.Message);
                    });
                })
            },
            getOrderListHandle: function () {
                var that = this;
                var data = {
                    "Page": {
                        "PageIndex": that.pageIndex,
                        "PageSize": 10
                    },
                    "Status": Number(that.active),
                };
                afterServicesList(data).then(response =>{
                    if (that.pageIndex == 1) {
                        that.orderList = [...response.Data.StoreAsList];
                    } else {
                        that.orderList = [...that.orderList,...response.Data.StoreAsList]
                    }
                    that.total = response.Data.Total;
                    that.pageIndex += 1;
                    // 加载状态结束
                    that.loading = false;
                    // 数据全部加载完成
                    if (that.orderList.length >= that.total) {
                        that.finished = true;
                    }
                }).catch(err =>{
                    that.loading = false;
                    that.error = true;
                    that.Common.showMsg(err.data.Message);
                });
            },

        }
    };
</script>
<style>
    @import "../../../static/css/tab.css";
</style>
<style scoped src="../../../static/css/order.css">
</style>
