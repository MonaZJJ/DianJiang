import request from '@/utils/request'

export function text() {
  return request({
    url: `/IndexData/HomeBannerList`,
    method: 'post',
  })
}
