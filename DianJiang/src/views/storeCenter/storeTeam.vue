<template>
  <div class="allBox">
    <div class="teamContent">
      <div class="bgBox">
        <div class="bgContent">
          <img :src="info.Avatar" class="head" />
          <div class="info">
            <div class="name">{{info.UserName}}</div>
            <div class="phone">{{info.Mobile}}</div>
          </div>
        </div>
        <div class="bgItem">
          <div>
            <div class="desc">当前vip人数(人)</div>
            <div class="money">{{info.VipCount}}</div>
          </div>
          <div>
            <div class="desc">会员总数(人)</div>
            <div class="money">{{info.Total}}</div>
          </div>
        </div>
      </div>
      <div class="itemBox">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="subClientListHandle"
                :error.sync="error" error-text="请求失败，点击重新加载"
        >
          <div class="item" v-for="item,index in list">
            <div>
              <div class="title">{{item.UserName}}</div>
              <div class="num">{{item.UId}}</div>
            </div>
            <div class="price">会员等级：{{item.UserRIdDesc}}</div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    subClientList,
  } from "@/api/store";
  import {
    List,
  } from 'vant'
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
    mounted() {},
    methods: {
      subClientListHandle:function(){
        var that = this;
        var data = {
          "Page": {
            "PageIndex": that.pageIndex,
            "PageSize": 20
          }
        }
        that.loading = true;
        subClientList(data).then(response =>{
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

<style scoped src="../../../static/css/team.css">
</style>
