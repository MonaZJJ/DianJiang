<template>
  <div class="allBox">
    <div class="profitBox">
      <div class="bgBox">
        <div class="bgContent">
          <img :src="info.Avatar" class="head" />
          <div class="info">
            <div class="name">{{info.UserName}}</div>
            <div class="num">{{info.Mobile}}</div>
          </div>
        </div>
        <div class="bgItem">
          <div>
            <div class="desc">可提现佣金(元)</div>
            <div class="money">{{info.Amount}}</div>
          </div>
          <div>
            <div class="desc">累计利益(元)</div>
            <div class="money">{{info.TotalAmount}}</div>
          </div>
        </div>
        <div class="tips" @click="toWithDraw">立即提现</div>
      </div>
      <div class="itemBox">
        <div class="item">
          <div class="title">正在提现</div>
          <div class="price">{{info.WithdrawAmount}}</div>
        </div>
        <div class="item myItem" @click="toComm">
          <div class="title">我的收益</div>
          <div class="price">{{info.TotalAmount}}</div>
          <div class="dian">...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mySplitComm } from "@/api/store";
export default {
  props: {},
  data() {
    return {
      info: ""
    };
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {
    var that = this;
    that.mySplitCommHandle();
  },
  methods: {
    toComm: function() {
      var that = this;
      that.$router.push({ path: "/storeProfitDetail" });
    },
    toWithDraw: function() {
      var that = this;
      that.$router.push({ path: "/storeWithdraw" });
    },
    mySplitCommHandle: function() {
      var that = this;
      var data = {};
      mySplitComm(data).then(response => {
        console.log(response);
        that.info = response.Data;
      });
    }
  }
};
</script>

<style scoped src="../../../static/css/profit.css">
</style>
