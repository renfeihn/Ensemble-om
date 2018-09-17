import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getChargeDefine(params) {
    return request({
        url: '/table/chargeDefine',
        method: 'get',
        params
    })
}
export function getRateInfo(params) {
    return request({
        url: '/table/rateInfo',
        method: 'get',
        params
    })
}
export function getFormShift(params) {
    return request({
        url: '/table/formShift',
        method: 'get',
        params
    })
}
export function getAccountingInfo(params) {
    return request({
        url: '/table/accountingInfo',
        method: 'get',
        params
    })
}