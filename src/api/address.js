import request from '@/utils/request'

export function getAddress(params) {
  return request({
    url: '/showAddresses',
    method: 'get',
    params
  })
}

export function DelOneAddress(params) {
  return request({
    url: '/delOneAddress',
    method: 'get',
    params
  })
}

export function AddInof(data) {
  return request({
    url: '/insertOneAddress',
    method: 'post',
    data
  })
}