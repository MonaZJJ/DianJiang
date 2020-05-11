<template>
        <div class="tabContext">
            <div class="commentOutBox">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getMyCreditHandle"
                        :error.sync="error" error-text="请求失败，点击重新加载"
                >
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
                            <img :src="inner" v-for="inner,innerIndex in item.ReviewImgFullList" alt/>
                        </div>
                    </div>

                </van-list>
            </div>
        </div>
</template>

<script>
    import {
        productReviewsList,
    } from "@/api/product";
    import {
        List,
    } from 'vant'

    export default {
        props: {},
        data() {
            return {
                pId: 0,
                productReviewsList: [],
                loading: false,
                finished: false,
                total: 0,
                pageIndex: 1,
                error: false,
            };
        },
        components: {
            "van-list": List,
        },
        watch: {
            $route: {
                handler: function (to, from) {
                    var that = this;
                    that.pId = to.query.pId;
                    that.getProductReviewsListMethod();
                },
                immediate: true
            }
        },
        computed: {
            pageUrl() {
                return process.env.VUE_APP_BASE_API_SHARE + '/productDetail?pId=' + this.pId
            }
        },
        created() {
            var that = this;
        },
        methods: {
            getProductReviewsListMethod:function(){
                var that = this;
                var data = {
                    "PId": that.pId,
                    "Page": {
                        "PageIndex": that.pageIndex,
                        "PageSize": 20
                    }
                }
                that.loading = true;
                productReviewsList(data).then(response =>{
                    console.log(response)
                    that.info = response.Data;
                    if(that.pageIndex == 1){
                        that.productReviewsList = [...response.Data.ProductReviewsList]
                    }else{
                        that.productReviewsList = [...list,...response.Data.ProductReviewsList]
                    }
                    that.total = response.Data.Total;
                    that.pageIndex += 1;
                    // 加载状态结束
                    that.loading = false;
                    // 数据全部加载完成
                    if (that.productReviewsList.length >= that.total) {
                        that.finished = true;
                    }
                }).catch(err =>{
                    that.error = true;
                })
            },

        }
    };
</script>

<style scoped src="../../../static/css/productDetail.css">
</style>
