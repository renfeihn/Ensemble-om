import request from '@/utils/request';

export function getDepositProdInfo (params) {
  return request({
    url: '/prod/deposit',
    method: 'get',
    params
  });
}
export function getDepositProdListTow (params) {
  return request({
    url: '/prod/towDeposit',
    method: 'get',
    params
  });
}
export function getDepositProdList (params) {
  return request({
    url: '/prod/prodList',
    method: 'get',
    params
  });
}
// export function getInitData (params) {
//   return request({
//     url: 'initRefData',
//     method: 'get',
//     params
//   });
// }
export function getDiffProd (params) {
    const data = {
      params
    }
  return request({
    url: '/prod/getDiffProd',
    method: 'post',
      data
  });
}
export function getDiffList (params) {
  return request({
    url: '/getProdDiff',
    method: 'get',
    params
  });
}

export function getProdData (params) {
  let methods = 'null';
  if (params === '111001') {
    methods = 'get';
  }
  if (params !== '111001') {
    methods = 'get1';
  }
  return request({
    url: '/data/info',
    method: methods,
    params
  });
}
export function getProdType (prodClass) {
    const data = {
        prodClass
    }
  return request({
    url: '/getProdListByClass',
    method: 'post',
    data
  });
}
export function getDepositDtl (data) {
  return request({
    url: '/prod/dtlDeposit',
    method: 'get',
    data: data
  });
}
export function getProdClass (data) {
    return request({
        url: '/prod/prodClass',
        method: 'get',
        data: data
    });
}
export function getUserCollectProds (data) {
    return request({
        url: '/prod/userCollect',
        method: 'get',
        data: data
    });
}
export function userLoginCheck (data) {
    return request({
        url: '/login/userLoginCheck',
        method: 'get',
        data: data
    });
}