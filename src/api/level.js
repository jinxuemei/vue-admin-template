import request from '@/utils/request'

export function getLevel(params) {
  return request({
    url: '/showLevel',
    method: 'get',
    params
  })
}

export function delOneLevel(params) {
    return request({
      url: '/delOneLevel',
      method: 'get',
      params
    })
}

export function addOneLevel(data) {
    return request({
      url: '/insertOneLevel',
      method: 'post',
      data
    })
}