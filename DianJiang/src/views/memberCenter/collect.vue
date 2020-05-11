<template>
  <div class="collectBox">
      <!--我收藏的宝贝-->
      <div class="totalBox">
          <div></div>
          <div class="rightBox">
              <div>我的收藏宝贝</div>
              <div class="colorBox">{{total}}</div>
          </div>
      </div>
    <div class="collectContent" :style="{'padding-left':iswhite ? '10px' : '0','margin-left':iswhite ? '0' : '10px','background':isOpen ? '#fff' : 'transparent'}" v-for="item,index in favoritesList" :key="index">
      <van-swipe-cell :style="{'overflow':isOpen}" @open="openHandle" @close="closeoneHandle"   class="collectItem" :right-width="50" :left-width="0" >
          <img :src="item.ShowImg" class="productImg" @click="toDetail(item.PId)" alt />
          <div class="productRightBox" @click="toDetail(item.PId)">
            <div class="productName van-multi-ellipsis--l2">{{item.Name}}</div>
            <div class="productSku van-ellipsis">{{item.Summary}}</div>
            <div class="priceBox">
              <div class="price">￥{{item.Price}}</div>
              <div class="time">{{item.AddTime}}</div>
            </div>
          </div>
          <span slot="right" class="delectBtn" @click="delectHandle(item.PId)">删除</span>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import { SwipeCell } from "vant";
import {
  favoriteProductList,
  delProductToFavorite,
} from "@/api/member";
export default {
  props: {},
  data() {
    return {
      favoritesList:[],
      total:0,
      isOpen:"hidden",
      iswhite:false,
    };
  },
  components: {
    "van-swipe-cell": SwipeCell
  },
  watch: {},
  computed: {},
  created() {
    var that = this;
    that.favoriteProductListHandle()
  },
  mounted() {},
  methods: {
      openHandle:function(){
          var that = this;
          that.isOpen = "visible";
          that.iswhite = true;
          console.log('打开了')
      },
      closeoneHandle:function(){
          var that = this;
          that.isOpen = "hidden";
          that.iswhite = false;
          console.log('关闭了')
      },
    toDetail:function(id){
      var that = this;
      that.$router.push({path:'/productDetail',query:{pId:id}})
    },
    delectHandle:function(id){
      var that = this;
      var data = {
        "PIdList": [id]
      };
      delProductToFavorite(data).then(response =>{
        console.log(response)
        that.favoriteProductListHandle()
      })
    },
    favoriteProductListHandle:function(){
      var that = this;
      var data = {
        "PageIndex": 1
      };
      favoriteProductList(data).then(response =>{
        console.log(response)
        that.favoritesList = response.Data.FavoritesList;
        that.total = response.Data.Total;
      })
    }

  }
};
</script>

<style scoped src="../../../static/css/collect.css"></style>
