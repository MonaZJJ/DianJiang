<template>
    <div class="box">
        <van-swipe class="swiper" :autoplay="2000" indicator-color="white">
            <van-swipe-item class="swipeItem" v-for="item,index in productInfo.ShowImgList" :key="index">
                <img class="swiperImg" :src="item" alt/>
            </van-swipe-item>
        </van-swipe>
        <div class="priceBox">
            <div class="price">{{productInfo.BuyCredits}}积分</div>
            <img @click="showShareLayer" class="shareIcon" src="../../../static/images/product/share.png" alt/>
        </div>
        <div class="outBox">
            <div class="productName">{{productInfo.Name}}</div>
            <div class="summary">{{productInfo.FeeDescription}}</div>
            <div class="saleBox">
                <div>库存{{productInfo.Number}}</div>
                <div>已售{{productInfo.SaleCount}}</div>
            </div>
        </div>
        <div class="itemBox">
            <div class="itemLeft">
                <div class="itemTitle">服务</div>
                <div class="itemContent">{{productInfo.ServiceDescription}}</div>
            </div>
            <!--<img class="rightIcon" src="../../../static/images/product/right.png" alt/>-->
        </div>
        <!-- tab栏 -->
        <div class="tabBox">
            <div class="tabItem" :class="{active: active == '0'}" @click="tabHandle(0)">详情</div>
            <div class="tabItem" :class="{active: active == '1'}" @click="tabHandle(1)">参数</div>
        </div>
        <!--content-->
        <div class="tabContext" style="background: #fff;overflow: hidden;padding-bottom: 50px;font-size: 14px" v-show="active == 0">
            <div v-html="productInfo.Description"></div>
        </div>
        <div class="tabContext" style="background: #fff;overflow: hidden;padding-bottom: 50px;font-size: 14px" v-show="active == 1">
            <div v-html="productInfo.Summary"></div>
        </div>
        <!-- 底部导航栏 -->
        <div class="footerBox">
            <!--<div class="footerLeft">-->
                <!--<div class="footerIcon" @click="toCart">-->
                    <!--<img class="iconOne" src="../../../static/images/product/cart.png" alt/>-->
                    <!--<span>购物车</span>-->
                    <!--<div class="cartNum">1</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="footerRight">
                <div class="actionBox" style="background:#56BD6B" @click="buyHandle('soon')">立即购买</div>
            </div>
        </div>
        <!--分享-->
        <div class="share-layer" v-show="showLayer" @click="hideShareLayer">
            <img src="../../../static/images/product/layer.png" />
        </div>
        <!-- 回到首页按钮 -->
        <img class="indexBtn" @click="returnHandle" src="../../../static/images/product/returnIndex.png" alt/>
        <!-- 回到顶部按钮 -->
        <img class="upBtn" @click="backTop" src="../../../static/images/product/up.png" alt/>
        <!-- sku弹窗 -->
        <div class="mask" v-if="isShow" @click="closeHandle"></div>
        <div class="skuOutBox" v-if="isShow">
            <div class="skuTopbox">
                <img class="skuImg" :src="productInfo.ShowImgFull"/>
                <div class="skuProNameBox">
                    <div class="skuProductName">{{productInfo.Name}}</div>
                    <div class="skuPrice">{{productInfo.BuyCredits}}积分</div>
                </div>
            </div>
            <div class="skuOverBox">
                <sku :jsonData="jsonData" v-if="jsonData" @sku-data="skuDataHandle"></sku>
            </div>
            <!-- 数量选择器 -->
            <div class="countNumBox">
                <div class="countText">数量</div>
                <div class="countChangeBox">
                    <div class="reduceBtn" @click="changeCountHandle('reduce')">
                        -
                    </div>
                    <div class="cartNumInner">
                        {{count}}
                    </div>
                    <div class="addBtn" @click="changeCountHandle('add')">
                        +
                    </div>
                </div>
            </div>
            <div class="sureBtn" @click="actionBuyHandle">
                立即购买
            </div>
        </div>
    </div>
</template>

<script>
    import {Swipe, SwipeItem} from "vant";
    import Sku from "views/productCenter/components/sku/sku.vue";
    const wx = require('weixin-js-sdk');
    import { jsSdkShare } from "@/api/member";
    import {
        creditProductDetails,
    } from "@/api/product";

    export default {
        props: {},
        data() {
            return {
                pId: 0,
                productInfo: "",
                showLayer:false,
                isShow: "",
                count: 1,
                active: 0,
                buyType: '',
                jsonData:"",
                shareTitle:"典匠生活", // 分享标题
                shareDes:"快来加入吧！",//分享描述
                shareImgPath:"http://dianjiang.shenguoyuan.com/upload/admin/ProductImg/20200220144654_6616.jpg", // 分享图标
            };
        },
        components: {
            "van-swipe": Swipe,
            "van-swipe-item": SwipeItem,
            [Sku.name]: Sku
        },
        watch: {
            $route: {
                handler: function (to, from) {
                    var that = this;
                    that.pId = to.query.pId;
                    that.getProductDetailMethod();
                },
                immediate: true
            }
        },
        computed: {
            pageUrl(){
                return  process.env.VUE_APP_BASE_API_SHARE + '/integralDetail?pId=' + this.pId
            }
        },
        created() {
            var that = this;
        },
        mounted() {
            window.addEventListener('scroll', this.scrollToTop)
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollToTop)
        },

        methods: {
            returnHandle:function(){
                var that = this;
                that.$router.push('/')
            },
            showShareLayer: function() {
                this.showLayer = true;
            },
            hideShareLayer: function() {
                this.showLayer = false;
            },
            //获取积分详情接口
            getProductDetailMethod: function () {
                var that = this;
                var data = {
                    PId: that.pId
                };
                creditProductDetails(data).then(response => {
                    console.log(response);
                    that.shareTitle = response.Data.Name;
                    that.shareImgPath = response.Data.ShowImgFull;
                    that.shareDes = response.Data.FeeDescription;
                    that.productInfo = response.Data;
                    that.jsonData = ""
                })
            },
            wxShare: function () {
                var that = this;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: that.GLOBAL.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: that.timestamp, // 必填，生成签名的时间戳
                    nonceStr: that.nonceStr, // 必填，生成签名的随机串
                    signature: that.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: that.shareTitle, // 分享标题
                        link: that.pageUrl, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: that.shareImgPath, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    // 分享给朋友
                    wx.onMenuShareAppMessage({
                        title: that.shareTitle, // 分享标题
                        desc: that.shareDes, // 分享描述
                        link: that.pageUrl, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: that.shareImgPath, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },

            // 获取分享数据
            getShareData: function () {
                var that = this;
                var data = {
                    Url: process.env.VUE_APP_BASE_API_SHARE + '/integralDetail?pId=' + that.pId,
                };
                jsSdkShare(data).then(response => {
                    that.timestamp = response.Data.Timestamp;
                    that.nonceStr = response.Data.NonceStr;
                    that.signature = response.Data.Signature;
                    that.wxShareHandle()
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },
            //点击切换
            tabHandle: function (index) {
                var that = this;
                that.active = index;
            },
            closeHandle: function () {
                var that = this;
                that.isShow = false;
            },
            //弹窗出现
            buyHandle: function (type) {
                var that = this;
                that.isShow = true;
                that.buyType = type;
            },
            //立即购买
            actionBuyHandle: function () {
                var that = this;
                //库存
                var num = that.productInfo.Number;
                //判断购买的数量与库存的关系
                if (that.count <= num) {
                    that.$router.push({
                        path: "/integralPayOrder",
                        query: {
                            count: that.count,
                            pId: that.pId,
                        }
                    });
                } else {
                    that.Common.showMsg("库存不足");
                }
            },
            //更改数量
            changeCountHandle: function (type) {
                var that = this;
                if (type == "add") {
                    that.count += 1;
                } else {
                    if (that.count > 1) {
                        that.count -= 1;
                    }
                }
            },
            //前往购物车
            toCart: function () {
                var that = this;
                that.$router.push("/cart");
            },
            backTop() {
                const that = this
                document.documentElement.scrollTop = 0;
            },
        }
    };
</script>

<style scoped src="../../../static/css/integralDetail.css">
</style>
