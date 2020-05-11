<template>
    <div class="tabContext" style="background: #fff;overflow: hidden;font-size: 14px">
        <div style="white-space: pre-wrap;" v-html="CompanyDetails"></div>
    </div>
</template>

<script>
    import {getCompanyDetails} from "@/api/member";

    export default {
        props: {},
        data() {
            return {
                CompanyDetails:"",
            };
        },
        components: {

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
            //获取信息
            getInfo() {
                var that = this;
                var data = {

                }
                getCompanyDetails(data).then(response => {
                    that.CompanyDetails = response.Data.CompanyDetails;
                }).catch(err => {
                    that.Common.showMsg(err.data.Message);
                });
            },
        }
    };
</script>

<style scoped src="../../../static/css/myCompany.css">

</style>
