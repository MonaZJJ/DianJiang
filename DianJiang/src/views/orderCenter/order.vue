<template>
    <div class="allBox">
        <!--<van-pull-refresh>-->
        <van-tabs
                v-model="shipType"
                title-active-color="#56BD6B"
                :line-height="2"
                @click="tabsFirstHande()"
        >
            <van-tab v-for="(item,index) in tabList" :title="item.title" :key="index" :name="item.shipType"></van-tab>
        </van-tabs>

        <van-tabs
                v-model="active"
                title-active-color="#56BD6B"
                :line-height="2"
                @click="tabsNav()"
        >
            <van-tab v-for="(item,index) in shipType == '0' ? tabList3 : tabList2" :title="item.title" :key="index"
                     :name="item.id">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrderListHandle"
                          :error.sync="error" error-text="请求失败，点击重新加载" :immediate-check="false">
                    <div class="orderBox" v-for="item,index in orderList" :key="this">
                        <!--待付款-->
                        <div class="outBox" v-if="(active == 0 || active == 20) && item.OrderState == 20" @click="toDetail(item.OId,item.ShipType)">
                            <div class="storeBox">
                                <div class="storeName">
                                    <img
                                            src="../../../static/images/member/item.png"
                                            style="width:14px;height:16px"
                                    />
                                    <span>典匠生活家</span>
                                </div>
                                <div class="state">{{item.OrderStateDec}}</div>
                            </div>
                            <div class="contentBox">
                                <img :src="item.ShowImg" class="productImg"/>
                                <div class="productBox">
                                    <div class="productItem">
                                        <div class="productName">{{item.ProductName}}</div>
                                        <div class="productTop">￥{{item.ShopPrice}}</div>
                                    </div>
                                    <div class="productItem">
                                        <div class="productBottom">{{item.Sku}}</div>
                                        <div class="productBottom">X{{item.RealCount}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div class="totalBox">
                                    共{{item.TotalCount}}件商品 实付:
                                    <span class="price">￥{{item.OrderAmount}}</span>
                                </div>
                                <div class="actionBox">
                                    <div class="btnBox greenBtn" @click.stop="closeOrderHandle(item.OId)">取消订单</div>
                                    <div class="btnBox whiteBtn" @click.stop="payHandle(item.OId)">立即支付</div>
                                </div>
                            </div>
                        </div>
                        <!--待发货-->
                        <div class="outBox" v-if="(active == 0 || active == 65) && item.OrderState == 65" @click="toDetail(item.OId,item.ShipType)">
                            <div class="storeBox">
                                <div class="storeName">
                                    <img
                                            src="../../../static/images/member/item.png"
                                            style="width:14px;height:16px"
                                    />
                                    <span>典匠生活家</span>
                                </div>
                                <div class="state">{{item.OrderStateDec}}</div>
                            </div>
                            <div class="contentBox">
                                <img :src="item.ShowImg" class="productImg"/>
                                <div class="productBox">
                                    <div class="productItem">
                                        <div class="productName">{{item.ProductName}}</div>
                                        <div class="productTop">￥{{item.ShopPrice}}</div>
                                    </div>
                                    <div class="productItem">
                                        <div class="productBottom">{{item.Sku}}</div>
                                        <div class="productBottom">X{{item.RealCount}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div class="totalBox">
                                    共{{item.TotalCount}}件商品 实付:
                                    <span class="price">￥{{item.OrderAmount}}</span>
                                </div>
                                <div class="actionBox">
                                    <div class="btnBox greenBtn" v-if="item.OrderType == 1" @click.stop="returnHandle(item.OId,item.RecordId,item.ShipType)">申请退款</div>
                                </div>
                            </div>
                        </div>
                        <!--待收货-->
                        <div class="outBox" v-if="(active == 0 || active == 75) && item.OrderState == 75" @click="toDetail(item.OId,item.ShipType)">
                            <div class="storeBox">
                                <div class="storeName">
                                    <img
                                            src="../../../static/images/member/item.png"
                                            style="width:14px;height:16px"
                                    />
                                    <span>典匠生活家</span>
                                </div>
                                <div class="state">{{item.OrderStateDec}}</div>
                            </div>
                            <div class="contentBox">
                                <img :src="item.ShowImg" class="productImg"/>
                                <div class="productBox">
                                    <div class="productItem">
                                        <div class="productName">{{item.ProductName}}</div>
                                        <div class="productTop">￥{{item.ShopPrice}}</div>
                                    </div>
                                    <div class="productItem">
                                        <div class="productBottom">{{item.Sku}}</div>
                                        <div class="productBottom">X{{item.RealCount}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div class="totalBox">
                                    共{{item.TotalCount}}件商品 实付:
                                    <span class="price">￥{{item.OrderAmount}}</span>
                                </div>
                                <div class="actionBox">
                                    <div class="btnBox whiteBtn" @click.stop="receiveOrderHandle(item.OId)">确认收货</div>
                                    <div class="btnBox greenBtn" @click.stop="checkLogicstHandle(item.OId)">查看物流</div>
                                </div>
                            </div>
                        </div>
                        <!--待取货-->
                        <div class="outBox" v-if="(active == 0 || active == 90) && item.OrderState == 90" @click="toDetail(item.OId,item.ShipType)">
                            <div class="storeBox">
                                <div class="storeName">
                                    <img
                                            src="../../../static/images/member/item.png"
                                            style="width:14px;height:16px"
                                    />
                                    <span>典匠生活家</span>
                                </div>
                                <div class="state">{{item.OrderStateDec}}</div>
                            </div>
                            <div class="contentBox">
                                <img :src="item.ShowImg" class="productImg"/>
                                <div class="productBox">
                                    <div class="productItem">
                                        <div class="productName">{{item.ProductName}}</div>
                                        <div class="productTop">￥{{item.ShopPrice}}</div>
                                    </div>
                                    <div class="productItem">
                                        <div class="productBottom">{{item.Sku}}</div>
                                        <div class="productBottom">X{{item.RealCount}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div class="totalBox">
                                    共{{item.TotalCount}}件商品 实付:
                                    <span class="price">￥{{item.OrderAmount}}</span>
                                </div>
                                <div class="actionBox">
                                    <!--<div class="btnBox whiteGreenBtn">查看门店</div>-->
                                    <!--<div class="btnBox greenBtn" @click.stop="closeOrderHandle(item.OId)">取消订单</div>-->
                                </div>
                            </div>
                        </div>
                        <!--已完成-->
                        <div class="outBox" v-if="(active == 0 || active == 120) && item.OrderState == 120" @click="toDetail(item.OId,item.ShipType)">
                            <div class="storeBox">
                                <div class="storeName">
                                    <img
                                            src="../../../static/images/member/item.png"
                                            style="width:14px;height:16px"
                                    />
                                    <span>典匠生活家</span>
                                </div>
                                <div class="state">{{item.OrderStateDec}}</div>
                            </div>
                            <div class="contentBox">
                                <img :src="item.ShowImg" class="productImg"/>
                                <div class="productBox">
                                    <div class="productItem">
                                        <div class="productName">{{item.ProductName}}</div>
                                        <div class="productTop">￥{{item.ShopPrice}}</div>
                                    </div>
                                    <div class="productItem">
                                        <div class="productBottom">{{item.Sku}}</div>
                                        <div class="productBottom">X{{item.RealCount}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div class="totalBox">
                                    共{{item.TotalCount}}件商品 实付:
                                    <span class="price">￥{{item.OrderAmount}}</span>
                                </div>
                                <div class="actionBox">
                                    <div class="btnBox whiteBtn" v-if="item.OrderType == 1" @click.stop="againHandle(item.OId)">再次购买</div>
                                    <div class="btnBox greenBtn" v-if="!item.IsReview" @click.stop="toAssessHandle(item.OId,item.RecordId,item.ShipType)">评价商品</div>
                                    <div class="btnBox greenBtn" v-if="item.OrderType == 1 && item.IsShow" @click.stop="applyHandle(item.OId,item.ShipType)">申请售后</div>
                                </div>
                            </div>
                        </div>
                        <!--已取消-->
                        <div class="outBox" v-if="(active == 0 || active == 160) && item.OrderState == 160" @click="toDetail(item.OId,item.ShipType)">
                            <div class="storeBox">
                                <div class="storeName">
                                    <img
                                            src="../../../static/images/member/item.png"
                                            style="width:14px;height:16px"
                                    />
                                    <span>典匠生活家</span>
                                </div>
                                <div class="state">{{item.OrderStateDec}}</div>
                            </div>
                            <div class="contentBox">
                                <img :src="item.ShowImg" class="productImg"/>
                                <div class="productBox">
                                    <div class="productItem">
                                        <div class="productName">{{item.ProductName}}</div>
                                        <div class="productTop">￥{{item.ShopPrice}}</div>
                                    </div>
                                    <div class="productItem">
                                        <div class="productBottom">{{item.Sku}}</div>
                                        <div class="productBottom">X{{item.RealCount}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div class="totalBox">
                                    共{{item.TotalCount}}件商品 实付:
                                    <span class="price">￥{{item.OrderAmount}}</span>
                                </div>
                                <div class="actionBox">
                                    <div class="btnBox whiteGreenBtn" v-if="item.OrderType == 1" @click.stop="againHandle(item.OId)">重新购买</div>
                                </div>
                            </div>
                        </div>
                        <!--退款中-->
                        <div class="outBox" v-if="(active == 0) && item.OrderState == 200" @click="toDetail(item.OId,item.ShipType)">
                            <div class="storeBox">
                                <div class="storeName">
                                    <img
                                            src="../../../static/images/member/item.png"
                                            style="width:14px;height:16px"
                                    />
                                    <span>典匠生活家</span>
                                </div>
                                <div class="state">{{item.OrderStateDec}}</div>
                            </div>
                            <div class="contentBox">
                                <img :src="item.ShowImg" class="productImg"/>
                                <div class="productBox">
                                    <div class="productItem">
                                        <div class="productName">{{item.ProductName}}</div>
                                        <div class="productTop">￥{{item.ShopPrice}}</div>
                                    </div>
                                    <div class="productItem">
                                        <div class="productBottom">{{item.Sku}}</div>
                                        <div class="productBottom">X{{item.RealCount}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottomBox">
                                <div class="totalBox">
                                    共{{item.TotalCount}}件商品 实付:
                                    <span class="price">￥{{item.OrderAmount}}</span>
                                </div>
                                <!--<div class="actionBox">-->
                                    <!--<div class="btnBox whiteGreenBtn" v-if="item.OrderType == 1" @click.stop="againHandle(item.OId)">重新购买</div>-->
                                <!--</div>-->
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </van-list>
            </van-tab>
        </van-tabs>
        <!--</van-pull-refresh>-->
    </div>
</template>

<script>
    import {
        orderList,
        reSubmitOrder,
        putOrdersRefund,
        receiveOrder,
        cancelOrder,
        againBuyProduct,
    } from "@/api/order";
    import {Tab, Tabs, List, PullRefresh} from "vant";

    export default {
        name: "order",
        props: {},
        data() {
            return {
                tabList: [
                    {
                        title: "到店取货",
                        shipType: "1"
                    },
                    {
                        title: "物流快递",
                        shipType: "0"
                    }
                ],
                tabList2: [
                    {
                        title: "全部",
                        id: "0"
                    },
                    {
                        title: "待付款",
                        id: "20"
                    },
                    {
                        title: "待取货",
                        id: "90"
                    },
                    {
                        title: "已完成",
                        id: "120"
                    }
                ],
                tabList3: [
                    {
                        title: "全部",
                        id: "0"
                    },
                    {
                        title: "待付款",
                        id: "20"
                    },
                    {
                        title: "待发货",
                        id: "65"
                    },
                    {
                        title: "待收货",
                        id: "75"
                    },
                    {
                        title: "已完成",
                        id: "120"
                    }
                ],
                hasOn:false,
                shipType: "0",
                active: 0,
                orderList: [],
                error: false,
                loading: false,
                finished: false,
                total: 0,
                pageIndex: 1,
                state: 0,
                isLoading: false,
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
                    that.active = (that.$route.query.value).toString() ? (that.$route.query.value).toString() : 0;
                    that.shipType = (that.$route.query.shipType).toString() ? (that.$route.query.shipType).toString() : 0;
                    that.pageIndex = 1;
                    that.orderList = [];
                    that.finished = false;
                    that.loading = true;
                    that.$nextTick(function () {
                        that.getOrderListHandle();
                    })
                },
                immediate: true
            }
        },
        computed: {},
        created() {
            var that = this;
            console.log(that.shipType,that.active)
        },
        mounted() {
        },
        methods: {
            //查看物流跳转
            checkLogicstHandle:function(oId){
                var that = this;
                that.$router.push({path:'/logistics',query:{oId:oId}})
            },
            //申请售后跳转
            applyHandle:function(oId,shipType){
                var that = this;
                that.$router.push({path:'/afterSaleApply',query:{oId:oId,type:shipType}})
            },
            //前往订单详情
            toDetail:function(oId,shipType){
              var that = this;
              if(shipType == "0"){
                  //快递
                  that.$router.push({path:'/orderDetail',query:{oId:oId,shipType:shipType}})
              }else{
                  //自提
                  that.$router.push({path:'/selfOrderDetail',query:{oId:oId,shipType:shipType}})
              }
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
                    "oid": id
                };
                againBuyProduct(data).then(response => {
                    console.log(response);
                    that.$router.push({path:'/cart'})
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
                    "oid": id
                };
                that.Common.confirmDialog('确认收货吗', function () {
                    receiveOrder(data).then(response => {
                        console.log(response);
                        that.Common.showMsg('确认收货成功', function () {
                            that.pageIndex = 1;
                            that.orderList = [];
                            that.finished = false;
                            that.loading = true;
                            that.$nextTick(function () {
                                that.getOrderListHandle();
                            })
                        })
                    })
                })
            },
            //关闭订单
            closeOrderHandle: function (id) {
                var that = this;
                var data = {
                    "oid": id
                };
                that.Common.confirmDialog('确认要取消吗', function () {
                    cancelOrder(data).then(response => {
                        console.log(response);
                        that.Common.showMsg('取消订单成功', function () {
                            that.pageIndex = 1;
                            that.orderList = [];
                            that.finished = false;
                            that.loading = true;
                            that.$nextTick(function () {
                                that.getOrderListHandle();
                            })
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
                                that.$router.replace({
                                    path: "/order",
                                    query: {value: that.active, shipType: that.shipType}
                                });
                            });

                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            //用户取消支付后跳转地址
                            that.Common.showMsg("取消支付", function () {
                                localStorage.removeItem('payObj')
                                that.$router.replace({
                                    path: "/order",
                                    query: {value: that.active, shipType: that.shipType}
                                });
                            });
                        } else {
                            that.Common.showMsg(res.errMsg, function () {
                                localStorage.removeItem('payObj')
                                that.$router.replace({
                                    path: "/order",
                                    query: {value: that.active, shipType: that.shipType}
                                });
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
                var oid = id;
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
            tabsFirstHande: function () {
                var that = this;
                that.$router.replace({path: "/order", query: {value: 0, shipType: that.shipType}});
                console.log()
            },
            //tab切换
            tabsNav: function () {
                var that = this;
                that.$router.replace({path: "/order", query: {value: that.active, shipType: that.shipType}});
            },
            getOrderListHandle: function () {
                var that = this;

                //请求方法
                //请求数据
                var data = {
                    "ShipType": that.shipType,
                    "OrderState": that.active,
                    "Page": {"PageSize": 4, "PageIndex": that.pageIndex},
                };
                orderList(data).then(response => {
                    if (that.pageIndex == 1) {
                        that.orderList = [...response.Data.OrderList];
                    } else {
                        that.orderList = [...that.orderList, ...response.Data.OrderList]
                    }
                    that.total = response.Data.Total;
                    that.pageIndex += 1;
                    // 加载状态结束
                    that.loading = false;
                    that.isLoading = false;
                    // 数据全部加载完成
                    if (that.orderList.length >= that.total) {
                        that.finished = true;
                    }
                }).catch(err => {
                    that.error = true;
                    that.Common.showMsg(data.data.Message);
                })
            },

        }
    };
</script>
<style>
    @import "../../../static/css/tab.css";
</style>
<style scoped src="../../../static/css/order.css">
</style>
