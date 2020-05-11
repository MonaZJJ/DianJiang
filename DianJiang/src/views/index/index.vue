<template>
    <div class="allBox">
        <div class="bg-box"></div>

        <div class="fixedSearch">
            <router-link :to="{ path: 'productList' }">
                <div class="search-box">
                    <img src="../../../static/images/index/icon_search.png" alt="">
                    <input type="text" placeholder="关键词/商品" readonly>
                </div>
            </router-link>
        </div>

        <van-swipe :autoplay="3000" :show-indicators="false" class="bannerSwiper">
            <van-swipe-item v-for="(item, index) in bannerData" :key="index">
                <div @click="bannerLink(item.Type,item.PId)">
                    <img :src="item.Image"/>
                </div>
            </van-swipe-item>
        </van-swipe>

        <van-row class="classify-box">
            <van-col span="6" class="classify-item" v-for="(item, index) in classifyData" :key="index">
                <router-link :to="{ path: 'classify', query: { cId: item.RelationId }}">
                    <van-image :src="item.Icon" alt="" fit="contain"/>
                    <p class="van-ellipsis">{{item.Name}}</p>
                </router-link>
            </van-col>
        </van-row>

        <div class="advert-box">
            <img :src="advertData" alt="">
        </div>

        <div class="hot-box">
            <div class="title">
                <img src="../../../static/images/index/rexiao.png" alt="">
                <span>{{firstName}}</span>
                <img src="../../../static/images/index/rexiao.png" alt="">
            </div>
            <van-row>
                <van-col span="8" class="hot-item" v-for="(item, index) in hotData" :key="index">
                    <router-link :to="{ path: 'productDetail', query: { pId: item.PId }}">
                        <img :src="item.ShowImg" alt="">
                        <p class="van-multi-ellipsis--l2">{{item.Name}}</p>
                        <div>￥<span>{{item.ShopPrice}}</span></div>
                    </router-link>
                </van-col>
            </van-row>
        </div>

        <div class="tuijian-box">
            <div class="title">
                <img src="../../../static/images/index/tuijian1.png" alt="">
                <span>{{secondName}}</span>
                <img src="../../../static/images/index/tuijian2.png" alt="">
            </div>
            <!--<div class="tuijian-swiper" @touchmove.prevent>-->
            <div class="tuijian-swiper">
                <div v-for="(item, index) in tuijianData" :key="index" class="tuijian-item">
                    <router-link :to="{ path: 'productDetail', query: { pId: item.PId }}">
                        <img :src="item.ShowImg"/>
                        <p class="van-multi-ellipsis--l2">{{item.Name}}</p>
                        <div>¥{{item.ShopPrice}} <span>已售{{item.SaleCount}}件</span></div>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="special-box">
            <div class="title">
                <img src="../../../static/images/index/special1.png" alt="">
                <span>{{thirdName}}</span>
                <img src="../../../static/images/index/special2.png" alt="">
            </div>
            <div class="special-swiper" :class="tabFixed?'fiexTrue':''" ref="tabfiex">
                <div v-for="(item, index) in specialData" :key="index" :class="item.CateId==sid?'active':''"
                     @click="specialClick(item.CateId)">
                    {{item.CateName}}
                </div>
            </div>

            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    :immediate-check="false"
                    @load="getHandpickProductList()"
            >
                <van-row :style="tabFixed?'padding-top: 53px;':'padding-top: 6px;'">
                    <van-col span="12" v-for="(item, index) in productData" :key="index" class="special-item">
                        <router-link :to="{ path: '/productDetail', query: { pId: item.PId }}">
                            <img :src="item.ShowImg" alt="">
                            <p class="van-multi-ellipsis--l2">{{item.Name}}</p>
                            <div>￥{{item.ShopPrice}}</div>
                        </router-link>
                    </van-col>
                </van-row>
            </van-list>

        </div>
        <FooterTab></FooterTab>
    </div>
</template>

<script>
    import FooterTab from "@/components/FooterTab";

    import {
        homeBannerList,
        homeNavigationBarList,
        homeTopicProductList,
        homeHandpickProductList
    } from "@/api/index";
    import {
        Swipe,
        SwipeItem,
        Col,
        Row,
        List,
        Image
    } from 'vant';

    export default {
        name: "index",
        components: {
            "van-swipe": Swipe,
            "van-swipe-item": SwipeItem,
            "van-row": Row,
            "van-col": Col,
            "van-list": List,
            "van-image": Image,
            FooterTab
        },
        data() {
            return {
                // first: true,
                offsetTop: 1100,
                tabFixed: false,

                bannerData: [],      //轮播
                classifyData: [],    //导航

                firstName: "爆款商品",
                secondName: "推荐商品",
                thirdName: "商品专区",

                advertData: "",     //爆款图片
                hotData: [],         //爆款

                tuijianData: [],     //推荐

                sid: 0,
                specialData: [],     //专区导航栏

                productData: [],     //商品列表
                pageIndex: 1,
                total: 0,
                loading: false,
                finished: false,
                error: false,

            };
        },
        computed: {},
        methods: {
            bannerLink: function (type, id) {
                var that = this;
                // 跳转类型(0无跳转、1普通商品、2积分商品、3商品分类)
                if (type == 1) {
                    that.$router.replace({path: "/productDetail", query: {pId: id}});
                } else if (type == 2) {
                    that.$router.replace({path: "/integralDetail", query: {pId: id}});
                } else if (type == 3) {
                    that.$router.replace({path: "/classify", query: {cId: id}});
                } else {
                }
            },

            getHandpickProductList() {
                var that = this;
                var data = {
                    "CateId": that.sid,
                    "Page": {
                        "PageIndex": that.pageIndex,
                        "PageSize": 6
                    }
                };
                homeHandpickProductList(data).then(response => {
                    // that.productData = that.productData.concat(response.Data.HomeProductInfoList);
                    if (that.pageIndex == 1) {
                        that.productData = [...response.Data.HomeProductInfoList];
                    } else {
                        that.productData = [...that.productData, ...response.Data.HomeProductInfoList];
                    }
                    that.thirdName = response.Data.HomeTopicPartInfo.Title;
                    that.specialData = response.Data.HomeCateInfoList;

                    that.total = response.Data.Total;
                    //加载状态结束
                    that.loading = false;
                    // 数据全部加载完毕
                    if (that.productData.length >= that.total) {
                        that.finished = true;
                    } else {
                        that.pageIndex += 1;
                    }

                    // if (that.first){
                    //     that.offsetTop = that.$refs.tabfiex.offsetTop;
                    //     that.first = false;
                    // }
                }).catch(err => {
                    that.loading = false;
                    that.error = true;
                    that.Common.showMsg(err.data.Message);
                });
            },

            specialClick: function (id) {
                var that = this;
                that.sid = id;
                that.pageIndex = 1;
                that.total = 0;
                that.loading = false;
                that.finished = false;
                that.error = false;
                // that.productData = [];
                that.getHandpickProductList();
            },

            handleScroll() {
                var that = this;
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > that.offsetTop) {
                    that.tabFixed = true;
                } else {
                    that.tabFixed = false;
                }
                console.log(scrollTop, that.offsetTop);
            },

        },
        watch: {},
        mounted() {
            var that = this;
            window.addEventListener('scroll', that.handleScroll, true);

        },
        //离开当前页面后执行
        destroyed: function () {
            var that = this;
            window.removeEventListener('scroll', that.handleScroll, true);

        },
        created() {
            var that = this;
            // that.first = true;
            window.scrollTo(0, 0);

            //底部导航栏
            that.$store.commit('setFooterNav', 'index');

            //轮播
            homeBannerList().then(response => {
                that.bannerData = response.Data.BannerInfoList;
            });
            //导航
            homeNavigationBarList().then(response => {
                that.classifyData = response.Data.NavigationBarPartInfoList;
            });
            //爆款
            homeTopicProductList({
                "Type": 1,
                "Page": {
                    "PageIndex": 1,
                    "PageSize": 6
                }
            }).then(response => {
                that.firstName = response.Data.HomeTopicPartInfo.Title;
                that.advertData = response.Data.HomeTopicPartInfo.FullShowImg;
                that.hotData = response.Data.HomeTopicProductInfoList;
            });
            //推荐
            homeTopicProductList({
                "Type": 2,
                "Page": {
                    "PageIndex": 1,
                    "PageSize": 6
                }
            }).then(response => {
                that.secondName = response.Data.HomeTopicPartInfo.Title;
                that.tuijianData = response.Data.HomeTopicProductInfoList;
            });
            that.getHandpickProductList();
        }
    };
</script>

<style scoped src="../../../static/css/index.css">

</style>