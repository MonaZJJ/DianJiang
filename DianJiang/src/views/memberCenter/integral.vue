<template>
  <div class="allBox">
    <div class="integralBox">
      <div class="topBox">
        <div class="grade">
          <span>当前</span>
          <span class="curr">{{info.MyCredit}}</span>
          <span>分</span>
        </div>
        <div class="desc">积分需要通过购买获得，{{info.CreditRate}}元换1积分</div>
      </div>
    </div>
    <div class="detail">积分明细</div>
    <div class="itemBox">
      <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getMyCreditHandle"
              :error.sync="error" error-text="请求失败，点击重新加载"
      >
        <div class="item" v-for="item,index in list ">
          <div>
            <div class="title">{{item.Remark}}</div>
            <div class="num">{{item.AddTimeDesc}}</div>
          </div>
          <div class="price">{{item.Credit}}</div>
        </div>
      </van-list>

    </div>
  </div>
</template>

<script>
  import {
    List,
  } from 'vant'
  import {getMyCredit} from "@/api/member";
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
    getMyCreditHandle:function(){
      var that = this;
      var data = {
        "Page": {
          "PageIndex": that.pageIndex,
          "PageSize": 20
        }
      }
      that.loading = true;
      getMyCredit(data).then(response =>{
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

<style scoped src="../../../static/css/integral.css">
</style>
