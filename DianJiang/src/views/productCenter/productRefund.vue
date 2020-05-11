<template>
  <div class="assessBox">
    <section style="padding:10px;">
      <div class="proItem" v-for="item,index in productList" :key="index">
        <img :src="item.ShowImg" alt />
        <div>
          <div class="proName van-clearfix">
            <span class="floatLeft van-multi-ellipsis--l2">{{item.ProductName}}</span>
            <span class="floatRight">￥{{item.ShopPrice}}</span>
          </div>
          <div class="van-clearfix">
            <span class="floatLeft">{{item.Sku}}</span>
            <span class="floatRight">X{{item.RealCount}}</span>
          </div>
        </div>
      </div>
      <div class="assess">
        <div class="itemBox" @click="showHandle" v-if="columns.length > 0">
          <div class="itemLeft">
            <div class="itemTitle">售后原因:</div>
            <div class="itemContent">{{afterReason}}</div>
          </div>
          <img class="rightIcon" src="../../../static/images/product/right.png" alt/>
        </div>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
                  show-toolbar
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
          />
        </van-popup>
        <textarea class="assessContent" v-model="message"></textarea>
        <div class="btnBox">
          <van-button class="submitBtn" @click="returnHandle">申请退款</van-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Uploader, Button,Picker,Popup} from "vant";
import {
  orderInfo,
  reviewProduct,
  getCancelReasonList,
  putOrdersRefund,
} from "@/api/order";
export default {
  props: {},
  data() {
    return {
      fileList: [],
      uploadList:[],
      oId:"",
      recordId:"",
      productList:[],
      message:"",
      afterReason:"",
      show: false,
      showPicker:false,
      columns: []
    };
  },
  components: {
    "van-uploader": Uploader,
    "van-button": Button,
    "van-picker":Picker,
    "van-popup":Popup,

  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    var that = this;
    that.oId = that.$route.query.oId;
    that.recordId = that.$route.query.recordId;
    that.shipType = that.$route.query.shipType;
    that.orderInfoHandle()
    that.getCancelReasonListHandle()
  },
  methods: {
    showHandle:function(){
      var that = this;
      that.showPicker = true;
    },
    onConfirm(value) {
      this.afterReason = value;
      this.showPicker = false;
    },
    //售后原因接口
    getCancelReasonListHandle: function () {
      var that = this;
      var data = {
      };
      getCancelReasonList(data).then(response => {
        console.log(response);
        that.columns = response.Data;
      })

    },
    //订单详情接口
    orderInfoHandle: function () {
      var that = this;
      var data = {
        "oid": that.oId,
        "ShipType": that.shipType
      };
      orderInfo(data).then(response => {
        console.log(response);
        that.productList = response.Data.ProductsList;
      })

    },
    //申请退款
    returnHandle: function (id) {
      var that = this;
      var data = {
        "oid": that.oId,
        "CancelReason": that.afterReason,
        "BuyerNote": that.message
      };
        putOrdersRefund(data).then(response => {
          console.log(response);
          that.Common.showMsg('申请退款成功', function () {
            that.$router.go(-1)
          })
        })
    },

  }
};
</script>

<style scoped src="../../../static/css/comment.css">
</style>
