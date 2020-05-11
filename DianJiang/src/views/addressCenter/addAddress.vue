<template>

    <div class="addressBox">
        <van-address-edit
                :area-list="area"
                show-set-default
                @save="onSave"
                v-if="area"
        />
    </div>


</template>

<script>

    import {AddressEdit} from 'vant'
    import {
        newRegionList,
        addShipAddress,
    } from "@/api/address";
    export default {
        name: 'addAddress',
        data() {
            return {
                RegionList: [],
                area: "",
                province_list: {},
                city_list: {},
                county_list: {},
            };
        },
        components: {
            "van-address-edit": AddressEdit,
        },
        methods: {
            //获取区域列表
            getNewRegionList: function (SaId, index) {
                var that = this;
                //请求数据
                var data = {};
                newRegionList().then(response => {
                    console.log(response);
                    that.area = response.Data;
                })
            },
            //添加收货地址
            addAddress: function (content) {
                var that = this;
                console.log(content)
                //请求数据
                var data = {
                    "RegionId": content.RegionId,
                    "Consignee": content.name,
                    "Address": content.addressDetail,
                    "Mobile": content.tel,
                    "Flag": [
                        {
                            "Flag1": content.areaCode,
                            "Flag2": "0",
                            "Flag3": "0"
                        }
                    ],
                    "IsDefault": content.isDefault ? 1 : 0,
                };
                addShipAddress(data).then(response => {
                    that.Common.showMsg("添加成功", function () {
                        that.$router.go(-1)
                    })
                })

            },
            onSave(content) {
                var that = this;
                that.addAddress(content)

            },
        },
        mounted() {
            var that = this;

        },
        created() {
            var that = this;
            that.getNewRegionList();
        },
    }

</script>
<style scoped>


</style>
