<template>
    <div class="allBox clearfix">
        <!--有商品的时候-->
        <div class="cartBox" v-show="isShow">
            <!-- 提示 -->
            <div class="tipsBox">今天你已拍下如下产品</div>
            <div class="cartItem" v-for="(product,productIndex) in CartInfo.CartProductList"
                 :key="productIndex">
                <!--店铺商品列表-->
                <div
                        class="productItem"

                >
                    <van-swipe-cell :style="{'overflow':isOpen}" :right-width="50" :left-width="0" @open="openHandle" @close="closeoneHandle">
                        <img
                                src="../../../static/images/cart/noSelect.png"
                                class="productIcon"
                                alt
                                v-if="!product.IsSelected"
                                @click="singleClickHandle(productIndex)"
                        />
                        <img
                                src="../../../static/images/cart/select.png"
                                class="productIcon"
                                alt
                                v-if="product.IsSelected"
                                @click="singleClickHandle(productIndex)"
                        />
                        <div class="backDiv">
                            <img :src="product.OrderProductInfo.ShowImg" class="productImg" alt/>
                            <div class="productRightBox">
                                <div class="productName">{{product.OrderProductInfo.Name}}</div>
                                <div class="productSku">{{product.OrderProductInfo.Sku}}</div>
                                <div class="priceBox">
                                    <div class="price" v-if="!product.Failure">¥{{product.OrderProductInfo.DiscountPrice}}</div>
                                    <div class="price" v-else>已失效</div>
                                    <!--数量加减-->
                                    <van-stepper
                                            :value="product.OrderProductInfo.BuyCount"
                                            async-change
                                            @plus="addHandle(product.OrderProductInfo.PSkuRId,productIndex)"
                                            @minus="reduceHandle(product.OrderProductInfo.PSkuRId,productIndex)"
                                            class="steppItem"
                                            :disable-input="true"
                                    />
                                </div>
                            </div>

                        </div>
                        <span
                                slot="right"
                                class="delectBtn"
                                @click="delectHandle(product.OrderProductInfo.PSkuRId)"
                        >删除</span>
                    </van-swipe-cell>
                </div>
            </div>
        </div>
        <!--去结算-->
        <div class="payBox" v-show="isShow">
            <div class="payLeft">
                <img
                        src="../../../static/images/cart/noSelect.png"
                        class="allIcon"
                        alt
                        v-if="!allSelect"
                        @click="allClickHandle()"
                />
                <img
                        src="../../../static/images/cart/select.png"
                        class="allIcon"
                        alt
                        v-if="allSelect"
                        @click="allClickHandle()"
                />
                <div class="allSelectText">全选</div>
            </div>

            <div class="payMiddle">
                <div class="left">合计：</div>
                <div class="left bold">¥{{OrderAmount}}</div>
                <div class="payRight" @click="toPay">结算({{total}})</div>
            </div>
        </div>

        <!--没商品的时候-->
        <div class="noProduct" v-show="!isShow">
            <img src="../../../static/images/cart/no.png" class="noProductImg" alt/>
            <div class="noText">购物车什么都没有噢，去逛逛吧</div>
        </div>
        <FooterTab></FooterTab>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {Checkbox, Stepper, SwipeCell} from "vant";
    import {
        queryCardList,
        changeProductCount,
        delPruduct,
    } from "@/api/cart";
    import FooterTab from "@/components/FooterTab";
    export default {
        name: "cart",
        data() {
            return {
                checked: false,
                value: 1,
                CartInfo: "",
                OrderAmount: "",
                isShow: false,
                //是否全选
                allSelect: false,
                total:0,
                isOpen:"hidden",
            };
        },
        computed: {},
        components: {
            "van-checkbox": Checkbox,
            "van-stepper": Stepper,
            "van-swipe-cell": SwipeCell,
            FooterTab
        },
        methods: {
            openHandle:function(){
              var that = this;
              that.isOpen = "visible";
              console.log('打开了')
            },
            closeoneHandle:function(){
                var that = this;
                that.isOpen = "hidden";
                console.log('关闭了')
            },
            //查询购物车商品列表接口
            queryCardList: function () {
                var that = this;
                //请求数据
                var data = {};
                queryCardList(data).then(response => {
                    console.log(response);

                    that.CartInfo = response.Data.CartInfo;
                    that.isShow = response.Data.CartInfo.CartProductList;
                    that.OrderAmount = response.Data.OrderAmount;

                })
            },
            //全选
            allClickHandle: function () {
                var that = this;
                var state = !that.allSelect;
                var cartProductList = that.CartInfo.CartProductList;
                cartProductList.forEach(function (item, index) {
                    //如果是选中
                    if (state) {
                        //排除失效的
                        if (!item.Failure) {
                            item.IsSelected = true;
                        }
                    } else {
                        //排除失效的
                        if (!item.Failure) {
                            item.IsSelected = false;
                        }
                    }
                });
                that.CartInfo.CartProductList = cartProductList;
                that.allSelect = state;
                //计算价格
                that.dealPriceHandle();
            },
            //商品单选
            singleClickHandle: function (index) {
                var that = this;
                //没失效的情况下
                if (!that.CartInfo.CartProductList[index].Failure) {
                    var state = that.CartInfo.CartProductList[index].IsSelected;
                    that.CartInfo.CartProductList[index].IsSelected = !state;
                    that.dealPriceHandle();
                }

            },
            dealPriceHandle: function () {
                var that = this;
                var cartProductList = that.CartInfo.CartProductList;
                var total = 0;
                var number = 0;
                if (cartProductList.length > 0) {
                    cartProductList.forEach(function (item, index) {
                        //选中并且不是失效的商品
                        if (item.IsSelected && !item.Failure) {
                            total += item.OrderProductInfo.BuyCount * item.OrderProductInfo.DiscountPrice;
                            number += item.OrderProductInfo.BuyCount
                        }
                    });
                }
                that.OrderAmount = total;
                that.total = number;
            },
            //增加购物车商品数量
            addHandle: function (pId, productIndex) {
                var that = this;
                var num = Number(that.CartInfo.CartProductList[productIndex].OrderProductInfo.BuyCount) + 1;
                var list = that.getSelectListHandle();
                that.changeProductCount(num, pId, list);
            },
            //减少购物车商品数量
            reduceHandle: function (pId, productIndex) {
                var that = this;
                var num = Number(that.CartInfo.CartProductList[productIndex].OrderProductInfo.BuyCount) - 1;
                var list = that.getSelectListHandle();
                if (num >= 1) {
                    that.changeProductCount(num, pId, list);
                }
            },
            //删除购物车中的商品
            delectHandle: function (pId) {
                var that = this;
                var list = that.getSelectListHandle();
                that.delPruduct(pId, list);
            },
            //修改购物车中商品的数量接口
            changeProductCount: function (num, pId, list) {
                var that = this;
                var data = {
                    PSkuRId: pId,
                    Count: num,
                    SelectedCartItemKeyList: list
                };
                changeProductCount(data).then(response => {
                    console.log(response);

                    that.CartInfo = response.Data.CartInfo;
                    that.total = response.Data.CartInfo.CartProductList.length;
                    that.OrderAmount = response.Data.OrderAmount;

                })
            },
            //删除购物车中的商品接口
            delPruduct: function (pId, list) {
                var that = this;
                var data = {
                    PSkuRIds: [pId],
                    SelectedCartItemKeyList: list
                };
                delPruduct(data).then(response => {
                    console.log(response);
                    that.CartInfo = response.Data.CartInfo;
                    that.isShow = response.Data.CartInfo.CartProductList;
                    that.OrderAmount = response.Data.OrderAmount;

                })
            },
            //获取选择的项
            getSelectListHandle: function () {
                var that = this;
                var cartProductList = that.CartInfo.CartProductList;
                var list = [];
                cartProductList.forEach(function (item, index) {
                    if (!item.Failure) {
                        if (item.IsSelected) {
                            list.push(item.OrderProductInfo.PSkuRId);
                        }
                    }
                });
                return list;
            },

            toPay: function () {
                var that = this;
                var list = [];
                var cartProductList = that.CartInfo.CartProductList;
                cartProductList.forEach(function (item, index) {
                    if (!item.Failure) {
                        if (item.IsSelected) {
                            list.push(item.OrderProductInfo.PSkuRId);
                        }
                    }
                });
                console.log(list);
                if (list.length > 0) {
                    var str = list.join(",");
                    that.$router.push({
                        path: "/payOrder",
                        query: {
                            count: that.count,
                            pId: that.pId,
                            isCartBuy: true,
                            cartStr: str
                        }
                    });
                } else {
                    that.Common.showMsg("请选择商品");
                }
            }
        },
        mounted() {
            var that = this;
            that.queryCardList();
        },
        created() {
            var that = this;
            //底部导航栏
            that.$store.commit('setFooterNav', 'cart');
        }
    };
</script>
<style scoped src="../../../static/css/cart.css">
</style>
