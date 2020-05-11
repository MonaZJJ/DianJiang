<template>

</template>

<script>
    import {
        wxLogin,
    } from "@/api/member";
    export default {
        name: "author",
        data() {
            return {}
        },
        beforeRouteEnter(to, from, next) {
            var token = localStorage.token;
            console.log('路由对象',to)
            if (token && !to.query.UId) {
                next('/');
                return false;
            }
            next();
        },
        methods: {
            login: function () {
                var that = this;
                //请求数据
                var data = {
                    Code: that.$route.query.code,
                    DistUser:that.$route.query.UId ? that.$route.query.UId : 0,
                };
                wxLogin(data).then(response =>{
                    localStorage.token = response.Data.Token;
                    localStorage.setItem("uid", response.Data.UId);
                    var beforeLoginUrl = localStorage.beforeLoginUrl;
                    if (beforeLoginUrl) {
                        window.location.href = beforeLoginUrl;
                        localStorage.removeItem("beforeLoginUrl");
                    } else {
                        that.$router.replace("/member");
                    }
                })
            },
        },
        mounted() {
            var that = this;
            //微信授权
            that.login();
        },
        created() {
            var that = this;
        }
    }
</script>

<style scoped>

</style>
