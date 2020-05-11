<template>
  <div class="allBox">
    <section style="padding:15px 10px;">
      <div class="code-box">
        <div class="code-content">
          <img :src="extractInfo.CodeImg" alt />
          <div class="tips" style="margin-top: 20px">请将二维码展示给店家扫描</div>
        </div>
        <div class="notice">
          <span>自提时间：</span>
          <span class="red">{{extractInfo.ExtractionTime}}</span>
        </div>
        <div class="num">自提编号：{{extractInfo.ExtractionSn}}</div>
      </div>
    </section>

    <section style="padding: 10px;">
      <div class="info-box">
        <img src="../../../static/images/index/contact.png" alt />
        <van-row class="infoRight">
          <van-col span="14">{{orderAddressInfo.Consignee}}</van-col>
          <van-col span="10" style="text-align: right;">{{orderAddressInfo.Mobile}}</van-col>
          <van-col span="24" class="info-address">{{orderAddressInfo.Address}}</van-col>
        </van-row>
      </div>
      <div class="detail-box">
        <div class="detailTop">
          <img src="../../../static/images/index/shop.png" alt />
          <span class="floatLeft">典匠生活家</span>
          <span class="floatRight">您拍的宝贝清单</span>
        </div>
        <div class="pro-item" v-for="item,index in productsList" :key="index">
          <img :src="item.ShowImg" alt/>
          <div>
            <div class="pro_name van-clearfix">
              <span class="floatLeft van-multi-ellipsis--l2">{{item.ProductName}}</span>
              <span class="floatRight" v-if="orderInfo.OrderType == 1">￥{{item.ShopPrice}}</span>
              <span class="floatRight" v-else>{{item.CPCredit}}积分</span>
            </div>
            <div class="van-clearfix">
              <span class="floatLeft">{{item.Sku}}</span>
              <span class="floatRight">X{{item.RealCount}}</span>
            </div>
          </div>
        </div>
        <div class="actuallyBtm" v-if="orderInfo.OrderType == 1">
          共{{orderInfo.BuyCount}}件商品&emsp;实付:
          <span>￥{{orderInfo.OrderAmount}}</span>
        </div>
        <div class="actuallyBtm" v-else>
          共{{orderInfo.BuyCount}}件商品&emsp;实付:
          <span>{{orderInfo.PayCreditCount}}积分</span>
        </div>
        <div class="bottomBox">
          <div class="notice-box" v-if="orderInfo.BuyerRemark">备注：{{orderInfo.BuyerRemark}}</div>
          <div class="copy-box">
            <div class="copy-left">
              <div>下单编号：{{orderInfo.OSn}}</div>
              <div>下单时间：{{orderInfo.AddTimes}}</div>
            </div>
            <van-button class="copy-right" v-clipboard:copy="orderInfo.OSn">复制单号</van-button>
          </div>
        </div>
      </div>
      <div class="relation-box">
          <a class="copy-right" :href="CustomerPhone" style="color: #E53333">联系客服</a>
        <!--<van-button class="copy-right" @click="closeOrderHandle">取消订单</van-button>-->
      </div>
    </section>
  </div>
</template>


<script>
import { Row, Col, Button } from "vant";
import {
  orderInfo,
  reSubmitOrder,
  putOrdersRefund,
  receiveOrder,
  cancelOrder,
  againBuyProduct,
} from "@/api/order";
export default {
  props: {},
  data() {
    return {
      orderInfo: "",
      productsList: [],
      orderAddressInfo:"",
      extractInfo:"",
      phone:"",
    };
  },
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button
  },
  watch: {},
  computed: {
    CustomerPhone:function(){
      return 'tel:'+this.phone
    }
  },
  created() {},
  mounted() {
    var that = this;
    that.oId = that.$route.query.oId;
    that.recordId = that.$route.query.recordId;
    that.shipType = that.$route.query.shipType;
    that.orderInfoHandle()
  },
  methods: {
    //申请售后跳转
    applyHandle:function(){
      var that = this;
      that.$router.push({path:'/afterSaleApply',query:{oId:that.oId,type:that.shipType}})
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
        that.orderInfo = response.Data.OrderInfo;
        that.orderAddressInfo = response.Data.OrderAddressInfo;
        that.extractInfo = response.Data.ExtractInfo;
        that.productsList = response.Data.ProductsList;
        that.phone = response.Data.CustomerPhone
      })
    },
    //评价商品
    toAssessHandle:function(oId,recordId,shipType){
      var that = this;
      that.$router.push({path:'/productAssess',query:{oId:oId,recordId:recordId,shipType:shipType}})
    },
    //再次购买
    againHandle: function (id) {
      var that = this;
      var data = {
        "oid": that.oId
      };
      againBuyProduct(data).then(response => {
        console.log(response);
        that.$router.push({path: '/cart'})
      })

    },
    //申请退款
    returnHandle: function (id) {
      var that = this;
      var data = {
        "oid": that.oId
      };
      that.Common.confirmDialog('确认申请退款吗', function () {
        putOrdersRefund(data).then(response => {
          console.log(response);
          that.Common.showMsg('申请退款成功', function () {
            that.orderInfoHandle()
          })
        })
      })
    },
    //确认收货
    receiveOrderHandle: function (id) {
      var that = this;
      var data = {
        "oid": that.oId
      };
      that.Common.confirmDialog('确认收货吗', function () {
        receiveOrder(data).then(response => {
          console.log(response);
          that.orderInfoHandle()
        })
      })
    },
    //关闭订单
    closeOrderHandle: function (id) {
      var that = this;
      var data = {
        "oid": that.oId
      };
      that.Common.confirmDialog('确认要取消吗', function () {
        cancelOrder(data).then(response => {
          console.log(response);
          that.Common.showMsg('取消订单成功', function () {
            that.orderInfoHandle()
          })
        })
      })
    },
    onBridgeReady: function () {
      var that = this;
      //微信端调起支付
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
                "appId": that.GLOBAL.appId, //公众号名称，由商户传入,不用修改
                "timeStamp": that.payData.Data.TimeStamp, //时间戳，由接口返回
                "nonceStr": that.payData.Data.NonceStr, //随机串，由接口返回
                "package": that.payData.Data.Package, //扩展包，由接口返回
                "signType": that.payData.Data.SignType, //微信签名方式:MD5,不用修改
                "paySign": that.payData.Data.PaySign //微信签名，由接口返回
              },
              function (res) {
                console.log("jsdk", res)
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  that.Common.showMsg("支付成功", function () {
                    localStorage.removeItem('payObj')
                    that.orderInfoHandle()
                  });

                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  //用户取消支付后跳转地址
                  that.Common.showMsg("取消支付", function () {
                    localStorage.removeItem('payObj')
                    that.orderInfoHandle()
                  });
                } else {
                  that.Common.showMsg(res.errMsg, function () {
                    localStorage.removeItem('payObj')
                    that.orderInfoHandle()
                  });

                  //用户支付失败后跳转地址
                }
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
              });
    },
    //立即付款
    payHandle: function (id, type) {
      var that = this;
      var oid = that.oId;
      that.submitOrder(oid);
    },
    //重新提交订单接口(h5支付)
    submitOrder: function (id) {
      var that = this;
      var data = {
        "oid": id
      };
      reSubmitOrder(data).then(response => {
        console.log(response);
        that.payData = response;
        if (typeof WeixinJSBridge == "undefined") {//微信浏览器内置对象。参考微信官方文档
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
          }
        } else {
          that.onBridgeReady();
        }
      })
    },
  }
};
</script>

<style scoped src="../../../static/css/selfOrderDetail.css">
</style>
