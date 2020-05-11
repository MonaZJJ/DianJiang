import request from '@/utils/request'

//确认订单接口
export function confirmOrder(data) {
    return request({
        url: `/OrderHandel/ConfirmOrder`,
        method: 'post',
        data
    })
}
//提交订单接口
export function submitOrder(data) {
    return request({
        url: `/OrderHandel/SubmitOrder`,
        method: 'post',
        data
    })
}

//重新提交订单接口
export function reSubmitOrder(data) {
    return request({
        url: `/OrderHandel/ReSubmitOrder`,
        method: 'post',
        data
    })
}

//直接确认订单接口
export function directConfirmOrder(data) {
    return request({
        url: `/OrderHandel/DirectConfirmOrder`,
        method: 'post',
        data
    })
}

//订单列表接口
export function orderList(data) {
    return request({
        url: `/UCenter/OrderList`,
        method: 'post',
        data
    })
}

//订单信息接口
export function orderInfo(data) {
    return request({
        url: `/UCenter/OrderInfo`,
        method: 'post',
        data
    })
}

//取消订单接口
export function cancelOrder(data) {
    return request({
        url: `/UCenter/CancelOrder`,
        method: 'post',
        data
    })
}

//确认收货接口
export function receiveOrder(data) {
    return request({
        url: `/UCenter/ReceiveOrder`,
        method: 'post',
        data
    })
}

//申请退款接口
export function putOrdersRefund(data) {
    return request({
        url: `/UCenter/PutOrdersRefund`,
        method: 'post',
        data
    })
}

//评价商品接口
export function reviewProduct(data) {
    return request({
        url: `/UCenter/ReviewProduct`,
        method: 'post',
        data
    })
}

//再次购买接口
export function againBuyProduct(data) {
    return request({
        url: `/Cart/AgainBuyProduct`,
        method: 'post',
        data
    })
}


//积分确认订单接口
export function confirmCreditOrder(data) {
    return request({
        url: `/OrderHandel/ConfirmCreditOrder`,
        method: 'post',
        data
    })
}


//积分提交订单接口
export function submitCreditOrder(data) {
    return request({
        url: `/OrderHandel/SubmitCreditOrder`,
        method: 'post',
        data
    })
}

//查看物流信息接口
export function orderLogistics(data) {
    return request({
        url: `/UCenter/OrderLogistics`,
        method: 'post',
        data
    })
}

//获取售后原因列表
export function getCancelReasonList(data) {
    return request({
        url: `/UCenter/GetCancelReasonList`,
        method: 'post',
        data
    })
}
