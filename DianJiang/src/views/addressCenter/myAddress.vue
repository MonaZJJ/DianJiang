<template>
    <div class="allBox">
        <div class="outBox">
            <!--收货地址-->

            <div class="addressBox" v-for="item,index in shipAddressList" :key="this">
                <div class="addressLeft">
                    <div class="leftTop">
                        <img src="../../../static/images/order/dingwei.png" class="addressIcon" alt="">
                        <div class="userName">{{item.Consignee}}</div>
                        <div class="phone">{{item.Mobile}}</div>
                    </div>
                    <div class="leftBottom">{{item.ProvinceName}}{{item.CityName}}{{item.RName}}{{item.Address}}</div>
                    <div class="actionBox">
                        <img src="../../../static/images/address/noSelect.png" v-show="!item.IsDefault"
                             class="defaultIcon"
                             @click.stop="setDefaultHandle(item.SAId,1)" alt="">
                        <img src="../../../static/images/address/select.png" v-show="item.IsDefault" class="defaultIcon"
                             @click.stop="setDefaultHandle(item.SAId,0)" alt="">
                        <div class="defaultText">默认地址</div>
                        <div class="delectText" @click.stop="delShipAddress(item.SAId)">删除</div>
                        <img src="../../../static/images/address/delect.png" class="delectIcon" alt=""
                             @click.stop="delShipAddress(item.SAId)">
                        <div class="editText" @click.stop="toEdit(item.SAId)">修改</div>
                        <img src="../../../static/images/address/edit.png" class="editIcon" alt=""
                             @click.stop="toEdit(item.SAId)">
                    </div>

                </div>
            </div>
        </div>
        <!--按钮-->
        <div class="addBtn" @click.stop="toAdd">新增收货地址</div>
    </div>


</template>

<script>
    import {mapState} from 'vuex'
    import {
        shipAddressList,
        delShipAddress,
        setDefaultShipAddress
    } from "@/api/address";

    export default {
        name: 'myAddress',
        data() {
            return {
                shipAddressList: [],
            }
        },
        computed: {},
        components: {},
        methods: {
            //收货地址列表
            shipAddressListHandle: function () {
                var that = this;
                var data = {}
                shipAddressList().then(response => {
                    console.log(response);
                    that.shipAddressList = response.Data.ShipAddressList;
                })
            },
            //设置默认地址
            setDefaultHandle: function (id,type) {
                var that = this;
                var data = {
                    "SaId": id,
                    "IsDefault":type,
                }
                setDefaultShipAddress(data).then(response => {
                    console.log(response);
                    that.shipAddressListHandle();
                })
            },
            //删除收货地址
            delShipAddress: function (id) {
                var that = this;
                that.Common.confirmDialog('确认要删除吗',function(){
                    var data = {
                        "SaId": id
                    }
                    delShipAddress(data).then(response => {
                        //获取本地缓存的id
                        if (localStorage.SAId == id) {
                            localStorage.removeItem('SAId')
                        }
                        console.log(response);
                        that.shipAddressListHandle();
                    })
                })
            },
            //编辑收货地址
            toEdit: function (saId) {
                var that = this;
                that.$router.push({path: '/editAddress', query: {saId: saId}})
            },
            //前往添加收货地址
            toAdd: function () {
                var that = this;
                that.$router.push({path: '/addAddress'})
            },

        },
        mounted() {
            var that = this;
            window.scroll(0, 0)
            that.shipAddressListHandle();
        },
        created() {
            var that = this;

        },
    }

</script>
<style scoped src="../../../static/css/orderAddress.css">


</style>
