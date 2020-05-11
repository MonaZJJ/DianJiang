<template>
    <div class="allBox">
        <van-tabs
                v-model="active"
                color="#56BD6B"
                title-active-color="#56BD6B"
                title-inactive-color="#000000"
                :line-height="2"
                @click="onTabClick"
        >
            <van-tab title="自提订单" name="0"></van-tab>
            <van-tab title="售后订单" name="1"></van-tab>
        </van-tabs>
        <!--自提订单-->
        <section v-if="active==0">
            <van-tabs
                    v-model="state"
                    color="#56BD6B"
                    title-active-color="#56BD6B"
                    title-inactive-color="#000000"
                    :line-height="2"
                    @click="onSecondTabClick()"
                    class="secondTab"
            >
                <van-tab v-for="(item,index) in selfTab" :title="item.title" :key="index" :name="item.status">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            :error.sync="error"
                            error-text="请求失败，点击重新加载"
                            :immediate-check="false"
                            @load="getOrderList()"
                    >
                        <div class="order-box" @click.stop="goDetail(item.OId)" :style="index==0?'margin-top:10px':''"
                             v-for="(item, index) in listData" :key="index">
                            <van-cell :title="'订单编号：'+item.OSn" :value="item.OrderStateDec" title-class="titleClass"
                                      value-class="valueClass"></van-cell>
                            <div class="pro-item">
                                <img :src="item.ShowImg" alt/>
                                <div>
                                    <div class="proName van-clearfix">
                                        <span class="van-multi-ellipsis--l2">{{item.ProductName}}</span>
                                        <span>￥{{item.ShopPrice}}</span>
                                    </div>
                                    <div class="van-clearfix">
                                        <span>{{item.Sku}}</span>
                                        <span>X{{item.RealCount}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pro-pay">
                                共{{item.TotalCount}}件商品&emsp;实付:
                                <span>￥{{item.OrderAmount}}</span>
                            </div>
                            <div class="pro-btn" @click.stop="toDetail(item.OId)">查看详情</div>
                        </div>
                    </van-list>
                </van-tab>
            </van-tabs>

        </section>

        <!--售后订单-->
        <section v-if="active==1">
            <van-tabs
                    v-model="state"
                    color="#56BD6B"
                    title-active-color="#56BD6B"
                    title-inactive-color="#000000"
                    :line-height="2"
                    @click="onSecondTabClick()"
                    class="secondTab"
            >
                <van-tab v-for="(item,index) in afterTab" :title="item.title" :key="index" :name="item.status">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            :error.sync="error"
                            error-text="请求失败，点击重新加载"
                            :immediate-check="false"
                            @load="getOrderList()"
                    >
                        <div class="order-box" @click.stop="goDetail(item.ASId)" :style="index==0?'margin-top:10px':''"
                             v-for="(item, index) in listData" :key="index">
                            <van-cell :title="'订单编号：'+item.OSn" :value="item.AsStateStr" title-class="titleClass"
                                      value-class="valueClass"></van-cell>
                            <div class="pro-item">
                                <img :src="item.PShowImg" alt/>
                                <div>
                                    <div class="proName van-clearfix">
                                        <span class="van-multi-ellipsis--l2">{{item.PName}}</span>
                                        <span>￥{{item.SurplusMoney}}</span>
                                    </div>
                                    <div class="van-clearfix">
                                        <span>{{item.Sku}}</span>
                                        <span>X{{item.SendCount}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pro-pay">
                                共{{item.SendCount}}件商品&emsp;实付:
                                <span>￥{{item.SurplusMoney}}</span>
                            </div>
                            <div class="pro-btn" v-if="item.AsState==1" @click.stop="returnGoods(item.ASId)">确认{{item.TypeDesc}}</div>
                        </div>
                    </van-list>
                </van-tab>
            </van-tabs>

        </section>

        <van-row class="tab-box">
            <van-col span="8">
                <van-col span="24">
                    <img src="../../../static/images/index/ziti_on.png" alt style="width:22px;height:20px;"/>
                </van-col>
                <van-col span="24" class="text active">自提订单</van-col>
            </van-col>
            <van-col span="8" @click.stop="wxScanClick()">
                <van-col span="24" class="scan">
                    <img src="../../../static/images/index/saoma.png" alt/>
                </van-col>
                <van-col span="24" class="scanText">扫一扫</van-col>
            </van-col>
            <van-col span="8">
                <router-link :to="{ path: '/storeMe' }">
                    <van-col span="24">
                        <img src="../../../static/images/index/mine.png" alt style="width:20px;height:20px;"/>
                    </van-col>
                    <van-col span="24" class="text">我的</van-col>
                </router-link>
            </van-col>
        </van-row>

    </div>
</template>

<script>
    import {
        storeOrderList,
        storeReturnApplyListingList,
        jsSdkShare,
        storeAuditAfterSalesService
    } from "@/api/store";
    import {Tabs, Tab, Cell, Col, Row, List , CellGroup, Field  } from "vant";
    const wx = require('weixin-js-sdk');

    export default {
        name: "storeOrderList",
        components: {
            "van-tabs": Tabs,
            "van-tab": Tab,
            "van-cell": Cell,
            "van-row": Row,
            "van-col": Col,
            "van-list": List,
            "van-cell-group": CellGroup,
            "van-field": Field
        },
        data() {
            return {
                active: "0",
                state: "0",

                selfTab:[
                    {
                        title: "全部",
                        status: "0"
                    },
                    {
                        title: "待自提",
                        status: "90"
                    },
                    {
                        title: "已完成",
                        status: "120"
                    }
                ],

                afterTab:[
                    {
                        title: "全部",
                        status: "0"
                    },
                    {
                        title: "待处理",
                        status: "1"
                    },
                    {
                        title: "已处理",
                        status: "2"
                    }
                ],

                listData: [],
                pageIndex: 1,
                total: 0,
                loading: false,
                finished: false,
                error: false,

                timestamp : "",
                nonceStr : "",
                signature : "",

            };
        },
        watch: {
            $route: {
                handler: function (to, from) {
                    var that = this;
                    that.active = to.query.act ? to.query.act : "0";
                    that.state = to.query.state ? to.query.state : "0";
                    that.pageIndex = 1;
                    that.total = 0;
                    that.loading = false;
                    that.finished = false;
                    that.error = false;
                    that.listData = [];
                    that.getShareData();
                    that.getOrderList();
                },
                immediate: true
            }
        },
        computed: {},
        methods: {

            onTabClick() {
                var that = this;
                that.$router.replace({path: "/storeOrderList", query: {act: that.active, state: 0}});
            },

            onSecondTabClick() {
                var that = this;
                that.$router.replace({path: "/storeOrderList", query: {act: that.active, state: that.state}});
            },

            //获取订单列表
            getOrderList() {
                var that = this;
                if (that.active==0){
                    //普通订单
                    var data = {
                        "OrderState": Number(that.state),    //0全部 90待自提 120已完成
                        "Page": {
                            "PageIndex": that.pageIndex,
                            "PageSize": 6
                        }
                    }
                    storeOrderList(data).then(response => {
                        if (that.pageIndex == 1) {
                            that.listData = [...response.Data.OrderList];
                        } else {
                            that.listData = [...that.listData,...response.Data.OrderList];
                        }
                        that.total = response.Data.Total;
                        //加载状态结束
                        that.loading = false;
                        // 数据全部加载完毕
                        if (that.listData.length >= that.total) {
                            that.finished = true;
                        } else {
                            that.pageIndex += 1;
                        }
                    }).catch(err => {
                        that.loading = false;
                        that.error = true;
                        that.Common.showMsg(err.data.Message);
                    });
                } else{
                    //售后订单
                    var data = {
                        "AsState": Number(that.state),   //0全部 1审核中 2已处理
                        "Page": {
                            "PageIndex": that.pageIndex,
                            "PageSize": 6
                        }
                    }
                    storeReturnApplyListingList(data).then(response => {
                        if (that.pageIndex == 1) {
                            that.listData = [...response.Data.StoreAsList];
                        } else {
                            that.listData = [...that.listData,...response.Data.StoreAsList];
                        }
                        that.total = response.Data.Total;
                        //加载状态结束
                        that.loading = false;
                        // 数据全部加载完毕
                        if (that.listData.length >= that.total) {
                            that.finished = true;
                        } else {
                            that.pageIndex += 1;
                        }
                    }).catch(err => {
                        that.loading = false;
                        that.error = true;
                        that.Common.showMsg(err.data.Message);
                    });
                }

            },

            //自提订单详情
            toDetail(id) {
                this.$router.push({path: "/storeOrderDetail", query: {oId: id}});
            },

            //售后订单申请-退货,换货
            returnGoods(id) {
                var that = this;
                var data = {
                    "AsSId": id,
                    "AuditState": 2,        //2：通过 3拒绝
                };
                that.Common.confirmDialog("确认该订单申请吗？",function () {
                    storeAuditAfterSalesService(data).then(response => {
                        that.Common.showMsg("审核成功",function () {
                            that.$router.go(0);  //刷新页面
                        });
                    }).catch(err => {
                        that.Common.showMsg(err.data.Message);
                    });
                });
            },
            //去订单详情页面  需判断自提或者是售后
            goDetail(id) {
                if (this.active == 0) {
                    this.$router.push({path: "/storeOrderDetail", query: {oId: id}});
                } else {
                    this.$router.push({path: "/afterSaleOrderDetail", query: {oId: id}});
                }
            },

            // 获取分享数据
            getShareData: function () {
                var that = this;
                //url: location.href.splic('#')[0]  // 这里是当前页面的url，一定要 location.href 获取，不然签名会无效。
                var data = {
                    Url:  process.env.VUE_APP_BASE_API_SHARE + '/storeOrderList?act=' + that.active + '&state=' + that.state
                };
                jsSdkShare(data).then(response => {
                    that.timestamp = response.Data.Timestamp;
                    that.nonceStr = response.Data.NonceStr;
                    that.signature = response.Data.Signature;
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },

            wxScanClick(){
                console.log("点击了扫一扫");
                if(this.signature!=""){
                    this.wxScan();
                }
            },
            //微信扫码
            wxScan(){
                var that = this;
                wx.config({
                    debug: false,
                    appId: that.GLOBAL.appId, // 必填,公众号的唯一标识
                    timestamp: that.timestamp, // 必填,生成签名的时间戳
                    nonceStr: that.nonceStr, // 必填,生成签名的随机串
                    signature: that.signature, // 必填,签名
                    jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
                })
                wx.ready(function () {
                    // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
                    // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
                    wx.checkJsApi({ // 判断当前客户端版本是否支持指定JS接口
                        jsApiList: [
                            'scanQRCode'
                        ],
                        success: function (res) { // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
                            if (res.checkResult.scanQRCode === true) {
                                wx.scanQRCode({ // 微信扫一扫接口
                                    desc: 'scanQRCode desc',
                                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                                    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                                    success: function (res) {
                                        // that.result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
                                        var arr = res.resultStr.split('&');
                                        if (arr[1] == 1){  //订单详情
                                            that.$router.push({path: "/storeOrderDetail", query: {oId: arr[0]}});
                                        } else {    //售后详情
                                            that.$router.push({path: "/afterSaleOrderDetail", query: {oId: arr[0]}});
                                        }
                                    }
                                })
                            } else {
                                alert('抱歉，当前客户端版本不支持扫一扫')
                            }
                        },
                        fail: function (res) { // 检测getNetworkType该功能失败时处理
                            alert('fail' + res)
                        }
                    })
                })
                /* 处理失败验证 */
                wx.error(function (res) {
                // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
                    alert('配置验证失败: ' + res.errMsg)
                })
            },


        },
        beforeRouteEnter(to, from, next) {
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            // XXX: 修复iOS版微信HTML5 History兼容性问题
            if (isiOS && to.path !== location.pathname) {
                // 此处不可使用location.replace
                location.assign(to.fullPath)
            } else {
                next()
            }
        },
        mounted() {
            var that = this;
        },
        created() {
            var that = this;

        }
    };
</script>

<style scoped src="../../../static/css/afterSaleOrderList.css">
</style>