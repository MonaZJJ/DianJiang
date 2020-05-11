import request from '@/utils/request'
import storeRequest from '@/utils/storeRequest'

//选择门店列表
export function nearbyStoreInfoList(data) {
    return request({
        url: `/OrderHandel/NearbyStoreInfoList`,
        method: 'post',
        data
    })
}

//门店收益
export function mySplitComm(data) {
    return storeRequest({
        url: `/store/storeCenter/MySplitComm`,
        method: 'post',
        data
    })
}
//门店收益详情
export function distAmountList(data) {
    return storeRequest({
        url: `/store/storeCenter/DistAmountList`,
        method: 'post',
        data
    })
}
//佣金提现
export function distAmountWithdrawal(data) {
    return storeRequest({
        url: `/store/storeCenter/DistAmountWithdrawal`,
        method: 'post',
        data
    })
}
//我的团队
export function subClientList(data) {
    return storeRequest({
        url: `/store/storeCenter/SubClientList`,
        method: 'post',
        data
    })
}
//获取二维码信息
export function userQrCode(data) {
    return storeRequest({
        url: `/store/storeCenter/UserQrCode`,
        method: 'post',
        data
    })
}
//微信JSDK分享
export function jsSdkShare(data) {
    return storeRequest({
        url: `/store/storeCenter/JsSdkShare`,
        method: 'post',
        data
    })
}
//门店账号登录
export function storeLogin(data) {
    return storeRequest({
        url: `/store/account/StoreLogin`,
        method: 'post',
        data
    })
}
//发送验证手机短信
export function storeSendMobileVerifyCode(data) {
    return storeRequest({
        url: `/store/account/StoreSendMobileVerifyCode`,
        method: 'post',
        data
    })
}
//退出
export function storeLogout(data) {
    return storeRequest({
        url: `/store/account/StoreLogout`,
        method: 'post',
        data
    })
}
//门店统计
export function storeStaticDetailInfo(data) {
    return storeRequest({
        url: `/store/storeCenter/StoreStaticDetailInfo`,
        method: 'post',
        data
    })
}
//门店获取普通订单列表
export function storeOrderList(data) {
    return storeRequest({
        url: `/Store/StoreOrder/StoreOrderList`,
        method: 'post',
        data
    })
}
//订单信息
export function storeOrderInfo(data) {
    return storeRequest({
        url: `/Store/StoreOrder/StoreOrderInfo`,
        method: 'post',
        data
    })
}
//售后服务清单列表
export function storeReturnApplyListingList(data) {
    return storeRequest({
        url: `/Store/StoreAftersalesservice/StoreReturnApplyListingList`,
        method: 'post',
        data
    })
}
//获取售后详情
export function stroeGetAfterSalesServiceDetail(data) {
    return storeRequest({
        url: `/Store/StoreAftersalesservice/StroeGetAfterSalesServiceDetail`,
        method: 'post',
        data
    })
}
//售后审核
export function storeAuditAfterSalesService(data) {
    return storeRequest({
        url: `/Store/StoreAftersalesservice/StoreAuditAfterSalesService`,
        method: 'post',
        data
    })
}
//门店-我的
export function myStoreInfo(data) {
    return storeRequest({
        url: `/store/storeCenter/MyStoreInfo`,
        method: 'post',
        data
    })
}

//确认自提
export function storeSelfMention(data) {
    return storeRequest({
        url: `/store/storeCenter/StoreSelfMention`,
        method: 'post',
        data
    })
}