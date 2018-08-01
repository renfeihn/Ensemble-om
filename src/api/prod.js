import request from '@/utils/request'

export function getProdInfo(params) {
  return request({
    url: '/prod/info',
    method: 'get',
    params
  })
}
export function getDepositProdInfo(params) {
  return request({
    url: '/prod/deposit',
    method: 'get',
    params
  })
}
export function getDepositProdListTow(params) {
    return request({
        url: '/prod/towDeposit',
        method: 'get',
        params
    })
}
export function getDepositProdList(params) {
  return request({
    url: '/prod/prodList',
    method: 'get',
    params
  })

}
export function getInitData(params) {
    return request({
        url: '/init/initRefData',
        method: 'get',
        params
    })
}
export function getDiffProd(params) {
    return request({
        url: '/prod/getDiffProd',
        method: 'get',
        params
    })
}

export function getProdData(params) {
    var methods = 'null'
    if (params === 'RB10201') {
        methods = 'get'
    }
    if (params === 'RB10202') {
        methods = 'get1'
    }
    return request({
        url: '/data/info',
        method: methods,
        params
    })
}
