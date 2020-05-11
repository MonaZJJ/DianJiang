<template>
    <div class="login-box">
        <van-row type="flex">
            <van-col span="12" class="sign-in-ch">门店登录</van-col>
        </van-row>
        <van-row type="flex">
            <van-col span="12" class="sign-in-en">SIGN IN</van-col>
        </van-row>
        <section class="input-box">
            <van-cell-group>
                <div class="input-content">
                    <div class="input-img">
                        <img src="../../../static/images/member/phone.png" style="width:14px;height:20px;"/>
                    </div>
                    <van-field type="tel" class="input-text" v-model="Phone" placeholder="请输入手机号"></van-field>
                </div>
                <div class="input-content input-two">
                    <div class="input-img">
                        <img src="../../../static/images/member/code.png" style="widtyh:16px;height:18px;"/>
                    </div>
                    <van-field class="input-text text-two" v-model="Code" placeholder="请输入验证码">
                        <van-button slot="button" size="small" class="input-button" :disabled="disabled" @click="getCode()">{{text}}</van-button>
                    </van-field>
                </div>
            </van-cell-group>
        </section>
        <van-button class="login-btn" @click="login()">登录</van-button>
    </div>
</template>

<script>
    import {
        storeLogin,
        storeSendMobileVerifyCode
    } from "@/api/store";
    import {Row, Col, CellGroup, Field, Button} from "vant";

    export default {
        props: {},
        data() {
            return {
                text: "获取验证码",
                disabled: false,

                Phone: "",
                Code: ""
            };
        },
        components: {
            "van-row": Row,
            "van-col": Col,
            "van-cell-group": CellGroup,
            "van-field": Field,
            "van-button": Button
        },
        watch: {},
        computed: {},
        created() {
            var that = this;

        },
        mounted() {

        },
        methods: {

            //获取验证码
            getCode(){
                var that = this;
                if (!(/^1[34578]\d{9}$/.test(that.Phone))){
                    that.Common.showMsg("请输入正确的手机号");
                    return false;
                }
                storeSendMobileVerifyCode({
                    "Mobile": that.Phone
                }).then(response => {
                    if (!that.timer) {
                        that.count = 60;
                        that.disabled = false;
                        that.timer = setInterval(() => {
                            if (that.count > 0 && that.count <= 60) {
                                that.disabled = true;
                                that.count--;
                                that.text = that.count + 's';
                            } else {
                                that.disabled = false;
                                clearInterval(that.timer);
                                that.timer = null;
                                that.text = '获取验证码';
                            }
                        }, 1000)
                    }
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },
            //登录
            login(){
                var that = this;
                if (!(/^1[34578]\d{9}$/.test(that.Phone))){
                    that.Common.showMsg("请输入正确的手机号");
                    return false;
                }
                if (that.Code == ""){
                    that.Common.showMsg("请输入验证码");
                    return false;
                }
                var data = {
                    "Mobile": that.Phone,
                    "Code": that.Code
                }
                storeLogin(data).then(response => {
                    localStorage.storetoken = response.Data.Token;
                    localStorage.setItem("storeId", response.Data.StoreId);
                    localStorage.setItem("storeUid", response.Data.UId);
                    that.$router.replace("/storeMe");
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            }

        }
    };
</script>
<style scoped>
    [class*="van-hairline"]::after {
        border: none;
    }
</style>
<style scoped src="../../../static/css/login.css">

</style>
