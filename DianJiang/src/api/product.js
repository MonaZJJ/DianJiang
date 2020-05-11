import request from '@/utils/request'
//商品详情
export function productDetail(data) {
  return request({
    url: `/Products/ProductDetails`,
    method: 'post',
    data,
  })
}
//商品sku
export function skuList(data) {
  return request({
    url: `/Products/SkuList`,
    method: 'post',
    data,
  })
}
//商品评价列表
export function productReviewsList(data) {
  return request({
    url: `/Products/ProductReviewsList`,
    method: 'post',
    data,
  })
}
//获取相关商品列表
export function relevantProductList(data) {
  return request({
    url: `/Products/RelevantProductList`,
    method: 'post',
    data,
  })
}
//添加收藏
export function addProductToFavorite(data) {
  return request({
    url: `/Products/AddProductToFavorite`,
    method: 'post',
    data,
  })
}
//取消收藏
export function delProductToFavorite(data) {
  return request({
    url: `/Products/DelProductToFavorite`,
    method: 'post',
    data,
  })
}

//添加商品进入购物车
export function addProduct(data) {
  return request({
    url: `/Cart/AddProduct`,
    method: 'post',
    data,
  })
}

//分类列表
export function categoryList(data) {
  return request({
    url: `/Products/CategoryList`,
    method: 'post',
    data
  })
}
//商品列表
export function productList(data) {
  return request({
    url: `/Products/ProductList`,
    method: 'post',
    data
  })
}
//积分商品列表
export function creditProductList(data) {
  return request({
    url: `/CreditMall/CreditProductList`,
    method: 'post',
    data
  })
}
//积分商品详情
export function creditProductDetails(data) {
  return request({
    url: `/CreditMall/CreditProductDetails`,
    method: 'post',
    data
  })
}

//购物车商品数量
export function cartCount(data) {
  return request({
    url: `/Products/CartCount`,
    method: 'post',
    data
  })
}