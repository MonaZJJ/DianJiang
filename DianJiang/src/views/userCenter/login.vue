<template>
    <div class="form">

    </div>
</template>
<script>

    export default {
        name: "login",
        components: {
        },
        data() {
            return {
                uid: "",
                phone: "",
                pwd: ""
            };
        },
        methods: {
            wetchatHandle: function () {
                var that = this;
                var AppId = that.GLOBAL.appId;
                var local = encodeURIComponent('' + process.env.VUE_APP_BASE_API_SHARE + '/author?type=wechat&UId=' + that.uid + '');
                var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + AppId +
                    "&redirect_uri=" + local +
                    "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
                window.location.href = url;

            },
        },
        mounted() {
            var that = this;
            that.uid = that.$route.query.UId ? that.$route.query.UId : 0;
            //微信授权
            that.wetchatHandle();
        },
    };
</script>
<style scoped ></style>