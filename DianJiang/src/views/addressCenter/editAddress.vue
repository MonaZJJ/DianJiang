<template>

    <div class="addressBox">
        <van-address-edit
                :area-list="area"
                show-set-default
                @save="onSave"
                v-if="area"
                :address-info="addressInfo"
        />
    </div>


</template>

<script>

    import {AddressEdit} from 'vant'
    import {
        newRegionList,
        editShipAddress,
        getShipAddress
    } from "@/api/address";
    export default {
        name: 'addAddress',
        data() {
            return {
                RegionList: [],
                addressInfo: {

                },
                area: "",
                province_list: {},
                city_list: {},
                county_list: {},
                saId:0,
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
                newRegionList(data).then(response => {
                    console.log(response);
                    that.area = response.Data;
                    that.getShipAddress();
                })
            },
            //编辑收货地址
            editAddress: function (content) {
                var that = this;
                //请求数据
                var data = {
                    "SaId": that.saId,
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
                editShipAddress(data).then(response => {
                    that.Common.showMsg("编辑成功", function () {
                        that.$router.go(-1)
                    })
                })
            },
            //获取收货地址信息
            getShipAddress:function(){
                var that = this;
                //请求数据
                var data = {
                    "SaId": that.saId,
                };
                getShipAddress(data).then(response => {
                    var shipAddressInfo = response.Data.ShipAddressInfo;
                    that.$set(that.addressInfo,'name',shipAddressInfo.Consignee)
                    that.$set(that.addressInfo,'tel',shipAddressInfo.Mobile)
                    that.$set(that.addressInfo,'province',shipAddressInfo.ProvinceName)
                    that.$set(that.addressInfo,'city',shipAddressInfo.CityName)
                    that.$set(that.addressInfo,'county',shipAddressInfo.RName)
                    that.$set(that.addressInfo,'addressDetail',shipAddressInfo.Address)
                    that.$set(that.addressInfo,'isDefault',shipAddressInfo.IsDefault == 1 ? true : false)
                    that.$set(that.addressInfo,'areaCode',shipAddressInfo.Flag[0].Flag1)
                })

            },
            onSave(content) {
                var that = this;

                that.editAddress(content)

            },
        },
        mounted() {
            var that = this;
        },
        created() {
            var that = this;
            that.saId = that.$route.query.saId;
            console.log(that.saId)
            that.getNewRegionList();
        },
    }

</script>
<style scoped>


</style>
