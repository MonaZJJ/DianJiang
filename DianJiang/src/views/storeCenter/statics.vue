<template>
  <div class="allBox">
    <div class="staticsBox" v-if="storeInfos">
      <div class="bgBox">
        <div class="bgContent">
          <img :src="storeInfos.AvatarFull" class="head" />
          <div class="info">
            <div class="name">{{storeInfos.StoreName}}</div>
            <div class="phone">{{storeInfos.Mobile}}</div>
          </div>
        </div>
        <div class="bgItem">
          <div>
            <div class="money">{{storeInfos.OrderCount}}</div>
            <div class="desc">总订单量</div>
          </div>
          <div class="line"></div>
          <div>
            <div class="money">{{storeInfos.DayWriteCount}}</div>
            <div class="desc">本日核销量</div>
          </div>
          <div class="line"></div>
          <div>
            <div class="money">¥{{storeInfos.DayMoney}}</div>
            <div class="desc">本日金额</div>
          </div>
        </div>
      </div>
      <div class="totalBox">
        <div class="firstBox">
          <div class="num">总核销订单量：{{storeInfos.WriteCount}}</div>
          <div class="tabBox">
            <div class="tab day" :class="{active:index==0}" @click="clickTab(index)">日</div>
            <div class="tab month" :class="{active:index!=0}" @click="clickTab(index)">月</div>
          </div>
          <div class="picker" @click="showPicker=true">
            <span style="margin-right: 5px">{{dayDec}}</span>
            <img src="../../../static/images/product/right.png" alt class="down" />
          </div>
        </div>
        <div>
          <van-row class="totalDesc">
            <van-col span="10">订单编号</van-col>
            <van-col span="8">订单金额</van-col>
<!--            <van-col span="6">佣金金额</van-col>-->
            <van-col span="6">核销时间</van-col>
          </van-row>
          <van-row class="statics" v-for="item,index in storeOrderList" :key="index">
            <van-col span="10">{{item.SNo}}</van-col>
            <van-col span="8">¥{{item.OrderAmount}}</van-col>
<!--            <van-col span="6">¥{{item.CommissionMoney}}</van-col>-->
            <van-col span="6">{{item.AddTimeStr}}</van-col>
          </van-row>
        </div>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
              :type="index == 0 ? 'date' : 'year-month'"
              @confirm="confirmHandle"
              @cancel="cancelHandle"
              v-model="currentTime"
      />
    </van-popup>

  </div>
</template>

<script>
import { storeStaticDetailInfo } from "@/api/store";
import { Picker, Row, Col, Popup,DatetimePicker } from "vant";
export default {
  props: {},
  data() {
    return {
      index: 0,
      active: true,
      showPicker: false,
      day:new Date(),
      currentTime:new Date(),
      storeInfos:{},
      storeOrderList:[],
    };
  },
  components: {
    "van-picker": Picker,
    "van-row": Row,
    "van-col": Col,
    "van-popup": Popup,
    "van-datetime-picker":DatetimePicker,
  },
  watch: {},
  computed: {
    dayDec:function(){
      if(this.index == 0){
        return this.day.getFullYear()+"-" + (this.day.getMonth()+1) + "-" + this.day.getDate()
      }else{
        return this.day.getFullYear()+"-" + (this.day.getMonth()+1)
      }
    }
  },
  created() {
    var that = this;
    that.storeStaticDetailInfoHandle()
  },
  mounted() {},
  methods: {
    storeStaticDetailInfoHandle:function(){
      var that = this;
      var data = {
        "Time": that.dayDec,
        "Type": that.index ? 2 : 1,
      }
      storeStaticDetailInfo(data).then(response =>{
          console.log(response);
          that.storeInfos = response.Data.StoreInfos;
          that.storeOrderList = response.Data.StoreOrderList;
      })
    },
    clickTab(index) {
      var that = this;
      this.index = !this.index;
      that.storeStaticDetailInfoHandle();
    },
    confirmHandle(value) {
      var that = this;
      this.day = value;
      this.showPicker = false;
      that.storeStaticDetailInfoHandle();
    },
    cancelHandle(value) {
      var that = this;
      this.showPicker = false;
    },

  }
};
</script>
<style scoped src="../../../static/css/statics.css">
</style>
