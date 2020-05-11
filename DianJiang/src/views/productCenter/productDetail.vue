<template>
    <div class="box">
        <van-swipe class="swiper" :autoplay="2000" indicator-color="white">
            <van-swipe-item class="swipeItem" v-for="item,index in productInfo.ShowImgList">
                <img class="swiperImg" :src="item" alt/>
            </van-swipe-item>
        </van-swipe>
        <div class="priceBox">
            <div class="price">原价：¥{{productInfo.ShopPrice}}</div>
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
        <!-- 相关产品 -->
        <div class="relatedProductsBox" v-if="productGroupInfoList.length > 0">
            <div class="relatedProductsTitle">
                <div class="titleP">相关产品</div>
            </div>
            <van-swipe class="relatedPSwiper" :autoplay="3000" indicator-color="#E53333">
                <van-swipe-item v-for="item,index in productGroupInfoList">
                    <div class="productBox">
                        <div class="productItem" @click="toDetail(inner.PId)"
                             v-for="inner,innerIndex in item.ProductPartInfoList">
                            <img class="productImg" :src="inner.ShowImg" alt/>
                            <div class="productInnerName">{{inner.Name}}</div>
                            <div class="productInnerPrice">
                                <div>￥{{inner.ShopPrice}}</div>
                                <img class="cartIcon" src="../../../static/images/product/cartList.png" alt/>
                            </div>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- tab栏 -->
        <div class="tabBox">
            <div class="tabItem" :class="{active: active == '0'}" @click="tabHandle(0)">详情</div>
            <div class="tabItem" :class="{active: active == '1'}" @click="tabHandle(1)">参数</div>
            <div class="tabItem" :class="{active: active == '2'}" @click="tabHandle(2)">评论</div>
        </div>
        <!--content-->
        <div class="tabContext" v-show="active == 0" style="background: #fff;overflow: hidden;padding-bottom: 50px;font-size: 14px">
            <div style="white-space: pre-wrap;" v-html="productInfo.Description"></div>
        </div>
        <div class="tabContext" v-show="active == 1" style="background: #fff;overflow: hidden;padding-bottom: 50px;font-size: 14px">
            <div style="white-space: pre-wrap;" v-html="productInfo.Summary"></div>
        </div>
        <div class="tabContext" v-show="active == 2" style="background: #f5f5f5;overflow: hidden;padding-bottom: 50px">
            <div class="commentOutBox">
                <div class="commentsBox" v-for="item,index in productReviewsList">
                    <div class="commentsTitle">
                        <div class="coLeftBox">
                            <img class="headImg" :src="item.Avatar" alt/>
                            <div class="userName">{{item.UName}}</div>
                        </div>
                        <div class="dateBox">{{item.ReviewTimeDec}}</div>
                    </div>
                    <div class="commentsInner">{{item.Message}}</div>
                    <div class="commentsImgBox" >
                        <img :src="inner"  v-for="inner,innerIndex in item.ReviewImgFullList" alt/>
                    </div>
                </div>
                <!--查看更多评论-->
                <div class="seeMoreBtn" v-if="reviewsTotal > 3" @click="toSeeMore">
                    查看更多评论
                </div>
            </div>
        </div>
        <!-- 底部导航栏 -->
        <div class="footerBox">
            <div class="footerLeft">
                <div class="footerIcon" v-if="!productInfo.IsCollect" @click="collectHandle('collect')">
                    <img class="iconOne" src="../../../static/images/product/collect.png" alt/>
                    <span>收藏</span>
                </div>
                <div class="footerIcon" v-else @click="collectHandle('uncollect')">
                    <img class="iconOne" src="../../../static/images/product/collectOn.png" alt/>
                    <span>已收藏</span>
                </div>
                <div class="footerIcon" @click="toCart">
                    <img class="iconOne" src="../../../static/images/product/cart.png" alt/>
                    <span>购物车</span>
                    <div class="cartNum" v-if="cartCount > 0">{{cartCount}}</div>
                </div>
            </div>
            <div class="footerRight">
                <div class="actionBox" style="background:#9CE0AA" @click="buyHandle('cart')">加入购物车</div>
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
                    <div class="skuPrice">￥{{productInfo.ShopPrice}}</div>
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
            <div class="sureBtn" v-if="buyType == 'cart'" @click="addCartHandle">
                加入购物车
            </div>
            <div class="sureBtn" v-else @click="actionBuyHandle">
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
        productDetail,
        productReviewsList,
        relevantProductList,
        skuList,
        addProductToFavorite,
        delProductToFavorite,
        addProduct,
        cartCount
    } from "@/api/product";

    export default {
        props: {},
        data() {
            return {
                pId: 0,
                productInfo: "",
                isSku: '',
                showLayer:false,
                isShow: "",
                count: 1,
                active: 0,
                productReviewsList: [],
                productGroupInfoList: [],
                skuId: 0,
                reviewsTotal:0,
                cartCount:0,
                buyType: '',
                skuStr: '',
                shareTitle:"典匠生活", // 分享标题
                shareDes:"快来加入吧！",//分享描述
                shareImgPath:"", // 分享图标
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
                    that.getProductReviewsListMethod();
                    that.getRelevantProductListMethod();
                },
                immediate: true
            }
        },
        computed: {
            pageUrl(){
                return  process.env.VUE_APP_BASE_API_SHARE + '/productDetail?pId=' + this.pId
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
            //前往商品详情
            toDetail: function (id) {
                var that = this;
                that.$router.push({path: '/productDetail', query: {pId: id}})
            },
            //查看更多评论
            toSeeMore:function(){
                var that = this;
                that.$router.push({path: '/productReviewList', query: {pId: that.pId}})
            },
            //收藏处理
            collectHandle: function (type) {
                var that = this;
                if (type == 'collect') {
                    var data = {
                        PId: that.pId
                    }
                    addProductToFavorite(data).then(response => {
                        console.log(response);

                        that.productInfo.IsCollect = true;

                    })
                } else {
                    var data = {
                        PIdList: [that.pId]
                    }
                    delProductToFavorite(data).then(response => {
                        console.log(response);

                        that.productInfo.IsCollect = false;

                    })
                }
            },
            //获取商品详情接口
            getProductDetailMethod: function () {
                var that = this;
                var data = {
                    PId: that.pId
                };
                productDetail(data).then(response => {
                    console.log(response);
                    that.shareTitle = response.Data.ProductDetails.Name;
                    that.shareImgPath = response.Data.ProductDetails.ShowImgFull;
                    that.shareDes = response.Data.ProductDetails.FeeDescription;
                    that.productInfo = response.Data.ProductDetails;
                    that.isSku = response.Data.IsSign;
                    that.cartCount = response.Data.CartCount;
                    //判断是否有sku
                    if (that.isSku) {
                        that.getSkuMethod();
                    } else {
                        that.jsonData = "";
                        that.skuId = response.Data.ProductDetails.SKuList[0].RecordId;
                        that.pId = response.Data.ProductDetails.PId;
                        that.isSelect = true;
                    }
                    //获取分享的信息
                    that.getShareData();

                })
            },
            //获取购物车商品数量
            getCartCountMethod: function () {
                var that = this;
                var data = {};
                cartCount(data).then(response => {
                    console.log(response);
                    that.cartCount = response.Data.Count;

                })
            },
            //获取商品sku
            getSkuMethod: function () {
                var that = this;
                var data = {
                    PId: that.pId
                };
                skuList(data).then(response => {
                    console.log(response);

                    that.jsonData = response.Data;

                })
            },
            //获取商品评价列表接口
            getProductReviewsListMethod: function () {
                var that = this;
                var data = {
                    PId: that.pId,
                    "Page": {
                        "PageIndex": 1,
                        "PageSize": 3
                    }
                };
                productReviewsList(data).then(response => {
                    console.log(response);
                    that.reviewsTotal = response.Data.Total;
                    that.productReviewsList = response.Data.ProductReviewsList;

                })
            },
            //获取相关商品列表
            getRelevantProductListMethod: function () {
                var that = this;
                var data = {
                    PId: that.pId
                };
                relevantProductList(data).then(response => {
                    console.log(response);

                    that.productGroupInfoList = response.Data.ProductGroupInfoList;

                })

            },
            //微信分享
            wxShareHandle(){
                this.wxShare();
            },
            wxShare: function () {
                var that = this;
                console.log(wx)
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
                    Url: process.env.VUE_APP_BASE_API_SHARE + '/productDetail?pId=' + that.pId,
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
            //加入购物车
            addCartHandle: function () {
                var that = this;
                var data = {
                    PSkuRId: that.skuId,
                    Count: that.count,
                    Sku: that.skuStr
                };
                if (that.isSelect){
                    addProduct(data).then(response => {

                        that.Common.showMsg("加入成功", function () {
                            that.getCartCountMethod()
                            that.isShow = false
                        });

                    })
                }else{
                    that.Common.showMsg('请选择规格')
                    return false
                }


            },
            //立即购买
            actionBuyHandle: function () {
                var that = this;
                //库存
                var num = that.productInfo.Number;
                //判断购买的数量与库存的关系
                if (that.count <= num) {
                    that.$router.push({
                        path: "/payOrder",
                        query: {
                            count: that.count,
                            skuId: that.skuId,
                            isCartBuy: false,
                            skuStr:that.skuStr,
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
            //处理子组件数据
            skuDataHandle: function (data) {
                console.log("父组件收到的数据", data);
                var vm = this;
                vm.skuId = data.skuId;
                vm.isSelect = data.isSelect;
                vm.productInfo.ShopPrice = data.ShopPrice;
                vm.productInfo.Number = data.ProNumber;
                vm.productInfo.ShowImgFull = data.PicUrl;
                vm.skuStr = data.skuStr
            }
        }
    };
</script>

<style scoped src="../../../static/css/productDetail.css">
</style>
