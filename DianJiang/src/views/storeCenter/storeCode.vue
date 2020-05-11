<template>
    <div class="allBox">
        <img src="../../../static/images/index/code.png" alt="" class="codeBg">

        <div class="code-flex">
            <div class="code-box" ref="imageDom">
                <div class="codeTop">
                    <img :src="avatar" alt="">
                    <div>
                        <p class="van-ellipsis">我是{{name}}</p>
                        <span>长按此图，识别二维码 搞定！</span>
                    </div>
                </div>
                <div class="qrCode" id="qrcode" style="display: none;">
                    <!--<img src="../../../static/images/index/qrCode.png" alt="">-->
                </div>
                <div class="qrCode" ref="canvas"></div>
            </div>
            <div class="forwardBtn" @click="show=!show">转发分享</div>
        </div>

        <!--分享-->
        <div class="share-layer" v-show="showLayer" @click="showLayer=false">
            <img src="../../../static/images/product/layer2.jpg" />
        </div>
        <!--保存图片-->
        <van-overlay :show="codeShow" @click="codeShow=false">
            <div class="saveCode">
                <img :src="imgcode"/>
                <div class="forwardBtn">长按保存</div>
            </div>
        </van-overlay>

        <van-action-sheet v-model="show">
            <p class="sheetTop">分享至</p>
            <div class="sheetMid">
                <div @click="imgShare()">
                    <img src="../../../static/images/index/share1.png" alt="">
                    <p>图文分享</p>
                </div>
                <div @click="showLayer=true;show=false;">
                    <img src="../../../static/images/index/share2.png" alt="">
                    <p>微信好友</p>
                </div>
            </div>
            <div class="sheetBtm" @click="show=false">取消分享</div>
        </van-action-sheet>

    </div>
</template>

<script>
    import { userQrCode,jsSdkShare } from "@/api/store";
    import { ActionSheet, Overlay  } from 'vant';
    import QRCode  from "qrcodejs2";
    import html2canvas from "html2canvas";
    const wx = require('weixin-js-sdk');

    export default {
        name: "storeCode",
        components: {
            "van-action-sheet": ActionSheet,
            "van-overlay": Overlay,
        },
        data() {
            return {
                show: false,
                codeShow: false,
                imgcode:"",
                showLayer: false,

                name:"",
                avatar:"",
                uid: 0,

                shareTitle:"典匠生活", // 分享标题
                shareDes:"快来加入吧！",//分享描述
                pageUrl: "", // 分享链接
                shareImgPath:"", // 分享图标

                timestamp : "",
                nonceStr : "",
                signature : "",

                shareUid: 0, //分享者id
                codeUrl:"", //二维码链接
            };
        },
        computed: {},
        watch: {
            '$route': {
                handler: function (to, from) {
                    var that = this;
                    that.shareUid = that.$route.query.shareUid;
                    //转发的链接（或者从门店中心跳转过来）和缓存的门店storeUid比较
                    // 二者一样 显示当前页面；不一样 跳转登录页面
                    if (that.shareUid==localStorage.getItem("storeUid")) {
                        userQrCode({
                            "UId": that.shareUid
                        }).then(response => {
                            that.name = response.Data.UserName;
                            that.avatar = response.Data.Avatar;
                            that.shareImgPath = response.Data.Avatar;
                            that.uid = response.Data.UId;
                            that.pageUrl = process.env.VUE_APP_BASE_API_SHARE + '/storeCode?shareUid=' + response.Data.UId;
                            that.codeUrl = process.env.VUE_APP_BASE_API_SHARE + '/login?UId=' + response.Data.UId;
                            that.qrcode();
                            that.getShareData();
                        });
                    }else{
                        that.goLoginPage();
                    }
                },
                immediate: true
            }
        },
        methods: {

            //跳转登录页面
            goLoginPage(){
                this.$router.replace({path:'/login',query:{UId: this.shareUid}});
            },

            //图文分享
            imgShare() {
                var that = this;
                that.show = false;
                that.codeShow = true;
                html2canvas(that.$refs.imageDom,{
                    //PNG图片不透明问题-设置透明背景
                    backgroundColor: "transparent",
                    //图片不显示问题-跨域
                    allowTaint: true,
                    useCORS: true
                }).then(canvas => {
                    // 转成图片，生成图片地址
                    let imgUrl = canvas.toDataURL("image/png");
                    that.imgcode = imgUrl;
                    // var eleLink = document.createElement("a");
                    // eleLink.href = imgUrl; // 转换后的图片地址
                    // eleLink.download = 'pic';  // 图片名
                    // // 触发点击
                    // document.body.appendChild(eleLink);
                    // eleLink.click();
                    // // 然后移除
                    // document.body.removeChild(eleLink);
                });
            },

            //  生成二维码
            qrcode () {
                var that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 144,                 // 宽度
                    height: 144,                // 高度
                    background: '#ffffff',      // 背景色
                    foreground: '#000000',      // 前景色
                    text: that.codeUrl,         // 二维码内容
                    render: 'canvas',   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                })
                let canvas = document.getElementsByTagName('canvas')[0];
                let img = that.convertCanvasToImage(canvas);
                that.$refs.canvas.append(img);
            },
            // 从 canvas 提取图片 image
            convertCanvasToImage(canvas) {
                let image = new Image();
                image.src = canvas.toDataURL("image/png");
                return image;
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
                    Url: that.pageUrl,
                };
                jsSdkShare(data).then(response => {
                    that.timestamp = response.Data.Timestamp;
                    that.nonceStr = response.Data.NonceStr;
                    that.signature = response.Data.Signature;
                    that.wxShare();
                    // if (!that.canShare){
                    //     if (typeof WeixinJSBridge == "undefined") {
                    //         if (document.addEventListener) {
                    //             document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
                    //         } else if (document.attachEvent) {
                    //             document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
                    //             document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
                    //         }
                    //     } else {
                    //         that.onBridgeReady();
                    //     }
                    // }
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },

            // onBridgeReady: function() {
            //     WeixinJSBridge.invoke('hideOptionMenu');
            // },

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

        mounted() {
            var that = this;

        },
        created() {
            var that = this;

        }
    }
</script>

<style scoped src="../../../static/css/myCode.css">

</style>