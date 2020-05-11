<template>
  <div class="allBox">
    <div class="topBox" style="position: relative">
      <div class="topInfoBox">
        <img :src="userInfo.Avatar" class="avatar" />
        <div class="topInfo">
          <div class="topFirst">
            <div class="name">{{userInfo.UserName}}</div>
            <div class="grade" v-if="userInfo.UserRId > 0">{{userInfo.UserRIdDesc}}</div>
          </div>
          <div class="num">ID号：{{uid}}</div>
        </div>
      </div>
      <!--完善按钮-->
      <div class="perfectBtn" @click="toDetail('/perfectInformation')">完善信息</div>
    </div>
    <div class="itemBox">
      <div class="itemTop">
        <div class="itemTitle">我的订单</div>
        <div class="more" @click="toOrderListHandle(0)">更多 ></div>
      </div>
      <div class="itemContent">
        <div class="item" @click="toOrderListHandle(20)">
          <img src="../../../static/images/member/item01.png" style="width:26px;height:22px;" />
          <div>待付款</div>
        </div>
        <div class="item" @click="toOrderListHandle(65)">
          <img src="../../../static/images/member/item02.png" style="width:27px;height:23px;" />
          <div>待发货</div>
        </div>
        <div class="item" @click="toOrderListHandle(75)">
          <img src="../../../static/images/member/item03.png" style="width:24px;height:22px;" />
          <div>待收货</div>
        </div>
        <div class="item" @click="toAfterOrderListHandle()">
          <img src="../../../static/images/member/item04.png" style="width:20px;height:20px;" />
          <div>售后订单</div>
        </div>
      </div>
    </div>

    <div class="itemProject">
      <div class="item2" @click="toDetail('/profit')" v-if="userInfo.UserRId>1">
        <img src="../../../static/images/member/item05.png" style="width:18px;height:22px;" />
        <div>我的收益</div>
      </div>
      <div class="item2" @click="toDetail('/team')" v-if="userInfo.UserRId>1">
        <img src="../../../static/images/member/item06.png" style="width:24px;height:22px;" />
        <div>我的团队</div>
      </div>
      <div class="item2" @click="toMyCode('/myCode')" v-if="userInfo.UserRId>1">
        <img src="../../../static/images/member/item07.png" style="width:21px;height:22px;" />
        <div>我的二维码</div>
      </div>
      <div class="item2" @click="toDetail('/collect')">
        <img src="../../../static/images/member/item08.png" style="width:22px;height:22px;" />
        <div>我的收藏</div>
      </div>
      <div class="item2" @click="toDetail('/wallet')">
        <img src="../../../static/images/member/item09.png" style="width:25px;height:22px;" />
        <div>我的钱包</div>
      </div>
      <div class="item2" @click="toDetail('/business')">
        <img src="../../../static/images/member/item10.png" style="width:23px;height:22px;" />
        <div>成为供应商</div>
      </div>
      <div class="item2" @click="toDetail('/integral')">
        <img src="../../../static/images/member/item11.png" style="width:19px;height:22px;" />
        <div>我的积分</div>
      </div>
      <div class="item2" @click="toDetail('/myAddress')">
        <img src="../../../static/images/member/item12.png" style="width:18px;height:22px;" />
        <div>收货地址</div>
      </div>
      <div class="item2" @click="toDetail('/myCompany')" style="margin-bottom:0">
        <img src="../../../static/images/member/item13.png" style="width:24px;height:22px;" />
        <div>公司介绍</div>
      </div>
    </div>
    <FooterTab></FooterTab>
  </div>
</template>
<script>
import { uCenterData } from "@/api/member";
import FooterTab from "@/components/FooterTab";
export default {
  name: "member",
  components: {
    FooterTab
  },
  data() {
    return {
      uid: 0,
      userInfo:"",
    };
  },
  computed: {},
  methods: {
    toOrderListHandle:function(type){
      var that = this;
      that.$router.push({path:'/order',query:{value: type, shipType: 0}})
    },
    toAfterOrderListHandle:function(){
      var that = this;
      that.$router.push({path:'/afterSaleList',query:{value: 0}});
    },
    toDetail:function(path){
      var that = this;
      that.$router.push({path:path})
    },
    toMyCode:function(path){
      var that = this;
      that.$router.push({path:path,query:{ shareUid: that.uid}});
    },
    uCenterDataHandle:function(){
      var that = this;
      var data = {};
      uCenterData(data).then(response =>{
        that.userInfo = response.Data;
        that.uid = localStorage.getItem("uid");
      })

    },
  },
  mounted() {
    var that = this;
  },
  created() {
    var that = this;
    //底部导航栏
    that.$store.commit('setFooterNav', 'member');
    that.uCenterDataHandle()
  }
};
</script>

<style scoped src="../../../static/css/member.css"></style>
