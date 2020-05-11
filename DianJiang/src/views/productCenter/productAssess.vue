<template>
  <div class="assessBox">
    <section style="padding:10px;">
      <div class="proItem" v-for="item,index in productList" :key="index">
        <img :src="item.ShowImg" alt />
        <div>
          <div class="proName van-clearfix">
            <span class="floatLeft van-multi-ellipsis--l2">{{item.ProductName}}</span>
            <span class="floatRight">￥{{item.ShopPrice}}</span>
          </div>
          <div class="van-clearfix">
            <span class="floatLeft">{{item.Sku}}</span>
            <span class="floatRight">X{{item.RealCount}}</span>
          </div>
        </div>
      </div>
      <div class="assess">
        <textarea class="assessContent" v-model="message"></textarea>
        <van-uploader class="uploadBox" v-model="fileList"  :after-read="afterRead" :before-delete="deleteHandle">
          <img src="../../../static/images/product/add.png" alt class="img" />
          <div class="addImg">添加图片</div>
        </van-uploader>
        <div class="btnBox">
          <van-button class="submitBtn" @click="reviewProductHandle">发布评论</van-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Uploader, Button } from "vant";
import {
  orderInfo,
  reviewProduct,
} from "@/api/order";
export default {
  props: {},
  data() {
    return {
      fileList: [],
      uploadList:[],
      oId:"",
      recordId:"",
      productList:[],
      message:"",
    };
  },
  components: {
    "van-uploader": Uploader,
    "van-button": Button
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    var that = this;
    that.oId = that.$route.query.oId;
    that.recordId = that.$route.query.recordId;
    that.shipType = that.$route.query.shipType;
    that.orderInfoHandle()
  },
  methods: {
    deleteHandle:function(file,detail){
      var that = this;
      console.log(detail)
      that.fileList.splice(detail.index,1)
      that.uploadList.splice(detail.index,1)
    },
    afterRead(file) {
      var  that = this;
      var formData = new FormData();
      formData.append("image1",file.file);
      $.ajax({
        type:'post',
        url:process.env.VUE_APP_BASE_API + '/UCenter/UploadReviewOrderImg',
        data:formData,
        processData:false,//*
        contentType:false,//*
        success:function(data){
          console.log(data);
          that.uploadList.push(data.Data);
        }
      })
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
        that.productList = response.Data.ProductsList;
      })

    },
    reviewProductHandle:function(){
      var that = this;
      if(that.message == ""){
        that.Common.showMsg('请输入评价内容')
        return false
      }
      var data = {
        "Oid": that.oId,
        "RecordId": that.recordId,
        "Message": that.message,
        "Img":that.uploadList,
        "Star": 0,
        "ServiceStar": 0,
        "LogisticsStar": 0
      };
      reviewProduct(data).then(response => {
        console.log(response);
        that.Common.showMsg('评价成功',function(){
          that.$router.go(-1)
        })
      })
    },

  }
};
</script>

<style scoped src="../../../static/css/comment.css">
</style>
