<template>
    <div class="allBox">
        <div class="outBox">
            <!--收货地址-->

            <div class="addressBox" v-for="item,index in nearbyStoreInfoList" :key="this" @click="selectHandle(item.StoreId)">
                <div class="addressLeft">
                    <div class="leftTop">
                        <img src="../../../static/images/order/dingwei.png" class="addressIcon" alt="">
                        <div class="userName">{{item.StoreName}}</div>
                        <div class="phone">{{item.StoreMobile}}</div>
                    </div>
                    <div class="leftBottom">{{item.StoreAddress}}</div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import {
        nearbyStoreInfoList,
    } from "@/api/store";
    export default {
        name: 'chooseStore',
        data() {
            return {
                nearbyStoreInfoList: [],
            }
        },
        computed: {
        },
        components: {},
        methods: {
            //门店列表
            nearbyStoreInfoListHandle: function () {
                var that = this;
                var data = {
                    "Latitude": 0,
                    "Longitude": 0,
                    "StoreName": "",
                    "CityName": ""
                }
                nearbyStoreInfoList(data).then(response => {
                    console.log(response);
                    that.nearbyStoreInfoList = response.Data.NearbyStoreInfoList;
                })
            },
            //选择门店
            selectHandle: function (id) {
                var that = this;
                //选择的时候将id存在本地缓存
                localStorage.setItem('storeId',id)
                that.$router.go(-1)
            },
        },
        mounted() {
            var that = this;
            window.scroll(0, 0)
            that.nearbyStoreInfoListHandle();
        },
        created() {
            var that = this;

        },
    }

</script>
<style scoped src="../../../static/css/orderAddress.css">


</style>
