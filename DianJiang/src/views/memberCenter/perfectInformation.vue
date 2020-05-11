<template>
    <div class="outBox">
        <div class="innerBox">
            <div class="innerItem">
                <div class="title">
                    真实姓名
                </div>
                <input type="text" v-model="RealName" class="inputItem">
            </div>
            <div class="innerItem">
                <div class="title">
                    联系方式
                </div>
                <input type="number" class="inputItem" v-model="Phone">
            </div>
            <div class="innerItem">
                <van-field class="input-text text-two" v-model="Code" placeholder="请输入验证码"
                           style="padding-left: 0;padding-right: 0 ">
                    <van-button slot="button" size="small" class="input-button" :disabled="disabled" @click="getCode()">
                        {{text}}
                    </van-button>
                </van-field>
            </div>
        </div>
        <!--按钮-->
        <div class="btnBox" @click="login">
            保存
        </div>
    </div>
</template>

<script>
    import {
        updateUser,
        uCenterData,
        sendMobileVerifyCode
    } from "@/api/member";
    import {Row, Col, CellGroup, Field, Button} from "vant";

    export default {
        props: {},
        data() {
            return {
                RealName: "",
                Phone: "",
                Code: "",
                text: "获取验证码",
                disabled: false,
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
            that.getInfo();
        },
        mounted() {
        },
        methods: {
            //获取验证码
            getCode() {
                var that = this;
                if (!(/^1[34578]\d{9}$/.test(that.Phone))) {
                    that.Common.showMsg("请输入正确的手机号");
                    return false;
                }
                sendMobileVerifyCode({
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
            //完善资料
            login() {

                var that = this;

                if (that.RealName == "") {
                    that.Common.showMsg("请输入真实姓名");
                    return false;
                }
                if (that.Phone == "") {
                    that.Common.showMsg("请输入手机号码");
                    return false;
                }
                if (that.Code == "") {
                    that.Common.showMsg("请输入验证码");
                    return false;
                }
                var data = {
                    "RealName": that.RealName,
                    "Mobile": that.Phone,
                    "Code": that.Code
                }
                updateUser(data).then(response => {
                    that.Common.showMsg("修改成功", function () {
                        that.$router.go(-1)
                    });
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },
            //获取信息
            getInfo() {
                var that = this;
                var data = {

                }
                uCenterData(data).then(response => {
                    that.RealName = response.Data.RealName;
                    that.Phone = response.Data.Mobile;
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },

        }
    };
</script>

<style scoped src="../../../static/css/perfectInformation.css"></style>
