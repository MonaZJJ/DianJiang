<template>
    <div class="allBox">

        <van-cell-group class="ship-box">
            <van-field :value="info.OSn" label="订单编号" placeholder="" readonly/>
            <van-field :value="info.Consignee" label="联系人" placeholder="" readonly/>
            <van-field :value="info.Mobile" label="联系电话" placeholder="" readonly/>
            <van-field :value="info.Address" label="退货地址" placeholder="" readonly/>
            <van-field :value="shipCoName" is-link label="快递公司" placeholder="请选择" readonly @click="showPicker=!showPicker"/>
            <van-field v-model="shipSn" label="快递编号" placeholder="请输入" />
        </van-cell-group>

        <div class="submit-box"><button @click.stop="sendSubmit">发货</button></div>

        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker=false"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import { beenSendDetail,beenSentAfterSalesService } from "@/api/aftersale";
    import { Cell, CellGroup, Field, Picker, Popup  } from 'vant';

    export default {
        name: "deliverDoods",
        components: {
            "van-cell": Cell,
            "van-cell-group": CellGroup,
            "van-field": Field,
            "van-picker": Picker,
            "van-popup": Popup,
        },
        data() {
            return {
                said: 0,
                info:"",
                shipCoName: "",
                shipSn:"",

                showPicker:false,
                columns:[],

            };
        },
        computed: {},
        methods: {

            sendSubmit(){
                var that = this;
                if (that.shipCoName == "") {
                    that.Common.showMsg("请选择快递公司");
                    return false;
                }
                if (that.shipSn == "") {
                    that.Common.showMsg("请输入快递编号");
                    return false;
                }
                var data = {
                    "Id": that.said,
                    "ShipCoName1": that.shipCoName,
                    "ShipSn1": that.shipSn
                };
                beenSentAfterSalesService(data).then(response => {
                    that.Common.showMsg("提交成功",function () {
                        that.$router.replace({
                            path: '/afterSaleList',
                            query: { }
                        })
                    })
                }).catch(err =>{
                    that.Common.showMsg(err.data.Message);
                });
            },

            onConfirm(value){
                this.shipCoName = value;
                this.showPicker = false;
            }

        },
        mounted() {
            var that = this;

        },
        created() {
            var that = this;
            that.said = that.$route.query.said ? that.$route.query.said : 0;
            beenSendDetail({
                "ASId": that.said
            }).then(response => {
                that.info = response.Data;
                that.columns = response.Data.ShipList;
            }).catch(err =>{
                that.Common.showMsg(err.data.Message);
            });
        }
    };
</script>

<style scoped>
    .allBox{
        min-height: 100vh;
        padding: 10px;
        box-sizing: border-box;
        background-color: #f5f5f5;
    }
    .ship-box{
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 10px;
    }
    .submit-box{
        text-align: center;
    }
    .submit-box button{
        width: 289px;
        height: 35px;
        background-color: #56BD6B;
        color: #fff;
        font-size: 15px;
        border: 0;
        border-radius: 18px;
    }
</style>