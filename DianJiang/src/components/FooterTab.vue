<template>
    <div class="footerBox" ref="footMenu" v-show="isOriginHeight">
        <div class="footItem" @click="tabHandle('index')">
            <img src="../../static/images/tab/home.png" v-show="active != 'index'" class="homeIcon" alt="">
            <img src="../../static/images/tab/home_on.png" v-show="active == 'index'" class="homeIcon" alt="">
            <div class="footText" :class="active == 'index' ? 'active' : ''">首页</div>
        </div>
        <div class="footItem" @click="tabHandle('classify')">
            <img src="../../static/images/tab/classify.png" v-show="active != 'classify'" class="homeIcon" alt="">
            <img src="../../static/images/tab/classify_on.png" v-show="active == 'classify'" class="homeIcon" alt="">
            <div class="footText" :class="active == 'classify' ? 'active' : ''">分类</div>
        </div>
        <div class="footItem" @click="tabHandle('cart')">
            <img src="../../static/images/tab/cart.png" v-show="active != 'cart'" class="homeIcon" alt="">
            <img src="../../static/images/tab/cart_on.png" v-show="active == 'cart'" class="homeIcon" alt="">
            <div class="footText" :class="active == 'cart' ? 'active' : ''">购物车</div>
        </div>
        <div class="footItem" @click="tabHandle('member')">
            <img src="../../static/images/tab/member.png" v-show="active != 'member'" class="homeIcon" alt="">
            <img src="../../static/images/tab/member_on.png" v-show="active == 'member'" class="homeIcon" alt="">
            <div class="footText" :class="active == 'member' ? 'active' : ''">我的</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'footerNav',
        data() {
            return {
                footClass: 'showClass',
                isOriginHeight: true,
                oHeight: 0,
                screenHeight: document.documentElement.clientHeight,
                originHeight: document.documentElement.clientHeight,
            };
        },
        computed: {
            ...mapState({
                active: function (state) {
                    return this.$store.state.footerActive;
                },
            }),
        },
        methods: {
            tabHandle: function (type) {
                var that = this;
                if (type == 'home') {
                    that.$router.push({path: '/'})
                } else if (type == 'classify') {
                    that.$router.push({path: '/classify'})
                } else if (type == 'cart') {
                    that.$router.push({path: '/cart'})
                } else if (type == 'member') {
                    that.$router.push({path: '/member'})
                }else{
                    that.$router.push({path: '/'})
                }
            },
        },
        mounted() {
            var that = this;

        },
        mounted() {
            let self = this;
            window.onresize = function() {
                return (function(){
                    self.screenHeight = document.documentElement.clientHeight;
                })()
            }
        },
        watch:{
            screenHeight (val) {
                if(this.originHeight > val + 100) {     //加100为了兼容华为的返回键
                    this.isOriginHeight = false;
                }else{
                    this.isOriginHeight = true;
                }
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .footerBox{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 375px;
        height:50px;
        box-sizing: border-box;
        background: #fff;
        z-index: 2000;
        padding: 6px 0 0;
        overflow: hidden;
        border-top:1px solid #e5e5e5 ;
    }
    .footItem{
        float: left;
        height: 44px;
        width: 25%;
        font-size: 11px;
        color: #999;
        text-align: center;
        overflow: hidden;
    }
    .footItem:last-child{
        margin-right: 0;
    }
    .homeIcon{
        width: 22px;
        height: 22px;
    }
    .active{
        color: #32B67A;
    }
    .displayClass{
        position: static;
        display: block;
    }
    .showClass{
        position: fixed;
        display: block;
    }
</style>