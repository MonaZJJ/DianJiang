<template>
    <div class="allBox van-clearfix">
        <div class="left-box">
            <div v-for="(item, index) in classifyData" :key="index" :class="item.CateId==classifyId?'active':''"
                 @click="classifyClick(item.CateId)">{{item.Name}}
            </div>
            <div class="greenBtn" @click="vipArea()">
                会员专区
            </div>
            <div class="greenBtn" :class="type==2?'greenActive':''" @click="integralArea()">
                积分兑换
            </div>
        </div>

        <div class="right-box">
            <div v-if="type==1">
                <div v-for="(item, index) in secondData" :key="index" class="pro-item">
                    <router-link :to="{ path: '/productList', query: { cId: item.CateId }}">
                        <img :src="item.SmallIcon" alt="">
                        <p class="van-ellipsis">{{item.Name}}</p>
                    </router-link>
                </div>
            </div>
            <div v-if="type==2">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        :error.sync="error"
                        error-text="请求失败，点击重新加载"
                        @load="getProductList"
                >
                    <div v-for="(item, index) in integralData" :key="index" class="pro-item integral">
                        <router-link :to="{ path: '/integralDetail', query: { pId: item.PId }}">
                            <img :src="item.ShowImg" alt="">
                            <p class="van-ellipsis">{{item.Name}}</p>
                            <div class="van-ellipsis">兑换期限：{{item.CreditLimitTimes}}</div>
                        </router-link>
                    </div>
                </van-list>
            </div>
        </div>

        <div class="integraTtips" v-if="type==2">
            <p>积分：按消费金额的{{integraTtips}}%</p>
            <div>积分不补差</div>
        </div>

        <FooterTab></FooterTab>
    </div>
</template>

<script>
    import FooterTab from "@/components/FooterTab";
    import {
        categoryList,
        creditProductList
    } from "@/api/product";
    import {List} from "vant";

    export default {
        name: "classify",
        components: {
            "van-list": List,
            FooterTab
        },
        data() {
            return {
                classifyId: 0,
                classifyData: [],

                secondData: [],
                integraTtips:"",

                type: 1,  //1分类  2积分
                integralData: [],
                pageIndex: 1,
                total: 0,
                loading: false,
                finished: false,
                error: false,

            };
        },
        watch: {
            $route: {
                handler: function (to, from) {
                    var that = this;
                    that.secondData = [];
                    that.pageIndex = 1;
                    that.total = 0;
                    that.loading = false;
                    that.finished = false;
                    that.error = false;
                    that.integralData = [];
                    that.classifyId = to.query.cId;
                },
                immediate: true
            }
        },
        computed: {},
        methods: {
            //会员专区
            vipArea() {
                this.$router.push({path: '/rules'});
            },

            //积分兑换
            integralArea() {
                var that = this;
                that.classifyId = 0;
                that.type = 2;
                that.pageIndex = 1;
                that.total = 0;
                that.loading = false;
                that.finished = false;
                that.error = false;
                that.integralData = [];
                that.$router.replace({path: "/classify", query: {type: that.type}});
            },

            getProductList(){
                var that = this;
                var data = {
                    "Page": {
                        "PageIndex": that.pageIndex,
                        "PageSize": 6
                    }
                }
                creditProductList(data).then(response => {
                    that.integraTtips = response.Data.CreditRate;
                    if (that.pageIndex == 1) {
                        that.integralData = [...response.Data.List];
                    } else {
                        that.integralData = [...that.integralData,...response.Data.List];
                    }
                    that.total = response.Data.Total;
                    //加载状态结束
                    that.loading = false;
                    // 数据全部加载完毕
                    if (that.integralData.length >= that.total) {
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

            classifyClick(id) {
                var that = this;
                that.classifyId = id;
                that.type = 1;
                that.secondData = [];
                that.$router.replace({path: "/classify", query: {cId: id}});
                that.getSecondList();
            },

            getSecondList() {
                var that = this;
                var data = {
                    "ParentId": that.classifyId
                };
                categoryList(data).then(response => {
                    that.secondData = response.Data.List;
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },

        },
        mounted() {
            var that = this;
        },
        created() {
            var that = this;
            //底部导航栏
            that.$store.commit('setFooterNav', 'classify');
            that.classifyId = that.$route.query.cId ? that.$route.query.cId : 0;
            that.type = that.$route.query.type ? 2 : 1;

            categoryList({
                "ParentId": 0
            }).then(response => {
                that.classifyData = response.Data.List;
                if (that.type != 2){
                    if (that.classifyData.length > 0) {
                        if (that.classifyId == 0) {
                            that.classifyId = that.classifyData[0].CateId;
                            that.getSecondList();
                        } else {
                            that.getSecondList();
                        }
                    }
                }
            });

        }
    };
</script>

<style scoped src="../../../static/css/classify.css">

</style>