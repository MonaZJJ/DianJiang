<template>
    <div class="allBox">
        <div class="search-box">
            <div>
                <img src="../../../static/images/index/icon_search.png" alt="搜索">
                <input type="text" placeholder="请输入商品标题" v-model="searchValue" @keyup.enter="searchConfirm">
            </div>
        </div>
        <div class="operate-box">
            <div :class="sort==1?'active':''" @click="sortClick(1)">人气</div>
            <div :class="sort==2?'active':''" @click="sortClick(2)">销量</div>
            <div :class="sort==3||sort==4?'active':''" @click="sortClick(3)">价格 <img :src="priceImg" alt=""> </div>
        </div>
        <div class="pro-box">
            <van-list
                    class="van-clearfix"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="getProductList"
            >
                <div v-for="(item, index) in productData" :key="index" class="pro-item" @click.stop="toDetail(item.PId,item.ShopPrice)">
                    <!--<router-link :to="{ path: '/productDetail', query: { pId: item.PId }}">-->
                    <img :src="item.ShowImg" alt="" class="proImg">
                    <p class="van-ellipsis">{{item.Name}}</p>
                    <div class="proDel">
                        <div v-if="item.ShopPrice==0">积分商品</div>
                        <div v-else>￥<span>{{item.ShopPrice}}</span></div>
                        <img src="../../../static/images/product/cartList.png" alt="">
                    </div>
                    <!--</router-link>-->
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    import {
        productList
    } from "@/api/product";
    import {
        Col,
        Row,
        List
    } from 'vant';

    export default {
        name: "productList",
        components: {
            "van-row": Row,
            "van-col": Col,
            "van-list": List,
        },
        data() {
            return {
                classifyId: 0,
                searchValue:"",
                sort: 1,
                priceImg: require("../../../static/images/index/default.png"),

                productData: [],
                pageIndex: 1,
                total: 0,
                loading: false,
                finished: false,
                error: false,

            };
        },
        computed: {},
        methods: {
            sortClick(val){
                var that = this;
                if (val == 1 || val == 2){
                    that.sort = val;
                    that.priceImg = require("../../../static/images/index/default.png");
                } else{
                    if (that.sort == 3){
                        that.sort = 4;
                        that.priceImg = require("../../../static/images/index/down.png");
                    } else{
                        that.sort = 3;
                        that.priceImg = require("../../../static/images/index/up.png");
                    }
                }
                that.clearData();
            },

            searchConfirm(){
                this.clearData();
            },

            toDetail(id, price){
                if (price==0) {
                    var that = this;
                    that.$router.push({
                        path: '/integralDetail',
                        query: { pId: id }
                    })
                }else {
                    var that = this;
                    that.$router.push({
                        path: '/productDetail',
                        query: { pId: id }
                    })
                }
            },

            clearData(){
                this.pageIndex = 1;
                this.total = 0;
                this.loading = false;
                this.finished = false;
                this.error = false;
                this.productData = [];
            },

            getProductList: function () {
                var that = this;
                var data = {
                    "Name": that.searchValue,
                    "CateId": that.classifyId,
                    "DisplayOrder": that.sort,  // 0 -综合升序 1-综合降序 2-销量 3-价格升序 4-价格降序
                    "Page": {
                        "PageIndex": that.pageIndex,
                        "PageSize": 10
                    }
                };
                productList(data).then(response => {
                    that.productData = that.productData.concat(response.Data.ProductPartInfoList);
                    that.total = response.Data.Total;
                    //加载状态结束
                    that.loading = false;
                    // 数据全部加载完毕
                    if (that.productData.length >= that.total) {
                        that.finished = true;
                    } else {
                        that.pageIndex += 1;
                    }
                }).catch(err => {
                    that.loading = false;
                    that.error = true;
                    that.Common.showMsg(err.data.Message);
                });
            },


        },
        mounted() {
            var that = this;
        },
        created() {
            var that = this;
            that.searchValue = that.$route.query.name ? that.$route.query.name : "";
            that.classifyId = that.$route.query.cId ? that.$route.query.cId : 0;

        }
    };
</script>

<style scoped src="../../../static/css/productList.css">
</style>