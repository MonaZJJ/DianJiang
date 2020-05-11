<template>
    <div class="form-box">
        <div class="form-input">
            <div class="form-top">
                <img src="../../../static/images/member/business.png" class="img"/>
                <div>供货商具体信息</div>
            </div>
            <van-cell-group class="form-content">
                <van-field v-model="company" required placeholder="单位全称"></van-field>
                <van-field v-model="people" required placeholder="联络人"></van-field>
                <van-field v-model="phone" type="tel" required placeholder="联系电话"></van-field>
                <van-field v-model="distance" placeholder="经营范围"></van-field>
                <van-field v-model="way" placeholder="合作方式"></van-field>
                <van-field v-model="brand" placeholder="品牌"></van-field>
            </van-cell-group>
        </div>
        <div class="submit-btn">
            <van-button size="large" class="submit-btn-text" @click="sureHandle">提交</van-button>
        </div>
    </div>
</template>

<script>
    import {addSupplier} from "@/api/member";
    import {CellGroup, Field, Button} from "vant";

    export default {
        props: {},
        data() {
            return {
                company: "",
                people: "",
                phone: "",
                distance: "",
                way: "",
                brand: ""
            };
        },
        components: {
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
            sureHandle: function () {
                var that = this;
                if (that.company == "") {
                    that.Common.showMsg('请输入单位全称')
                    return false
                }
                if (that.people == "") {
                    that.Common.showMsg('请输入联络人')
                    return false
                }
                if (that.phone == "") {
                    that.Common.showMsg('请输入联系电话')
                    return false
                }
                if (that.distance == "") {
                    that.Common.showMsg('请输入经营范围')
                    return false
                }
                if (that.way == "") {
                    that.Common.showMsg('请输入合作方式')
                    return false
                }
                if (that.brand == "") {
                    that.Common.showMsg('请输入品牌')
                    return false
                }
                var data = {
                    "Mobile": that.phone,
                    "Name": that.people,
                    "Company": that.company,
                    "BusinessScope": that.distance,
                    "CooperationMode": that.way,
                    "BrandName": that.brand
                }
                addSupplier(data).then(response => {
                    that.Common.showMsg('申请成功', function () {
                        that.$router.go(-1)
                    })

                })
            },
        }
    };
</script>
<style>
    @import "../../../static/css/field.css";
</style>

<style scoped src="../../../static/css/business.css">
</style>
