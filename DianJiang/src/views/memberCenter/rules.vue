<template>
    <div class="allBox">
        <div class="rules-box">
            <div class="title">会员规则</div>
            <div class="rule-item" v-for="(item, index) in listData" :key="index">
                {{item}}
            </div>
        
            <div class="applyBtn">申请成为VIP</div>
        </div>
    </div>
</template>

<script>
    import { getVIPRuleList } from "@/api/member";

    export default {
        name: "rules",
        components: {

        },
        data() {
            return {
                listData:[]

            };
        },
        computed: {},
        methods: {
            applySubmit(){
                this.$router.push({path:"/upgrade"})
            }
        },
        watch:{

        },
        mounted() {
            var that = this;

        },
        created() {
            var that = this;
            getVIPRuleList().then(response => {
                that.listData = response.Data;
            });

        }
    }
</script>

<style scoped  src="../../../static/css/rules.css">

</style>