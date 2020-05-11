import request from '@/utils/request'

//用户中心接口
export function uCenterData(data) {
    return request({
        url: `/UCenter/UCenterData`,
        method: 'post',
        data
    })
}

//收藏商品列表
export function favoriteProductList(data) {
    return request({
        url: `/Products/FavoriteProductList`,
        method: 'post',
        data
    })
}

//删除收藏夹中的商品
export function delProductToFavorite(data) {
    return request({
        url: `/Products/DelProductToFavorite`,
        method: 'post',
        data
    })
}

//申请成为供应商
export function addSupplier(data) {
    return request({
        url: `/UCenter/AddSupplier`,
        method: 'post',
        data
    })
}

//获取我的积分
export function getMyCredit(data) {
    return request({
        url: `/UCenter/GetMyCredit`,
        method: 'post',
        data
    })
}

//获取我的收益
export function mySplitComm(data) {
    return request({
        url: `/UCenter/MySplitComm`,
        method: 'post',
        data
    })
}

//获取佣金明细
export function distAmountList(data) {
    return request({
        url: `/UCenter/DistAmountList`,
        method: 'post',
        data
    })
}

//佣金提现
export function distAmountWithdrawal(data) {
    return request({
        url: `/UCenter/DistAmountWithdrawal`,
        method: 'post',
        data
    })
}

//我的团队
export function subClientList(data) {
    return request({
        url: `/UCenter/SubClientList`,
        method: 'post',
        data
    })
}

//门店-我的
export function myStoreInfo(data) {
    return request({
        url: `/UCenter/MyStoreInfo`,
        method: 'post',
        data
    })
}

//我的二维码
export function userQrCode(data) {
    return request({
        url: `/UCenter/UserQrCode`,
        method: 'post',
        data
    })
}
//微信JSDK分享
export function jsSdkShare(data) {
    return request({
        url: `/UCenter/JsSdkShare`,
        method: 'post',
        data
    })
}
//获取会员规则
export function getVIPRuleList(data) {
    return request({
        url: `/UCenter/GetVIPRuleList`,
        method: 'post',
        data
    })
}
//会员升级
export function upgradeVIP(data) {
    return request({
        url: `/UCenter/UpgradeVIP`,
        method: 'post',
        data
    })
}

//获取我的钱包
export function getMyMoney(data) {
    return request({
        url: `/UCenter/GetMyMoney`,
        method: 'post',
        data
    })
}

//登录接口
export function wxLogin(data) {
    return request({
        url: `/WxOpen/WxLogin`,
        method: 'post',
        data
    })
}

//完善个人信息
export function updateUser(data) {
    return request({
        url: `/UCenter/UpdateUser`,
        method: 'post',
        data
    })
}

//公司介绍
export function getCompanyDetails(data) {
    return request({
        url: `/UCenter/GetCompanyDetails`,
        method: 'post',
        data
    })
}

//发送验证码
export function sendMobileVerifyCode(data) {
    return request({
        url: `/Account/SendMobileVerifyCode`,
        method: 'post',
        data
    })
}





