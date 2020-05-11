import request from '@/utils/request'
//查询购物车列表
export function queryCardList() {
    return request({
        url: `/Cart/QueryCardList`,
        method: 'post',
    })
}
//修改购物车商品数量
export function changeProductCount(data) {
    return request({
        url: `/Cart/ChangeProductCount`,
        method: 'post',
        data
    })
}

//删除购物车中的商品
export function delPruduct(data) {
    return request({
        url: `/Cart/DelPruduct`,
        method: 'post',
        data
    })
}
