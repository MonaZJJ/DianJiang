import request from '@/utils/request'
//售后订单列表
export function afterServicesList(data) {
    return request({
        url: `/UCenter/AfterServicesList`,
        method: 'post',
        data
    })
}
//售后详情
export function afterServicesDetail(data) {
    return request({
        url: `/UCenter/AfterServicesDetail`,
        method: 'post',
        data
    })
}
//申请退换货
export function returnOrderProduct(data) {
    return request({
        url: `/UCenter/ReturnOrderProduct`,
        method: 'post',
        data
    })
}
//申请退款
export function putOrdersRefund(data) {
    return request({
        url: `/UCenter/PutOrdersRefund`,
        method: 'post',
        data
    })
}
//填写物流单 退换货
export function beenSentAfterSalesService(data) {
    return request({
        url: `/UCenter/BeenSentAfterSalesService`,
        method: 'post',
        data
    })
}
//取消售后申请
export function cancelReturnOrderProduct(data) {
    return request({
        url: `/UCenter/CancelReturnOrderProduct`,
        method: 'post',
        data
    })
}

// 退货发货详情
export function beenSendDetail(data) {
    return request({
        url: `/UCenter/BeenSendDetail`,
        method: 'post',
        data
    })
}
