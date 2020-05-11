import request from '@/utils/request'
//轮播图
export function homeBannerList(data) {
    return request({
        url: `/IndexData/HomeBannerList`,
        method: 'post',
        data
    })
}
//导航栏
export function homeNavigationBarList(data) {
    return request({
        url: `/IndexData/HomeNavigationBarList`,
        method: 'post',
        data
    })
}
//爆款、推荐
export function homeTopicProductList(data) {
    return request({
        url: `/IndexData/HomeTopicProductList`,
        method: 'post',
        data
    })
}
//专区
export function homeHandpickProductList(data) {
    return request({
        url: `/IndexData/HomeHandpickProductList`,
        method: 'post',
        data
    })
}