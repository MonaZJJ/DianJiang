<template>
  <div class="allBox">
    <div class="withdrawContent">
      <div class="bgBox">
        <div class="bgContent">
          <img :src="info.Avatar" class="head" />
          <div class="info">
            <div class="name">{{info.UserName}}</div>
            <div class="grade" v-if="info.IsVip" @click="toVipHandle">
              <img src="../../../static/images/member/grade.png" style="width:18px;height:18px;" />
              <div >vip ></div>
            </div>
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
      </div>
      <div class="withdrawBox">
        <div class="withdrawItem">
          <div class="tips">￥</div>
          <van-cell-group>
            <van-field class="inputBox" v-model="money" type="number"  placeholder="请输入提现金额" />
          </van-cell-group>
          <div class="rightBox">
            <div class="title" @click="allHandle">全部提现</div>
            <div class="money">提现余额：￥{{info.Amount}}</div>
          </div>
        </div>
        <div class="descBox">一天之只能提现1次，最高{{info.SplitLimitAmount}}</div>
        <van-button class="conButton" @click="distAmountWithdrawalHandle">确认提现</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Field, CellGroup, Button } from "vant";
  import {
    mySplitComm,
    distAmountWithdrawal
  } from "@/api/store";
  export default {
    props: {},
    data() {
      return {
        money: "",
        info:"",
      };
    },
    components: {
      "van-cell-group": CellGroup,
      "van-field": Field,
      "van-button": Button
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {
      var that = this;
      that.mySplitCommHandle();
    },
    methods: {
      toVipHandle:function(){
        var that = this;
        that.$router.push({path:'/rules'})
      },
      allHandle:function(){
        var that = this;
        that.money = that.info.Amount;
      },
      mySplitCommHandle:function(){
        var that = this;
        var data = {

        };
        mySplitComm(data).then(response =>{
          console.log(response)
          that.info = response.Data;
        })
      },
      distAmountWithdrawalHandle:function(){
        var that = this;
        if(that.money == ""){
          that.Common.showMsg('请输入提现金额')
          return false
        }
        var data = {
          "Amount": that.money
        }
        distAmountWithdrawal(data).then(response =>{
          console.log(response)
          that.Common.showMsg('提现成功',function(){
            that.mySplitCommHandle()
          })
        })
      }
    }
  };
</script>

<style scoped src="../../../static/css/withdraw.css">
</style>
