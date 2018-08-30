import request from '@/utils/request';

export function getDepositProdInfo (params) {
  return request({
    url: '/getProdInfo',
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
export function getInitData (params) {
  return request({
    url: '/init/initRefData',
    method: 'get',
    params
  });
}
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
    url: '/prod/getDiffList',
    method: 'get',
    params
  });
}

export function getProdData (prodType) {
  const data={
    prodType
  }
  return request({
    url: '/getProdInfo',
    method: 'post',
    data
  });
}
export function getProdType (prodClass) {
  
  const data={
    "prodClass": prodClass,
    "userName": sessionStorage.getItem("userName")
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
export function savaProdInfo (params) {
 
  return request({
    url: '/saveProdInfo',
    method: 'post',
    data: params
});
}
export function getUserCollectProds (data) {
    return request({
        url: '/prod/userCollect',
        method: 'get',
        data: data
    });
}