<template>
  <div class="allBox">
    <div class="itemBox">
      <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="distAmountListHandle"
              :error.sync="error" error-text="请求失败，点击重新加载"
      >
        <div class="item" v-for="item,index in list">
          <div>
            <div class="title">{{item.TradeTypeStr}}</div>
            <div class="num">{{item.TradeTimeStr}}</div>
          </div>
          <div class="price">￥{{item.Amount}}</div>
        </div>

      </van-list>
    </div>
  </div>
</template>

<script>
  import {
    List,
  } from 'vant'
  import {
    distAmountList,
  } from "@/api/member";
export default {
  props: {},
  data() {
    return {
      loading: false,
      finished: false,
      total: 0,
      pageIndex: 1,
      list:[],
      info:"",
      error:false,
    };
  },
  components: {
    "van-list": List,
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    var that = this;
  },
  methods: {
    distAmountListHandle:function(){
      var that = this;
      var data = {
        "Page": {
          "PageIndex": that.pageIndex,
          "PageSize": 20
        }
      }
      that.loading = true;
      distAmountList(data).then(response =>{
        console.log(response)
        that.info = response.Data;
        if(that.pageIndex == 1){
          that.list = [...response.Data.List]
        }else{
          that.list = [...list,...response.Data.List]
        }
        that.total = response.Data.Total;
        that.pageIndex += 1;
        // 加载状态结束
        that.loading = false;
        // 数据全部加载完成
        if (that.list.length >= that.total) {
          that.finished = true;
        }
      }).catch(err =>{
        that.error = true;
      })
    },
  }
};
</script>

<style scoped src="../../../static/css/profiDetail.css">
</style>
