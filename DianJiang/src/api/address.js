import request from '@/utils/request'
//收货地址列表
export function shipAddressList(data) {
    return request({
        url: `/ShipAddress/ShipAddressList`,
        method: 'post',
        data
    })
}

//删除收货地址
export function delShipAddress(data) {
    return request({
        url: `/ShipAddress/DelShipAddress`,
        method: 'post',
        data
    })
}

//设置默认地址
export function setDefaultShipAddress(data) {
    return request({
        url: `/ShipAddress/SetDefaultShipAddress`,
        method: 'post',
        data
    })
}
//获取区域列表
export function newRegionList(data) {
    return request({
        url: `/Tool/NewRegionList`,
        method: 'post',
        data
    })
}

//新增收货地址
export function addShipAddress(data) {
    return request({
        url: `/ShipAddress/AddShipAddress`,
        method: 'post',
        data
    })
}

//编辑收货地址
export function editShipAddress(data) {
    return request({
        url: `/ShipAddress/EditShipAddress`,
        method: 'post',
        data
    })
}

//获取收货地址信息
export function getShipAddress(data) {
    return request({
        url: `/ShipAddress/GetShipAddress`,
        method: 'post',
        data
    })
}

