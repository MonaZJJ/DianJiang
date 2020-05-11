<template>
  <div class="allBox">
    <div class="topBox">
      <div class="topInfoBox">
        <!--<img src="../../../static/images/member/avatar.png" class="avatar"/>-->
        <img :src="info.Avatar" class="avatar" />
        <div class="topInfo">
          <div class="topFirst">
            <div class="name">{{info.StoreName}}</div>
          </div>
          <div class="num">{{info.Mobile}}</div>
        </div>
      </div>
    </div>
    <div class="itemBox">
      <div class="item">
        <div class="money">{{info.TotalAmount}}</div>
        <div class="desc">累计收益</div>
      </div>
      <div class="item">
        <div class="money">{{info.Amount}}</div>
        <div class="desc">可提现佣金</div>
      </div>
    </div>

    <div class="itemProject">
      <router-link :to="{ path: '/storeProfit'}">
        <div class="itemTwo">
          <img src="../../../static/images/member/item05.png" style="width:18px;height:22px;" />
          <div>门店收益</div>
        </div>
      </router-link>
      <router-link :to="{ path: '/storeTeam'}">
        <div class="itemTwo">
          <img src="../../../static/images/member/item06.png" style="width:22px;height:22px;" />
          <div>门店团队</div>
        </div>
      </router-link>

      <div class="itemTwo" @click.stop="toMyCode">
        <img src="../../../static/images/member/item07.png" style="width:22px;height:22px;" />
        <div>门店二维码</div>
      </div>

      <router-link :to="{ path: '/statics'}">
        <div class="itemTwo">
          <img src="../../../static/images/member/statics.png" style="width:22px;height:22px;" />
          <div>门店统计</div>
        </div>
      </router-link>
    </div>
    <div class="bottomBox">
      <van-row class="tab-box">
        <van-col span="8">
          <router-link :to="{ path: '/storeOrderList', query: {act: 0, state: 0} }">
            <van-col span="24">
              <img src="../../../static/images/index/ziti.png" alt style="width:22px;height:20px;" />
            </van-col>
            <van-col span="24" class="text">自提订单</van-col>
          </router-link>
        </van-col>
        <van-col span="8" @click.stop="wxScanClick()">
          <van-col span="24" class="scan">
            <img src="../../../static/images/index/saoma.png" alt />
          </van-col>
          <van-col span="24" class="scanText">扫一扫</van-col>
        </van-col>
        <van-col span="8">
          <van-col span="24">
            <img src="../../../static/images/index/mine_on.png" alt style="width:20px;height:20px;" />
          </van-col>
          <van-col span="24" class="text active">我的</van-col>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { myStoreInfo, jsSdkShare } from "@/api/store";
import { Col, Row } from "vant";
const wx = require("weixin-js-sdk");

export default {
  props: {},
  components: {
    "van-row": Row,
    "van-col": Col
  },
  data() {
    return {
      info: "",

      timestamp: "",
      nonceStr: "",
      signature: ""
    };
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    toMyCode: function() {
      var that = this;
      that.$router.push({
        path: "/storeCode",
        query: { shareUid: localStorage.getItem("storeUid") }
      });
    },
    // 获取分享数据
    getShareData: function() {
      var that = this;
      //url: location.href.splic('#')[0]  // 这里是当前页面的url，一定要 location.href 获取，不然签名会无效。
      var data = {
        Url: process.env.VUE_APP_BASE_API_SHARE + "/storeMe"
      };
      jsSdkShare(data)
        .then(response => {
          that.timestamp = response.Data.Timestamp;
          that.nonceStr = response.Data.NonceStr;
          that.signature = response.Data.Signature;
        })
        .catch(err => {
          that.Common.showMsg(err.data.Message);
        });
    },
    wxScanClick() {
      console.log("点击了扫一扫");
      if (this.signature != "") {
        this.wxScan();
      }
    },
    //微信扫码
    wxScan() {
      var that = this;
      wx.config({
        debug: false,
        appId: that.GLOBAL.appId, // 必填,公众号的唯一标识
        timestamp: that.timestamp, // 必填,生成签名的时间戳
        nonceStr: that.nonceStr, // 必填,生成签名的随机串
        signature: that.signature, // 必填,签名
        jsApiList: ["scanQRCode"] // 必填,需要使用的JS接口列表
      });
      wx.ready(function() {
        // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
        // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
        wx.checkJsApi({
          // 判断当前客户端版本是否支持指定JS接口
          jsApiList: ["scanQRCode"],
          success: function(res) {
            // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
            if (res.checkResult.scanQRCode === true) {
              wx.scanQRCode({
                // 微信扫一扫接口
                desc: "scanQRCode desc",
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function(res) {
                  // that.result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
                  var arr = res.resultStr.split("&");
                  if (arr[1] == 1) {
                    //订单详情
                    that.$router.push({
                      path: "/storeOrderDetail",
                      query: { oId: arr[0] }
                    });
                  } else {
                    //售后详情
                    that.$router.push({
                      path: "/afterSaleOrderDetail",
                      query: { oId: arr[0] }
                    });
                  }
                }
              });
            } else {
              alert("抱歉，当前客户端版本不支持扫一扫");
            }
          },
          fail: function(res) {
            // 检测getNetworkType该功能失败时处理
            alert("fail" + res);
          }
        });
      });
      /* 处理失败验证 */
      wx.error(function(res) {
        // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
        alert("配置验证失败: " + res.errMsg);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (isiOS && to.path !== location.pathname) {
      // 此处不可使用location.replace
      location.assign(to.fullPath);
    } else {
      next();
    }
  },
  created() {
    var that = this;
    that.getShareData();
    myStoreInfo()
      .then(response => {
        that.info = response.Data;
      })
      .catch(err => {
        that.Common.showMsg(err.data.Message);
      });
  }
};
</script>

<style scoped src="../../../static/css/storeMe.css">
</style>
